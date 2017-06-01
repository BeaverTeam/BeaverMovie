import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TheaterService } from '../../providers/theater/theater.service';

@Component({
  selector: 'page-buy-ticket',
  templateUrl: 'buy-ticket.html',
})
export class BuyTicketPage {
  title: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public theaterService: TheaterService) {
    console.log(this.navParams.get('movieId'), this.navParams.get('movieTitle'));
    this.title = this.navParams.get('movieTitle');
  }

}
