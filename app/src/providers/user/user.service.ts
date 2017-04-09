import { Injectable } from '@angular/core';

import { User } from './user';

@Injectable()
export class UserService {
  private user: User;

  constructor() {
    // 在构造函数中创建假数据
    this.user = new User('刘忍', '../../assets/images/avatar.jpg', '18826073587');
  }

  // 获取用户
  getUser() {
    return this.user;
  }

}
