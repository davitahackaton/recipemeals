import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../Recipe';
import { RecipeService } from '../recipe.service';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  searchText: string;
  recipesforsearch: any;
  recipeDe: Observable<Recipe>;
  user: firebase.User;

  constructor(private recipeService: RecipeService,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginService.getUserState().subscribe(
      data =>
        this.user = data
    );

    console.log(this.user);
  }

  getRecipeDetailsBySearchText(formContent) {
    this.recipesforsearch = this.recipeService.getRecipeDetailsByRecipeName(formContent.value.searchText, 100);
    this.router.navigate(['/searchtext']);
  }

  getRecipeAdditionalDetails(recipeId: string) {
    this.recipeDe = this.recipeService.getMoreDetails(recipeId);
  }

  logout() {
    this.loginService.logout();
  }



}
