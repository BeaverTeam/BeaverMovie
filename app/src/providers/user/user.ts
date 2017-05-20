export class User {
  username: string;
  avatarUrl: string;
  phone: string;

  constructor(username: string, avatarUrl: string, phone: string) {
    this.username = username;
    this.avatarUrl = avatarUrl;
    this.phone = phone;
  }

}
