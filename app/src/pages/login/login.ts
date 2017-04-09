import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { AuthService } from '../../providers/auth/auth.service';
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
              public toastCtrl: ToastController, public authService: AuthService) {}

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
    this.authService.signIn(formData.signInUsername, formData.signInPassword).subscribe(raw => {
      let data = raw.json();
      console.log(raw.headers);
      if (data.success == true) {
        this.navCtrl.push(TabsPage);
      } else {
        this.errorMessage = '登录失败，请检查用户名和密码';
      }
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
    this.authService.signUp(formData.signUpUsername, formData.signUpPassword).subscribe(raw => {
      let data = raw.json();
      if (data.success == true) {
        this.gotoLogin();
        this.presentToast('注册成功，请登录账号');
      } else {
        this.errorMessage = '该用户已经存在，请更换用户名或直接登录';
        this.authService.signOut();
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
