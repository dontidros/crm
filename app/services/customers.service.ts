import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Customer } from '../models/customer';


@Injectable({
  providedIn: 'root'
})
//a complete example of CRUD with Shlomi's briliant code
//(all get methods returns observables that update in real time)
export class CustomersService {


  customersCollection: AngularFirestoreCollection<Customer>
  customerDoc: AngularFirestoreDocument<Customer>
  customers: Observable<Customer[]>
  customer: Observable<Customer>;

  constructor(private angularFirestore: AngularFirestore) {
    this.customersCollection = this.angularFirestore.collection('customers', ref => {
      return ref.orderBy('lastName', 'asc')
    })
  }

  //gets all customers and thier id
  getCustomers(): Observable<Customer[]> {
    this.customers = this.customersCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Customer;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
    return this.customers;
  }

  //adds one customer
  addCustomer(customer: Customer) {
    this.customersCollection.add(customer)
  }

  //gets one customer by id
  getCustomer(id: string): Observable<Customer> {
    this.customerDoc = this.angularFirestore.doc<Customer>(`customers/${id}`);
    this.customer = this.customerDoc.snapshotChanges().pipe(
      map(action => {
        if (action.payload.exists === false) {
          return null
        } else {
          const data = action.payload.data() as Customer;
          data.id = action.payload.id
          return data
        }
      })
    )
    return this.customer
  }

  //updates one customer
  updateCustomer(customer: Customer) {
    this.customerDoc = this.angularFirestore.doc(`customers/${customer.id}`);
    this.customerDoc.update(customer);
  }

  //deletes one customer
  deleteCustomer(customerId: string) {
    this.customerDoc = this.angularFirestore.doc(`customers/${customerId}`);
    this.customerDoc.delete();
  }

}
