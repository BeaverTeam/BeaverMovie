package beaver.backend.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.ManyToOne;

import java.util.List;
import java.util.ArrayList;

/**
 * Created on 2017/5/20.
 */
@Entity
public class Order {
    @Id
    @GeneratedValue
    private long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private MovieSession movieSession;

    @OneToMany(mappedBy = "order")
    private List<Ticket> tickets = new ArrayList<Ticket>();

    @OneToMany(mappedBy = "order")
    private List<MovieInvitation> movieInvitations = new ArrayList<MovieInvitation>();

    @Column(nullable = false)
    private int cost;

    @Column(nullable = false)
    private boolean isPaid;

    public Order() { }

    public Order(User user, MovieSession movieSession, List<Ticket> tickets, List<MovieInvitation> movieInvitations) {
        this.user = user;
        this.movieSession = movieSession;
        this.tickets = tickets;
        this.movieInvitations = movieInvitations;

        cost = 0;
        for(Ticket ticket : tickets){
            cost = cost + ticket.getCost();
        }

        this.isPaid = false;
    }

    public void setPaid(boolean paid) {
        isPaid = paid;
        for(Ticket ticket : tickets){
            ticket.setPaid(paid);
        }
        for(MovieInvitation movieInvitation : movieInvitations){
            movieInvitation.setPaid(paid);
        }
    }

    public long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public MovieSession getMovieSession() {
        return movieSession;
    }

    public List<Ticket> getTickets() {
        return tickets;
    }

    public List<MovieInvitation> getMovieInvitations() {
        return movieInvitations;
    }

    public int getCost() {
        return cost;
    }

    public boolean isPaid() {
        return isPaid;
    }
}
