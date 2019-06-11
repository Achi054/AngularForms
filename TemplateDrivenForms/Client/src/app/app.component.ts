import { Component } from '@angular/core';
import { User } from './user';
import { UserEnrollmentService } from './user-enrollment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  topics = ['Angular', 'React', 'Vue'];
  topicError = false;
  submitted = false;
  errorMessage = '';
  userModel = new User(
    'Mike',
    'Mike@test.com',
    9876543210,
    'default',
    'morning',
    true
  );

  constructor(private enrollment: UserEnrollmentService) {}

  validateTopic(value: string) {
    this.topicError = value === 'default' ? true : false;
  }

  onSubmit() {
    this.submitted = true;
    this.enrollment
      .enroll(this.userModel)
      .subscribe(
        data => console.log(data),
        error => (this.errorMessage = error.statusText)
      );
  }
}
