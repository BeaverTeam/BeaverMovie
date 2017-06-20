package beaver.backend.entity.responseType;

import beaver.backend.entity.User;
import beaver.backend.entity.Showtime;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;
import java.util.Set;

/**
 * Created by parda on 2017/6/14.
 */
public class MovieInvitationItem {
    private long invitationId;
    private Showtime showtime;
    private String username;
    private String avatar;
    private String phone;
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm a z", timezone="GMT+8")
    private Date lastAlterTime;
    private boolean accepted;
    private boolean rejected;
    private Set<Integer> seats;

    public MovieInvitationItem(long invitationId, User user, Showtime showtimeId, Date lastAlterTime, boolean accepted, boolean rejected, Set<Integer> seats) {
        this.invitationId = invitationId;
        this.username = user.getUsername();
        this.avatar = user.getAvatar();
        this.phone = user.getPhone();
        this.showtime = showtime;
        this.lastAlterTime = lastAlterTime;
        this.accepted = accepted;
        this.rejected = rejected;
        this.seats = seats;
    }

    public long getInvitationId() {
        return invitationId;
    }

    public void setInvitationId(long invitationId) {
        this.invitationId = invitationId;
    }

    public Showtime getShowtime() {
        return showtime;
    }

    public void setShowtime(Showtime showtime) {
        this.showtime = showtime;
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

    public Date getLastAlterTime() {
        return lastAlterTime;
    }

    public void setLastAlterTime(Date lastAlterTime) {
        this.lastAlterTime = lastAlterTime;
    }

    public boolean isAccepted() {
        return accepted;
    }

    public void setAccepted(boolean accepted) {
        this.accepted = accepted;
    }

    public boolean isRejected() {
        return rejected;
    }

    public void setRejected(boolean rejected) {
        this.rejected = rejected;
    }

    public Set<Integer> getSeats() {
        return seats;
    }

    public void setSeats(Set<Integer> seats) {
        this.seats = seats;
    }
}
