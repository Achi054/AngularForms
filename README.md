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
  | State                 | Class is True | Class is False  | Property            |
  | --------------------- |:-------------:|:---------------:|--------------------:|
  | Control visited       | ng-touched    | ng-untouched    |  touched/untouched  |
  | Control value changed | ng-dirty      | ng-prestine     |  dirty/prestine     |
  | Control value invalid | ng-valid      | ng-invalid      |  valid/invalid      |


  ```
  <form #userForm="ngForm">
    <div class="form-group">
      <label>Name</label>
      <input type="text" class="form-control" name='name' #name='ngModel' required [class.is-invalid]='name.invalid && name.touched' [(ngModel)]='userModel.name' />
    </div>
    <div class="form-group">
      <label>Email</label>
      <input type="email" class="form-control" name='email' #email='ngModel' required [class.is-invalid]='email.invalid && email.touched' [(ngModel)]='userModel.email' />
    </div>
    <div class="form-group">
      <label>Phone</label>
      <input type="tel" class="form-control" name='phone' #phone='ngModel' required pattern='^\d{10}$' [class.is-invalid]='phone.invalid && phone.touched' [(ngModel)]='userModel.phone' />
    </div>
    <button class="btn btn-primary" [disabled]='userForm.form.invalid' type="submit">Submit</button>
  </form>
  ```


