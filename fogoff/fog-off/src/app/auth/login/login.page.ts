import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login(form: NgForm) {
    
    console.log(form.value);

    this.authService.login(form.value).subscribe((res) => {

      console.log("Login Auth "  + res);
      
      form.resetForm();
      this.router.navigateByUrl('tabs/tabs/tab1', { state: {user_status: res}});

    }), (error) => {
      console.log("Login Error " + error);
      alert("Error. Please try again")
    };
  }

}
