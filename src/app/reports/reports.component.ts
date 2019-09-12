import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';
import { MonthOrdersData, RecipeCountData, OrderTypeData, OrderDetails } from '../Recipe';
import { groupBy, mergeMap, toArray, count } from 'rxjs/operators';
import { from, Observable } from 'rxjs';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  CurrntMonth: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  monthOrdersData: Array<MonthOrdersData>;
  monthRecipeData: Array<RecipeCountData>;
  orderTypeData: Array<OrderTypeData>;
  reportTypes = ["Select", "Monthly Wise Orders", "Recipe Wise Orders", "Meal Type Orders"];
  reportShow: string;
  constructor(private patientService: PatientService) { }

  ngOnInit() {
    this.monthOrdersData = this.patientService.getMonthlyOrdersData();
    this.monthRecipeData = this.patientService.getMonthlyRecipesData();
    this.orderTypeData = this.patientService.getOrderTypeMonthlyData();
  }

  onChange($event) {
    this.reportShow = $event.target.value;
  }
}
