import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './Components/login-form/login-form.component';
import { SignInFormComponent } from './components/sign-in-form/sign-in-form.component';
import { CartTableComponent } from './Pages/cart/cart-table/cart-table.component';
import { CartComponent } from './Pages/cart/cart.component';
import { CheckoutComponent } from './Pages/checkout/checkout.component';
import { PaymentComponent } from './Pages/checkout/payment/payment.component';
import { ContactComponent } from './Pages/contact/contact.component';
import { DetailsComponent } from './Pages/details/details.component';
import { HomeComponent } from './Pages/home/home.component';
import { ShopComponent } from './Pages/shop/shop.component';
import { AuthguardService } from './services/authguard/authguard.service';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthguardService]
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'shop',
    component: ShopComponent
  },
  {
    path: 'detail',
    component: DetailsComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'cartTable',
    component: CartTableComponent
  },
  {
    path: 'shopDetails/:id',
    component: DetailsComponent
  },
  {
    path: 'loginForm',
    component: LoginFormComponent
  },
  {
    path: 'signInForm',
    component: SignInFormComponent
  }
];

@NgModule({
  imports: [BrowserModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
