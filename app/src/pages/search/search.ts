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
  friends: any = [];
  username: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private userService: UserService, public toastCtrl: ToastController) {}

  ionViewWillEnter() {
    // 获取用户
    this.userService.getUser().subscribe((data) => {
      if (data.state == 'success')
        this.username = data.data.username;
      else
        this.presentToast(data.message);
    });
    // 获取好友
    this.userService.getFriends().subscribe((data) => {
      if (data.state == 'success')
        this.friends = data.data;
      else
        this.presentToast(data.message);
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

  getItems(ev: any) {
    let val = ev.target.value;
    this.userList = [];
    if (val == '') return;
    this.userService.searchUser(val).subscribe((data) => {
      if (data.state == 'success') {
        for (let user of data.data) {
          // 增加默认的头像
          if (user.avatar == null) user.avatar = 'assets/images/avatar.jpg';
          // 判断是否可被加好友
          let isAvailable = true;
          if (user.username == this.username)
            isAvailable = false;
          for (let friend of this.friends) {
            if (user.username == friend.username) {
              isAvailable = false;
              break;
            }
          }
          this.userList.push({
            user: new User(user.username, user.avatar, ''),
            isAvailable: isAvailable
          });
        }
      } else {
        this.presentToast(data.message);
      }
    });
  }

  addFriend(username) {
    this.userService.sendFriendRequest(username).subscribe((data) => {
      if (data.state == 'success')
        this.presentToast('邀请已成功发出！');
    });
  }

}
