import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class PracticeService {

    constructor(
        private http: HttpClient
    ) {}

    getQuestions(mongoPath: string) {
        const url = `${environment.apiRoot}/practice/questions`;
        return this.http.post<any[]>(url, { mongoPath });
    }
}