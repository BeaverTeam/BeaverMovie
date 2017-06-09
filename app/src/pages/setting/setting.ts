import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';

import { UserService } from '../../providers/user/user.service';
import { User } from '../../providers/user/user';

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class SettingPage {
  user: User;
  avatarFormData: FormData;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public userService: UserService, public alertCtrl: AlertController,
              public toastCtrl: ToastController) {
    userService.getUser().subscribe((data) => {
      if (data.state == 'success') {
        let temp = data.data;
        if (temp.avatar == null) temp.avatar = 'assets/images/avatar.jpg';
        if (temp.phone == null) temp.phone = '';
        this.user = new User(temp.username, temp.avatar, temp.phone);
      } else {
        this.presentToast(data.message);
      }
    });
  }

  // 用户变更头像
  avatarChange(event) {
    var reader = new FileReader();
    var that = this;

    reader.onload = function(e: any) {
      that.user.avatar = e.target.result;
    };

    if (event.target.files[0] != undefined)
      reader.readAsDataURL(event.target.files[0]);

    let fileList = event.target.files;
    if (fileList.length > 0) {
      let file = fileList[0];
      this.avatarFormData = new FormData();
      this.avatarFormData.append('avatar', file);
    }
  }

  // 显示 toast
  presentToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  // 提交更新
  update() {
    // 定义错误
    let errorMessage = '';

    // 定义变量
    let username = this.user.username;
    let avatar = this.user.avatar;
    let phone = this.user.phone;

    // 定义校验规则
    let usernameRegex = /^[a-zA-Z0-9]+$/;
    let imageRegex = /^(?:data:image\/([a-zA-Z]*);base64,)?(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/;
    let phoneRegex = /^1[34578]\d{9}$/;

    // 对用户名进行校验
    if (username == null || username == undefined || username == '')
      errorMessage = '用户名不能为空';
    else if (username.length < 5 || username.length > 10)
      errorMessage = '用户名长度需在 5 到 10 之间';
    else if (username.match(usernameRegex) == null)
      errorMessage = '用户名只能由字母和数字组成';

    // 对头像进行校验
    if (avatar == null || avatar == undefined || avatar == '')
      errorMessage = '图片不符合格式规范';
    else if (avatar.match(imageRegex) == null && avatar != 'assets/images/avatar.jpg')
      errorMessage = '图片不符合格式规范';

    // 对手机进行校验
    if (phone == null || phone == undefined || phone == '')
      errorMessage = '手机号不能为空';
    else if (phone.match(phoneRegex) == null)
      errorMessage = '手机号不符合格式规范';

    if (errorMessage != '') {
      let alert = this.alertCtrl.create({
        subTitle: errorMessage,
        buttons: ['好的']
      });
      alert.present();
    } else {
      // 更新信息到后端
      let that = this;
      if (this.avatarFormData != undefined) {
        this.userService.getFileServerUrl(this.avatarFormData).subscribe((data) => {
          if (data.state == 'success') {
            this.userService.updateUser(this.user, data.fileurl).subscribe((data_) => {
              if (data_.state == 'success') {
                that.presentToast('成功更新用户信息');
              } else {
                let alert = that.alertCtrl.create({
                  subTitle: data_.message,
                  buttons: ['好的']
                });
                alert.present();
              }
            });
          } else {
            let alert = that.alertCtrl.create({
              subTitle: data.message,
              buttons: ['好的']
            });
            alert.present();
          }
        });
      } else {
        this.userService.updateUser(this.user, '[default]').subscribe((data_) => {
          if (data_.state == 'success') {
            that.presentToast('成功更新用户信息');
          } else {
            let alert = that.alertCtrl.create({
              subTitle: data_.message,
              buttons: ['好的']
            });
            alert.present();
          }
        });
      }
    }
  }

}
