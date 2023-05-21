import { CommonModule } from "@angular/common";
import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { Question } from "./models/question";
import { DifficultyIndicatorComponent } from "./difficulty-indicator.component";

@Component({
    standalone: true,
    selector: "app-question",
    imports: [ CommonModule, SharedModule, DifficultyIndicatorComponent ],
    template: `

        <div class="d-flex gap-3 align-items-end px-3">

            <app-difficulty-indicator
                [difficulty]="question.difficultyStats.difficulty"
                [difficultyValue]="question.difficultyStats.difficultyValue"
            ></app-difficulty-indicator>

            <button
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

                    <div class="solution-sol" *ngIf="showSolution">
                        <h2>Solution</h2>
                        <span [MathJax]="question.solution[0] | htmlDecode | htmlDecode"></span>
                    </div>
    
                    <div class="solution-comp" *ngIf="question.comprehension">
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
                            (click)="radio.checked = true"
                        >
                            <div class="form-check">
                                <input
                                    #radio
                                    class="form-check-input"
                                    type="radio"
                                    [name]="'question-' + question._id"
                                    [id]="'option-' + opt._id"
                                    [checked]="opt.prompt === userAnswer"
                                    (change)="onInputChange(radio)"
                                >
                                <label
                                    class="form-check-label"
                                    [class.right-option]="
                                        radio.checked && opt.prompt === question.correctOption
                                    "
                                    [class.wrong-option]="
                                        radio.checked && opt.prompt !== question.correctOption
                                    "
                                    [for]="'option-' + opt._id"
                                >
                                    <span [MathJax]="opt.value | htmlDecode | htmlDecode"></span>
                                </label>
                            </div>
                        </div>
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

        .locus-of-text__sol-comp-wrap,
        .locus-of-text__ques-opt-wrap {
            padding: 1rem;
        }

        .locus-of-text__sol-comp-wrap {
            flex: 9999 1;
        }

        .locus-of-text__ques-opt-wrap {
            flex: 1 1 400px;
        }

        .locus-of-text__sol-comp,
        .locus-of-text__ques-opt {
            display: grid;
            gap: 2rem;
            margin-bottom: 2rem;
        }

        .locus-of-text__ques-opt {
            position: sticky;
            top: 2rem;
        }

        @media (min-width: 600px) {
            .two-cols {
                display: grid;
                gap: 2rem;
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

    @Input("question") question!: Question;
    @Input("userAnswer") userAnswer?: string;

    showSolution = false;

    constructor() { }

    ngOnInit() { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.question.previousValue !== changes.question.currentValue) {
            this.showSolution = false;
        }
    }

    onInputChange(d: any) {
        console.log("Selected radio", d);
    }
}