import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Route, Router, RouterModule } from "@angular/router";
import { Subject, combineLatest, filter, map, of, switchMap, takeUntil, tap } from "rxjs";
import { SharedModule } from "src/app/shared/shared.module";
import { routes } from "./practice.module";
import { FormControl } from "@angular/forms";
import { jsonCopy } from "src/app/utils/json";
import { AuthService } from "src/app/services/auth.service";

interface HierarchyLink {
    parentPath: string;
    path: string;
    title: {
        custom: string;
        escaped: string;
        original: string;
        translated: boolean;
    };
    questions: number;
    answered: number;
}

@Component({
    standalone: true,
    imports: [ CommonModule, RouterModule, SharedModule ],
    template: `
        <app-breadcrumb-router></app-breadcrumb-router>

        <div class="search-wrap">
            <app-input
                type="autocomplete"
                name="hierarchy"
                placeholder="Search into subcategories 🔍︎"
                helper="Applies to the current path and below"
                [limit]="25"
                [options]="filteredRoutes"
                [formatter]="searchFormatter"
                [template]="searchTmpl"
                [ngControl]="searchCtrl"
            ></app-input>
            <ng-template #searchTmpl let-r="result" let-t="term">
                <div class="search-result">
                    <h6 class="text-uppercase">{{ r.text }}</h6>
                    <ngb-highlight
                        style="display: block; font-size: 0.8rem; line-height: 1;"
                        [result]="r.path"
                        [term]="t"
                    ></ngb-highlight>
                </div>
            </ng-template>
        </div>

        <div class="cat-grid">
            <ng-container *ngFor="let link of links">
                <div
                    *ngIf="+link.questions > 0"
                    class="cat-grid__item animated"
                >
                    <a
                        class="stretched-link text-decoration-none text-reset"
                        [routerLink]="link.path"
                    >
                        {{ link.title.custom }}
                    </a>
                    <small class="text-muted">
                        {{ link.answered || 0 }} / {{ link.questions }} questions
                    </small>
                </div>
            </ng-container>
        </div>
    `,
    styles: [`

        .search-wrap {
            border: 1px solid #d0d0d0;
            border-radius: 6px;
            max-width: 40ch;
            margin: 0 auto;
            padding: 1rem;
        }

        ::ng-deep button[id^="ngb-typeahead"]:has(> .search-result) {
            box-shadow: inset 0 2px 0 -1px #d0d0d0;
        }

        .search-result {
            padding: 0.5rem 0;
            white-space: break-spaces;
        }
    `]
})
export class HierarchyComponent implements OnInit, OnDestroy {

    links: HierarchyLink[] = [];

    searchCtrl = new FormControl();
    searchFormatter = (route: Route) => route.path;
    routes = routes;
    filteredRoutes: Route[] = [];

    destroy$ = new Subject<void>();

    constructor(
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {

        this.route.data
            .pipe(
                takeUntil(this.destroy$),
                filter(data => !data.leaf),
                map(data => {
                    this.links = Object.values(data.children) as HierarchyLink[];
                    this.links.forEach(link => link.parentPath = data.mongoPath);
                    return this.links;
                }),
                switchMap(links =>
                    combineLatest([ of(links), this.authService.user$ ])
                ),
                tap(([ links, user ]) => {

                    const { practiceHistory } = user;
                    if (!practiceHistory) return;

                    // Get the number of answered questions
                    (links as HierarchyLink[]).forEach(link => {

                        link.answered = 0;
                        const catPath = `${link.parentPath}${link.title.original},`;

                        Object.values(practiceHistory).forEach(ans =>
                            link.answered += ans.path.indexOf(catPath) > -1 ? 1 : 0
                        );
                    });
                })
            )
            .subscribe();

        this.route.url
            .pipe(
                takeUntil(this.destroy$),
                tap(segments => {
                    const segment = segments.join("/");
                    const copyOfRoutes = jsonCopy(routes) as any[];
                    this.filteredRoutes = copyOfRoutes.filter(r => r.path?.includes(segment));
                    this.filteredRoutes.shift();
                    this.filteredRoutes.forEach((r: any) =>
                        r.text = r.data.mongoPath?.split(",").slice(-2)[0]
                    );
                })
            )
            .subscribe();

        this.searchCtrl.valueChanges
            .pipe(
                takeUntil(this.destroy$),
                filter(route => !!route),
                tap(route => {
                    // console.log("Selected route", route);
                    this.router.navigateByUrl("dashboard/practice/" + route.path);
                })
            )
            .subscribe();
    }

    ngOnDestroy() {
        this.destroy$.next();
    }
}