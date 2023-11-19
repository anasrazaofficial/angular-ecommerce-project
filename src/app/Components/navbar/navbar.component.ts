import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router) { }


  home() {
    this.router.navigateByUrl('/home');
  }
  shop() {
    this.router.navigateByUrl('/shop');
  }
  detail() {
    this.router.navigateByUrl('/detail')
  }
  contact() {
    this.router.navigateByUrl('/contact');
  }
  cart() {
    this.router.navigateByUrl('/cart');
  }
  checkout() {
    this.router.navigateByUrl('/checkout');
  }
  goToLoginForm() {
    this.router.navigateByUrl('/loginForm')
  }
  goToSignInForm() {
    this.router.navigateByUrl('/signInForm')
  }
}
