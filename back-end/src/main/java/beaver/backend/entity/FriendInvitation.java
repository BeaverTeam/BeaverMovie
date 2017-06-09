package beaver.backend.entity;

import javax.persistence.*;

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

    private boolean isAck;

    public FriendInvitation() {}

    public FriendInvitation(User poster, User receiver) {
        this.poster = poster;
        this.receiver = receiver;
        isAck = false;
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

    public boolean isAck() {
        return isAck;
    }

    public void setAck(boolean ack) {
        isAck = ack;
    }
}
