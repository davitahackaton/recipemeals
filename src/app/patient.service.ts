import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map, filter, switchMap } from 'rxjs/operators';
import { OrderDetails, MonthOrdersData, RecipeCountData, OrderTypeData } from './Recipe';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  orderCollection: AngularFirestoreCollection<OrderDetails>;
  constructor(private afs: AngularFirestore) {
  }

  ngOnInit() {
    console.log("Patient Service Ivoked");
    this.getOrderTypeMonthlyDataFromDataBase();
  }

  saveOrderDetail(orderDetails: OrderDetails) {
    this.afs.collection('orders').add(orderDetails);
  }

  getMonthlyOrdersData() {
    let data: MonthOrdersData[] = [{
      monthName: "January",
      ordercount: 3
    }, {
      monthName: "February",
      ordercount: 2
    }, {
      monthName: "March",
      ordercount: 3
    }, {
      monthName: "April",
      ordercount: 4
    }, {
      monthName: "May",
      ordercount: 6
    }, {
      monthName: "June",
      ordercount: 11
    }, {
      monthName: "July",
      ordercount: 4
    }, {
      monthName: "August",
      ordercount: 12
    }, {
      monthName: "September",
      ordercount: 25
    }, {
      monthName: "October",
      ordercount: 10
    }, {
      monthName: "November",
      ordercount: 6
    }, {
      monthName: "December",
      ordercount: 7
    }];

    return data;
  }

  getMonthlyRecipesData() {
    let recipeData: RecipeCountData[] = [{
      recipeName: "Apple Cake",
      count: 36
    }, {
      recipeName: "Apple Cinnamon French Toast Strata",
      count: 28
    }, {
      recipeName: "Baked or Grilled Trout",
      count: 3
    }, {
      recipeName: "Cran-Apple Crumble",
      count: 24
    }, {
      recipeName: "Deviled Eggs",
      count: 24
    }, {
      recipeName: "Garlic Mashed Potatoes",
      count: 11
    }, {
      recipeName: "Shrimp Tacos",
      count: 12
    }];

    return recipeData;
  }

  getOrderTypeMonthlyData() {
    let orderTypeData: OrderTypeData[] = [{
      orderType: "Meal Kit",
      count: 356
    }, {
      orderType: "Ready to Eat",
      count: 231
    }];

    return orderTypeData;
  }

  getOrderTypeMonthlyDataFromDataBase() {
    debugger;
    this.afs.collection('orders').get().toPromise().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        console.log(doc.id, " => ", doc.data().ordertype);
      });
    });
  }

  getPatientOrderDetails(emailId: string) {
    this.orderCollection = this.afs.collection('orders', ref => ref.where("email", "==", emailId).orderBy("orderdate", "desc"));
    return this.orderCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as OrderDetails;
          const id = a.payload.doc.id;
          return { id, data };
        })
      }))
  }
}
