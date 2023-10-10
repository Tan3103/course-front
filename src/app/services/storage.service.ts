import {Injectable} from '@angular/core';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {
  }

  clean(): void {
    window.sessionStorage.clear();
    window.sessionStorage.removeItem(USER_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    console.log('user', user);
    window.sessionStorage.setItem(USER_KEY, user.token);
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    console.log(user)
    if (user) {
      return true;
    }

    return false;
  }
}
