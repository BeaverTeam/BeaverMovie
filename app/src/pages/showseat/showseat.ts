import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

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
    [-1, -1, 0, 0, 0, 0],
    [-1, -1, 0, 0, 0, 0],
    [-1, -1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]
  ];
  seatsIndices = [
    [0, 1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10, 11],
    [-1, -1, 12, 13, 14, 15],
    [-1, -1, 16, 17, 18, 19],
    [-1, -1, 20, 21, 22, 23],
    [24, 25, 26, 27, 28, 29]
  ];
  selectedSeats: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private theaterService: TheaterService, public toastCtrl: ToastController) {
    this.showtime = navParams.get('showtime');
    let temp = this.showtime.startTime.split(' ');
    this.showtime.startTime = temp[0] + ' ' + temp[1];
    // 请求座位信息
    theaterService.getSeats(this.showtime.id).subscribe((data) => {
      if (data.state == 'success') {
        for (let selectedSeat of data.data) {
          let count = 0;
          for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 6; j++) {
              if (this.seatsInfo[i][j] != -1) {
                if (selectedSeat == count)
                  this.seatsInfo[i][j] = 1;
                count++;
              }
            }
          }
        }
      } else {
        // TODO 异常处理，未取回座位信息
      }
    });
  }

  // 显示 toast
  presentToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  // 选择座位
  select(row: number, col: number) {
    // 选取座位
    if (this.seatsInfo[row][col] == 0) {
      // 最多只能选 4 个座位
      if (this.selectedSeats.length == 4) {
        this.presentToast('一次最多购买 4 张票');
        return;
      }
      this.seatsInfo[row][col] = 2;
      this.selectedSeats.push(this.seatsIndices[row][col]);
    // 取消座位
    } else if (this.seatsInfo[row][col] == 2) {
      this.seatsInfo[row][col] = 0;
      let index = this.selectedSeats.indexOf(this.seatsIndices[row][col]);
      this.selectedSeats.splice(index, 1);
    }
  }

}
