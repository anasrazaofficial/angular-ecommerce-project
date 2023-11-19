import { Component, OnInit } from '@angular/core';
import { GetItemsService } from 'src/app/services/getItems/get-items.service';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {

  vendor: any;

  constructor(private service: GetItemsService) { }
  ngOnInit(): void {
    this.service.getVendor().subscribe(res => {
      this.vendor = res;
    })
  }

}
