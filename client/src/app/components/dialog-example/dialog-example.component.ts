import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dialog-example',
  templateUrl: './dialog-example.component.html',
  styleUrls: ['./dialog-example.component.css']
})
export class DialogExampleComponent implements OnInit {

  constructor(public _authService: AuthService) { }

  ngOnInit() {
  }

  public loginAfterRegister() {
    return this._authService.logIn(localStorage.getItem("loginVal")).subscribe(
      res => {
        console.log(JSON.parse(res));
        this._authService.firstName = localStorage.getItem("firstName");
        localStorage.setItem('token', JSON.parse(res).token);
        this._authService.tokenCheck();
      },
      err => console.log(err)
    );
  }

}
