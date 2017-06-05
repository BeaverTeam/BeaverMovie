import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

import { Global } from '../global';

@Injectable()
export class UserService {
  global = new Global();
  headers = new Headers({'Content-Type': 'multipart/form-data'});
  options = new RequestOptions({withCredentials: true});
  fileOptions = new RequestOptions({
    withCredentials: true,
    headers: this.headers
  });

  constructor(public http: Http) {}

  // 获取用户
  getUser() {
    return this.http.get(this.global.serverUrl + '/user/get-user', this.options)
                    .map(res => res.json());
  }

  // 更新用户
  updateUser(user, avatarFormData) {
    // this.http.post(this.global.fileServerUrl + '/save-file/avatar',
    //                {avatar: avatarFormData},
    //                this.fileOptions)
    //          .map(res => res.json())
    //          .subscribe((data) => {
    //            console.log(data);
    //          });
    return this.http.post(this.global.serverUrl + '/user/update-user',
                          {username: user.username,
                           avatar: user.avatar,
                           phone: user.phone},
                          this.options)
                    .map(res => res.json());
  }

}
