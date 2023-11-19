import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetItemsService } from 'src/app/services/getItems/get-items.service';

@Component({
  selector: 'app-detail-carousel',
  templateUrl: './detail-carousel.component.html',
  styleUrls: ['./detail-carousel.component.css']
})
export class DetailCarouselComponent implements OnInit {
  product: any = [];
  id!: number | null
  productList: any

  constructor(private service: GetItemsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get("id"));
    this.service.getProductsToView(this.id).subscribe(res => {
      this.product = res
    })
    this.getAllProducts(this.id);
  }

  addProduct(obj: any) {   //  add to cart
    this.service.postProduct(obj).subscribe(res => {
    })
    this.router.navigateByUrl('/cartTable')
  }

  getAllProducts(id: Number) {
    this.service.getProductsById(id).subscribe(res => {
      this.productList = res
    })
  }
}
