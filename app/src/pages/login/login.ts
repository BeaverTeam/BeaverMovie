import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';
import { Auth } from '../../providers/auth';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  user: string = null;
  loginUsername: string = null;
  loginPassword: string = null;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public auth: Auth) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signIn() {
    if (this.loginUsername != null && this.loginPassword != null) {
      if (this.auth.signIn(this.loginUsername, this.loginPassword)) {
        this.navCtrl.push(HomePage);
      } else {
        alert("登录失败，请检查登录信息");
      }
    } else {
      alert("请输入完整信息");
    }
  }

  gotoRegister() {
    this.user = "user";
  }

  gotoLogin() {
    this.user = null;
  }

}
