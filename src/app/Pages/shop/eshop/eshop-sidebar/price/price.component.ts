import { Component, OnInit } from '@angular/core';
import { GetItemsService } from 'src/app/services/getItems/get-items.service';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})
export class PriceComponent implements OnInit {

  pricesArray: any;
  productsByFilter: any;
  selectedItem: any;

  constructor(private service: GetItemsService) { }

  ngOnInit(): void {
    this.getAllProds()
  }
  getAllProds() {
    this.service.getPrice().subscribe(res => {
      this.pricesArray = res
    })
  }

  getPriceByFilter(price: any, i: any) {
    this.selectedItem = i
    this.service.getPriceByFilter(price).subscribe(res => {
      debugger
      this.productsByFilter = res
      this.service.componentInteractForPrice(this.productsByFilter);
    })
  }
}