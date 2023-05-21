import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { routes } from "../practice/practice.module";
import { QuestionComponent } from "../practice/question.component";

interface Link {
    path: string;
    title: any;
    questions: number;
}

@Component({
    standalone: true,
    imports: [ CommonModule, SharedModule, QuestionComponent ],
    template: `
        <div class="adaptive-wrap">

            <nav ngbNav #nav="ngbNav" [destroyOnHide]="false" class="wiz" [(activeId)]="active">
        
                <ng-container [ngbNavItem]="1">
                    <a ngbNavLink class="wiz__step" (click)="setExam(undefined)">
                        <div class="wiz__title">Exam</div>
                        <div class="wiz__descr">{{
                            exam ? exam.title.custom : "Choose an exam"
                        }}</div>
                    </a>
                    <ng-template ngbNavContent>

                        <h1 class="display-6 text-center">What exam are you training for?</h1>

                        <div class="cat-grid">
                            <ng-container *ngFor="let link of links">
                                <div
                                    *ngIf="+link.questions > 0"
                                    class="cat-grid__item animated"
                                >
                                    <a
                                        class="stretched-link text-decoration-none text-reset"
                                        (click)="setExam(link)"
                                    >
                                        {{ link.title.custom }}
                                    </a>
                                </div>
                            </ng-container>
                        </div>

                    </ng-template>
                </ng-container>
        
                <ng-container [ngbNavItem]="2" [disabled]="!exam" (click)="setLevel(undefined)">
                    <a ngbNavLink class="wiz__step">
                        <div class="wiz__title">Level</div>
                        <div class="wiz__descr">{{
                            level ? level : "Choose a level"
                        }}</div>
                    </a>
                    <ng-template ngbNavContent>
                        
                        <h1 class="display-6 text-center">What level do you want to start at?</h1>

                        <div class="level-grid">
                            <div
                                *ngFor="let level of levels"
                                class="level-grid__item"
                                (click)="setLevel(level)"
                            >
                                {{ level }}
                            </div>
                        </div>

                    </ng-template>
                </ng-container>
        
                <ng-container [ngbNavItem]="3" [disabled]="!exam || !level">
                    <a ngbNavLink class="wiz__step">
                        <div class="wiz__title">Train</div>
                        <div class="wiz__descr">Start training</div>
                    </a>
                    <ng-template ngbNavContent>
                        
                        <div class="col-md-8 mx-auto mb-3 text-center">
                            
                            <p class="mb-0 lead">Correctly answered questions will increase the difficulty.</p>

                            <p class="mb-0 lead">Incorretly answered questions will decrease the difficulty.</p>
    
                            <p class="mb-0 lead">After an answer is being given it will reveal the solution</p>
                        </div>
                        
                        <div class="text-center">
                            <button class="btn btn-outline-dark rounded-pill text-uppercase">next question <i class="bi bi-shuffle"></i></button>
                        </div>

                    </ng-template>
                </ng-container>
                </nav>
        
                <div [ngbNavOutlet]="nav" class="mt-3"></div>
        </div>
    `,
    styles: [`

        .adaptive-wrap {
            max-width: 1200px;
            margin: 0 auto;
            padding: min(5vh, 5rem) 1rem;
        }

        .level-grid {
            display: grid;
            gap: 1rem;
            grid-template-columns: auto auto auto;
            justify-content: center;
            padding: min(5vh, 5rem) 1rem;
            
        }

        .level-grid__item {
            border-radius: 6px;
            background: rgba(var(--app-gray_0), 1);
            box-shadow: 0 0 10px #0002;
            cursor: pointer;
            font-family: "Montserrat";
            text-transform: uppercase;
            font-weight: bold;
            padding: 1rem 1.5rem;
            transition: 
                box-shadow 400ms ease,
                transform 400ms ease;
        }

        .level-grid__item:hover {
            box-shadow: 0 0 15px 5px #0001;
            transform: scale(1.05);
        }
    `]
})
export class AdaptiveComponent implements OnInit {

    active = 1;

    exam?: Link;
    level?: string;

    links: Link[] = Object.values(routes[0].data!.children);
    levels = [ "Easy", "Medium", "Hard" ];
    
    constructor() { }

    ngOnInit() { }

    setExam(link: Link | undefined) {
        if (!link) {
            this.exam = undefined;
            this.level = undefined;
        }
        else {
            this.exam = link;
            this.active = 2;
        }
    }

    setLevel(level: string | undefined) {
        if (!level) {
            this.level = undefined;
        }
        else {
            this.level = level;
            this.active = 3;
        }
    }
}