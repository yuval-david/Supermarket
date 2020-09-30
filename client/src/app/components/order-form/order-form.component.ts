import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material';
import { DialogOrderComponent } from '../dialog-order/dialog-order.component';
import { DialogDateComponent } from '../dialog-date/dialog-date.component';
import { RxwebValidators } from "@rxweb/reactive-form-validators";
import { CreditCardValidators } from 'angular-cc-library';
import * as moment from 'moment';


@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {

  public orderForm: FormGroup;
  public lastOrderDate;
  public formNotes = "";
  public isNote: boolean = false;
  public city = "";
  public street = "";
  public busyDates;
  public newBusyDates;
  public busyDays;
  public dayFor = "";
  public dateNotes = "This day is too busy...";
  public dateProblem: boolean = false;
  public today: Date;
  public tomorrow: Date;


  constructor(public _productsService: ProductsService, public _fb: FormBuilder,
    public router: Router, public _authService: AuthService, public dialog: MatDialog) { }

  ngOnInit() {
    this.orderForm = this._fb.group({
      user_id: localStorage.getItem('userID'),
      cart_id: localStorage.getItem('cartID'),
      sendCity: [this.city, Validators.required],
      sendStreet: [this.street, Validators.required],
      sendDate: ["", Validators.required],
      payEnd: ["", [Validators.required, CreditCardValidators.validateCCNumber]]
    });

    //GET BUSY DATES
    this._productsService.getBusyDates().subscribe(
      res => {
        console.log(res);
        this.busyDates = res;
        this.busyDatesFunc();
        console.log(this.newBusyDates)

      },
      err => console.log(err)
    );

    this.today = new Date();
    this.tomorrow = (new Date(this.today));
    this.tomorrow.setDate(this.tomorrow.getDate() + 1);

  };

  public newOrder() {

    if (this.orderForm.value.sendCity && this.orderForm.value.sendStreet && this.orderForm.value.sendDate && this.orderForm.value.payEnd) {
      if (this.orderForm.controls.payEnd.valid) {
        this._productsService.addOrder(this.orderForm.value).subscribe(
          res => {
            console.log(res);
            console.log(this.orderForm.value.sendDate)
            console.log(this.orderForm.value)
            this.openDialog();
            this.lastOrderDateFunc();
          },
          err => console.log(err)
        );
      } else {
        this.isNote = true;
        this.formNotes = "Credit card number is wrong";
      }
    } else {
      this.isNote = true;
      this.formNotes = "You have to fill all the blanks";

    }

  };


  public lastOrderDateFunc() {
    this._productsService.getLastOrderDate().subscribe(
      res => {
        console.log(res);
        this._authService.lastOrderDate = res;
      },
      err => console.log(err)
    );
  };

  public getCity() {
    this._authService.getUserCity(localStorage.getItem('userID')).subscribe(
      res => {
        console.log(res[0].city);
        this.orderForm.value.sendCity = res[0].city;
        this.city = res[0].city;
        this.orderForm.controls.sendCity.setValue(this.city);

      },
      err => console.log(err)
    );
  };

  public getStreet() {
    this._authService.getUserStreet(localStorage.getItem('userID')).subscribe(
      res => {
        console.log(res[0].street);
        this.orderForm.value.sendstreet = res[0].street;
        this.street = res[0].street;
        this.orderForm.controls.sendStreet.setValue(this.street);


      },
      err => console.log(err)
    );
  }

  public openDialog() {
    this.dialog.open(DialogOrderComponent, {
      disableClose: true
    });
  }

  public openDateDialog() {
    this.dialog.open(DialogDateComponent);
  }

  public busyDatesFunc() {
    this.newBusyDates = this.busyDates.map(dateObj => new Date(dateObj.sendDate));
  }

  public checkDate() {
    for (let day of (this.newBusyDates)) {
      if (day == this.orderForm.controls.sendDate.value.toString()) {
        this.dateProblem = true;
        this.openDateDialog();
        this.orderForm.controls.sendDate.setValue("");
      };
    };

  };

};