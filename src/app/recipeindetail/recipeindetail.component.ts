import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../Recipe';
import { Observable } from 'rxjs';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-recipeindetail',
  templateUrl: './recipeindetail.component.html',
  styleUrls: ['./recipeindetail.component.css']
})
export class RecipeindetailComponent implements OnInit {

  @Input() recipeId: string;
  recipeIdData: string;
  recipeData: Recipe;
  
  constructor(private recipeService: RecipeService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.getRecipeAdditionalDetails();
  }

  getRecipeAdditionalDetails()
  {
    this.recipeIdData = this.route.snapshot.paramMap.get('recipeid');
    this.recipeService.getMoreDetails(this.recipeIdData).subscribe(data => this.recipeData = data);    
  }

}
