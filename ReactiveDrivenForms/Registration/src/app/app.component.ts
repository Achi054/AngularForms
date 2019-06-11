import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  get userName() {
    return this.registrationForm.get('userName');
  }

  constructor(private fb: FormBuilder) {}

  registrationForm = this.fb.group({
    userName: ['', [Validators.required, Validators.minLength(3)]],
    address: this.fb.group({
      country: [''],
      countryCode: ['']
    }),
    password: [''],
    confirmPassword: ['']
  });

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
