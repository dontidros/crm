import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/customer';
import { CustomersService } from 'src/app/services/customers.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages'


@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {

  //no use for all of this but it prevents errors becuase of the mixed up ngModel declarations at
  //the view (the mixed up ngModel declerations helps on customer-details and edit-customer components)
  firstName: string = ''
  lastName: string = ''
  phone: string = ''
  email: string = ''

  address: string = ''
  notes: string = ''

  headerTitle: string
  headerIcon: string

  constructor(private customersService: CustomersService,
    private router: Router,
    private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    document.title = 'COMPANY CRM | Add Customer Form'
    this.headerTitle = 'Add Customer Form'
    this.headerIcon = 'fa fa-plus-circle'
  }
  //{value, valid} - these are the properties I need from the #customerForm object
  onSubmit({ value, valid }: { value: Customer, valid: boolean }) {
    if (valid) {
      //using flash message show method
      this.flashMessagesService.show('Customer Saved', {
        cssClass: 'fixed-top m-auto bg-success w-50 text-white text-center',
        timeout: 3000
      })
      this.customersService.addCustomer(value);
      // redirect in angular
      this.router.navigate(['/customers'])

    }
  }

}
