import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-pay',
  templateUrl: 'pay.html',
})
export class PayPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(navParams.get('cost'));
  }

}
