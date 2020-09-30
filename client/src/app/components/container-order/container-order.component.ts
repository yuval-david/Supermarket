import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-container-order',
  templateUrl: './container-order.component.html',
  styleUrls: ['./container-order.component.css']
})
export class ContainerOrderComponent implements OnInit {

  constructor(public router: Router, public _productsService: ProductsService) { }

  ngOnInit() {
    this.isOrderComp();
  }


  public isOrderComp() {
    if (this.router.url == "/order") {
      this._productsService.orderComp = false;
      // alert("Comp order: " + this._productsService.orderComp)
    } else {
      this._productsService.orderComp = true;
      // alert("Comp order: " + this._productsService.orderComp)
    }
  }

}
