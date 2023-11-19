import { Component, OnInit } from '@angular/core';
import { GetItemsService } from 'src/app/services/getItems/get-items.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  product: any = []
  productName: String = "Product";
  serachedProducts: any = [];
  category: any
  categoryFound: boolean = false
  allCategory: boolean = true

  constructor(private service: GetItemsService) { }


  ngOnInit(): void {
    this.service.getProducts().subscribe(res => {
      this.product = res
    })
    this.service.update$.subscribe(res => {               //products form sidebar category
      this.product = res;
      for (let i = 0; i < this.product.length; i++) {
        this.category = this.product[i].category
        this.categoryFound = true
        this.allCategory = false
      }
    })
    this.service.allProdsFromsideBar$.subscribe(res => {  //all products form sidebar category
      this.product = res
      this.allCategory = true
      this.categoryFound = false
    })
    this.service.find$.subscribe(res => {
      this.product = res;
    })
    this.service.filterByPrice$.subscribe(res => {
      this.product = res;
    })
    this.service.filterByColour$.subscribe(res => {
      this.product = res;
    })
  }

  serach(findKeyword: any) {
    this.service.search(findKeyword.value).subscribe(res => {
      this.serachedProducts = res;
      if (this.serachedProducts.length == 0) {
        alert("There are no such products");
      } else {
        this.service.interactionForSearch(this.serachedProducts);
      }
    })
  }
}