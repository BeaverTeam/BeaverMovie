package beaver.backend.entity.responseType;

import beaver.backend.entity.User;

/**
 * Created by parda on 2017/6/9.
 */
public class FriendInvitationItem {
    long invitationId;
    private String username;
    private String avatar;
    private String phone;
    boolean isPoster;
    boolean isAck;

    public FriendInvitationItem() {}

    public FriendInvitationItem(long id, User user, boolean isPoster, boolean isAck) {
        this.invitationId = id;
        this.username = user.getUsername();
        this.avatar = user.getAvatar();
        this.phone = user.getPhone();
        this.isPoster = isPoster;
        this.isAck = isAck;

    }

    public long getInvitationId() {
        return invitationId;
    }

    public void setInvitationId(long invitationId) {
        this.invitationId = invitationId;
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

    public boolean isPoster() {
        return isPoster;
    }

    public void setPoster(boolean poster) {
        isPoster = poster;
    }

    public boolean isAck() {
        return isAck;
    }

    public void setAck(boolean ack) {
        isAck = ack;
    }
}
