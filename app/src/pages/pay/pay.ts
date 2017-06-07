import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HistoryPage } from '../history/history';

@Component({
  selector: 'page-pay',
  templateUrl: 'pay.html',
})
export class PayPage {
  cost: number;
  pay: string = "alipay";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.cost = navParams.get('cost');
  }

  gotoHistory() {
    this.navCtrl.popToRoot();
    this.navCtrl.push(HistoryPage, {tickets: "type2"});
  }

}
