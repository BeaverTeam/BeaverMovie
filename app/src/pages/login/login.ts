import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';
import { Auth } from '../../providers/Auth/auth.service';
import { Validator } from '../../providers/Auth/Validator';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  pageName: string = 'signIn';
  errorMessage: string = '';
  validator: Validator = new Validator();

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public auth: Auth) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
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
      console.log(data);
      if(data.success == true) this.navCtrl.push(HomePage);
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
      if(data.success == true) this.gotoLogin();
      else this.auth.signOut();
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
