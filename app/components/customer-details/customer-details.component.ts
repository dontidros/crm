import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { CustomersService } from 'src/app/services/customers.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  headerTitle: string;
  headerIcon: string;
  id: string;
  customer: Customer = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    notes: ''
  }


  constructor(private customersService: CustomersService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    document.title = 'COMPANY CRM | Custormer Details'
    this.headerTitle = 'Customer Details'
    this.headerIcon = 'fa fa-user'
    this.id = this.route.snapshot.params['id']

    this.customersService.getCustomer(this.id).subscribe(oneCustomer =>
      this.customer = oneCustomer)

    // I made a mistake on getCustomer method earlier so I found this solution
    //this solution works but it's not a good solution because it's o of n square
    // this.customersService.getCustomers().subscribe((customersList) => {
    //   this.customers = customersList;
    //   for (let customer of this.customers) {
    //     if (customer.id == this.id) {
    //       this.customer = customer
    //     }
    //   }
    // })




  }

}
