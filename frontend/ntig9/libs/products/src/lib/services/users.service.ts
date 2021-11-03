import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserObject, UsersObject } from '@ntig9/main-lib';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class UsersService {
    // create public URL for api
    /* public URL = 'http://localhost:3000/'; */
    URL = environment.apiUrl;

    constructor(private _http: HttpClient) {}
    getUsers(): Observable<UsersObject> {
        return this._http.get<UsersObject>(`${this.URL}all`);
    }

    createUser(user: UserObject): Observable<UserObject> {
        return this._http.post<UserObject>(`${this.URL}register`, user);
    }
    deleteUser(userID: string | undefined): Observable<UserObject> {
        return this._http.delete<UserObject>(`${this.URL}delete/${userID}`);
    }
    updateUser(
        userID: string | undefined,
        update: UserObject
    ): Observable<UserObject> {
        return this._http.put<UserObject>(
            `${this.URL}update/${userID}`,
            update
        );
    }
    getUser(userID: string | undefined): Observable<UserObject> {
        return this._http.get<UserObject>(`${this.URL}${userID}`);
    }
}
