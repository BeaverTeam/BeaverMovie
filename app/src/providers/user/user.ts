export class User {
  username: string;
  userAvatarUrl: string;
  phone: string;

  constructor(username: string, userAvatarUrl: string, phone: string) {
    this.username = username;
    this.userAvatarUrl = userAvatarUrl;
    this.phone = phone;
  }
}
