package beaver.backend.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by parda on 2017/6/1.
 */
@Entity
public class TicketOrder {
    @Id
    @GeneratedValue
    private long id;

    @ManyToOne
    @JsonIgnore
    private User user;

    @OneToMany(mappedBy = "ticketOrder")
    private Set<Ticket> tickets = new HashSet<>();

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm a z")
    private Date createTime;

    private boolean paid;

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Ticket> getTickets() {
        return tickets;
    }

    public void setTickets(Set<Ticket> tickets) {
        this.tickets = tickets;
    }

    public boolean isPaid() {
        return paid;
    }

    public void setPaid(boolean paid) {
        this.paid = paid;
    }

    public TicketOrder() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public TicketOrder(User user, Date createTime, boolean paid) {
        this.user = user;
        this.createTime = createTime;
        this.paid = paid;
    }
}
