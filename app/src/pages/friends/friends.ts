import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { User } from '../../providers/user/user';
import { ConfirmPage } from '../confirm/confirm';
import { UserService } from '../../providers/user/user.service';

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
              public toastCtrl: ToastController, private userService: UserService) {
    // 获取前一个页面的参数
    this.showtime = navParams.get('showtime');
    this.selectedSeats = navParams.get('selectedSeats');
  }

  ionViewWillEnter() {
    this.selectedFriends = [];
    this.friends = [];
    this.userService.getFriends().subscribe((data) => {
      if (data.state == 'success') {
        for (let user of data.data) {
          // 增加默认的头像
          if (user.avatar == null) user.avatar = 'assets/images/avatar.jpg';
          this.friends.push(new User(user.username, user.avatar, ''));
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

  // 点击 item 事件
  select(friend: string) {
    let index = this.selectedFriends.indexOf(friend);
    if (index == -1) this.selectedFriends.push(friend);
    else this.selectedFriends.splice(index, 1);
  }

  // 前往确认订单页
  gotoConfirm() {
    if (this.selectedSeats.length != (this.selectedFriends.length + 1)) {
      this.presentToast('请选择 ' + (this.selectedSeats.length - 1) + ' 位好友或退回重新选择座位');
    } else {
      this.navCtrl.push(ConfirmPage, {showtime: this.showtime,
                                      selectedSeats: this.selectedSeats,
                                      selectedFriends: this.selectedFriends});
    }
  }
}
