package beaver.backend.entity.responseType;

import beaver.backend.entity.User;

/**
 * Created by parda on 2017/6/2.
 */
public class UserDetail {
    private String username;
    private String avater;
    private String phone;

    public UserDetail() {
    }

    public UserDetail(User user) {
        this.username = user.getUsername();
        this.avater = user.getAvater();
        this.phone = user.getPhone();
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getAvater() {
        return avater;
    }

    public void setAvater(String avater) {
        this.avater = avater;
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
                ", avater='" + avater + '\'' +
                ", phone='" + phone + '\'' +
                '}';
    }
}
