import { CommonModule } from "@angular/common";
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { Subject, combineLatest, filter, lastValueFrom, map, of, switchMap, takeUntil, tap } from "rxjs";
import { SharedModule } from "src/app/shared/shared.module";
import { QuestionService } from "./services/question.service";
import { Question } from "./models/question";
import { QuestionAnswer, QuestionComponent } from "./question.component";
import { AuthService } from "src/app/services/auth.service";

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

        <div class="question-wrap">

            <div class="d-flex justify-content-between mb-3">

                <button
                    class="btn text-uppercase"
                    [disabled]="currQuestionIndex === 0"
                    (click)="previousQuestion()"    
                >
                    <i class="bi bi-arrow-left-circle-fill"></i> prev
                </button>

                <button
                    class="btn text-uppercase"
                    [disabled]="currQuestionIndex === questions.length - 1"
                    (click)="nextQuestion()"    
                >
                    next <i class="bi bi-arrow-right-circle-fill"></i>
                </button>
            </div>
    
            <div *ngIf="questions[currQuestionIndex] as question">
                <app-question
                    [question]="question"
                    (userAnswered)="onUserAnswer($event)"
                ></app-question>
            </div>
        </div>
    `,
    styles: [`

        .question-wrap {
            max-width: 1000px;
            margin: 0 auto;
            margin-bottom: 5rem;
        }

        .q-steps {
            display: flex;
            gap: 0.25rem;
            flex-wrap: wrap;
            justify-content: center;
            padding: 0 0.5rem;
            max-width: 640px;
            margin: 0 auto 1rem;
        }

        .q-step {
            width: 48px;
            height: 32px;
            display: grid;
            place-items: center;
            background: rgba(var(--app-gray_200), 0.8);
            border-radius: 1rem;
            transition: all 200ms ease;
            cursor: pointer;
        }

        .q-step--active {
            filter: invert(1);
        }

        .q-step:has(~ .q-step.q-step--active) {
            filter: invert(0.33);
        }

        .q-step:hover {
            background: rgba(var(--app-gray_200), 1);
            transform: scale(1.05);
        }

        @media (min-width: 600px) {
            .q-step {
                width: 32px;
                height: 24px;
            }
        }
    `]
})
export class LevelComponent implements OnInit, OnDestroy {

    currQuestionIndex = 0;
    questions: Question[] = [];

    destroy$ = new Subject<void>();

    constructor(
        private cdRef: ChangeDetectorRef,
        private authService: AuthService,
        private route: ActivatedRoute,
        private questionService: QuestionService
    ) { }

    ngOnInit() {

        this.route.data
            .pipe(
                takeUntil(this.destroy$),
                filter(data => data.leaf),
                switchMap(data =>
                    this.questionService.getQuestions$(data.mongoPath)
                ),
                map(({ result: questions }) => { 
                    this.questions = questions;
                    return questions;
                }),
                switchMap(questions =>
                    combineLatest([
                        of(questions),
                        this.authService.user$
                    ])
                ),
                tap(([ questions, user ]) => {
                    const { practiceHistory } = user;
                    let lastAnsweredIndex;
                    for (let i = questions.length - 1; i > -1; i--) {
                        if (practiceHistory && practiceHistory[questions[i]._id]) {
                            lastAnsweredIndex = i;
                            break;
                        }
                    }
                    this.currQuestionIndex = lastAnsweredIndex || 0;
                    this.cdRef.detectChanges();
                })
            )
            .subscribe();
    }

    ngOnDestroy() {
        this.destroy$.next();
    }

    previousQuestion() {
        this.currQuestionIndex = Math.max(this.currQuestionIndex - 1, 0);
    }

    nextQuestion() {
        this.currQuestionIndex = Math.min(this.currQuestionIndex + 1, this.questions.length - 1);
    }

    async onUserAnswer({ _id, userAnswer }: QuestionAnswer) {

        const { result: questionAnswer } = await lastValueFrom(
            this.questionService.postQuestionAnswer$("practice", _id, userAnswer)
        );

        const user = this.authService.user;
        if (user) {
            user.practiceHistory = user.practiceHistory || {};
            user.practiceHistory[questionAnswer._id] = questionAnswer;
        }
    }
}