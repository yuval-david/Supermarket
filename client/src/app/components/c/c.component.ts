import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { AuthService } from 'src/app/services/auth.service';
import * as moment from 'moment';

@Component({
  selector: 'app-c',
  templateUrl: './c.component.html',
  styleUrls: ['./c.component.css']
})
export class CComponent implements OnInit {

  public productsNum: Number;
  public ordersNum: Number;
  public isLogin: boolean = this._authService.isLogged;
  public cartCreationDate;
  public lastOrderDate;

  constructor(public _productsService: ProductsService, public _authService: AuthService) { }

  ngOnInit() {

    this._productsService.getProductsNum().subscribe(
      res => { this.productsNum = res[0]["COUNT(productID)"] },
      err => console.log(err)
    );

    this._productsService.getOrdersNum().subscribe(
      res => this.ordersNum = res[0]["COUNT(orderID)"],
      err => console.log(err)
    );

    this._authService.tokenCheck();

    this.hadOrder();
    // alert("C INIT")


  };

  public hadOrder() {
    this._authService.userHadOrder().subscribe(
      res => {
        console.log(res);
        if (res > 0) {
          this._authService.hadOrder = true;
          this.lastOrderDateFunc();
        } else {
          this._authService.hadOrder = false;
        }

      },
      err => console.log(err)
    );


  }

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


};
