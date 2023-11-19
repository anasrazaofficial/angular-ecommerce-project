import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetItemsService {

  _url = environment.jsonUrl

  constructor(private http: HttpClient) { }

  search(findKeyword: any) {
    let url = `${this._url}/product?name_like=${findKeyword}`;
    return this.http.get(url);
  }

  private find = new BehaviorSubject('');        //input
  find$ = this.find.asObservable();           //output(send)

  interactionForSearch(data: any) {
    this.find.next(data);
  }

  //methods of home start
  getProducts() {
    let url = `${this._url}/product`;
    return this.http.get(url);
  }

  getSidebar() {
    let url = `${this._url}/sideBar`;
    return this.http.get(url);
  }

  getCarousel() {
    let url = `${this._url}/carousel`;
    return this.http.get(url);
  }

  getCategories() {
    let url = `${this._url}/categories`;
    return this.http.get(url);
  }

  getVendor() {
    let url = `${this._url}/vendor`;
    return this.http.get(url);
  }
  //methods of home end






  //methods of product-card start
  postProduct(obj: any) {
    let url = `${this._url}/cartProduct`;
    return this.http.post(url, obj)
  }
  //methods of product-card end






  //methods of cart start
  showProd() {
    let url = `${this._url}/cartProduct`;
    return this.http.get(url);
  }

  totalAmount(obj: any): Observable<any> {
    let url = `${this._url}/cartProduct/${obj.id}`;
    return this.http.put(url, obj);
  }

  deleteProd(id: number) {
    let url = `${this._url}/cartProduct/${id}`;
    return this.http.delete(url);
  }

  sum(sum: number) {
    let url = `${this._url}/total`;
    return this.http.post(url, sum)
  }

  putSizes(id: number, obj: any) {
    let url = `${this._url}/cartProduct/${id}`;
    return this.http.put(url, obj)
  }
  //methods of cart end





  //methods of sidebar start
  private update = new BehaviorSubject('');        //input
  update$ = this.update.asObservable();           //output(send)
  sortedProds(data: any) {
    this.update.next(data);
  }

  private allProdsFromsideBar = new BehaviorSubject('');
  allProdsFromsideBar$ = this.allProdsFromsideBar.asObservable();
  allProdsFromsideBarMethod(data: any) {
    this.allProdsFromsideBar.next(data);
  }

  getShirts(value: any) {
    let url = `${this._url}/product?category_like=${value}`
    return this.http.get(url)
  }
  //methods of sidebar end






  //methods of shop start

  getPrice() {
    let url = `${this._url}/pricesOfShop`
    return this.http.get(url)
  }

  getPriceByFilter(value: any) {
    let url = `${this._url}/product?range_like=${value}`;
    return this.http.get(url)
  }

  private filterByPrice = new BehaviorSubject('');        //input
  filterByPrice$ = this.filterByPrice.asObservable();     //output(send)
  componentInteractForPrice(data: any) {
    this.filterByPrice.next(data);
  }

  getColour() {
    let url = `${this._url}/coloursOfShop`
    return this.http.get(url)
  }

  getColourByFilter(value: any) {
    let url = `${this._url}/product?colour_like=${value}`;
    return this.http.get(url)
  }

  private filterByColour = new BehaviorSubject('');        //input
  filterByColour$ = this.filterByColour.asObservable();     //output(send)
  componentInteractForColour(data: any) {
    this.filterByColour.next(data);
  }
  //methods of shop end










  //methods of details start
  getProductsToView(id: Number) {
    let url = `${this._url}/product/${id}`
    return this.http.get(url)
  }
  getProductsById(id: Number) {
    let url = `${this._url}/product/${id}`;
    return this.http.get(url);
  }
  //methods of details end











  //methods of checkout start
  postFormAndCheckout(obj: any) {
    let url = `${this._url}/orderPlaced`;
    return this.http.post(url, obj);
  }
  deleteAllPrices(id: any) {
    let url = `${this._url}/cartProduct/${id}`
    return this.http.delete(url, id);
  }
  getUser(id: any) {                                   //getting user to put Coupon Code
    let url = `${this._url}/users/${id}`
    return this.http.get(url)
  }
  updateUserObject(obj: any, id: any) {               // posting coupon code after everything
    debugger
    let url = `${this._url}/users/${id}`
    return this.http.put(url, obj)
  }
  deleteCouponCode(id: number) {                      // deleting coupon code while shopping
    let url = `${this._url}/couponCodeArray/${id}`;
    return this.http.delete(url);
  }
  getUsers() {                                        // getting all users
    let url = `${this._url}/users`;
    return this.http.get(url);
  }
  //methods of checkout end


  //Sign up start
  newUser(obj: any) {
    let url = `${this._url}/users`
    return this.http.post(url, obj)
  }
  //Sign up end









  //Sign up start
  signIn(obj: any) {
    let url = `${this._url}/currentUser`
    return this.http.post(url, obj)
  }
  getCurrentUser() {
    let url = `${this._url}/currentUser`
    return this.http.get(url)
  }
  updateCurrentUser(id: any, obj: any) {
    debugger
    let url = `${this._url}/currentUser/${id}`
    return this.http.put(url, obj)
  }
  //Sign up end
}