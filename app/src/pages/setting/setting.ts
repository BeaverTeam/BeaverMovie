import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UserService } from '../../providers/user/user.service';
import { User } from '../../providers/user/user';

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class SettingPage {
  private user: User;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public userService: UserService) {
    this.user = userService.getUser();
  }

  // 用户变更头像
  avatarChange(event) {
    var reader = new FileReader();
    var that = this;

    reader.onload = function(e: any) {
      that.user.avatarUrl = e.target.result;
    };

    if (event.target.files[0] != undefined)
      reader.readAsDataURL(event.target.files[0]);
  }

}
