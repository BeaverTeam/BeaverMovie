package beaver.backend.entity.responseType;

import beaver.backend.entity.Movie;
import beaver.backend.entity.Showtime;
import beaver.backend.entity.User;

import java.util.Date;

/**
 * Created by parda on 2017/6/14.
 */
public class MovieInvitationItem {
    private long invitationId;
    private User user;
    private Showtime showtime;
    private Date lastAlterTime;
    private boolean accepted;
    private boolean rejected;

    public MovieInvitationItem() {
    }

    public MovieInvitationItem(long invitationId, User user, Showtime showtime, Date lastAlterTime, boolean accepted, boolean rejected) {
        this.invitationId = invitationId;
        this.user = user;
        this.showtime = showtime;
        this.lastAlterTime = lastAlterTime;
        this.accepted = accepted;
        this.rejected = rejected;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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
}
