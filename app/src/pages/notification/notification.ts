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
              private userService: UserService, public toastCtrl: ToastController) {}

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
            message = item.username + ' 拒绝了你的好友申请';
          if (item.avatar == null) item.avatar = 'assets/images/avatar.jpg';
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
          if (item.avatar == null) item.avatar = 'assets/images/avatar.jpg';
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

  // 获取邀请信息
  getInvitationInfo(refresher: any = null) {
    this.userService.getInvitationInfo().subscribe((data) => {
      if (data.state == 'success') {
        let postAndHandled = data.data.PostAndHandled;
        for (let item of postAndHandled) {
          let message;
          if (item.rejected == false)
            message = '你已经接受了 ' + item.username + ' AA 观影邀请';
          else
            message = item.username + ' 拒绝了你的 AA 观影邀请';
          if (item.avatar == null) item.avatar = 'assets/images/avatar.jpg';
          this.notifications.push({
            type: 'invitation',
            message: message,
            image: item.avatar,
            raw: item
          });
        }
        // 在通知中加入好友申请
        let receivedNotHandled = data.data.ReceivedNotHandled;
        for (let item of receivedNotHandled) {
          if (item.avatar == null) item.avatar = 'assets/images/avatar.jpg';
          this.notifications.push({
            type: 'system',
            message: item.username + ' 邀请你参与 AA 观影',
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
    this.getInvitationInfo();
  }

  doRefresh(refresher) {
    this.getNotification(refresher);
    this.getInvitationInfo(refresher);
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
      // TODO 实现同意好友的 AA 请求
      // this.userService.acceptInvitation()
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
