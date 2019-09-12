import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { LoginService } from '../login.service';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-patientorderinfo',
  templateUrl: './patientorderinfo.component.html',
  styleUrls: ['./patientorderinfo.component.css']
})
export class PatientorderinfoComponent implements OnInit {

  user: firebase.User;
  constructor(private loginService: LoginService,
    private patientService: PatientService) { }
  orderDetails: any;
  ngOnInit() {
    this.loginService.getUserState().subscribe(
      data =>
        this.user = data
    );
  }

  getPatientOrderDetails() {
    this.orderDetails = this.patientService.getPatientOrderDetails(this.user.email);
  }
}
