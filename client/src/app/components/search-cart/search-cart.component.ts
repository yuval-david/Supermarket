import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-search-cart',
  templateUrl: './search-cart.component.html',
  styleUrls: ['./search-cart.component.css']
})
export class SearchCartComponent implements OnInit {

  constructor(public _productsService: ProductsService) { }

  ngOnInit() {
  }

  public searchCart(product) {
    if (product.includes(this._productsService.term)) {
      this._productsService.isInclude = true;
    }
  }

}
