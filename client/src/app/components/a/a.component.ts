import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import * as moment from 'moment';

@Component({
  selector: 'app-a',
  templateUrl: './a.component.html',
  styles: ['./a.component.css']
})
export class AComponent implements OnInit {

  public loginForm: FormGroup;
  constructor(public _fb: FormBuilder, public _authService: AuthService, public router: Router, public _productsService: ProductsService) { }

  ngOnInit() {

    this.loginForm = this._fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });

    this._authService.tokenCheck();
    this.hasCart();


  };


  public login() {
    if (this.loginForm.value.email && this.loginForm.value.password) {
      this._authService.logIn(this.loginForm.value).subscribe(
        res => {
          localStorage.setItem('firstName', JSON.parse(res).firstName);
          localStorage.setItem('userID', JSON.parse(res).userID);
          localStorage.setItem('token', JSON.parse(res).token);
          localStorage.setItem('isAdmin', JSON.parse(res).isAdmin);

          this._authService.firstName = localStorage.getItem("firstName");
          this.hasCart();
          // debugger
          this.hadOrder();
          console.log(this._authService.lastOrderDate);

          //CLEAR LOGIN FIELDS
          // window.location.reload();
          this.loginForm.controls.email.setValue("");
          this.loginForm.controls.password.setValue("");

          this._authService.checkAdmin();

          if (this._authService.isAdmin == true) {
            this.router.navigateByUrl("/products");
          }

          if (this._authService.hasCart) {
            this.cartId(localStorage.getItem('userID'));
            this._productsService.getCartProducts(localStorage.getItem("cartID"));
          }

          this._authService.tokenCheck();

        },
        err => {
          console.log(err);
          this._authService.message = "User name or password is incorrect";
        }
      );

    } else {
      this._authService.message = "You need to fill all the fields";
    }

  };

  public signUpClick() {
    this._authService.signUp = true;
  };

  public hasCart() {
    this._authService.userHasCart().subscribe(
      res => {
        console.log("The user has a cart:" + res);
        res == 1 ? this._authService.hasCart = true : this._authService.hasCart = false;
        if (this._authService.hasCart) {
          this.cartDate({ 'user_id': localStorage.getItem("userID") });
          this.cartId(localStorage.getItem("userID"));
        }
      },
      err => console.log(err)
    );
  };

  public hadOrder() {
    this._authService.userHadOrder().subscribe(
      res => {
        console.log("The user has " + res + " orders.");
        if (res > 0) {
          this._authService.hadOrder = true;
          this.lastOrderDateFunc();
        } else {
          this._authService.hadOrder = false;
        }

      },
      err => console.log(err)
    );
  };

  public lastOrderDateFunc() {
    this._productsService.getLastOrderDate().subscribe(
      res => {
        console.log(res);
        let dateOrder = res.orderDate;
        // MMM Do YYYY
        this._authService.lastOrderDate = moment(dateOrder).format("L");
      },
      err => { console.log(err) }
    );
  };

  public moveToProducts() {
    if (localStorage.getItem("token")) {

      if (this._authService.hasCart) {
        console.log("This user already has a cart");
        this._productsService.getCartProducts(localStorage.getItem("cartID"));

      }
      else {

        console.log("User doesnt have cart!");
        this.addNewCart({ "user_id": localStorage.getItem("userID") });
        this.cartId(localStorage.getItem("userID"));
        console.log("Create new cart for user: " + localStorage.getItem("userID"));
        console.log("Cart ID : " + localStorage.getItem('cartID'))

      }

      this.router.navigateByUrl("/products");

    };

  };

  public addNewCart(body) {
    this._productsService.addCart(body).subscribe(
      res => console.log(res),
      err => console.log(err)
    );
  };

  public cartDate(body) {
    this._productsService.findCartDate(body).subscribe(
      res => {
        console.log("Cart date is: " + res[0]["cartDate"].split("T")[0]);
        this._productsService.cartCreationDate = res[0]["cartDate"].split("T")[0];
      },
      (err) => console.log(err)
    );
  };

  public cartId(userId) {
    console.log(localStorage.getItem('userID'))
    this._productsService.getCartId(userId).subscribe(
      res => {
        console.log("Cart id is: " + res[0].cartID);
        localStorage.setItem("cartID", res[0].cartID);
      },
      err => console.log(err)
    );
  };






};
