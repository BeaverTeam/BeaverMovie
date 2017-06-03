import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';

import { Global } from '../global';

@Injectable()
export class UserService {
  private global = new Global();
  options: any = new RequestOptions({withCredentials: true});

  constructor(public http: Http) {}

  // 获取用户
  getUser() {
    return this.http.get(this.global.serverUrl + '/user/get-user', this.options)
                    .map(res => res.json());
  }

  // 更新用户
  updateUser(user) {
    console.log(user);
    return this.http.post(this.global.serverUrl + '/user/update-user',
                          {username: user.username,
                           avatar: user.avatar,
                           phone: user.phone},
                          this.options)
                    .map(res => res.json());
  }

}
