import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { CustomersService } from 'src/app/services/customers.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages'


@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {

  headerTitle: string;
  headerIcon: string;
  id: string;
  customer: Customer = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    notes: ''
  }

  constructor(private customersService: CustomersService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    document.title = 'COMPANY CRM | Edit Customer Page'
    this.headerTitle = 'Edit Customer Form'
    this.headerIcon = 'fa fa-pencil'
    this.id = this.activatedRoute.snapshot.params['id']

    this.customersService.getCustomer(this.id).subscribe(oneCustomer =>
      this.customer = oneCustomer)
  }

  onSubmit({ value, valid }: { value: Customer, valid: boolean }) {
    if (valid) {
      //using flash message show method
      this.flashMessagesService.show('Customer Updated', {
        cssClass: 'fixed-top m-auto bg-success w-50 text-white text-center',
        timeout: 3000
      })
      value.id = this.id
      this.customersService.updateCustomer(value);
      this.router.navigate(['/customers'])
    }
  }

}
