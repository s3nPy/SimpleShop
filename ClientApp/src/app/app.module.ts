import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';

import { ShopComponent } from './shop/shop.component';
import { CartComponent } from './cart/cart.component';
import { CartService } from './shared/cart.service';
import { SumItemsPipe } from './shared/sumItems.pipe';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { OrderLayoutComponent } from './layouts/order-layout/order-layout.component';
import { OrderService } from './shared/order.service';
import { OrderComponent } from './order/order.component';
import { PopupComponent } from './popup/popup.component';
import { PopupService } from './shared/popup.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    ShopComponent,
    CartComponent,
    SumItemsPipe,
    MainLayoutComponent,
    OrderLayoutComponent,
    OrderComponent,
    PopupComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: MainLayoutComponent, children: [
        { path: '', redirectTo: '/', pathMatch: 'full' },
        { path: '', component: HomeComponent },
        { path: 'counter', component: CounterComponent },
        { path: 'fetch-data', component: FetchDataComponent },
        { path: 'shop', component: ShopComponent },
        { path: 'cart', component: CartComponent },
      ] },
      { path: 'order', component: OrderLayoutComponent, children: [
        { path: '', component: OrderComponent }
      ] },

    ])
  ],
  providers: [
    CartService,
    OrderService,
    PopupService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
