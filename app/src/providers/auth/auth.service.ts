import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Md5 } from 'ts-md5/dist/md5';
import 'rxjs/add/operator/map';

@Injectable()
export class Auth {

  constructor(public http: Http) {}

  // 加密密码
  encryptPassword(password: string) {
    let temp: string = password;
    for (let i = 0; i < 5; i++)
      temp = String(Md5.hashStr(temp));
    return temp;
  }

  // 注册
  signUp(username: string, password: string) {
    return true;
  }

  // 登录
  signIn(username: string, password: string) {
    // 清空本地缓存
    localStorage.removeItem('username');
    localStorage.removeItem('encryptPassword');
    // 创建新的凭证并存入本地
    localStorage.setItem('username', JSON.stringify(username));
    localStorage.setItem('encryptPassword', JSON.stringify(this.encryptPassword(password)));
    // TODO 发到后端校验
    return true;
  }

  // 登出
  signOut() {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
  }

}
