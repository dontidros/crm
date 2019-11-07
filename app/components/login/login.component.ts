import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = ''
  password: string = ''

  constructor(private authService: AuthService,
    private flashMessagesService: FlashMessagesService,
    private router: Router) { }

  //if the user is already logged in go to home page
  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.router.navigate(['/'])
      }
    })
  }

  onSubmit({ value, valid }: { value: any, valid: boolean }) {
    if (valid) {
      this.authService.login(value.email, value.password)
        .then(resolve => {
          this.flashMessagesService.show('Welcome', {
            cssClass: 'fixed-top m-auto bg-success w-50 text-white text-center',
            timeout: 3000
          })
          this.router.navigate(['/']);
        })
        .catch(err => {
          this.flashMessagesService.show(err.message, {
            cssClass: 'fixed-top m-auto bg-danger w-50 text-white text-center',
            timeout: 3000
          })
        });
    }
  }

}
