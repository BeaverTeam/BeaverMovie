package beaver.backend.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

/**
 * Created by on 2017/5/20.
 */
@Entity
public class MovieInvitation {
    @Id
    @GeneratedValue
    private long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private Order order;

    private int cost;

    private boolean isAck;

    private boolean isPaid;

    private boolean isReturned;

    public MovieInvitation() { }

    public MovieInvitation(User user, Order order, int cost) {
        this.user = user;
        this.order = order;
        this.cost = cost;
        this.isAck = false;
        this.isPaid = false;
        this.isReturned = false;
    }

    public void setAck(boolean ack) {
        isAck = ack;
    }

    public void setPaid(boolean paid) {
        isPaid = paid;
    }

    public void setReturned(boolean returned) {
        isReturned = returned;
    }

    public long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public Order getOrder() {
        return order;
    }

    public int getCost() {
        return cost;
    }

    public boolean isAck() {
        return isAck;
    }

    public boolean isPaid() {
        return isPaid;
    }

    public boolean isReturned() {
        return isReturned;
    }
}
