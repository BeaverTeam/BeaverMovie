package beaver.backend.entity.responseType;

import beaver.backend.entity.User;

/**
 * Created by parda on 2017/6/2.
 */
public class UserDetail {
    private String username;
    private String avatar;
    private String phone;

    public UserDetail() {
    }

    public UserDetail(User user) {
        this.username = user.getUsername();
        this.avatar = user.getAvatar();
        this.phone = user.getPhone();
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    @Override
    public String toString() {
        return "UserDetail{" +
                "username='" + username + '\'' +
                ", avatar='" + avatar + '\'' +
                ", phone='" + phone + '\'' +
                '}';
    }
}
