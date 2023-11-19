import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GetItemsService } from 'src/app/services/getItems/get-items.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  myForm!: FormGroup;
  couponForm!: FormGroup;

  showProducts: any;
  sum: number = 0;
  shippingPercent: number = 0;
  orderArray: any
  myDate: Date = new Date();
  randomCode: any
  usersArray: any = [];
  userToPostCode: any;
  total: number = 0;
  discountedPrice: number = 0;
  couponCodeIdToDelete: any;
  currentUser: any = [];

  constructor(private service: GetItemsService, private formbuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.myForm = this.formbuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobileNo: ['', [Validators.required]],
      address: ['', [Validators.required]],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],
      paymentMethod: ['']
    })
    this.couponForm = this.formbuilder.group({
      code: ['', [Validators.required]]
    })
    this.values();
    this.getAllUsers();
    this.getCurrentUser();
  }

  orderConfirmed(form: FormGroup) {
    let object = {
      email: form.value.email,
      mobileNo: form.value.mobileNo,
    }
    // this.discount();
    this.generateCouponCode(5);
    this.getCurrentUser();
    let flag = true
    for (let i = 0; i < this.currentUser.length; i++) {
      debugger
      if (form.value.email == this.currentUser[i].email && form.value.mobileNo == this.currentUser[i].mobileNo) {
        let obj = {
          email: form.value.email,
          mobileNo: form.value.mobileNo,
          couponCode: this.randomCode
        }
        this.service.updateCurrentUser(this.currentUser[i].id, obj).subscribe(res => { })   //putting coupon code
        flag = false
        Swal.fire({
          title: 'Coupon Code',
          icon: 'info',
          text: 'Your coupon code is ' + this.randomCode,
          confirmButtonText: 'Ok',
          confirmButtonColor: '#D19C97'
        })
        const total = this.sum + this.shippingPercent;
        let orderDetails = {
          obj: object,
          Subtotal: this.sum,
          shippingPrice: this.shippingPercent,
          total: total,
          date: this.myDate
        }
        this.service.postFormAndCheckout(orderDetails).subscribe(res => { });
        for (let i = 0; i < this.showProducts.length; i++) {
          this.service.deleteAllPrices(this.showProducts[i].id).subscribe()
        }
        break;
      } else {
        flag = true
      }
    }
    if (flag) {
      Swal.fire({
        title: 'No user found',
        text: 'Sign in or Sign up to a new account',
        showCancelButton: true,
        confirmButtonText: 'Sign In',
        cancelButtonText: 'Sign up',
        confirmButtonColor: '#D19C97',
        cancelButtonColor: '#D19C97'
      }).then((result) => {
        if (result.value) {
          this.router.navigateByUrl('/signInForm')
        } else {
          this.router.navigateByUrl('/loginForm')
        }
      })
    }
    this.myForm.reset();
    this.values();
  }

  values() {                    //making prices zero after deletion
    this.service.showProd().subscribe(res => {
      this.sum = 0;
      this.showProducts = res;
      for (let el of this.showProducts) {
        this.sum += el.price * el.quantity
      }
      this.shippingPercent = 0.03 * this.sum;
      this.total = this.shippingPercent + this.sum
    })
  }



  discount(form: FormGroup) {
    this.service.showProd().subscribe(res => {
      this.sum = 0;
      this.showProducts = res;
      for (let el of this.showProducts) {
        this.sum += el.price * el.quantity
      }
      this.shippingPercent = 0.03 * this.sum;
      this.total = this.shippingPercent + this.sum
      this.getCurrentUser();
      Swal.fire({
        title: 'Are you sure?',
        text: 'If you enter the coupon code, you will never get that code again!',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Enter',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#D19C97',
        cancelButtonColor: '#D19C97'
      }).then((result) => {
        if (result.value) {
          if (this.currentUser.length > 0) {
            for (let i = 0; i < this.currentUser.length; i++) {
              if (form.value.code == this.currentUser[i].couponCode) {
                this.discountedPrice = 0.1 * this.sum
                this.total -= this.discountedPrice;
                let obj = {
                  email: this.usersArray[i].email,
                  mobileNo: this.usersArray[i].mobileNo
                }
                this.service.updateUserObject(this.usersArray[i].id, obj).subscribe()
                // }

                break
              } else {
                Swal.fire({
                  title: 'Error 404',
                  text: 'You do not this coupon code',
                  icon: 'error',
                  confirmButtonText: 'OK',
                  confirmButtonColor: '#D19C97'
                })
              }
            }
            form.reset()
          } else {
            Swal.fire({
              title: 'Error',
              text: 'Sign in or Sign up to a new account',
              showCancelButton: true,
              icon: 'error',
              confirmButtonText: 'Sign In',
              cancelButtonText: 'Sign up',
              confirmButtonColor: '#D19C97',
              cancelButtonColor: '#D19C97'
            }).then((result) => {
              if (result.value) {
                this.router.navigateByUrl('/signInForm')
              } else {
                this.router.navigateByUrl('/loginForm')
              }
            })
            form.reset()
          }
        }
      })

    })
  }

  generateCouponCode(length: any) {
    this.randomCode = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      this.randomCode += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter++;
    }
  }

  getAllUsers() {                             //getting all users
    this.service.getUsers().subscribe(res => {
      this.usersArray = res;
      // console.log(this.usersArray);
    })
  }
  getCurrentUser() {
    this.service.getCurrentUser().subscribe(res => {
      this.currentUser = res
      console.log(this.currentUser);
    })
  }



  abc(form: FormGroup) {
    debugger
    console.log(form.value.code);
  }
}