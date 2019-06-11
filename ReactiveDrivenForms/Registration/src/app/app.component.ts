import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { forbiddenTextValidator } from './shared/text.validator';
import { passwordMatchValidator } from './shared/passwordMatch.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  registrationForm: FormGroup;

  get userName() {
    return this.registrationForm.get('userName');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.registrationForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3), forbiddenTextValidator(/password/)]],
      address: this.fb.group({
        country: [''],
        countryCode: ['']
      }),
      email: [''],
      subscribe: [false],
      password: [''],
      confirmPassword: ['']
    }, { validator: passwordMatchValidator });

    this.registrationForm.get('subscribe').valueChanges
      .subscribe(checked => {
        const email = this.registrationForm.get('email');
        if(checked) {
          email.setValidators(Validators.required);
        }
        else{
          email.clearValidators();
        }
        email.updateValueAndValidity();
      });
  }

  loadData() {
    this.registrationForm.setValue({
      userName: 'Sujith',
      password: 'sujith',
      confirmPassword: 'sujith',
      address: {
        country: 'India',
        countryCode: '+91'
      }
    });
  }

  loadPartialData() {
    this.registrationForm.patchValue({
      userName: 'Sujith',
      password: 'sujith',
      confirmPassword: 'sujith'
    });
  }
}
