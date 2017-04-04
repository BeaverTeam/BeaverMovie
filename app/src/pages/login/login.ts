import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { Auth } from '../../providers/auth/auth.service';
import { Validator } from '../../providers/auth/validator';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  pageName: string = 'signIn';
  errorMessage: string = '';
  validator: Validator = new Validator();

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public toastCtrl: ToastController, public auth: Auth) {}

  // 显示 toast
  presentToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  // 登录校验
  signInValidator(formData, inputId) {
    this.errorMessage = this.validator.signInValidator(formData, inputId);
  }

  signInCheck(formData) {
    // 进行前端校验
    this.signInValidator(formData, -1);
    if (this.errorMessage != '') return;

    // 发往后端进行校验
    this.auth.signIn(formData.signInUsername, formData.signInPassword).subscribe(data => {
      if (data.success == true) this.navCtrl.push(TabsPage);
      else this.auth.signOut();
    });
  }

  // 注册校验
  signUpValidator(formData, inputId) {
    this.errorMessage = this.validator.signUpValidator(formData, inputId);
  }

  signUpCheck(formData) {
    // 进行前端校验
    this.signUpValidator(formData, -1);
    if (this.errorMessage != '') return;

    // 发往后端进行校验
    this.auth.signUp(formData.signUpUsername, formData.signUpPassword).subscribe(data => {
      if (data.success == true) {
        this.gotoLogin();
        this.presentToast('注册成功，请登录账号');
      } else {
        this.auth.signOut();
      }
    });
  }

  gotoRegister() {
    // 清空所有对 input 的访问记录
    this.validator.clearVisits();
    this.errorMessage = '';
    this.pageName = 'register';
  }

  gotoLogin() {
    // 清空所有对 input 的访问记录
    this.validator.clearVisits();
    this.errorMessage = '';
    this.pageName = 'signIn';
  }

}
