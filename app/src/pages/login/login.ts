import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  user: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = null;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signIn() {
    this.navCtrl.push(HomePage);
  }

  gotoRegister() {
    this.user = "user";
  }

  gotoLogin() {
    this.user = null;
  }

}
