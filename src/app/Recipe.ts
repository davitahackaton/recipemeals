import { DecimalPipe } from '@angular/common';

export interface Recipe {
    recipename: string;
    diettypes: Array<string>,
    ingredients: Array<string>,
    nutrients: Array<string>,
    imageurl: string,
    portions: string,
    preparation: Array<string>,
    servingsize: string,
    keywords: Array<string>,
    price: number
}

export interface RecipeId extends Recipe {
    id: string;
}

export interface LoginDetails {
    username: string;
    password: string;
    accounttype: string;
    email: string;
    firstname: string;
    lastname: string;
}

export class MonthOrdersData {
    ordercount: number;
    monthName: string;
}

export class RecipeCountData {
    recipeName: string;
    count: number;
}

export class OrderTypeData {
    orderType: string;
    count: number;
}

export class OrderDetails {
    recipeid: string;
    email: string;
    schedule: string;
    billingaddress:
        {
            address1: string,
            address2: string,
            city: string,
            state: string,
            zipcode: number
        };
    shippingaddress:
        {
            address1: string,
            address2: string,
            city: string,
            state: string,
            zipcode: number
        };
    creditcardnumber: number;
    creditcardexpiry: string;
    creditcardname: string;
    creditcardcvv: number;
    orderdate: Date;
    recipename: string;
    recipeimageurl: string;
    orderamount: number;
    ordertype: string;
}