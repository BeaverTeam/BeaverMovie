import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { User } from '../../providers/user/user';
import { UserService } from '../../providers/user/user.service';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  userList: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private userService: UserService) {
  }

  getItems(ev: any) {
    let val = ev.target.value;
    this.userService.searchUser(val).subscribe((data) => {
      if (data.state == 'success') {
        for (let user of data.data)
          this.userList.push(new User(user.username, user.avatar, ''));
      } else {
        // TODO 未取回用户信息
      }
    });
  }

  addFriend(username) {}

}
