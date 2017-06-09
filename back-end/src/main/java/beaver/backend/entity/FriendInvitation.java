package beaver.backend.entity;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by parda on 2017/6/9.
 */
@Entity
public class FriendInvitation {
    @Id
    @GeneratedValue
    private long id;

    @JoinColumn(name = "fs_poster", nullable = false, updatable = false)
    @ManyToOne(optional = false)
    private User poster;

    @JoinColumn(name = "fs_receiver", nullable = false, updatable = false)
    @ManyToOne(optional = false)
    private User receiver;

    private Date latestAlterTime;

    private boolean accepted;
    private boolean rejected;

    public FriendInvitation() {}

    public FriendInvitation(User poster, User receiver) {
        this.poster = poster;
        this.receiver = receiver;
        accepted = false;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public User getPoster() {
        return poster;
    }

    public void setPoster(User poster) {
        this.poster = poster;
    }

    public User getReceiver() {
        return receiver;
    }

    public void setReceiver(User receiver) {
        this.receiver = receiver;
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
