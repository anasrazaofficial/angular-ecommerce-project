import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetItemsService } from 'src/app/services/getItems/get-items.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  showDescrition: boolean = true
  showInformation: boolean = false
  showReview: boolean = false
  product: any = [];
  id!: number | null
  productList: any

  constructor(private route: ActivatedRoute, private service: GetItemsService) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get("id"));
    this.service.getProductsToView(this.id).subscribe(res => {
      this.product = res
    })
    this.getAllProducts(this.id);
  }

  getAllProducts(id: Number) {
    this.service.getProductsById(id).subscribe(res => {
      this.productList = res
    })
  }

  showDescritionMethod() {
    this.showDescrition = true
    this.showInformation = false
    this.showReview = false
  }

  showInformationMethod() {
    this.showDescrition = false
    this.showInformation = true
    this.showReview = false
  }

  showReviewMethod() {
    this.showDescrition = false
    this.showInformation = false
    this.showReview = true
  }
}
