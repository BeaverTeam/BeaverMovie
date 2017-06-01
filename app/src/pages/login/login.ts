import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

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
              public toastCtrl: ToastController, public authService: AuthService,
              public storage: Storage, public loadingCtrl: LoadingController) {
    // 自动登录
    storage.ready().then(() => {
      storage.get('user').then((val) => {
        if (val != null && val != undefined) {
          // 显示 loading
          let loading = loadingCtrl.create({content: '正在加载...'});
          loading.present();
          // 尝试登录
          authService.signIn(val.username, val.password).subscribe(data => {
            if (data.state == 'success') {
              loading.dismiss();
              this.navCtrl.push(TabsPage);
            } else {
              loading.dismiss();
              this.errorMessage = data.message;
              storage.remove('user');
            }
          });
        }
      });
    });
  }

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

    // 显示 loading
    let loading = this.loadingCtrl.create({content: '正在登录...'});
    loading.present();
    // 发往后端进行校验
    this.authService.signIn(formData.signInUsername, formData.signInPassword).subscribe(data => {
      if (data.state == 'success') {
        loading.dismiss();
        this.navCtrl.push(TabsPage);
        // 将用户名等信息存储到本地
        this.storage.ready().then(() => {
          this.storage.set('user', {username: formData.signInUsername,
                                    password: formData.signInPassword});
        });
      } else {
        loading.dismiss();
        this.errorMessage = data.message;
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

    // 显示 loading
    let loading = this.loadingCtrl.create({content: '正在注册...'});
    loading.present();
    // 发往后端进行校验
    this.authService.signUp(formData.signUpUsername, formData.signUpPassword).subscribe(data => {
      if (data.state == 'success') {
        loading.dismiss();
        this.gotoLogin();
        this.presentToast('注册成功，请登录账号');
      } else {
        loading.dismiss();
        this.errorMessage = data.message;
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
