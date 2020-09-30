import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {


  constructor(public _authService: AuthService, public _productsService: ProductsService) { }

  ngOnInit() {
    this._authService.tokenCheck();

  }


}


