import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/recipe.service';
import { Observable } from 'rxjs';
import { Recipe } from '../Recipe';

@Component({
  selector: 'app-patientforyou',
  templateUrl: './patientforyou.component.html',
  styleUrls: ['./patientforyou.component.css']
})
export class PatientforyouComponent implements OnInit {

  recipesforpatient: any;
  recipeDe: Observable<Recipe>;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
  }

  getAllRecipeDetails(diettype: string)
  {
    console.log(diettype);
    this.recipesforpatient = this.recipeService.getRecipeDetailsByDietType(diettype,100);
  }

  getRecipeAdditionalDetails(recipeId: string)
  {
    this.recipeDe = this.recipeService.getMoreDetails(recipeId);
  }
}
