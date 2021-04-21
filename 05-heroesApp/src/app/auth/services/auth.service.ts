import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = environment.apiBaseURL;
  private _user: Auth | undefined;

  public get user(): Auth {
    return { ...this._user! };
  }

  constructor(private http: HttpClient) {}

  login(): Observable<Auth> {
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`).pipe(
      tap((auth) => (this._user = auth)),
      tap((auth) => localStorage.setItem('token', auth.id))
    );
  }

  logout() {
    localStorage.removeItem('token');
    this._user = undefined;
  }

  validateAuth(): Observable<boolean> {
    if (!localStorage.getItem('token')) {
      return of(false);
    }
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`).pipe(
      map((user) => {
        this._user = user;
        return true;
      })
    );
  }
}
