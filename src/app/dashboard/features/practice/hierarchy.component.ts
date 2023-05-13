import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { filter, map, tap } from "rxjs";
import { SharedModule } from "src/app/shared/shared.module";

@Component({
    standalone: true,
    imports: [CommonModule, RouterModule, SharedModule],
    template: `
        <app-breadcrumb-router></app-breadcrumb-router>
        <div class="cat-grid">
            <div class="cat-grid__item animated" *ngFor="let link of links">
                <a class="stretched-link text-decoration-none text-reset" [routerLink]="link.path">{{ link.title }}</a>
            </div>
        </div>
    `,
    styles: [`
        .cat-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1rem;
            max-width: 1200px;
            margin: 0 auto;
            padding: min(10vh, 10rem) 1rem;
        }

        .cat-grid__item {
            aspect-ratio: 1/1;
            border-radius: 20px;
            background: rgba(var(--app-gray_0), 1);
            box-shadow: 0 0 10px #0002;
            padding: 1em;
            font-size: 1rem;
            display: grid;
            place-items: center;
            text-align: center;
            text-transform: uppercase;
            font-weight: bold;
            position: relative;
            transition: transform 400ms ease;
        }

        .cat-grid__item:hover {
            box-shadow: 0 0 15px 5px #0001;
            transform: scale(1.05);
        }

        .animated {
            animation: forwards ease-out 300ms FadeIn;
            filter: blur(2px);
            left: -5px;
            opacity: 0;
            position: relative;
        }

        .animated:nth-child(1) { animation-delay: 20ms }
        .animated:nth-child(2) { animation-delay: 40ms }
        .animated:nth-child(3) { animation-delay: 60ms }
        .animated:nth-child(4) { animation-delay: 80ms }
        .animated:nth-child(5) { animation-delay: 100ms }
        .animated:nth-child(6) { animation-delay: 120ms }
        .animated:nth-child(7) { animation-delay: 140ms }
        .animated:nth-child(8) { animation-delay: 160ms }
        .animated:nth-child(9) { animation-delay: 180ms }
        .animated:nth-child(10) { animation-delay: 200ms }
        .animated:nth-child(11) { animation-delay: 220ms }
        .animated:nth-child(12) { animation-delay: 240ms }
        .animated:nth-child(13) { animation-delay: 260ms }
        .animated:nth-child(14) { animation-delay: 280ms }
        .animated:nth-child(15) { animation-delay: 300ms }
        .animated:nth-child(16) { animation-delay: 320ms }
        .animated:nth-child(17) { animation-delay: 340ms }
        .animated:nth-child(18) { animation-delay: 360ms }
        .animated:nth-child(19) { animation-delay: 380ms }
        .animated:nth-child(20) { animation-delay: 400ms }
        .animated:nth-child(21) { animation-delay: 420ms }
        .animated:nth-child(22) { animation-delay: 440ms }
        .animated:nth-child(23) { animation-delay: 460ms }
        .animated:nth-child(24) { animation-delay: 480ms }
        .animated:nth-child(25) { animation-delay: 500ms }
        .animated:nth-child(26) { animation-delay: 520ms }
        .animated:nth-child(27) { animation-delay: 540ms }
        .animated:nth-child(28) { animation-delay: 560ms }
        .animated:nth-child(29) { animation-delay: 580ms }
        .animated:nth-child(30) { animation-delay: 600ms }
        .animated:nth-child(31) { animation-delay: 620ms }
        .animated:nth-child(32) { animation-delay: 640ms }
        .animated:nth-child(33) { animation-delay: 660ms }
        .animated:nth-child(34) { animation-delay: 680ms }
        .animated:nth-child(35) { animation-delay: 700ms }
        .animated:nth-child(36) { animation-delay: 720ms }
        .animated:nth-child(37) { animation-delay: 740ms }
        .animated:nth-child(38) { animation-delay: 760ms }
        .animated:nth-child(39) { animation-delay: 780ms }
        .animated:nth-child(40) { animation-delay: 800ms }
        .animated:nth-child(41) { animation-delay: 820ms }
        .animated:nth-child(42) { animation-delay: 840ms }
        .animated:nth-child(43) { animation-delay: 860ms }
        .animated:nth-child(44) { animation-delay: 880ms }
        .animated:nth-child(45) { animation-delay: 900ms }
        .animated:nth-child(46) { animation-delay: 920ms }
        .animated:nth-child(47) { animation-delay: 940ms }
        .animated:nth-child(48) { animation-delay: 960ms }
        .animated:nth-child(49) { animation-delay: 980ms }
        .animated:nth-child(50) { animation-delay: 1000ms }

        @keyframes FadeIn {
            from {
                filter: blur(2px);
                left: -5px;
                opacity: 0;
            }
            to {
                filter: blur(0px);
                left: 0;
                opacity: 1;
            }
        }

        @media (min-width: 600px) {
            .cat-grid {
                grid-template-columns: repeat(3, 1fr);
            }
        }

        @media (min-width: 800px) {
            .cat-grid {
                grid-template-columns: repeat(4, 1fr);
            }
        }

        @media (min-width: 1000px) {
            .cat-grid {
                grid-template-columns: repeat(5, 1fr);
            }
        }
    `]
})
export class HierarchyComponent {

    links: { path: string, title: string }[] = [];

    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.route
            .data
            .pipe(
                filter(data => {
                    console.log(data);
                    return !data.leaf;
                }),
                map(data => Object.values(data.children)),
                tap((links: any) => this.links = links),
            )
            .subscribe();
    }
}