import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-search-home',
  templateUrl: './search-home.component.html',
  styleUrls: ['./search-home.component.css']
})
export class SearchHomeComponent implements OnInit {

  constructor(public _productsService: ProductsService) { };

  ngOnInit() {
  };

  public searchHomeFunc(body) {
    console.log("Body: " + body);
    this._productsService.searchHome(body).subscribe(
      res => {
        console.log(res);
        this._productsService.searchResultsHome = res;
      },
      err => console.log(err)
    );

    this._productsService.isSearch = true;
  };

  public clearSearch() {
    this._productsService.isSearch = false;
  }


};
