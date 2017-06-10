import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { UserService } from '../../providers/user/user.service';

@Component({
  selector: 'page-notif',
  templateUrl: 'notification.html',
})
export class NotificationPage {
  notifications: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private userService: UserService, public toastCtrl: ToastController) {
    this.notifications = [
      {
        type: 'invitation',
        message: 'shuqian 邀请你和 TA 一同观看《加勒比海盗5：死无对证》',
        image: 'assets/svgs/1.svg'
        // TODO showtime 的 id
      },
      {
        type: 'system',
        message: '《神奇女侠》盖尔·加朵即将空降上海联手克里斯·派恩开启中国宣传',
      }
    ];
    // 为通知加上图片
    for (let notification of this.notifications) {
      if (notification.type == 'system')
        notification.image = 'assets/images/system.jpg';
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

  // 处理时间
  handleTime(timeStr: string) {
    return timeStr;
  }

  getNotification(refresher: any = null) {
    this.notifications = [];
    this.userService.getFriendRequests().subscribe((data) => {
      if (data.state == 'success') {
        // 在通知中加入已回复的好友申请
        let postAndHandled = data.data.PostAndHandled;
        for (let item of postAndHandled) {
          let message;
          if (item.rejected == false)
            message = '你和 ' + item.username + ' 已经是好友关系了';
          else
            message = item.username + '拒绝了你的好友申请';
          this.notifications.push({
            type: 'system',
            message: message,
            image: item.avatar,
            raw: item
          });
        }
        // 在通知中加入好友申请
        let receivedNotHandled = data.data.ReceivedNotHandled;
        for (let item of receivedNotHandled) {
          this.notifications.push({
            type: 'friend',
            message: item.username + ' 申请加为你的好友',
            image: item.avatar,
            raw: item
          });
        }
        if (refresher) refresher.complete();
      } else {
        this.presentToast(data.message);
        if (refresher) refresher.complete();
      }
    });
  }

  ionViewWillEnter() {
    this.getNotification();
  }

  doRefresh(refresher) {
    this.getNotification(refresher);
  }

  // 同意
  agree(notification: any) {
    let raw = notification.raw;
    // 如果是好友申请类型
    if (notification.type == 'friend') {
      this.userService.handleFriendRequest(true, raw.invitationId).subscribe((data) => {
        if (data.state == 'success') this.getNotification();
      });
    // 如果是邀请 AA 类型
    } else if (notification.type == 'invitation') {
      // TODO 实现同意好友 AA 请求
    }
  }

  // 拒绝
  reject(notification: any) {
    let raw = notification.raw;
    // 如果是好友申请类型
    if (notification.type == 'friend') {
      this.userService.handleFriendRequest(false, raw.invitationId).subscribe((data) => {
        if (data.state == 'success') this.getNotification();
      });
    // 如果是邀请 AA 类型
    } else if (notification.type == 'invitation') {
      // TODO 实现拒绝好友 AA 请求
    }
  }

}
