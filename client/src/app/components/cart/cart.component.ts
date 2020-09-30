import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service';
import { AdminService } from 'src/app/services/admin.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from "@angular/material";
import { DialogAdminComponent } from '../dialog-admin/dialog-admin.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public cartProducts;
  public totalPrice;
  public updateValues;
  public selectedImage: File;


  constructor(public _productsService: ProductsService, public router: Router,
    public _authService: AuthService, public _adminService: AdminService, public _fb: FormBuilder,
    public http: HttpClient, public dialog: MatDialog) { }

  ngOnInit() {

    this.displayCartProducts(localStorage.getItem("cartID"));

    this._productsService.getCategories().subscribe(
      res => this._productsService.categories = res,
      err => console.log(err)
    );

    this._productsService.productName = "";
    this._productsService.category_id = 0;
    this._productsService.price = 1;
    this._productsService.image = "";


    this._productsService.addProdForm = this._fb.group({
      productName: [this._productsService.productName],
      category_id: [this._productsService.category_id],
      price: [this._productsService.price],
      image: [this._productsService.image]
    });

  };


  public displayCartProducts(cartId) {
    this._productsService.getCartProducts(cartId).subscribe(
      res => {
        console.log(res);
        this.cartProducts = res;
        this._productsService.receiptFileContent = res;
        this.totalPrice = this.getSum();
        this._productsService.totalPriceReceipt = this.totalPrice;
      },
      err => console.log(err)
    );

  };

  public deleteProductCart(prodId) {
    console.log("cart: " + localStorage.getItem("cartID"), "prod: " + prodId);
    this._productsService.deleteProductCart(localStorage.getItem("cartID"), prodId).subscribe(
      res => {
        console.log(res);
        this.getSum();
      },
      err => console.log(err)
    );
    console.log("The product deleted!");

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/products']);
    });
  };

  getSum(): number {
    let sum = 0;
    for (let i = 0; i < this.cartProducts.length; i++) {
      sum += this.cartProducts[i].amount * this.cartProducts[i].price;
    }
    let roundedString = sum.toFixed(2);
    let rounded = Number(roundedString);
    return rounded;
  };

  public clearCart() {
    this._productsService.deleteAllCartProds(localStorage.getItem('cartID')).subscribe(
      res => console.log(res),
      err => console.log(err)
    );

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/products']);
    });
  };

  public toOrderPage() {
    this._authService.tokenCheck();
    if (this._authService.isLogged) {
      this.router.navigateByUrl('/order');
    };
  };

  public formAddProd() {
    this._adminService.addClick = true;
    this._productsService.addProdForm.controls.productName.setValue("");
    this._productsService.addProdForm.controls.price.setValue(1);
    this._productsService.addProdForm.controls.category_id.setValue(0);
    this._productsService.addProdForm.controls.image.setValue("");
  };

  public Back() {
    this._adminService.addClick = false;
  };

  //SAVE button - ADMIN
  public addNewProduct() {

    //CHECKING EDIT / ADD
    if (this._adminService.addClick) {
      console.log("ADD FORM"); // ADD FORM
      console.log(this._productsService.addProdForm.value);
      this._adminService.addProduct(this._productsService.addProdForm.value).subscribe(
        res => {
          console.log(res);
          console.log(this._productsService.addProdForm.value);
          this.openAdminDialog();
        },
        err => console.log(err)
      );
    } else if (!this._adminService.addClick) {
      console.log("EDIT FORM"); // EDIT FORM
      console.log(this._productsService.addProdForm.value);
      this.editProd();

    }

  };

  public onFileChanged(event) {
    // console.log(event);
    this.selectedImage = event.target.files[0];

    console.log(this.selectedImage);
    this.fileToServer();
  };

  public fileToServer() {
    let imagename = (this._productsService.addProdForm.value.image).split("fakepath")[1];
    const formData = new FormData();
    formData.append("file", this.selectedImage);
    console.log(formData);

    this._adminService.onUploadImage(formData, imagename).subscribe(
      res => console.log(res),
      err => console.log(err)
    );
  }

  public editProd() {
    this._adminService.editProduct(this._productsService.addProdForm.value, this._productsService.choosenProdAdmin.productID).subscribe(
      res => {
        console.log(res);
        this.openAdminDialog();
      },
      err => console.log(err)
    );
  };

  public productsByCategory(categoryId) {
    this._productsService.getProductsByCategory(categoryId).subscribe(
      res => {
        console.log(res);
        this._productsService.products = res;
      },
      err => console.log(err)
    );
  };

  public openAdminDialog() {
    this.dialog.open(DialogAdminComponent);
  };


};
