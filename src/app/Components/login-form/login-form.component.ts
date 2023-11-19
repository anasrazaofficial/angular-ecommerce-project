import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GetItemsService } from 'src/app/services/getItems/get-items.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  myForm!: FormGroup
  newUserArr: any = []
  usersArray: any;
  newUser: boolean = true
  currentUser: any = []
  updateUserId: any

  constructor(private service: GetItemsService, private formbuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.myForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      mobileNo: ['', [Validators.required]]
    })
    this.getAllUsers();
    this.getCurrentUser()
  }

  signUp() {
    // debugger
    this.newUser = true
    this.getAllUsers()
    for (let i = 0; i < this.usersArray.length; i++) {
      if (this.myForm.value.email == this.usersArray[i].email) {
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: 'Already have this email',
          confirmButtonText: 'OK',
          confirmButtonColor: '#D19C97'
        })
        this.newUser = false
        this.myForm.reset()
        break
      } else if (this.myForm.value.mobileNo == this.usersArray[i].mobileNo) {
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: 'Already have this Mobile number',
          confirmButtonText: 'OK',
          confirmButtonColor: '#D19C97'
        })
        this.newUser = false
        this.myForm.reset()
        break
      }
    }
    if (this.newUser) {
      let form = {
        email: this.myForm.value.email,
        mobileNo: this.myForm.value.mobileNo
      }
      this.service.newUser(form).subscribe(res => { })
      this.newUser = true
      this.myForm.reset()

      //  ------------    yhn sa ign up start h
      this.getCurrentUser()
      if (this.currentUser.length == 0) {
        this.service.signIn(form).subscribe()
        Swal.fire({
          title: 'Logged In',
          text: 'Succesfully made new account',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#D19C97'
        }).then((result) => {
          if (result.value) {
            this.router.navigateByUrl('/checkout')
          }
        })
      } else if (this.currentUser.length == 1) {
        debugger
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
        this.service.updateCurrentUser(1, form).subscribe()
        Swal.fire({
          title: 'Logged In',
          text: 'Succesfully made new account',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#D19C97'
        }).then((result) => {
          if (result.value) {
            this.router.navigateByUrl('/checkout')
          }
        })
      }
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
    })
  }

  goToSignIn() {
    this.router.navigateByUrl('/signInForm')
  }
}