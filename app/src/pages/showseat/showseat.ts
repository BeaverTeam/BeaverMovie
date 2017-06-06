import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TheaterService } from '../../providers/theater/theater.service';

@Component({
  selector: 'page-showseat',
  templateUrl: 'showseat.html',
})
export class ShowseatPage {
  showtime: any;
  seatsInfo = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [-1, -1, 1, 1, 1, 1],
    [-1, -1, 1, 1, 1, 1],
    [-1, -1, 1, 1, 0, 0],
    [0, 0, 0, 1, 0, 0]
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private theaterService: TheaterService) {
    this.showtime = navParams.get('showtime');
    let temp = this.showtime.startTime.split(' ');
    this.showtime.startTime = temp[0] + ' ' + temp[1];
    // 请求座位信息
    theaterService.getSeats(this.showtime.id);
  }

}
