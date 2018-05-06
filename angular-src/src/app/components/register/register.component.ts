import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  name: String;
  username: String
  email: String;
  password: String;

  constructor(private validateService: ValidateService, private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }

    if (!this.validateService.validateRegister(user)) {
      // console.log('validateregister');
      this.flashMessage.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 30000 });
      return false;
    }

    if (!this.validateService.validateEmail(user.email)) {
      // console.log('validateemail');
      this.flashMessage.show('Please use a valid email', { cssClass: 'alert-danger', timeout: 30000 });
      return false;
    }
  }
}
