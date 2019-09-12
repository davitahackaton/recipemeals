import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scheduleinfo',
  templateUrl: './scheduleinfo.component.html',
  styleUrls: ['./scheduleinfo.component.css']
})
export class ScheduleinfoComponent implements OnInit {

  constructor(private recipeService: RecipeService,
    private router: Router) { }
  searchText: string;
  recipesforsearch: any;
  @Output() myEvent = new EventEmitter();
  ngOnInit() {
  }

  getRecipeDetailsBySearchText(formContent) {
    this.myEvent.emit(null);
    this.recipesforsearch = this.recipeService.getRecipeDetailsByRecipeName(
      formContent.value.searchText, 100);
    this.router.navigate(['/searchtext']);
  }

}
