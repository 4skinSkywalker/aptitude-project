import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap, timer } from "rxjs";
import { AnonymousUser, User } from '../models/user';
import { parseJwt } from '../utils/json';
import { HttpClient } from '@angular/common/http';
import { BasicResponse } from '../models/response';
import { environment } from 'src/environments/environment';

interface AuthResult {
  expiresAt: number;
  idToken: string;
}

const ANONYMOUS_USER: AnonymousUser = {
  roles: []
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user$ = new BehaviorSubject<User>(ANONYMOUS_USER as User);
  user$: Observable<User> = this._user$.asObservable();

  constructor(
    private http: HttpClient
  ) {
    this.autoSignIn();
  }

  signUp(username: string, email: string, password: string) {

    const url = `${environment.apiRoot}/auth/sign-up`;
    const body = {
      username,
      email,
      password
    };

    return this.http.post<BasicResponse<string>>(url, body);
  }

  confirmEmail(_id: string) {

    const url = `${environment.apiRoot}/auth/confirm-email`;
    const body = { _id };

    return this.http.post<BasicResponse<string>>(url, body);
  }

  signIn(email: string, password: string) {

    const url = `${environment.apiRoot}/auth/sign-in`;
    const body = {
      email,
      password
    };

    return this.http
      .post<BasicResponse<string>>(url, body)
      .pipe(
        map(response => {
          const { result } = response;
          const { exp } = parseJwt(result);
          return { idToken: result, expiresAt: exp * 1000 };
        }),
        tap((authRes) => this.setSession(authRes)),
        tap(({ idToken }) => this.emitUser(idToken))
      );
  }

  resetPasswordPhase1(email: string) {

    const url = `${environment.apiRoot}/auth/reset-password-phase-1`;
    const body = { email };

    return this.http.post<BasicResponse<string>>(url, body);
  }

  resetPasswordPhase2(email: string, resetCode: string, password: string) {

    const url = `${environment.apiRoot}/auth/reset-password-phase-2`;
    const body = {
      email,
      resetCode,
      password
    };
    return this.http.post<BasicResponse<string>>(url, body);
  }

  autoSignIn() {
    const idToken = localStorage.getItem('id_token');
    if (idToken && this.isLoggedIn()) {
      this.emitUser(idToken);
    }
    return this.user$;
  }
        
  private setSession(authRes: AuthResult) {
    localStorage.setItem('id_token', authRes.idToken);
    localStorage.setItem("expires_at", JSON.stringify(authRes.expiresAt));
  }
  
  private emitUser(idToken: string) {
    const user = parseJwt(idToken);
    this._user$.next(user);
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    this._user$.next(ANONYMOUS_USER as User);
  }

  isLoggedIn() {
    return new Date().getTime() < this.getExpiration();
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    let expiresAt = 0;
    if (expiration) {
      expiresAt = JSON.parse(expiration);
    }
    return expiresAt;
  }
}
