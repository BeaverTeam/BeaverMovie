import { Injectable } from '@angular/core';

import { User } from './user';

@Injectable()
export class UserService {
  private user: User;

  constructor() {
    this.user = new User('海狸', '', '18826073587');
  }

}
