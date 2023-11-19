import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GetItemsService } from 'src/app/services/getItems/get-items.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  sideBar: any = [];
  sortedProds: any = [];
  selectedItem: any;
  allProducts: any;


  constructor(private service: GetItemsService, private scroller: ViewportScroller) { }

  ngOnInit(): void {
    this.service.getSidebar().subscribe(res => {
      this.sideBar = res
    })

  }


  getProdByCategory(category: String, i: any) {
    this.selectedItem = i
    this.service.getShirts(category).subscribe(res => {
      this.sortedProds = res;
      this.service.sortedProds(this.sortedProds)
    })
    this.scroller.scrollToAnchor("targetRed");
  }

  getAllProds() {
    this.service.getProducts().subscribe(res => {
      this.allProducts = res;
      this.service.allProdsFromsideBarMethod(this.allProducts)
    })
    this.selectedItem = null
    this.scroller.scrollToAnchor("targetRed");
  }
}