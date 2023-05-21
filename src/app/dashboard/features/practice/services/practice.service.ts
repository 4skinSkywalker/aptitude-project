import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Question } from "../models/question";

@Injectable({
    providedIn: 'root'
})
export class PracticeService {

    constructor(
        private http: HttpClient
    ) {}

    getQuestions$(mongoPath: string) {
        const url = `${environment.apiRoot}/practice/questions`;
        return this.http.post<Question[]>(url, { mongoPath });
    }

    getRandomQuestion$(mongoPath: string, difficultyValue: number, size: number) {
        const url = `${environment.apiRoot}/practice/questions/random`;
        return this.http.post<Question[]>(url, { mongoPath, difficultyValue, size });
    }
}