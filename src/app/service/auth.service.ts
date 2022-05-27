import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user = [
    {username: "admin", password: "admin", roles: ["ADMIN", "USER"]},
    {username: "user1", password: "user1", roles: ["USER"]},
    {username: "user2", password: "user2", roles: ["USER"]}
  ];
  public isAuthenticated!: boolean;
  public userAuth: any;
  public token!: any;

  constructor() {
  }

  public login(username: string, password: string) {
    let userFound;
    this.user.forEach(user => {
      if (user.username === username && user.password === password) {
        userFound = user;
        this.token = btoa(JSON.stringify({username: user.username, roles: user.roles}));
      }
    });
    console.log(userFound);
    if (userFound) {
      this.isAuthenticated = true;
      this.userAuth = userFound;
      console.log(this.userAuth);
    } else {
      this.isAuthenticated = false;
      this.userAuth = null;
    }
  }

  public isAdmin(): boolean {
    if (this.userAuth) {
      return this.userAuth.roles.includes("ADMIN");
    }
    return false;
  }

  public saveUserLocalStorage() {
    if (this.userAuth) {
      localStorage.setItem("user", this.token);
    }
  }

  public getUserLocalStorage() {
    if (localStorage.getItem("user")) {
      // @ts-ignore
      const user = JSON.parse(atob(localStorage.getItem("user")));
      this.userAuth = {username: user.username, roles: user.roles};
      this.isAuthenticated = true;
      // @ts-ignore
      this.token=localStorage.getItem("user");
    }
  }
  public removeUserLocalStorage() {
    localStorage.removeItem("user");
    this.isAuthenticated = false;
    this.token = null;
    this.userAuth = null;
  }

}
