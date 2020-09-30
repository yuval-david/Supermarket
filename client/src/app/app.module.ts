import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContentComponent } from './components/content/content.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CartComponent } from './components/cart/cart.component';
import { AComponent } from './components/a/a.component';
import { BComponent } from './components/b/b.component';
import { CComponent } from './components/c/c.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { DialogExampleComponent } from './components/dialog-example/dialog-example.component';
import { ContainerShopComponent } from './components/container-shop/container-shop.component';
import { SearchHomeComponent } from './components/search-home/search-home.component';
import { ProductsPageComponent } from './components/products-page/products-page.component';
import { DialogProductComponent } from './components/dialog-product/dialog-product.component';
import { ContainerOrderComponent } from './components/container-order/container-order.component';
import { SearchCartComponent } from './components/search-cart/search-cart.component';
import { OrderCartComponent } from './components/order-cart/order-cart.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { DialogOrderComponent } from './components/dialog-order/dialog-order.component';
import { DialogDateComponent } from './components/dialog-date/dialog-date.component';
import { RxReactiveFormsModule } from "@rxweb/reactive-form-validators";
import { CreditCardDirectivesModule } from 'angular-cc-library';
import { DialogAdminComponent } from './components/dialog-admin/dialog-admin.component';


@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    CartComponent,
    AComponent,
    BComponent,
    CComponent,
    SignUpFormComponent,
    DialogExampleComponent,
    ContainerShopComponent,
    SearchHomeComponent,
    ProductsPageComponent,
    DialogProductComponent,
    ContainerOrderComponent,
    SearchCartComponent,
    OrderCartComponent,
    OrderFormComponent,
    DialogOrderComponent,
    DialogDateComponent,
    DialogAdminComponent
  ],
  entryComponents: [DialogExampleComponent, DialogProductComponent, DialogOrderComponent, DialogDateComponent, DialogAdminComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    RxReactiveFormsModule,
    CreditCardDirectivesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
