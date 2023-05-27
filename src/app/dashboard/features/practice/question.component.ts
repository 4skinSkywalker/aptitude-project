import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { Question, QuestionOption } from "./models/question";
import { DifficultyIndicatorComponent } from "./difficulty-indicator.component";

export interface QuestionAnswer {
    userAnswer: string;
    correctOption: string;
}

@Component({
    standalone: true,
    selector: "app-question",
    imports: [ CommonModule, SharedModule, DifficultyIndicatorComponent ],
    template: `

        <div class="d-flex flex-wrap gap-3 align-items-end px-3">

            <app-difficulty-indicator
                [difficulty]="question.difficultyStats.difficulty"
                [difficultyValue]="question.difficultyStats.difficultyValue"
            ></app-difficulty-indicator>

            <span *ngIf="mode === 'adaptive'" class="badge bg-primary">
                {{ question.path.split(",").slice(-3)[0] }}
            </span>

            <button
                *ngIf="mode === 'practice' || userAnswer !== undefined"
                class="btn"
                [class.btn-outline-primary]="!showSolution"
                [class.btn-primary]="showSolution"
                (click)="showSolution = !showSolution"
            >
                <i class="bi bi-info-circle-fill"></i> {{ showSolution ? "Hide" : "Show" }} solution
            </button>
        </div>

        <div class="locus-of-text">

            <div
                *ngIf="question.comprehension || showSolution"
                class="locus-of-text__sol-comp-wrap"
            >
                <div class="locus-of-text__sol-comp">

                    <div class="locus-of-text__sol" *ngIf="showSolution">
                        <h2>Solution</h2>
                        <span [MathJax]="question.solution[0] | htmlDecode | htmlDecode"></span>
                    </div>
    
                    <div class="locus-of-text__comp" *ngIf="question.comprehension">
                        <h2>Comprehension</h2>
                        <span [MathJax]="question.comprehension | htmlDecode | htmlDecode"></span>
                    </div>
                </div>
            </div>

            <div class="locus-of-text__ques-opt-wrap">
                <div
                    class="locus-of-text__ques-opt"
                    [class.two-cols]="
                        !(question.comprehension || showSolution) && question.options.length
                    "
                >
            
                    <div class="locus-of-text__ques">
                        <h2>Question</h2>
                        <span [MathJax]="question.question | htmlDecode | htmlDecode"></span>
                    </div>

                    <div class="locus-of-text__opt" *ngIf="question.options.length">

                        <h2>Options</h2>

                        <div
                            *ngFor="let opt of question.options"
                            class="option-wrap"
                            (click)=" onUserAnswer(radio, opt)"
                        >
                            <div class="form-check">
                                <input
                                    #radio
                                    class="form-check-input not-clickable"
                                    type="radio"
                                    [name]="'question-' + question._id"
                                    [checked]="opt.prompt === userAnswer"
                                >
                                <label
                                    class="form-check-label"
                                    [class.right-option]="
                                        radio.checked && opt.prompt === question.correctOption
                                    "
                                    [class.wrong-option]="
                                        radio.checked && opt.prompt !== question.correctOption
                                    "
                                >
                                    <span [MathJax]="opt.value | htmlDecode | htmlDecode"></span>
                                </label>
                            </div>
                        </div>

                        <!-- Point of projection -->
                        <ng-content></ng-content>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`

        .locus-of-text {
            display: flex;
            flex-wrap: wrap;
        }

        .locus-of-text__sol-comp-wrap {
            flex: 9999 1;
        }

        .locus-of-text__ques-opt-wrap {
            flex: 1 1 360px;
        }

        .locus-of-text__sol-comp,
        .locus-of-text__ques-opt {
            display: grid;
            margin-bottom: 2rem;
        }

        .locus-of-text__ques-opt {
            position: sticky;
            top: 1rem;
        }

        .locus-of-text__sol,
        .locus-of-text__comp,
        .locus-of-text__ques,
        .locus-of-text__opt {
            padding: 1rem;
            animation: forwards ease-out 600ms FadeIn;
            opacity: 0;
        }

        @keyframes FadeIn {
            from { opacity: 0 } to { opacity: 1 }
        }

        @media (min-width: 600px) {
            .two-cols {
                display: grid;
                grid-template-columns: 4fr 3fr;
            }
        }

        .option-wrap {
            border-radius: 0.5rem;
            transition:
                background-color 200ms ease,
                padding 200ms 200ms ease,
                margin 200ms 200ms ease;
        }

        .option-wrap:has(.right-option) {
            background: rgba(var(--app-green_500), 0.33);
            padding: 0.5rem 1rem;
            margin: 0.5rem 0;
        }

        .option-wrap:has(.wrong-option) {
            background: rgba(var(--app-red_500), 0.33);
            padding: 0.5rem 1rem;
            margin: 0.5rem 0;
        }
    `]
})
export class QuestionComponent implements OnInit, OnChanges {

    @Input("mode") mode: "practice" | "adaptive" = "practice";
    @Input("question") question!: Question;
    @Input("userAnswer") userAnswer?: string;

    @Output("userAnswered") userAnsweredEmitter = new EventEmitter<QuestionAnswer>();

    showSolution = false;

    constructor() { }

    ngOnInit() { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.question.previousValue !== changes.question.currentValue) {
            this.showSolution = false;
            this.userAnswer = undefined;
        }
    }

    onUserAnswer(radio: HTMLInputElement, option: QuestionOption) {
        if (this.mode === "practice" || this.userAnswer === undefined) {

            radio.checked = true;
            this.userAnswer = option.prompt;

            this.userAnsweredEmitter.emit({
                userAnswer: this.userAnswer,
                correctOption: this.question.correctOption
            });
        }
    }
}