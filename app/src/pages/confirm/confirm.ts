import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-confirm',
  templateUrl: 'confirm.html',
})
export class ConfirmPage {
  showtime: any;
  selectedSeats: any = [];
  selectedPositions: any = [];
  seatsIndices = [
    [0, 1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10, 11],
    [-1, -1, 12, 13, 14, 15],
    [-1, -1, 16, 17, 18, 19],
    [-1, -1, 20, 21, 22, 23],
    [24, 25, 26, 27, 28, 29]
  ];
  cost: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // 获取场次信息
    this.showtime = navParams.get('showtime');
    let temp = this.showtime.startTime.split(' ');
    this.showtime.startTime = temp[0] + ' ' + temp[1];
    // 获取座位信息
    this.selectedSeats = navParams.get('selectedSeats');
    for (let seat of this.selectedSeats) {
      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
          if (this.seatsIndices[i][j] == seat) {
            let newPosition = [i, j];
            this.selectedPositions.push(newPosition);
          }
        }
      }
    }
    this.cost = this.showtime.cost * this.selectedSeats.length;
  }

}
