import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginData: FormGroup

  constructor(
    private readonly authService : AuthService
  ) {
    this.loginData = new FormGroup({
      email : new FormControl("", [Validators.required, Validators.email]),
      password : new FormControl("", [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit(){
    this.authService.login(this.loginData.value);
  }


}
