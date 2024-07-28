import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
//object

  model: any = {
    username: '',
    password: ''
  };

//submit method
  onSubmit(form: any) {
    if (form.valid) {
      console.log('Form Submitted!', this.model);
    }
  }
}
