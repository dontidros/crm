import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact';
import { ContactsService } from 'src/app/services/contacts.service';
import * as _ from 'lodash'

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  constructor(private contactsService: ContactsService) { }

  contacts: Contact[] = []
  contactsCache = []
  searchNameText: string

  headerTitle: string
  headerIcon: string


  ngOnInit() {
    document.title = 'COMPANY CRM | Contacts Page'
    this.contactsService.getContacts().subscribe((data: Contact[]) => {
      this.contacts = data;
      this.contactsCache = this.contacts = _.sortBy(this.contacts, ['name'])

    })
    this.headerTitle = 'Contacts'
    this.headerIcon = 'fa fa-envelope'
  }

  onKeyupSearch() {
    const searchText = this.searchNameText.toLowerCase().trim()
    if (searchText.length > 0) {
      this.contacts = this.contactsCache.filter((contact) => {
        return _.includes(contact.name.toLowerCase(), searchText)
      })
    } else {
      this.contacts = this.contactsCache
    }

  }


}
