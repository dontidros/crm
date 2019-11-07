import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/customer'
import { CustomersService } from 'src/app/services/customers.service';
import * as _ from 'lodash';
import { FlashMessagesService } from 'angular2-flash-messages'

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  [x: string]: any;

  headerTitle: string
  headerIcon: string
  customers: Customer[]
  customersCache: Customer[]
  firstName: string
  lastName: string
  phone: string

  constructor(private customersService: CustomersService,
    private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    document.title = 'COMPANY CRM | Customers Page';
    this.headerTitle = 'Customers'
    this.headerIcon = 'fa fa-user'


    //customersList is the argument on subscribe method that contains all customers data from DB 
    //customersCache will keep the entire customers list
    this.customersService.getCustomers().subscribe(customersList => this.customers = this.customersCache = customersList)

  }


  showOnHover(event) {
    event.target.children[0].children[0].style.cssText = 'visibility: visible !important'
  }
  hideOnLeave(event) {
    event.target.children[0].children[0].style.cssText = 'visibility: hidden !important'
  }

  onDeleteCustomer(customerId: string, event: any) {
    //event.preventDefault - do not refresh the page (the herf attribute refreshes the page)
    event.preventDefault();

    if (confirm('Are you sure that you want to delete this customer?')) {
      //using flash message show method
      this.flashMessagesService.show('Customer Deleted', {
        cssClass: 'fixed-top m-auto bg-success w-50 text-white text-center',
        timeout: 3000
      })
      this.customersService.deleteCustomer(customerId);
    }
  }
  // this[field] will return the current value of firstName or lastName or phone
  onSearch(field: string) {
    //if the field is phone I can not use the method toLowerCase because its all digits
    //(maybe I can but just in case...)
    if (field !== 'phone') {
      let searchField = this[field].toLowerCase().trim();
      if (searchField.length > 0) {
        //data is an object of Customer. data[field] can be data.firstName or data.lastName 
        //_.include returns boolean
        this.customers = this.customersCache.filter(data => _.includes(data[field].toLowerCase().trim(), searchField))
      } else {
        this.customers = this.customersCache
      }
    } else {
      let searchField = this[field];
      if (searchField.length > 0) {
        this.customers = this.customersCache.filter(data => _.includes(data[field], searchField))
      } else {
        this.customers = this.customersCache
      }
    }


  }

}

