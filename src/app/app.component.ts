import { Component } from '@angular/core';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  topics = ['Angular', 'React', 'Vue'];

  userModel = new User('Mike', 'Mike@test.com', 987654321, '', 'morning', true);
}
