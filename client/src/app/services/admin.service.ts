import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public addClick: boolean = false;

  constructor(public http: HttpClient) { }

  public addProduct(body) {
    return this.http.post("http://localhost:1000/mysuper/admin/add", body, {
      headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
      responseType: "json"
    });
  };

  public editProduct(body, productId) {
    return this.http.put(`http://localhost:1000/mysuper/admin/edit/${productId}`, body, {
      headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
      responseType: "json"
    });
  }

  public onUploadImage(body, imageName) {
    return this.http.post("http://localhost:1000/mysuper/admin/upload" + imageName, body, {
      headers: { 'Authorization': localStorage.getItem('token') },
      responseType: "text"
    })

  }
};
