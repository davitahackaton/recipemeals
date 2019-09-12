import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import { Recipe } from './Recipe';

@Injectable({
  providedIn: 'root'
})

export class RecipeService {

  recipesCollection: AngularFirestoreCollection<Recipe>;
  recipesDocument: AngularFirestoreDocument<Recipe>;

  constructor(private afs: AngularFirestore) {

  }

  ngOnInit() {
    this.getAllRecipeDetails(100);
  }

  getRecipeDetailsByRecipeName(recipeName: string, numberOfRecords: number) {
    this.recipesCollection = this.afs.collection('recipes', ref =>
      ref.where('keywords', "array-contains", recipeName).limit(numberOfRecords));

    return this.recipesCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Recipe;
          const id = a.payload.doc.id;
          return { id, data };
        })
      }))
  }

  getRecipeDetailsByDietType(dietType: string, numberOfRecords: number) {
    this.recipesCollection = this.afs.collection('recipes', ref => ref.where("diettypes", "array-contains", dietType)
      .limit(numberOfRecords));

    return this.recipesCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Recipe;
          const id = a.payload.doc.id;
          return { id, data };
        })
      }))
  }

  getAllRecipeDetails(numberOfRecords: number) {
    this.recipesCollection = this.afs.collection('recipes', ref => ref.limit(numberOfRecords));

    return this.recipesCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Recipe;
          const id = a.payload.doc.id;
          return { id, data };
        })
      }))
  }

  getMoreDetails(recipeId: string) {
    this.recipesDocument = this.afs.doc('recipes/' + recipeId);
    return this.recipesDocument.valueChanges();
  }
}
