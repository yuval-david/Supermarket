import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLogged: boolean = false;
  public isAdmin: boolean = false;
  public signUp: boolean = false;
  public firstName;
  public message = "";
  public hasCart: boolean = false;
  public hadOrder: boolean = false;
  public lastOrderDate;
  public allUsersID;
  public allUsersEmail;

  constructor(public http: HttpClient) { }

  public logIn(body) {
    return this.http.post("http://localhost:1000/mysuper/auth/login", body, {
      headers: { 'Content-Type': 'application/json' },
      responseType: "text"
    });

  };

  public register(body) {
    return this.http.post("http://localhost:1000/mysuper/auth/register", body, {
      headers: { 'Content-Type': 'application/json' },
      responseType: "text"
    });
  };

  public userHasCart() {
    return this.http.get("http://localhost:1000/mysuper/auth/hascart/" + localStorage.getItem('userID'));
  };

  public userHadOrder() {
    return this.http.get("http://localhost:1000/mysuper/auth/hadorders/" + localStorage.getItem('userID'));
  };

  public tokenCheck() {
    if (localStorage.getItem('token')) {
      this.checkAdmin();
      this.isLogged = true;
      console.log("You are log in !");
    } else {
      this.isLogged = false;
    }
  };

  public getUserCity(userId) {
    return this.http.get("http://localhost:1000/mysuper/auth/getcity/" + userId)
  };

  public getUserStreet(userId) {
    return this.http.get("http://localhost:1000/mysuper/auth/getstreet/" + userId)
  };

  public checkAdmin() {
    if (JSON.parse(localStorage.getItem('isAdmin')) == 1) {
      console.log(JSON.parse(localStorage.getItem('isAdmin')));
      this.isAdmin = true;
      console.log("Welcome ADMIN! You are the best ... ;-)");
    } else if (JSON.parse(localStorage.getItem('isAdmin')) == 0) {
      this.isAdmin = false;
    }
  };

  public getAllUsersID() {
    return this.http.get("http://localhost:1000/mysuper/auth/allUsersID");
  };
  public getAllUsersEmail() {
    return this.http.get("http://localhost:1000/mysuper/auth/allUsersEmail");
  };

};
