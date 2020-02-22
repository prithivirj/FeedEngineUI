import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, AbstractControl, FormBuilder, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {

  public userRegisterForm: FormGroup;

  matcher = new MyErrorStateMatcher();

  constructor(public formBuilder:FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  public buildForm() {
    this.userRegisterForm = this.formBuilder.group({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confPassword: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      mobileNumber: new FormControl('', [Validators.required]),
    }, { validator: this.checkPasswords });
  }

  public hasError(controlName: string, errorName: string) {
    return this.userRegisterForm.controls[controlName].hasError(errorName);
  }

  public passwordCheck(errorName: string){
    return this.userRegisterForm.hasError(errorName);
  }

  public checkPasswords(group: FormGroup) { 
    let confirmPass = group.controls.confPassword.value;
    if(confirmPass){
      let pass = group.controls.password.value;
      return pass === confirmPass ? null : { mismatch: true }
    }
  }

}


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}
