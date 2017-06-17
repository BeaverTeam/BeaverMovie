package beaver.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by parda on 2017/6/10.
 */
@Entity
public class MovieInvitation {
    @Id
    @GeneratedValue
    private long id;

    @OneToOne(targetEntity = TicketOrder.class)
    @JsonIgnore
    private TicketOrder order;

    @JoinColumn(name = "mi_poster", nullable = false, updatable = false)
    @ManyToOne(optional = false)
    private User poster;

    @JoinColumn(name = "mi_receiver", nullable = false, updatable = false)
    @ManyToOne(optional = false)
    private User receiver;

    private Date latestAlterTime;

    private boolean accepted;
    private boolean rejected;

    public MovieInvitation() {
    }

    public MovieInvitation(TicketOrder order, User poster, User receiver, Date latestAlterTime) {
        this.order = order;
        this.poster = poster;
        this.receiver = receiver;
        this.latestAlterTime = latestAlterTime;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public TicketOrder getOrder() {
        return order;
    }

    public void setOrder(TicketOrder order) {
        this.order = order;
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

    public Date getLatestAlterTime() {
        return latestAlterTime;
    }

    public void setLatestAlterTime(Date latestAlterTime) {
        this.latestAlterTime = latestAlterTime;
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
