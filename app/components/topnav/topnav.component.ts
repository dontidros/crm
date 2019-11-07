import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {


  @Input() userEmail: string
  @Input() isLoggedIn: boolean

  constructor(private authService: AuthService, private router: Router) { }


  ngOnInit() {

  }

  onLogout(event: any) {
    //do not refresh the page
    event.preventDefault();

    this.authService.logout();

    //this will change isLoggedIn variable on the app component to false
    //because it will reload index.html once again
    //and it will operate once again it's ngOnInit method that checks 
    //with auth service whether the user is logged in or not 
    window.location.reload();
  }

}
