import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { routes } from "../practice/practice.module";
import { QuestionAnswer, QuestionComponent } from "../practice/question.component";
import { PracticeService } from "../practice/services/practice.service";
import { Question } from "../practice/models/question";
import { lastValueFrom } from "rxjs";

interface Link {
    path: string;
    title: any;
    questions: number;
}

interface Difficulty {
    difficulty: string;
    difficultyValue: number;
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
                            level ? getLevelDifficulty() : "Choose a level"
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
                                {{ level.difficulty }}
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
                        
                        <div class="rules col-md-8 mx-auto text-center">
                            
                            <p class="mb-1 lead">Correct answers will increase the difficulty, while incorrect answers will decrease it.</p>
    
                            <p class="lead">Only after answering you will be able to reveal the solution.</p>
                        </div>

                        <div *ngIf="currQuestion">
                            <app-question
                                mode="adaptive"
                                [question]="currQuestion"
                                (userAnswered)="onUserAnswer($event)"
                            >
                                <button
                                    *ngIf="currQuestionAnswer"
                                    class="btn btn-primary rounded-pill text-uppercase mt-3"
                                    (click)="loadQuestion()"
                                >
                                    next question <i class="bi bi-shuffle"></i>
                                </button>
                            </app-question>
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

        .rules > .lead {
            font-size: 1rem;
        }
    `]
})
export class AdaptiveComponent implements OnInit {

    active = 1;

    difficultyDecrease = 0.03;
    difficultyIncrease = 0.02;
    exam?: Link;
    level?: Difficulty;

    links: Link[] = Object.values(routes[0].data!.children);
    levels: Difficulty[] = [
        { difficulty: "Easy", difficultyValue: 0 },
        { difficulty: "Medium", difficultyValue: 0.3 },
        { difficulty: "Hard", difficultyValue: 0.5 }
    ];

    warmedUp = false;
    currDifficultyValue = 0;
    currQuestion?: Question;
    currQuestionAnswer?: QuestionAnswer;
    
    constructor(
        private practiceService: PracticeService
    ) { }

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

    setLevel(level: Difficulty | undefined) {
        if (!level) {
            this.level = undefined;
            this.currDifficultyValue = 0;
        }
        else {

            this.level = level;
            this.currDifficultyValue = level.difficultyValue;
            this.active = 3;

            this.warmedUp = false;
            this.currQuestion = undefined;
            this.currQuestionAnswer = undefined;
            this.loadQuestion();
        }
    }

    getLevelDifficulty() {
        let i = 0;
        for (; i < this.levels.length - 1; i++) {
            if (this.currDifficultyValue < this.levels[i + 1].difficultyValue) {
                return this.levels[i].difficulty;
            }
        }
        return this.levels[i].difficulty;
    }

    async loadQuestion() {

        if (!this.exam || !this.level)
            return;

        if (this.warmedUp) {
            const cqa = this.currQuestionAnswer;
            if (cqa && cqa.userAnswer === cqa.correctOption) {
                this.currDifficultyValue += this.difficultyIncrease;
            }
            else {
                this.currDifficultyValue -= this.difficultyDecrease;
            }
        }

        const mongoPath = routes[0].data?.mongoPath + this.exam.title.original;
        const randomQuestions = await lastValueFrom(
            this.practiceService
                .getRandomQuestion$(mongoPath, this.currDifficultyValue, 1)
        );

        this.currQuestionAnswer = undefined;
        this.currQuestion = randomQuestions[0];
        this.warmedUp = true;
    }

    onUserAnswer(questionAnswer: QuestionAnswer) {
        this.currQuestionAnswer =  questionAnswer;
    }
}