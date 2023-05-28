import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Question } from "../models/question";
import { BasicResponse } from "src/app/models/response";

@Injectable({
    providedIn: 'root'
})
export class QuestionService {

    constructor(
        private http: HttpClient
    ) {}

    getQuestions$(mongoPath: string) {
        const url = `${environment.apiRoot}/questions`;
        return this.http.post<BasicResponse<Question[]>>(url, { mongoPath });
    }

    getRandomQuestions$(mongoPath: string, difficultyValue: number, size: number) {
        const url = `${environment.apiRoot}/questions/random`;
        return this.http.post<BasicResponse<Question[]>>(url, { mongoPath, difficultyValue, size });
    }

    postQuestionAnswer$(mode: "practice" | "adaptive", question: Question, userAnswer: string) {
        const url = `${environment.apiRoot}/questions/answers/${question._id}`;
        return this.http.post<BasicResponse<boolean>>(url, { mode, userAnswer });
    }
}
