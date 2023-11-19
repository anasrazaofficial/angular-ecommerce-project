import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { FeaturedComponent } from './Pages/home/featured/featured.component';
import { OfferComponent } from './Pages/home/offer/offer.component';
import { ProductsComponent } from './Pages/home/products/products.component';
import { SubscribeComponent } from './Pages/home/subscribe/subscribe.component';
import { VendorComponent } from './Pages/home/vendor/vendor.component';
import { FooterComponent } from './Components/footer/footer.component';
import { CarouselComponent } from './Pages/home/carousel/carousel.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { ProductCardComponent } from './Components/product-card/product-card.component';
import { HomeComponent } from './Pages/home/home.component';
import { ShopComponent } from './Pages/shop/shop.component';
import { HeaderComponent } from './Pages/shop/header/header.component';
import { EshopComponent } from './Pages/shop/eshop/eshop.component';
import { EshopSidebarComponent } from './Pages/shop/eshop/eshop-sidebar/eshop-sidebar.component';
import { PriceComponent } from './Pages/shop/eshop/eshop-sidebar/price/price.component';
import { ColorComponent } from './Pages/shop/eshop/eshop-sidebar/color/color.component';
import { ContactComponent } from './Pages/contact/contact.component';
import { HeaderContactComponent } from './Pages/contact/header-contact/header-contact.component';
import { ContactUsComponent } from './Pages/contact/contact-us/contact-us.component';
import { DetailsComponent } from './Pages/details/details.component';
import { DetailHeaderComponent } from './Pages/details/detail-header/detail-header.component';
import { DetailCarouselComponent } from './Pages/details/detail-carousel/detail-carousel.component';
import { ReviewComponent } from './Pages/details/review/review.component';
import { CartComponent } from './Pages/cart/cart.component';
import { CartHeaderComponent } from './Pages/cart/cart-header/cart-header.component';
import { CartTableComponent } from './Pages/cart/cart-table/cart-table.component';
import { CheckoutComponent } from './Pages/checkout/checkout.component';
import { CheckoutHeaderComponent } from './Pages/checkout/checkout-header/checkout-header.component';
import { PaymentComponent } from './Pages/checkout/payment/payment.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CarouselItemsComponent } from './Components/carousel-items/carousel-items.component';
import { SpinnerComponent } from './Components/spinner/spinner.component';
import { LoadingInterceptor } from './loading.interceptor';
import { LoginFormComponent } from './Components/login-form/login-form.component';
import { SignInFormComponent } from './components/sign-in-form/sign-in-form.component';

@NgModule({
  declarations: [
    NavbarComponent,
    AppComponent,
    FeaturedComponent,
    OfferComponent,
    ProductsComponent,
    SubscribeComponent,
    VendorComponent,
    FooterComponent,
    CarouselComponent,
    ProductCardComponent,
    HomeComponent,
    ShopComponent,
    HeaderComponent,
    EshopComponent,
    SidebarComponent,
    EshopSidebarComponent,
    PriceComponent,
    ColorComponent,
    ContactComponent,
    HeaderContactComponent,
    ContactUsComponent,
    DetailsComponent,
    DetailHeaderComponent,
    DetailCarouselComponent,
    ReviewComponent,
    CartComponent,
    CartHeaderComponent,
    CartTableComponent,
    CheckoutComponent,
    CheckoutHeaderComponent,
    PaymentComponent,
    CarouselItemsComponent,
    SpinnerComponent,
    LoginFormComponent,
    SignInFormComponent
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
    }
  ],

  bootstrap: [AppComponent],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AppModule { }
