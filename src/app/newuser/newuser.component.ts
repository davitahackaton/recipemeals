import { Component, OnInit } from '@angular/core';
import { LoginDetails } from '../Recipe';
import { LoginService } from'../login.service';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css']
})
export class NewuserComponent implements OnInit {

  
  firebaseuser: firebase.User;

  constructor(private loginService: LoginService) { }
  authError:any;
  ngOnInit() {  
    this.loginService.getUserState().subscribe(
      user=>
      this.firebaseuser = user
    )

    this.loginService.eventAuthError$.subscribe(data =>
      this.authError = data
    );
  }

  CreateUser(formContent)
  { 
    this.loginService.createUser(formContent.value.firstname, formContent.value.lastname, 
      formContent.value.username, formContent.value.email, formContent.value.password );      
  }  
}
