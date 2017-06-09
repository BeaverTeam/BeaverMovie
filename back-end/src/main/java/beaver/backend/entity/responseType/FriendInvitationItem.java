package beaver.backend.entity.responseType;

import beaver.backend.entity.User;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

/**
 * Created by parda on 2017/6/9.
 */
public class FriendInvitationItem {
    long invitationId;
    private String username;
    private String avatar;
    private String phone;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm a z", timezone="GMT+8")
    private Date latestAlterTime;
    private boolean accepted;
    private boolean rejected;

    public FriendInvitationItem() {}

    public FriendInvitationItem(long id, User user, boolean accepted, boolean rejected, Date latestAlterTime) {
        this.invitationId = id;
        this.username = user.getUsername();
        this.avatar = user.getAvatar();
        this.phone = user.getPhone();
        this.accepted = accepted;
        this.rejected = rejected;
        this.latestAlterTime = latestAlterTime;
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

    public boolean isAccepted() {
        return accepted;
    }

    public void setAccepted(boolean accepted) {
        this.accepted = accepted;
    }

    public Date getLatestAlterTime() {
        return latestAlterTime;
    }

    public void setLatestAlterTime(Date latestAlterTime) {
        this.latestAlterTime = latestAlterTime;
    }

    public boolean isRejected() {
        return rejected;
    }

    public void setRejected(boolean rejected) {
        this.rejected = rejected;
    }
}
