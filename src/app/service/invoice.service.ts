import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../model/customer';
import { Tax } from '../model/tax';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http : HttpClient) { }

  Getallcustomers(){
    return this.http.get<Customer[]>("http://localhost:3000/customer")
  }

  Getcustomer(customerid:string){
    return this.http.get<Customer>("http://localhost:3000/customer/"+customerid)
  }

  Getalltax(){
    return this.http.get<Tax[]>("http://localhost:3000/tax")
  }

  Gettax(taxcode:string){
    return this.http.get<Tax>("http://localhost:3000/tax/"+taxcode)
  }

  Getallproducts(){
    return this.http.get<Product[]>("http://localhost:3000/product")
  }

  Getproduct(productcode:string){
    return this.http.get<Product>("http://localhost:3000/product/"+productcode)
  }
}
