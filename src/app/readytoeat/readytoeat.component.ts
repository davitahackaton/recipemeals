import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Recipe, OrderDetails } from '../Recipe';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute } from '@angular/router';
import { tap, distinctUntilChanged, switchMap, startWith } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { LoginService } from '../login.service';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-readytoeat',
  templateUrl: './readytoeat.component.html',
  styleUrls: ['./readytoeat.component.css']
})
export class ReadytoeatComponent implements OnInit {
  user: firebase.User;
  frequency = ['Daily', 'Weekly'];
  showDays: boolean = false;
  weekDays = [{ day: 'Sun', selected: false }, { day: 'Mon', selected: false }, { day: 'Tue', selected: false },
  { day: 'Wed', selected: false }, { day: 'Thu', selected: false }, { day: 'Fri', selected: false }, { day: 'Sat', selected: false }];
  selectedValue: string;
  selectedDaysString: string;
  successMessage: boolean;
  states = ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM',
    'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA',
    'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV',
    'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW',
    'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA',
    'WA', 'WV', 'WI', 'WY', 'AE', 'AA', 'AP'];
  public isSameAddressControl: FormControl = new FormControl(false);
  saveMealKitDetails;
  orderDetail: OrderDetails;
  recipeData: Recipe;
  constructor(private recipeService: RecipeService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private patientService: PatientService) {

    this.loginService.getUserState().subscribe(
      data =>
        this.user = data
    );

    this.saveMealKitDetails = this.formBuilder.group({
      orderFrequency: this.formBuilder.group({
        frequency: [''],
        days: this.buildWeekDays()
      }),
      shippingAddressInfo: this.formBuilder.group({
        addressLine1: ['', Validators.required],
        addressLine2: [''],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zipCode: ['', Validators.required]
      }),
      billingAddressInfo: this.formBuilder.group({
        addressLine1: ['', Validators.required],
        addressLine2: [''],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zipCode: ['', Validators.required]
      }),
      creditCardInfo: this.formBuilder.group({
        nameOnTheCard: ['', Validators.required],
        ccNumber: ['', Validators.required],
        expiryDate: ['', Validators.required],
        cvv: ['', Validators.required]
      })
    });
  }

  get weekDaysControls(): FormArray {
    return this.saveMealKitDetails.get('orderFrequency').get('days') as FormArray;
  };

  onCheck(controls) {
    const formValue = Object.assign({}, controls, {
      days: controls.map((selected, i) => {
        return {
          day: this.weekDays[i].day,
          selected
        }
      })
    });
    var selectedDays = formValue.days.filter(k => k.selected.value);
    if (selectedDays.length > 0) {
      this.selectedDaysString = 'Every: ';
      var counter = 0;
      if (selectedDays.length == 7) {
        this.selectedDaysString = 'Every Day';
      }
      else {
        selectedDays.forEach(element => {
          if (counter > 0) {
            this.selectedDaysString += ", ";
          }
          this.selectedDaysString += element.day;
          counter++;
        });
      }
    }
    else {
      this.selectedDaysString = '';
    }
  }

  onChange(event: any) {
    if (event.target.value == '1: Weekly') {
      this.showDays = true;
      console.log(this.showDays);
    }
    else {
      this.showDays = false;
      this.selectedDaysString = '';
      this.weekDays.forEach(k => { k.selected = false });
    }
  }

  buildWeekDays() {
    const arr = this.weekDays.map(day => {
      return this.formBuilder.control(day.selected);
    });
    return this.formBuilder.array(arr);
  }

  recipeIdData: string;

  ngOnInit() {

    this.getRecipeAdditionalDetails();

    this.isSameAddressControl
      .valueChanges
      .pipe(
        distinctUntilChanged(),
        switchMap(isSameAddress => {
          if (isSameAddress) {
            return this.saveMealKitDetails
              .get('shippingAddressInfo')
              .valueChanges
              .pipe(
                // at the beginning fill the form with the current values
                startWith(this.saveMealKitDetails.get('shippingAddressInfo').value),
                tap(value =>
                  // every time the sending address changes, update the billing address 
                  this.saveMealKitDetails
                    .get('billingAddressInfo')
                    .setValue(value)
                )
              )
          } else {
            this.saveMealKitDetails
              .get('billingAddressInfo')
              .reset();

            return EMPTY;
          }
        })
        // don't forget to unsubscribe when component's destroyed
      )
      .subscribe();
  }

  getRecipeAdditionalDetails() {
    this.recipeIdData = this.route.snapshot.paramMap.get('recipeid');
    this.recipeService.getMoreDetails(this.recipeIdData).subscribe(data => this.recipeData = data);
  }

  onSubmit(formContentValue) {
    var recipeid = this.route.snapshot.paramMap.get('recipeid');

    var selectedFrequency = formContentValue.orderFrequency.frequency;
    var schedule;
    if (selectedFrequency == "Weekly") {
      schedule = this.selectedDaysString;
    }
    else {
      schedule = selectedFrequency;
    }

    this.recipeService.getMoreDetails(recipeid).subscribe(data => this.recipeData = data);
    this.orderDetail =
      {
        recipeid: recipeid,
        email: this.user.email,
        schedule: schedule,
        creditcardname: formContentValue.creditCardInfo.nameOnTheCard,
        creditcardnumber: formContentValue.creditCardInfo.ccNumber,
        creditcardexpiry: formContentValue.creditCardInfo.expiryDate,
        creditcardcvv: formContentValue.creditCardInfo.cvv,
        shippingaddress:
        {
          address1: formContentValue.shippingAddressInfo.addressLine1,
          address2: formContentValue.shippingAddressInfo.addressLine2,
          city: formContentValue.shippingAddressInfo.city,
          state: this.saveMealKitDetails.get('shippingAddressInfo').get('state').value,
          zipcode: formContentValue.shippingAddressInfo.zipCode,
        },
        billingaddress:
        {
          address1: formContentValue.billingAddressInfo.addressLine1,
          address2: formContentValue.billingAddressInfo.addressLine2,
          city: formContentValue.billingAddressInfo.city,
          state: this.saveMealKitDetails.get('billingAddressInfo').get('state').value,
          zipcode: formContentValue.billingAddressInfo.zipCode,
        },

        orderdate: new Date(),
        orderamount: this.recipeData.price,
        recipename: this.recipeData.recipename,
        recipeimageurl: this.recipeData.imageurl,
        ordertype: "Ready To Eat"
      }

    this.patientService.saveOrderDetail(this.orderDetail);
    this.successMessage = true;
  }
}