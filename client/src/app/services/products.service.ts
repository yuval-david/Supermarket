import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  public products;
  public cartCreationDate;
  public searchValue = "";
  public isSearch: boolean = false;
  public searchResultsHome = [];
  public orderComp: boolean = true;
  public term = "";
  public isInclude: boolean = false;
  public choosenProdCategory;
  public categories;
  public choosenProdAdmin = {
    'productName': 'Choose a product',
    'productID': 0,
    'category_id': 0,
    'price': 1,
    'image': "https://i.pinimg.com/originals/5b/5b/68/5b5b68ddf9de812ffc941238e66049ac.png"
  };


  // ADD & EDIT ADMIN - FORM
  public addProdForm: FormGroup;

  public productName: "";
  public category_id: 0;
  public price: 1;
  public image: "";

  public receiptFileContent;
  public totalPriceReceipt;


  constructor(public http: HttpClient) { }

  public getProductsNum(): Observable<any> {
    return this.http.get("http://localhost:1000/mysuper/products/prodsamount");
  };

  public getOrdersNum(): Observable<any> {
    return this.http.get("http://localhost:1000/mysuper/products/ordersamount");
  };

  public getCategories(): Observable<any> {
    return this.http.get("http://localhost:1000/mysuper/products/categories", {
      headers: { 'Authorization': localStorage.getItem('token') }
    });
  };

  public getProductsByCategory(id): Observable<any> {
    return this.http.get("http://localhost:1000/mysuper/products/bycategory/" + id, {
      headers: { 'Authorization': localStorage.getItem('token') }
    });
  };

  public addCart(body): Observable<any> {
    return this.http.post("http://localhost:1000/mysuper/products/newcart", body, {
      headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
      responseType: "text"
    });
  };

  public getCartId(userId): Observable<any> {
    return this.http.get("http://localhost:1000/mysuper/products/getcartid/" + userId)
  }

  public getCartProducts(cartId): Observable<any> {
    return this.http.get("http://localhost:1000/mysuper/products/displaycart/" + cartId)
  }

  public findCartDate(body): Observable<any> {
    return this.http.post("http://localhost:1000/mysuper/products/cartdate", body, {
      headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
      responseType: "json"
    });
  };

  public searchHome(body): Observable<any> {
    return this.http.post("http://localhost:1000/mysuper/products/search", body, {
      headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
      responseType: "json"
    });
  };

  public deleteProductCart(cartId, prodId): Observable<any> {
    return this.http.delete("http://localhost:1000/mysuper/products/deleteCartProduct/" + cartId + "/" + prodId, {
      headers: { 'Authorization': localStorage.getItem('token') }
    });
  };

  public deleteAllCartProds(cartId): Observable<any> {
    return this.http.delete("http://localhost:1000/mysuper/products/deleteallproducts/" + cartId, {
      headers: { 'Authorization': localStorage.getItem('token') }
    });
  };

  public addProductToCart(body): Observable<any> {
    return this.http.post("http://localhost:1000/mysuper/products/addtocart", body, {
      headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
      responseType: "json"
    });
  };

  public addOrder(body): Observable<any> {
    return this.http.post("http://localhost:1000/mysuper/products/neworder", body, {
      headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
      responseType: "json"
    });
  };

  public removeCart(cartId): Observable<any> {
    return this.http.delete("http://localhost:1000/mysuper/products/removecart/" + cartId, {
      headers: { 'Authorization': localStorage.getItem('token') }
    })
  };

  public getLastOrderDate(): Observable<any> {
    return this.http.get("http://localhost:1000/mysuper/products/lastorderdate/" + localStorage.getItem('userID'))
  };

  public createReceipt(body): Observable<any> {
    return this.http.post("http://localhost:1000/mysuper/products/receiptFile", body, {
      headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
      responseType: "text"
    });
  };

  public downloadReceipt(): Observable<any> {
    return this.http.get("http://localhost:1000/mysuper/products/downloadReceip", {
      headers: { 'Authorization': localStorage.getItem('token') },
      responseType: "text"
    });
  };

  public getBusyDates(): Observable<any> {
    return this.http.get("http://localhost:1000/mysuper/products/busydate")
  };
};
