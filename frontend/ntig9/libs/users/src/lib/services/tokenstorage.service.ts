import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';

@Injectable({
    providedIn: 'root',
})
export class TokenstorageService {
    setToken(token: string): void {
        localStorage.setItem(TOKEN_KEY, token);
    }

    getToken(): string | null {
        return localStorage.getItem(TOKEN_KEY);
    }

    removeToken(): void {
        localStorage.removeItem(TOKEN_KEY);
    }
}
