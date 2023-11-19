import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { GetItemsService } from 'src/app/services/getItems/get-items.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input()
  productList: any;
  showProduct: any;
  product: any;
  getCartProducts: any;
  cart: Boolean = true;
  selectedItem: any;
  count: any = []

  constructor(private router: Router, private service: GetItemsService) { }

  addProduct(obj: any, index: any) {
    this.selectedItem = index;
    this.count.push(this.selectedItem)

    //  add to cart
    this.service.postProduct(obj).subscribe(res => {
      this.showProduct = res;
    })
    this.getProd();
  }

  goToCart() {
    this.router.navigateByUrl('/cart');
  }


  getProd() {
    this.service.showProd().subscribe(res => {
      this.getCartProducts = res;
      // console.log(this.getCartProducts);
    })
  }
}
