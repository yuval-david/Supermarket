import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentComponent } from './components/content/content.component';
import { ContainerShopComponent } from './components/container-shop/container-shop.component';
import { ContainerOrderComponent } from './components/container-order/container-order.component';



const routes: Routes = [
  { path: "products", component: ContainerShopComponent },
  { path: "order", component: ContainerOrderComponent },
  { path: "", pathMatch: "full", component: ContentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
