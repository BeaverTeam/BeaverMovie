import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { TheaterService } from '../../providers/theater/theater.service';
import { ConfirmPage } from '../confirm/confirm';
import { FriendsPage } from '../friends/friends';

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
    [1, 2, 3, 4, 5, 6],
    [7, 8, 9, 10, 11, 12],
    [-1, -1, 13, 14, 15, 16],
    [-1, -1, 17, 18, 19, 20],
    [-1, -1, 21, 22, 23, 24],
    [25, 26, 27, 28, 29, 30]
  ];
  selectedSeats: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private theaterService: TheaterService, public toastCtrl: ToastController) {
    this.showtime = this.navParams.get('showtime');
    let temp = this.showtime.startTime.split(' ');
    this.showtime.startTime = temp[0] + ' ' + temp[1];
  }

  ionViewWillEnter() {
    // 请求座位信息
    this.theaterService.getSeats(this.showtime.id).subscribe((data) => {
      if (data.state == 'success') {
        for (let selectedSeat of data.data) {
          let count = 1;
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
        this.presentToast(data.message);
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

  // 前往 AA 付款
  gotoAA() {
    if (this.selectedSeats.length >= 2)
      this.navCtrl.push(FriendsPage, {showtime: this.showtime,
                                      selectedSeats: this.selectedSeats});
  }

  // 前往确认订单页
  gotoConfirm() {
    if (this.selectedSeats.length != 0)
      this.navCtrl.push(ConfirmPage, {showtime: this.showtime,
                                      selectedSeats: this.selectedSeats});
  }

}
