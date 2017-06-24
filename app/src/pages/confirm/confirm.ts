import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { PayPage } from '../pay/pay';
import { TheaterService } from '../../providers/theater/theater.service';
import { UserService } from '../../providers/user/user.service';

@Component({
  selector: 'page-confirm',
  templateUrl: 'confirm.html',
})
export class ConfirmPage {
  showtime: any;
  selectedSeats: any = [];
  selectedPositions: any = [];
  selectedFriends: any = [];
  seatsIndices = [
    [0, 1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10, 11],
    [-1, -1, 12, 13, 14, 15],
    [-1, -1, 16, 17, 18, 19],
    [-1, -1, 20, 21, 22, 23],
    [24, 25, 26, 27, 28, 29]
  ];
  cost: number;
  foodCost: number = 0;
  cokeNum: number = 0;
  popcornNum: number = 0;
  isAA: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public theaterService: TheaterService, public toastCtrl: ToastController,
              public userService: UserService) {
    // 获取场次信息
    this.showtime = navParams.get('showtime');
    this.selectedFriends = navParams.get('selectedFriends');
    // 获取座位信息
    this.selectedSeats = navParams.get('selectedSeats');
    let temp = this.showtime.startTime.split(' ');
    this.showtime.startTime = temp[0] + ' ' + temp[1];
    if (this.selectedFriends != undefined || this.selectedFriends != null) {
      this.isAA = true;
      this.cost = this.showtime.cost;
    } else {
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

  // 显示 toast
  presentToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  changeFood(op: number) {
    if (op == 1 && this.cokeNum > 0)
      this.cokeNum--;
    if (op == 2 && this.cokeNum < 9)
      this.cokeNum++;
    if (op == 3 && this.popcornNum > 0)
      this.popcornNum--;
    if (op == 4 && this.popcornNum < 9)
      this.popcornNum++;
    this.foodCost = 4 * this.cokeNum + 8 * this.popcornNum;
  }

  confirm() {
    if (this.isAA) {
      this.userService.invite(this.selectedSeats[0], this.selectedFriends, this.selectedSeats.slice(1, this.selectedSeats.length), this.showtime.id).subscribe((data) => {
        if (data.state == 'success') {
          this.navCtrl.push(PayPage, {orderId: data.data.id, cost: this.cost + this.foodCost});
        }
      });
    } else {
      this.theaterService.sendOrder(this.showtime.id, this.navParams.get('selectedSeats')).subscribe((data) => {
        if (data.state == 'success') {
          this.navCtrl.push(PayPage, {orderId: data.data, cost: this.cost + this.foodCost});
        } else {
          this.presentToast(data.message);
        }
      });
    }
  }

}
