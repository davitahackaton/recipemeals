import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/recipe.service';
import { Observable } from 'rxjs';
import { Recipe } from '../Recipe';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  recipes: any;
  recipe: Observable<Recipe>;
  
  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.getAllRecipeDetails();
  }

  getAllRecipeDetails()
  {
    this.recipes = this.recipeService.getAllRecipeDetails(100);
  }

  getRecipeAdditionalDetails(recipeId: string)
  {
    this.recipe = this.recipeService.getMoreDetails(recipeId);
  }
}
