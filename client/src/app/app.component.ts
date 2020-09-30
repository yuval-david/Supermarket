import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public _authService: AuthService, public router: Router) { }

  ngOnInit() {
    this._authService.tokenCheck();
    this._authService.firstName = localStorage.getItem("firstName");

  }

  public logOut(): void {
    this._authService.isLogged = false;

    localStorage.removeItem("firstName");
    localStorage.removeItem("loginVal");
    localStorage.removeItem("userID");
    localStorage.removeItem("token");
    localStorage.removeItem("cartID");
    localStorage.removeItem("amount");
    localStorage.removeItem("lastOrderDare");
    localStorage.removeItem("isAdmin");
    this._authService.tokenCheck();
    this._authService.message = "";
    this.moveToHomePage();


    this.hasCart();

  };

  public moveToHomePage() {
    this.router.navigateByUrl("/");

  };

  public hasCart() {
    this._authService.userHasCart().subscribe(
      res => {
        console.log("The user has a cart:" + res);
        res == 1 ? this._authService.hasCart = true : this._authService.hasCart = false;

      },
      err => console.log(err)
    );
  };

};



