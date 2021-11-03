import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserObject } from '@ntig9/main-lib';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserLoginService {
    // create public URL for api
    /* public URL = 'http://localhost:3000/'; */
    URL = environment.apiUrl;

    constructor(private _http: HttpClient) {}

    login(user: UserObject): Observable<UserObject> {
        return this._http.post<UserObject>(`${this.URL}login`, user);
    }

    logout(userToken: string | undefined | null): Observable<UserObject> {
        return this._http.post<UserObject>(`${this.URL}logout`, {
            token: userToken,
        });
    }
}
