import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerData : FormGroup

  constructor(
    private readonly authService : AuthService
  ){ 
    this.registerData = new FormGroup({
      email : new FormControl("", [Validators.required, Validators.email]), 
      firstName : new FormControl("", [Validators.required]), 
      lastName : new FormControl("", [Validators.required]),
      password : new FormControl("", [Validators.required, Validators.minLength(6)]) 
    })
  }

  onSubmit() {
    if (this.registerData.valid) {
      this.authService.register(this.registerData.value);
    }
  }

}
