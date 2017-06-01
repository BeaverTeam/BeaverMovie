package beaver.backend.entity;

import javax.persistence.*;

/**
 * Created by parda on 2017/6/1.
 */
@Entity
public class Ticket {
    @Id @GeneratedValue
    private long id;

//    @ManyToOne
//    private Showtime showtime;
//
//    @OneToOne
//    private Order order;
//
//    private int seat;
//
//    public Order getOrder() {
//        return order;
//    }
//
//    public void setOrder(Order order) {
//        this.order = order;
//    }
//
//    public Showtime getShowtime() {
//        return showtime;
//    }
//
//    public void setShowtime(Showtime showtime) {
//        this.showtime = showtime;
//    }
//
//    public int getSeat() {
//        return seat;
//    }
//
//    public void setSeat(int seat) {
//        this.seat = seat;
//    }

    public Ticket() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}
