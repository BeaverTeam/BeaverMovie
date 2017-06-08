import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { User } from '../../providers/user/user';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  userList: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  getItems(ev: any) {
    let val = ev.target.value;
    let names = ['刘忍', '南瓜粥', '鲜虾', '拉肠', '酸菜', '爆炒', '水煮', '火锅'];
    for (let i = 0; i < 8; i++)
      this.userList.push(new User(names[i], './../assets/svgs/' + i + '.svg', ''));
  }

  addFriend(username) {}

}
