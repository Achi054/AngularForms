# Angular forms

- Template driven forms
  Heavy on form templates

- Reactive forms
  Heavy on model class

# Template driven forms

- Easy to use as in AngularJS
- Two way data binding ngModel
- Bulky HTML and minimal component code
- Form event is handled in
- Unit testing is a challenge
- Suitable for simple scenarios

In the below example I have used `Template Reference` to get `ngForm` directive and `userForm.value` gives the object reference.

```
<form #userForm="ngForm">
    {{userForm.value | json}}
    <div class="form-group">
      <label>Name</label>
      <input type="text" class="form-control" name="userName" ngModel />
    </div>
    <div>
      <div class="form-group">
        <label>Street</label>
        <input type="text" class="form-control" name="street" ngModel>
      </div>
      <div class="form-group">
        <label>City</label>
        <input type="text" class="form-control" name="city" ngModel>
      </div>
    </div>
    <div class="form-group">
      <label>Topics</label>
      <select class="custom-select" name="topic" ngModel>
        <option selected value="Please Select"></option>
        <option *ngFor="let topic of topics">{{topic}}</option>
      </select>
    </div>
    <div class="mb-3">
      <label>Time Preference</label>
      <div class="form-check">
        <input type="radio" class="form-check-input" name="timePreference" value="morning" />
        <label class="form-check-label">Morning (9-12)</label>
      </div>
      <div class="form-check">
        <input type="radio" class="form-check-input" name="timePreference" value="evening" />
        <label class="form-check-label">Evening (17-20)</label>
      </div>
    </div>
    <div class="mb-3 form-check">
      <input type="checkbox" class="form-check-input" name="subscribe" ngModel />
      <label for="" class="form-check-label">
        Send me promotional offers
      </label>
    </div>
    <button class="btn btn-primary" type="submit">Submit</button>
  </form>
</div>
```

## Binding model to template

```
<form #userForm="ngForm">
  {{userForm.value | json}}
  <hr>
  {{userModel | json}}
  <div class="form-group">
    <label>Name</label>
    <input type="text" class="form-control" name="userName" [(ngModel)]='userModel.name' />
  </div>
  <div class="form-group">
    <label>Email</label>
    <input type="email" class="form-control" name="email" [(ngModel)]='userModel.email' />
  </div>
  <div class="form-group">
    <label>Phone</label>
    <input type="tel" class="form-control" name="phone" [(ngModel)]='userModel.phone' />
  </div>
  <div class="form-group">
    <label>Topics</label>
    <select class="custom-select" name="topic" [(ngModel)]='userModel.topic'>
      <option value=''></option>
      <option *ngFor="let topic of topics">{{topic}}</option>
    </select>
  </div>
  <div class="mb-3">
    <label>Time Preference</label>
    <div class="form-check">
      <input type="radio" class="form-check-input" name="timePreference" value="morning" [(ngModel)]='userModel.timePreference' />
      <label class="form-check-label">Morning (9-12)</label>
    </div>
    <div class="form-check">
      <input type="radio" class="form-check-input" name="timePreference" value="evening" [(ngModel)]='userModel.timePreference' />
      <label class="form-check-label">Evening (17-20)</label>
    </div>
  </div>
  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" name="subscribe" [(ngModel)]='userModel.subscribe' />
    <label for="" class="form-check-label">
      Send me promotional offers
    </label>
  </div>
  <button class="btn btn-primary" type="submit">Submit</button>
</form>
```

## Form validation

Tracking control state and validity
| State | Class is True | Class is False | Property |
| --------------------- |:-------------:|:---------------:|--------------------:|
| Control visited | ng-touched | ng-untouched | touched/untouched |
| Control value changed | ng-dirty | ng-prestine | dirty/prestine |
| Control value invalid | ng-valid | ng-invalid | valid/invalid |

```
<form #userForm="ngForm">
  <div class="form-group">
    <label>Name</label>
    <input type="text" class="form-control" name='name' #name='ngModel' required
      [class.is-invalid]='name.invalid && name.touched' [(ngModel)]='userModel.name' />
    <small class="text-danger" [class.d-none]="name.valid || name.touched">Name is required</small>
  </div>
  <div class="form-group">
    <label>Email</label>
    <input type="email" class="form-control" name='email' #email='ngModel' required
      [class.is-invalid]='email.invalid && email.touched' [(ngModel)]='userModel.email' />
    <small class="text-danger" [class.d-none]="email.valid || email.touched">Email is required</small>
  </div>
  <div class="form-group">
    <label>Phone</label>
    <input type="tel" class="form-control" name='phone' #phone='ngModel' required pattern='^\d{10}$'
      [class.is-invalid]='phone.invalid && phone.touched' [(ngModel)]='userModel.phone' />
    <div *ngIf="phone.errors && (phone.invalid || phone.touched)">
      <small class="text-danger" *ngIf="phone.errors.required">Phone number is required</small>
      <small class="text-danger" *ngIf="phone.errors.pattern">Phone number should be 10 digits</small>
    </div>
  </div>
  <button class="btn btn-primary" type="submit">Submit</button>
</form>
```

## Custom validation

```
HTML:
<div class="form-group">
  <label>Topics</label>
  <select class="custom-select" name="topic" [(ngModel)]='userModel.topic' required #topic='ngModel'
    [class.is-invalid]='topicError && topic.touched' (blur)="validateTopic(topic.value)"
    (change)="validateTopic(topic.value)">
    <option value='default'>Please select your topic</option>
    <option *ngFor="let topic of topics">{{topic}}</option>
  </select>
  <small class="text-danger" [class.d-none]='!topicError || topic.untouched'>Topic is required</small>
</div>

Component:
topicError = false;
validateTopic(value: string) {
  this.topicError = value === 'default' ? true : false;
}
```

## Submitting form data

```
HTML:
<form #userForm="ngForm" novalidate (ngSubmit)='onSubmit()'>
  <div class="form-group">
    <label>Name</label>
    <input type="text" class="form-control" name='name' #name='ngModel' required
      [class.is-invalid]='name.invalid && name.touched' [(ngModel)]='userModel.name' />
    <small class="text-danger" [class.d-none]="name.valid || name.touched">Name is required</small>
  </div>
  <div class="form-group">
    <label>Email</label>
    <input type="email" class="form-control" name='email' #email='ngModel' required
      [class.is-invalid]='email.invalid && email.touched' [(ngModel)]='userModel.email' />
    <small class="text-danger" [class.d-none]="email.valid || email.touched">Email is required</small>
  </div>
  <div class="form-group">
    <label>Phone</label>
    <input type="tel" class="form-control" name='phone' #phone='ngModel' required pattern='^\d{10}$'
      [class.is-invalid]='phone.invalid && phone.touched' [(ngModel)]='userModel.phone' />
    <div *ngIf="phone.errors && (phone.invalid || phone.touched)">
      <small class="text-danger" *ngIf="phone.errors.required">Phone number is required</small>
      <small class="text-danger" *ngIf="phone.errors.pattern">Phone number should be 10 digits</small>
    </div>
  </div>
  <button class="btn btn-primary" type="submit">Submit</button>
</form>

Component:
onSubmit() {
    this.enrollment
      .enroll(this.userModel)
      .subscribe(
        data => console.log(data),
        error => console.error('Service error:', error)
      );
  }

Service:
Create a service 'UserEnrollment'

export class UserEnrollmentService {
  url = '';

  constructor(private http: HttpClient) {}

  enroll(user: User) {
    return this.http.post(this.url, user);
  }
}
```

## Handling form data on server

For this we will be using node `Express server` with `body-parser` and `cors`

- Initialize nuget package
  ```
  npm init --yes
  ```
- Download `express`, `body-parser` and `cors`
  ```
  npm install --save-dev express cors body-parser
  ```
- Create a new `js` file add the below snippet

  ```
  const express = require('express');
  const cors = require('cors');
  const bodyparser = require('body-parser');

  const PORT = 3000;
  const app = express();

  app.use(cors());
  app.use(bodyparser.json);

  app.post('/enrollment', function (req, res) {
      console.log(req.body);
      res.status(200).send({
          'message': 'Data recieved'
      });
  });

  app.listen(PORT, function () {
      console.log(`Server has started at port ${PORT}`);
  });
  ```

- Update `UserEnrollmentService` `url` to point
  ```
  url = 'http://localhost:3000/enrollment';
  ```

## Error Handling

- Throw error from `enrollment.js post method`
  ```
  app.post('/enrollment', function (req, res) {
      console.log(req.body);
      res.status(401).send({
          'message': 'Data recieved'
      });
  });
  ```
- Catch the error in the `UserEnrollmentService`

  ```
  enroll(user: User) {
    return this.http.post(this.url, user).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
  ```

  import `catchError` from `rxjs/operator` and `throwError` from `rxjs`

- Handle error from component

  ```
  errorMessage = '';

  onSubmit() {
    this.submitted = true;
    this.enrollment
      .enroll(this.userModel)
      .subscribe(
        data => console.log(data),
        error => (this.errorMessage = error.statusText)
      );
  }
  ```

- Show error message in UI
  ```
  <div class="alert alert-danger" *ngIf='errorMessage'>{{errorMessage}}</div>
  ```
  Add above the `form` tag

# Reactive forms

- Code and logic reside in the component class
- No two way binding
- Well compplex scenarios (Dynamic form feilds)
- Custom form validation
- Dynamic validation
- Unit test

## Component template and model binding

```
HTML:
<form [formGroup]="registrationForm">
  <div class="form-group">
    <label>User Name</label>
    <input type="text" formControlName="userName" class="form-control" />
  </div>
  <div formGroupName="address">
    <div class="form-group">
      <label>Country</label>
      <input type="text" formControlName="country" class="form-control" />
    </div>
    <div class="form-group">
      <label>Country Code</label>
      <input type="text" formControlName="countryCode" class="form-control" />
    </div>
  </div>
  <div class="form-group">
    <label>Password</label>
    <input type="password" formControlName="password" class="form-control" />
  </div>
  <div class="form-group">
    <label>Confirm Password</label>
    <input type="password" formControlName="confirmPassword" class="form-control" />
  </div>
  <button class="btn btn-primary" type="submit">Register</button>
  {{registrationForm.value | json}}
</form>

Model:
registrationForm = this.fb.group({
    userName: [''],
    address: this.fb.group({
      country: [''],
      countryCode: ['']
    }),
    password: [''],
    confirmPassword: ['']
  });
```

Import `FormBuilder` from `@angular/forms`

# Bind control values

```
HTML:
<button class="m-1 btn btn-primary" type="submit">Register</button>
<button class="m-1 btn btn-dark" type="button" (click)='loadData()'>Load Data</button>
<button class="m-1 btn btn-dark" type="button" (click)='loadPartialData()'>Load Partial Data</button>

Component:
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
```

`setValue` sets values for all the property in the model, `patchValue` sets value for subset properties

# Simple validation

```
HTML:
<div class="form-group">
  <label>User Name</label>
  <input type="text" [class.is-invalid]='userName.invalid && userName.touched' formControlName="userName"
    class="form-control" />
  <div *ngIf='userName.valid || userName.touched'>
    <small class="text-danger" *ngIf="!!userName.errors?.required">User name is required</small>
    <small class="text-danger" *ngIf="!!userName.errors?.minlength">User name should be atleast 3 characters</small>
  </div>
</div>

Component:
registrationForm = this.fb.group({
  userName: ['', [Validators.required, Validators.minLength(3)]],
  address: this.fb.group({
    country: [''],
    countryCode: ['']
  }),
  password: [''],
  confirmPassword: ['']
});
```

Import `Validator` from `@angular/forms`

## Custom validator
  ```
  Create file text.validator.ts

  export function forbiddenTextValidator(expression: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const forbiddenText = expression.test(control.value);
      return forbiddenText ? { 'forbiddenValue': { value: control.value }} : null;
    };
  }

  Component:
  registrationForm = this.fb.group({
    userName: ['', [Validators.required, Validators.minLength(3), forbiddenTextValidator(/password/)]],
    address: this.fb.group({
      country: [''],
      countryCode: ['']
    }),
    password: [''],
    confirmPassword: ['']
  });

  HTML:
  <form [formGroup]="registrationForm">
    <div class="form-group">
      <label>User Name</label>
      <input type="text" [class.is-invalid]='userName.invalid && userName.touched' formControlName="userName"
        class="form-control" />
      <div *ngIf='userName.valid || userName.touched'>
        <small class="text-danger" *ngIf="!!userName.errors?.required">User name is required</small>
        <small class="text-danger" *ngIf="!!userName.errors?.minlength">User name should be atleast 3 characters</small>
        <small class="text-danger" *ngIf="!!userName.errors?.forbiddenValue">Cannot use name {{userName.errors?.forbiddenValue.value}}</small>
      </div>
    </div>
  </form>
  ```
  Import `AbstractControl` & `ValidatorFn` from `@angular/forms`;

## Cross field validation
  ```
  Create file passwordMatch.validator.ts

  export function passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password.pristine || confirmPassword.pristine) {
      return null;
    }

    return (password && confirmPassword && password.value !== confirmPassword.value)
      ? { 'misMatch': true } : null;
  }

  Component:
  registrationForm = this.fb.group({
    userName: ['', [Validators.required, Validators.minLength(3), forbiddenTextValidator(/password/)]],
    address: this.fb.group({
      country: [''],
      countryCode: ['']
    }),
    password: [''],
    confirmPassword: ['']
  }, { validator: passwordMatchValidator });

  HTML:
  <div class="form-group">
    <label>Confirm Password</label>
    <input type="password" [class.is-invalid]='!!password.errors?.misMatch' formControlName="confirmPassword" class="form-control" />
    <small class="text-danger" *ngIf="!!password.errors?.misMatch">Password does not match</small>
  </div>
  ```

## Conditional validation

  ```
  HTML:
  <div class="form-group">
    <label>Email</label>
    <input type="email" [class.is-invalid]='email.invalid && email.touched' formControlName="email" class="form-control" />
    <small class="text-danger" [class.d-none]="email.valid || email.untouched">Email is missing</small>
  </div>
  <div class="form-group mb-3">
    <input type="checkbox" formControlName="subscribe" class="form-check-input">
    <label class="form-check-label">Send promotional email</label>
  </div>

  Component:
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
  ```