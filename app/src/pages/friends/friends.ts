import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { User } from '../../providers/user/user';
import { ConfirmPage } from '../confirm/confirm';

@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class FriendsPage {
  friends: User[] = [];
  showtime: any;
  selectedSeats: any = [];
  selectedFriends: string[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public toastCtrl: ToastController) {
    // 获取前一个页面的参数
    this.showtime = navParams.get('showtime');
    this.selectedSeats = navParams.get('selectedSeats');
    // 装载 User 假数据
    let names = ['刘忍', '南瓜粥', '鲜虾', '拉肠', '酸菜', '爆炒', '水煮', '火锅'];
    for (let i = 0; i < 8; i++)
      this.friends.push(new User(names[i], './../assets/svgs/' + i + '.svg', ''));
  }

  // 显示 toast
  presentToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  // 点击 item 事件
  select(friend: string) {
    let index = this.selectedFriends.indexOf(friend);
    if (index == -1) this.selectedFriends.push(friend);
    else this.selectedFriends.splice(index, 1);
  }

  // 前往确认订单页
  gotoConfirm() {
    if (this.selectedSeats.length != this.selectedFriends.length) {
      this.presentToast('请选择 ' + this.selectedSeats.length + ' 位好友或退回重新选择座位');
    } else {
      this.navCtrl.push(ConfirmPage, {showtime: this.showtime,
                                      selectedSeats: this.selectedSeats,
                                      selectedFriends: this.selectedFriends});
    }
  }
}
