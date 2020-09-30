import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogExampleComponent } from '../dialog-example/dialog-example.component';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})

export class SignUpFormComponent implements OnInit {

  public step: boolean = false;
  public signUpForm: FormGroup;
  public citys = ["Jerusalem", "Tel Aviv", "Haifa", "Rishon Lezion", "Petah Tikva",
    "Ashdod", "Rehovot", "Ashkelon", "Nes Tsiona", "Kfar Saba", "Kiriat Shmona", "Tsfat"];
  public notification1 = "";
  public notification2 = "";
  public filteredIDS = [];
  public filteredEmails = [];


  constructor(public _authService: AuthService, public _fb: FormBuilder, public dialog: MatDialog) { };


  ngOnInit() {
    this.signUpForm = this._fb.group({
      userID: ["", [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      passwordConfirm: ["", Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      city: ["", Validators.required],
      street: ["", Validators.required]
    });

    this._authService.getAllUsersID().subscribe(
      res => {
        this._authService.allUsersID = res;
        console.log(res);
      },
      err => console.log(err)
    );
    this._authService.getAllUsersEmail().subscribe(
      res => {
        this._authService.allUsersEmail = res;
        console.log(res);
      },
      err => console.log(err)
    );
  };

  openDialog() {
    let dialogRef = this.dialog.open(DialogExampleComponent, {
      width: '40%',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(
      res => {
        console.log('Dialog result is: ' + res);
      },
      err => console.log(err)
    );
  }

  public signInSubmit() {
    if (this.signUpForm.value.firstName && this.signUpForm.value.lastName
      && this.signUpForm.value.city && this.signUpForm.value.street) {
      this._authService.register(this.signUpForm.value).subscribe(
        res => {
          console.log(res);
          let loginVal = {
            'email': this.signUpForm.value.email, 'password': this.signUpForm.value.password,
            'userID': this.signUpForm.value.userID
          };
          localStorage.setItem("firstName", this.signUpForm.value.firstName);
          localStorage.setItem("loginVal", JSON.stringify(loginVal));
          localStorage.setItem("userID", this.signUpForm.value.userID);
          console.log(loginVal);
          this.openDialog();
          this.notification2 = "";
        },
        err => console.log(err)
      );
    } else {
      this.notification2 = "You have to fill all the blanks";
    };

  };

  public nextStep(): void {

    if (this.signUpForm.value.userID && this.signUpForm.value.email
      && this.signUpForm.value.password && this.signUpForm.value.passwordConfirm) {
      if (this.signUpForm.value.userID.length == 9) {
        this.filteredIDS = this._authService.allUsersID.filter(u => u.userID == this.signUpForm.value.userID)
        console.log(this.filteredIDS);
        if (this.filteredIDS.length == 0) {
          if (this.signUpForm.controls.email.valid) {


            this.filteredEmails = this._authService.allUsersEmail.filter(u => u.email == this.signUpForm.value.email)
            console.log(this.filteredEmails);
            if (this.filteredEmails.length == 0) {
              if (this.signUpForm.value.password == this.signUpForm.value.passwordConfirm) {
                this.step = true;
              } else {
                console.log("The passwords don't match");
                this.notification1 = "The passwords don't match";
              };
            } else {
              console.log("This email is in use");
              this.notification1 = "This email is in use";
            }
          } else {
            console.log("The email is wrong");
            this.notification1 = "The email is wrong";
          }
        } else {
          console.log("This ID is in use");
          this.notification1 = "This ID is in use";
        }

      } else {
        console.log("ID length must be 9");
        this.notification1 = "ID length must be 9";

      };
    } else {
      console.log("You have to fill all the blanks");
      this.notification1 = "You have to fill all the blanks";
    };

  };

  public backStep(): void {
    this.step = false;
    this.notification1 = ""
  };

  public signUpCanel() {
    this._authService.signUp = false;
  };



};

