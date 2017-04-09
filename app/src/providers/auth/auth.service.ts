import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Md5 } from 'ts-md5/dist/md5';
import 'rxjs/add/operator/map';

import { Global } from '../global';

@Injectable()
export class AuthService {
  private global = new Global();

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
    // 对密码进行哈希
    let encryptedPassword = this.encryptPassword(password);
    // 向后端发起注册的请求
    return this.http.post(this.global.serverUrl + '/api/sign-up',
                          {username: username, encryptedPassword: encryptedPassword});
  }

  // 登录
  signIn(username: string, password: string) {
    // 对密码进行哈希
    let encryptedPassword = this.encryptPassword(password);
    // 向后端发起登录的请求
    return this.http.post(this.global.serverUrl + '/api/sign-in',
                          {username: username, encryptedPassword: encryptedPassword});
  }

  // 登出
  signOut() {}

}
