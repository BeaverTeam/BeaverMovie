import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

import { Global } from '../global';

@Injectable()
export class UserService {
  global = new Global();
  headers = new Headers({'Content-Type': 'multipart/form-data'});
  options = new RequestOptions({withCredentials: true});
  fileOptions = new RequestOptions({
    // withCredentials: true,
    headers: this.headers
  });

  constructor(public http: Http) {}

  // 获取用户
  getUser() {
    return this.http.get(this.global.serverUrl + '/user/get-user', this.options)
                    .map(res => res.json());
  }

  getFileServerUrl(avatarFormData) {
    return  this.http.post(this.global.fileServerUrl + '/save-file/avatar',
                     avatarFormData)
               .map(res => res.json());
  }

  // 更新用户
  updateUser(user, fileUrl) {
    if (fileUrl.indexOf('http://') == -1)
      user.avatar = this.global.fileServerUrl + fileUrl;
    return this.http.post(this.global.serverUrl + '/user/update-user',
                          {username: user.username,
                           avatar: user.avatar,
                           phone: user.phone},
                          this.options)
                    .map(res => res.json());
  }

  // 搜索用户
  searchUser(searchStr: string) {
    return this.http.get(this.global.serverUrl + '/user/search-user?query=' + searchStr,
                         this.options)
                    .map(res => res.json());
  }

}
