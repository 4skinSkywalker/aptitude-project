import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";

@Component({
    standalone: true,
    selector: "app-difficulty-indicator",
    imports: [ CommonModule, SharedModule ],
    template: `
        <div class="di-wrap">
            <div class="di-back">
                <div class="di-arrow" [style.transform]="'rotateZ(' + difficultyValue * 180 + 'deg)'"></div>
            </div>
            <div class="di-cover"></div>
            <div class="di-text">{{ difficulty }}</div>
        </div>
    `,
    styles: [`

        :host {
            --di-width: 100px;
            display: flex;
        }
    
        .di-wrap {
            width: var(--di-width);
            height: calc(var(--di-width) / 2);
            position: relative;
            overflow: hidden;
        }

        .di-back {
            position: absolute;
            background: conic-gradient(#2ecc71 0deg, #e74c3c 180deg);
            width: 100%;
            height: 200%;
            border-radius: 50%;
            transform: rotateZ(-90deg);
        }

        .di-cover {
            position: absolute;
            background: #333;
            width: 56%;
            height: 112%;
            border-radius: 50%;
            left: 50%;
            bottom: 0;
            transform: translate(-50%, 50%);
            text-align: center;
        }

        .di-text {
            position: absolute;
            left: 50%;
            bottom: 0;
            color: #fff;
            text-transform: uppercase;
            font-size: 66.66%;
            font-weight: bold;
            transform: translateX(-50%);
        }

        .di-arrow {
            position: absolute;
            top: calc(50% - var(--di-width) / 2.25);
            left: calc(50% - var(--di-width) / 6);
            transform-origin: bottom center;
            width: 0;
            height: 0;
            border-left: calc(var(--di-width) / 6) solid transparent;
            border-right: calc(var(--di-width) / 6) solid transparent;
            border-bottom: calc(var(--di-width) / 2.25) solid #333;
            transform: rotateZ(0deg);
            transition: transform 400ms ease;
        }
    `]
})
export class DifficultyIndicatorComponent implements OnInit {

    @Input("difficulty") difficulty = "Easy";
    @Input("difficultyValue") difficultyValue = 0;

    constructor() { }

    ngOnInit() { }
}