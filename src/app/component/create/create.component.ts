import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InvoiceService } from '../../service/invoice.service';
import { Customer } from '../../model/customer';
import { Tax } from '../../model/tax';
import { Product } from '../../model/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit, OnDestroy {

  title: string = "Create Invoice"
  invoiceform!: FormGroup
  customerlist:Customer[]=[]
  taxlist:Tax[]=[]
  productlist:Product[]=[]
  subscription=new Subscription()
  invoiceproducts!:FormArray<any>


  constructor(private builder: FormBuilder, private router: Router,private service :InvoiceService) {

  }
  ngOnDestroy(): void {
        this.subscription.unsubscribe();
  }

get invproducts(){
  return this.invoiceform.get("products") as FormArray;
}

  ngOnInit(): void {
    this.invoiceform = this.builder.group({
      invoiceno: this.builder.control({ value: '', disabled: true }),
      invoicedate: this.builder.control(new Date(), Validators.required),
      customerid: this.builder.control('', Validators.required),
      customername: this.builder.control(''),
      taxcode: this.builder.control(''),
      address: this.builder.control(''),
      total: this.builder.control(''),
      tax: this.builder.control(''),
      nettotal: this.builder.control(0),
      products: this.builder.array([])
    })

        this.Loadcustomer();
        this.Loadtax();
  }

  SaveInvoice() {

  };

  Loadcustomer(){
    let sub1 =this.service.Getallcustomers().subscribe(item=>{
      this.customerlist=item;
    })
    this.subscription.add(sub1);
  }

  Loadtax(){
    let sub1 =this.service.Getalltax().subscribe(item=>{
      this.taxlist=item;
    })
    this.subscription.add(sub1);
  }

  Customerchange(customerid:string){
   let sub = this.service.Getcustomer(customerid).subscribe(item=>{
          let _customer=item;
          if(_customer!=null){
            this.invoiceform.controls['address'].setValue(_customer.address);
            this.invoiceform.controls['customername'].setValue(_customer.name);
            this.invoiceform.controls['taxcode'].setValue(_customer.taxcode);
            this.addnewproduct();
          }
    })
    this.subscription.add(sub)
  }

  addnewproduct(){
          this.invoiceproducts=this.invoiceform.get('products') as FormArray;
          this.invoiceproducts.push(this.Generaterow());
  }

  Generaterow(){
    return this.builder.group({
      productid:this.builder.control('',Validators.required),
      name:this.builder.control(''),
        qty:this.builder.control(1),
        price:this.builder.control(0),
        total:this.builder.control({value:0,disabled:true})
      
    })
  }


  backtolist() {
      this.router.navigateByUrl('/invoice');
  };


}
