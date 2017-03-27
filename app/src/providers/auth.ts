import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { User } from './auth-data';

@Injectable()
export class Auth {
  user: User = null;

  constructor(public http: Http) {}

  signIn(username: string, password: string) {
    // TODO 进行前端校验
    // 清空本地缓存
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    // 创建新的凭证并存入本地
    localStorage.setItem('username', JSON.stringify(username));
    localStorage.setItem('password', JSON.stringify(password));
    // TODO 发到后端校验
    return true;
  }

}
