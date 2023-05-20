import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { Subject, filter, switchMap, takeUntil, tap } from "rxjs";
import { SharedModule } from "src/app/shared/shared.module";
import { PracticeService } from "./services/practice.service";
import { Question } from "./models/question";
import { QuestionComponent } from "./question.component";

@Component({
    standalone: true,
    imports: [ CommonModule, RouterModule, SharedModule, QuestionComponent ],
    template: `
        <app-breadcrumb-router></app-breadcrumb-router>

        <div class="q-steps">
            <div
                class="q-step" 
                *ngFor="let q of questions; let i =  index"
                [class.q-step--active]="currQuestionIndex === i"
                (click)="currQuestionIndex = i"
            >
                {{ i + 1 }}
            </div>
        </div>

        <app-question [question]="questions[currQuestionIndex]"></app-question>
    `,
    styles: [`

        .q-steps {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
            justify-content: center;
            padding: 1rem;
            max-width: 640px;
            margin: min(3vh, 3rem) auto;
        }

        .q-step {
            width: 48px;
            height: 48px;
            display: grid;
            place-items: center;
            background: rgba(var(--app-gray_200), 0.8);
            border-radius: 50%;
            transition: all 200ms ease;
            cursor: pointer;
        }

        .q-step--active {
            filter: invert(1);
        }

        .q-step:hover {
            background: rgba(var(--app-gray_200), 1);
            transform: scale(1.05);
        }

        @media (min-width: 600px) {
            .q-step {
                width: 32px;
                height: 32px;
            }
        }
    `]
})
export class LevelComponent implements OnInit, OnDestroy {

    currQuestionIndex = 0;
    questions: Question[] = [];

    destroy$ = new Subject<void>();

    constructor(
        private route: ActivatedRoute,
        private practiceService: PracticeService
    ) { }

    ngOnInit() {
        this.route
            .data
            .pipe(
                takeUntil(this.destroy$),
                filter(data => data.leaf),
                switchMap(data =>
                    this.practiceService.getQuestions(data.mongoPath)
                ),
                tap(questions => this.questions = questions)
            )
            .subscribe();
    }

    ngOnDestroy() {
        this.destroy$.next();
    }
}