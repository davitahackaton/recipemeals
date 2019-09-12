import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

interface Recipe{
  recipename: string;
  DietTypes: Array<string>  
}

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesCollection : AngularFirestoreCollection<Recipe>;
  recipes: Observable<Recipe[]>;
  constructor(private afs: AngularFirestore) {
   }

   getRecipes()
   {
     this.recipesCollection = this.afs.collection('recipes');
     this.recipes = this.recipesCollection.valueChanges();
     return this.recipes;
   }
}
