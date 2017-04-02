import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { App, ViewController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { Auth } from '../../providers/auth/auth.service';

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class SettingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl: ViewController, public appCtrl: App, public auth: Auth) {}

  gotoLogin() {
    this.auth.signOut();
    this.viewCtrl.dismiss();
    this.appCtrl.getRootNav().push(LoginPage);
  }

}
