import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-container-shop',
  templateUrl: './container-shop.component.html',
  styleUrls: ['./container-shop.component.css']
})
export class ContainerShopComponent implements OnInit {

  opened: boolean = true;

  constructor(public router: Router, public _productsService: ProductsService, public _authService: AuthService) { }

  ngOnInit() {
    // alert("Shop INIT!")
    this.isOrderComp();
  }

  public isOrderComp() {
    if (this.router.url == "/order") {
      this._productsService.orderComp = false;
      // alert("Comp order: " + this._productsService.orderComp)
    } else if (this.router.url == "/products") {
      this._productsService.orderComp = true;
      // alert("Comp order: " + this._productsService.orderComp)
    }
  }

}
