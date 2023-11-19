import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GetItemsService } from 'src/app/services/getItems/get-items.service';
import Swal from "sweetalert2"

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.css']
})
export class SignInFormComponent implements OnInit {

  myForm!: FormGroup
  newUserArr: any = []
  usersArray: any;
  newUser: boolean = true
  currentUser: any = []
  updateUserObj: any
  updateUserId: number = 0;
  constructor(private formbuilder: FormBuilder, private service: GetItemsService, private router: Router) { }

  ngOnInit(): void {
    this.myForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      mobileNo: ['', [Validators.required]]
    })
    this.getAllUsers();
    this.getCurrentUser()
  }

  signIn() {
    debugger
    this.getAllUsers()
    this.getCurrentUser()
    for (let i = 0; i < this.usersArray.length; i++) {
      if (this.currentUser.length == 0) {
        if (this.myForm.value.email == this.usersArray[i].email && this.myForm.value.mobileNo == this.usersArray[i].mobileNo) {
          this.service.signIn(this.usersArray[i]).subscribe()
          this.newUser = false
          Swal.fire({
            title: 'Signed in successfully',
            icon: 'success',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#D19C97'
          }).then((result) => {
            if (result.value) {
              this.router.navigateByUrl('/checkout')
            }
          })
          break
        } else {
          this.newUser = true
        }
      } else if (this.currentUser.length == 1) {
        for (let i = 0; i < this.usersArray.length; i++) {
          for (let j = 0; j < this.currentUser.length; j++) {
            if (this.currentUser[j].email == this.usersArray[i].email) {
              this.updateUserId = this.usersArray[i].id
            }
          }
        }
        this.service.updateUserObject(this.currentUser[0], this.updateUserId).subscribe(res => {
          debugger
          console.log(res);
        })

        let obj = {
          email: this.myForm.value.email,
          mobileNo: this.myForm.value.mobileNo
        }
        for (let i = 0; i < this.usersArray.length; i++) {
          if (this.myForm.value.email == this.usersArray[i].email && this.myForm.value.mobileNo == this.usersArray[i].mobileNo) {
            this.service.updateCurrentUser(1, this.usersArray[i]).subscribe()
            Swal.fire({
              title: 'Signed in successfully',
              icon: 'success',
              confirmButtonText: 'Ok',
              confirmButtonColor: '#D19C97'
            }).then((result) => {
              if (result.value) {
                this.router.navigateByUrl('/checkout')
              }
            })
          }
        }
        this.newUser = false
        break
      }
    }
    if (this.newUser) {
      Swal.fire({
        title: 'Error',
        text: 'No user found',
        icon: 'error',
        confirmButtonText: 'Sign up',
        confirmButtonColor: '#D19C97'
      }).then((result) => {
        if (result.value) {
          this.router.navigateByUrl('/loginForm')
        }
      })
    }
    this.newUser = true
    this.myForm.reset()
  }

  getAllUsers() {                             //getting all users
    this.service.getUsers().subscribe(res => {
      this.usersArray = res;
    })
  }

  getCurrentUser() {
    this.service.getCurrentUser().subscribe(res => {
      this.currentUser = res
    })
  }

  goTologinForm() {
    this.router.navigateByUrl('/loginForm')
  }
}