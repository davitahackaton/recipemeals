import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login.service';
import { LoginDetails } from '../Recipe';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {

  newLoginDetail: LoginDetails;
  authError:any;
  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.eventAuthError$.subscribe(data =>
      this.authError = data
    );
  }

  validateUserDetails(formContent)
  {    
    this.loginService.validateUserDetails(formContent);
  }   
  
  resetDetails(formContent)
  {
    formContent.reset();
  }
}
