import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-notif',
  templateUrl: 'notification.html',
})
export class NotificationPage {
  notifications: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.notifications = [
      {
        type: 'invitation',
        message: 'shuqian 邀请你和 TA 一同观看《加勒比海盗5：死无对证》',
        time: '刚刚',
        isRead: false,
        image: '../../assets/svgs/1.svg'
        // TODO showtime 的 id
      },
      {
        type: 'system',
        message: '《神奇女侠》盖尔·加朵即将空降上海联手克里斯·派恩开启中国宣传',
        time: '2 小时前',
        isRead: false
      },
      {
        type: 'friend',
        message: 'An0nym 申请加为你的好友',
        time: '1 天前',
        isRead: false,
        image: '../../assets/svgs/0.svg'
      }
    ];
    // 为通知加上图片
    for (let notification of this.notifications) {
      if (notification.type == 'system')
        notification.image = '../../assets/images/system.jpg';
    }
  }

}
