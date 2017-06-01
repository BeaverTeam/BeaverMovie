package beaver.backend.entity;

import javax.persistence.*;

/**
 * Created by parda on 2017/6/1.
 */
@Entity
public class TicketOrder {
    @Id
    @GeneratedValue
    private long id;

//    @ManyToOne
//    private User user;
//
//    @OneToOne(cascade = {CascadeType.REMOVE})
//    private Ticket ticket;
//
//    private boolean paid;
//
//    public User getUser() {
//        return user;
//    }
//
//    public void setUser(User user) {
//        this.user = user;
//    }
//
//    public Ticket getTicket() {
//        return ticket;
//    }
//
//    public void setTicket(Ticket ticket) {
//        this.ticket = ticket;
//    }
//
//    public boolean isPaid() {
//        return paid;
//    }
//
//    public void setPaid(boolean paid) {
//        this.paid = paid;
//    }

    public TicketOrder() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

}
