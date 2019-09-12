import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { LoginComponentComponent } from 'src/app/login-component/login-component.component';
import { PatientComponent } from './patient/patient.component';
import { AdminComponent } from './admin/admin.component';
import { RecipedetailComponent } from './recipedetail/recipedetail.component';
import { MealkitproviderComponent } from './mealkitprovider/mealkitprovider.component';
import { ReadytoeatComponent } from './readytoeat/readytoeat.component';
import { BillinginfoComponent } from './billinginfo/billinginfo.component';
import { ScheduleinfoComponent } from './scheduleinfo/scheduleinfo.component';
import { AddressinfoComponent } from './addressinfo/addressinfo.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RouterModule } from '@angular/router';
import { NewuserComponent } from './newuser/newuser.component';
import { PatientforyouComponent } from './patientforyou/patientforyou.component';
import { RecipeindetailComponent } from './recipeindetail/recipeindetail.component';
import { PatientorderinfoComponent } from './patientorderinfo/patientorderinfo.component';
import { AccordionComponent } from './shared/accordion/accordion.component';
import { ReportsComponent } from './reports/reports.component';
import { DxPivotGridModule, DxPivotGridComponent, DxChartModule, DxChartComponent, DxPieChartModule } from 'devextreme-angular';

@NgModule({
  declarations: [
    AppComponent,
    PatientComponent,
    AdminComponent,
    RecipedetailComponent,
    MealkitproviderComponent,
    ReadytoeatComponent,
    BillinginfoComponent,
    ScheduleinfoComponent,
    AddressinfoComponent,
    RecipesComponent,
    LoginComponentComponent,
    NewuserComponent,
    PatientforyouComponent,
    RecipeindetailComponent,
    PatientorderinfoComponent,
    AccordionComponent,
    ReportsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    DxPivotGridModule,
    DxChartModule,
    DxPieChartModule,
    RouterModule.forRoot([
      { path: 'Home', component: PatientComponent },
      { path: '', component: LoginComponentComponent },
      { path: 'register', component: NewuserComponent },
      { path: 'PatientForYouTab', component: PatientforyouComponent },
      { path: 'AllRecipes', component: RecipesComponent },
      { path: 'mealkit/:recipeid', component: MealkitproviderComponent },
      { path: 'order/:recipeid', component: ReadytoeatComponent },
      { path: 'recipe/:recipeid', component: RecipeindetailComponent },
      { path: 'patientorders', component: PatientorderinfoComponent },
      { path: 'reports', component: ReportsComponent }
      //{ path: 'searchtext', component: ScheduleinfoComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
