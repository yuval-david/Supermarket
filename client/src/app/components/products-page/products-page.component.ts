import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { MatDialog } from '@angular/material';
import { DialogProductComponent } from '../dialog-product/dialog-product.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {

  public categories;
  public choosenProdCategory;
  public timestamp;
  public selectedCategory = "";

  constructor(public _productsService: ProductsService, public dialog: MatDialog, public router: Router,
    public _authService: AuthService, public _adminService: AdminService) { }

  ngOnInit() {

    this.timestamp = (new Date()).getTime();

    this._productsService.getCategories().subscribe(
      res => {
        console.log(res);
        this.categories = res;
        this._productsService.categories = res;
        console.log(this._productsService.categories)
      },
      err => console.log(err)
    );

  };

  public productsByCategory(categoryId) {
    this._productsService.getProductsByCategory(categoryId).subscribe(
      res => {
        console.log(res);
        this._productsService.products = res;
        this.selectedCategory = this.categories[categoryId - 1].categoryName;
        console.log(this.selectedCategory)
      },
      err => console.log(err)
    );
  };

  public openProductDialog(prodObj) {

    if (this._authService.isAdmin) {
      //Move to Products Page
      this._adminService.addClick = false;
      console.log(prodObj);
      this._productsService.choosenProdAdmin = prodObj;

      //SET VALUES OF INPUTS
      this._productsService.addProdForm.controls.productName.setValue(prodObj.productName);
      this._productsService.addProdForm.controls.price.setValue(prodObj.price);
      this._productsService.addProdForm.controls.category_id.setValue(prodObj.category_id);
      // console.log({ "Image Value: ": prodObj.image })
      // this._productsService.addProdForm.controls.image.setValue("");
      // IMAGE changed by SRC attribute in the IMG tag

      //GET THE CHOOSEN CATEGORY
      this._productsService.choosenProdCategory = this.categories[prodObj.category_id - 1].categoryName;
      console.log({ "Form Value: ": this._productsService.addProdForm.value })

    } else {
      console.log(prodObj);
      let dialogRef = this.dialog.open(DialogProductComponent,
        {
          data: {
            name: prodObj.productName,
            price: prodObj.price,
            image: prodObj.image
          },
          backdropClass: 'backdropBackground'
        });

      dialogRef.afterClosed().subscribe(
        res => {
          console.log("Dialog result: " + res);
          if (res == "true") {

            this._productsService.addProductToCart({
              'product_id': prodObj.productID,
              'amount': JSON.parse(localStorage.getItem('amount')),
              'cart_id': localStorage.getItem('cartID')
            }).subscribe(
              res => {
                console.log(res); this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                  this.router.navigate(['/products']);
                });
              },
              err => console.log(err)
            );
          };
        }
      );
    };

  };



};
