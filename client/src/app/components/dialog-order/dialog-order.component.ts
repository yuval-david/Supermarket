import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dialog-order',
  templateUrl: './dialog-order.component.html',
  styleUrls: ['./dialog-order.component.css']
})
export class DialogOrderComponent implements OnInit {

  constructor(public _productsService: ProductsService, public _authService: AuthService, public router: Router) { }

  public receiptContent = "\r\n" + " " + this._authService.firstName + "'s " + "Receipt:" + "\r\n";


  ngOnInit() {
    this._productsService.receiptFileContent.forEach(product => {
      this.receiptContent += "\r\n" + "\r\n";
      this.receiptContent += "Product: " + product.productName + "   ";
      this.receiptContent += "Amount: " + product.amount + "   ";
      this.receiptContent += "Price: " + product.price + " ₪" + "   ";
      this.receiptContent += "Sum: " + product.price * product.amount;

    });

    this.receiptContent += "\r\n";
    this.receiptContent += "\r\n";
    this.receiptContent += "Total: " + this._productsService.totalPriceReceipt + " ₪" + "   ";

  }

  public deleteCart() {
    this._productsService.removeCart(localStorage.getItem('cartID')).subscribe(
      res => console.log(res),
      err => console.log(err)
    );

    localStorage.removeItem('cartID')
    this.router.navigateByUrl('/')

  };

  public getReceipt() {

    this._productsService.createReceipt({ "content": this.receiptContent.toString() }).subscribe(
      res => {
        console.log(res);
        console.log({ "content": this.receiptContent.toString() });
        this.downloadFile();
        window.open('http://localhost:1000/mysuper/products/downloadReceip', "_blank");
      },
      err => console.log(err)
    );
  };

  public downloadFile() {
    this._productsService.downloadReceipt().subscribe(
      res => console.log(res),
      err => console.log(err)
    );
  };

};
