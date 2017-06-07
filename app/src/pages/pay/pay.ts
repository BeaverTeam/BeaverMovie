import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HistoryPage } from '../history/history';

import { TheaterService } from '../../providers/theater/theater.service';

@Component({
  selector: 'page-pay',
  templateUrl: 'pay.html',
})
export class PayPage {
  cost: number;
  pay: string = "alipay";
  orderId: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public theaterService: TheaterService) {
    this.cost = navParams.get('cost');
    this.orderId = navParams.get('orderId');
  }

  gotoHistory() {
    this.theaterService.makePayment(this.orderId).subscribe((data) => {
      if (data.state == 'success') {
        this.navCtrl.popToRoot();
        this.navCtrl.push(HistoryPage, {tickets: "type2"});
      }
    });
  }

}
