import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { App } from 'ionic-angular';

import { SettingPage }  from '../setting/setting';
import { LoginPage } from '../login/login';
import { AuthService } from '../../providers/auth/auth.service';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public appCtrl: App, public auth: AuthService) {}

  gotoSetting() {
    this.navCtrl.push(SettingPage);
  }

  gotoLogin() {
    this.auth.signOut();
    this.appCtrl.getRootNav().push(LoginPage);
  }

}
