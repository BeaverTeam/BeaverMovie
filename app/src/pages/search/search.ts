import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { User } from '../../providers/user/user';
import { UserService } from '../../providers/user/user.service';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  userList: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private userService: UserService, public toastCtrl: ToastController) {}

  // 显示 toast
  presentToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  getItems(ev: any) {
    let val = ev.target.value;
    this.userList = [];
    if (val == '') return;
    this.userService.searchUser(val).subscribe((data) => {
      if (data.state == 'success') {
        for (let user of data.data) {
          if (user.avatar == null) user.avatar = 'assets/images/avatar.jpg';
          this.userList.push(new User(user.username, user.avatar, ''));
        }
      } else {
        this.presentToast(data.message);
      }
    });
  }

  addFriend(username) {}

}
