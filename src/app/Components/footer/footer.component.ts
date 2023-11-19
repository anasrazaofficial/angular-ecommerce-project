import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
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
}
