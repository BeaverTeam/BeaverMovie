import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { App } from 'ionic-angular';

import { SettingPage }  from '../setting/setting';
import { LoginPage } from '../login/login';
import { AuthService } from '../../providers/auth/auth.service';
import { UserService } from '../../providers/user/user.service';
import { User } from '../../providers/user/user';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  private user: User;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public appCtrl: App, public authService: AuthService,
              public userService: UserService) {
    this.user = userService.getUser();
  }

  gotoSetting() {
    this.navCtrl.push(SettingPage);
  }

  gotoLogin() {
    this.authService.signOut();
    this.appCtrl.getRootNav().push(LoginPage);
  }

}
