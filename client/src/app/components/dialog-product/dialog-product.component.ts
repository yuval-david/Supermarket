import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-dialog-product',
  templateUrl: './dialog-product.component.html',
  styleUrls: ['./dialog-product.component.css']
})
export class DialogProductComponent implements OnInit {

  public amount: number = 1;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public _productService: ProductsService) { }

  ngOnInit() {
  }

  public saveAmount() {
    localStorage.setItem('amount', JSON.stringify(this.amount))
  }



}
