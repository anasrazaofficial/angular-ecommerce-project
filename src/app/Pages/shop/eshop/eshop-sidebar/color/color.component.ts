import { Component, OnInit } from '@angular/core';
import { GetItemsService } from 'src/app/services/getItems/get-items.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {
  coloursArray: any = [];
  selectedItem: any;
  productsByFilter: any = [];

  constructor(private service: GetItemsService) { }

  ngOnInit(): void {
    this.getAllColours();
  }

  getAllColours() {
    this.service.getColour().subscribe(res => {
      this.coloursArray = res
    })
  }

  getColourByFilter(colour: any, i: any) {
    this.selectedItem = i
    this.service.getColourByFilter(colour).subscribe(res => {
      this.productsByFilter = res
      console.log(this.productsByFilter);
      this.service.componentInteractForColour(this.productsByFilter);
    })
  }
}
