import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GetItemsService } from 'src/app/services/getItems/get-items.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart-table',
  templateUrl: './cart-table.component.html',
  styleUrls: ['./cart-table.component.css']
})

export class CartTableComponent implements OnInit {
  quantityCheck: any;
  showProducts: any;
  quantity: number = 1;
  totalAmount: number = 1;
  sum: number = 0;
  shippingPercent: number = 0;
  id: any
  sizes: any
  sizesForm!: FormGroup;
  size:any

  constructor(private service: GetItemsService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.sizesForm = this.formBuilder.group({
      size: ['', [Validators.required]]
    })
    this.getProd();
    this.totalAdd();
  }

  getProd() {
    this.service.showProd().subscribe(res => {
      this.showProducts = res;
      console.log(this.showProducts);
    })
  }

  increase(product: any) {
    product.quantity++
    this.service.totalAmount(product).subscribe()
    this.getProd();
    this.totalAdd();
  }

  totalAdd() {
    this.service.showProd().subscribe(res => {
      // debugger
      this.sum = 0;
      this.showProducts = res;
      for (let el of this.showProducts) {
        this.sum += el.price * el.quantity
      }
      this.shippingPercent = 0.03 * this.sum;
    })
  }

  decrease(product: any) {
    product.quantity--
    this.service.totalAmount(product).subscribe()
    this.getProd();
    this.id = product.id
    this.totalSub();
  }

  totalSub() {
    this.service.showProd().subscribe(res => {
      this.showProducts = res;
      for (let el of this.showProducts) {
        if (el.id == this.id) {
          this.sum -= el.price * el.quantity
          break
        }
      }
      this.shippingPercent = 0.03 * this.sum;
    })
  }

  deleteProd(id: number) {
    this.service.deleteProd(id).subscribe(res => {
      this.getProd();
      this.totalAdd();
    })
  }

  goToCheckout() {
    if (this.sum == 0) {
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: 'Please select sizes',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#D19C97'
      })
    } else {
      this.router.navigateByUrl('/checkout');
    }
  }


  selectSize(){
    console.log(this.size);
    
  }

}