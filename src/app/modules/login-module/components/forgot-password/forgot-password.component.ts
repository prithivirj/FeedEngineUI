import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public email: FormControl;

  constructor() {
    
  }

  ngOnInit() {
    this.email = new FormControl('', [Validators.required]);
    console.log('email',this.email)
  }

}
