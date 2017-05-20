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
public class Ticket {
    @Id
    @GeneratedValue
    private long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private Order order;

    @ManyToOne
    private MovieSession movieSession;

    private int seatNum;

    private int cost;

    private boolean isPaid;

    public Ticket() { }

    public Ticket(User user, Order order, MovieSession movieSession, int seatNum, int cost) {
        this.user = user;
        this.order = order;
        this.movieSession = movieSession;
        this.seatNum = seatNum;
        this.cost = cost;
        this.isPaid = false;
    }

    public void setPaid(boolean paid) {
        isPaid = paid;
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

    public MovieSession getMovieSession() {
        return movieSession;
    }

    public int getSeatNum() {
        return seatNum;
    }

    public int getCost() {
        return cost;
    }

    public boolean isPaid() {
        return isPaid;
    }
}
