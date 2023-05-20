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

        <div class="d-flex flex-wrap">

            <div
                *ngIf="question.comprehension || showSolution"
                style="flex: 9999 1; padding: 1rem;"
            >

                <div *ngIf="showSolution" class="mb-4">

                    <h2>Solution</h2>

                    <span [MathJax]="question.solution[0] | htmlDecode | htmlDecode"></span>
                </div>

                <div *ngIf="question.comprehension" class="mb-4">

                    <h2>Comprehension</h2>

                    <span [MathJax]="question.comprehension | htmlDecode | htmlDecode"></span>
                </div>
            </div>

            <div style="flex: 1 1 400px; padding: 1rem;">
                <div class="position-sticky" style="top: 1rem">
            
                    <div class="mb-4">

                        <h2>Question</h2>

                        <span [MathJax]="question.question | htmlDecode | htmlDecode"></span>
                    </div>

                    <div *ngIf="question.options.length">

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
                                    [class.right-option]="radio.checked && opt.prompt === question.correctOption"
                                    [class.wrong-option]="radio.checked && opt.prompt !== question.correctOption"
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