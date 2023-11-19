import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetItemsService } from 'src/app/services/getItems/get-items.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  carouselInp: any;

  constructor(private service: GetItemsService, private router: Router) { }

  ngOnInit(): void {
    this.service.getCarousel().subscribe(res => {
      this.carouselInp = res;
    })
  }

  shop() {
    this.router.navigateByUrl('/shop');
  }

}
