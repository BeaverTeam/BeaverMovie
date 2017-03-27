export class User {
  username: string;
  userAvatarUrl: string;

  constructor(username: string, userAvatarUrl: string) {
    this.username = username;
    this.userAvatarUrl = userAvatarUrl;
  }
}
