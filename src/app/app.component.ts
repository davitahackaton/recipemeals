import { Component } from '@angular/core';

import { RecipeService } from 'src/app/app.recipe.service';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
interface Recipe{
  recipename: string;
  diettypes: Array<string>,
  ingredients:Array<string>,
  nutrients:Array<string>,
  imageurl:string,
  portions: string,
  preparation:Array<string>,
  servingsize:string  
}

interface RecipeId extends Recipe
{
  id: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'davita-hackaton';

  recipesCollection : AngularFirestoreCollection<Recipe>;
  recipes: any;

  recipesDocument : AngularFirestoreDocument<Recipe>;
  recipe: Observable<Recipe>;
  
  constructor(private recipeService: RecipeService,
    private afs: AngularFirestore)
  {    
  }

  ngOnInit()
  {
    this.recipesCollection = this.afs.collection('recipes');
    this.recipes = this.recipesCollection.snapshotChanges().pipe(
    map(actions => {
      return actions.map( a=> {
        const data = a.payload.doc.data() as Recipe;
        const id = a.payload.doc.id;
        return {id, data};
      })      
    }))
  }

  getMoreDetails(recipeId: string)
  {
    this.recipesDocument = this.afs.doc('recipes/' + recipeId);
    this.recipe = this.recipesDocument.valueChanges();
  }

}
