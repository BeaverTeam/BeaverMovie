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

  // 获取用户的好友
  getFriends() {
    return this.http.get(this.global.serverUrl + '/friendship', this.options)
                    .map(res => res.json());
  }

  // 申请加好友
  sendFriendRequest(username: string) {
    return this.http.get(this.global.serverUrl + '/friendship/invite?username=' + username,
                         this.options)
                    .map(res => res.json());
  }

  // 获取好友申请
  getFriendRequests() {
    return this.http.get(this.global.serverUrl + '/friendship/get-invitation', this.options)
                    .map(res => res.json());
  }

  // 处理好友申请
  handleFriendRequest(isAgree: boolean, id: number) {
    if (isAgree)
      return this.http.get(this.global.serverUrl + '/friendship/accept/' + id, this.options)
                      .map(res => res.json());
    else
      return this.http.get(this.global.serverUrl + '/friendship/reject/' + id, this.options)
                      .map(res => res.json());
  }

  // 同意 AA 请求
  accpetInvitation(movieInvitationId: number, seats: number) {
    return this.http.post(this.global.serverUrl + '/movie-invitation/accept',
                          {movieInvitationId: movieInvitationId,
                           seats: seats},
                          this.options)
                    .map(res => res.json());
  }

  // 拒绝 AA 请求
  rejectInvitation(movieInvitationId: number) {
    return this.http.get(this.global.serverUrl + '/movie-invitation/reject/' + movieInvitationId, this.options)
                    .map(res => res.json());
  }

  // 获取邀请信息
  getInvitationInfo() {
    return this.http.get(this.global.serverUrl + '/movie-invitation', this.options)
                    .map(res => res.json());
  }

  // 邀请好友 AA 付款
  invite(posterSeats: number, receiverNames: string[], receiverSeats: number[], showtimeId: number) {
    return this.http.post(this.global.serverUrl + '/movie-invitation/invite',
                         {posterSeats: [posterSeats],
                          receiverNames: receiverNames,
                          receiverSeats: receiverSeats,
                          showtimeId: showtimeId},
                         this.options)
                    .map(res => res.json());
  }

}
