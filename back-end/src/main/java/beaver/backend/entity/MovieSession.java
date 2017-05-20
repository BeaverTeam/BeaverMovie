package beaver.backend.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.ManyToOne;

import java.util.List;
import java.util.ArrayList;
import java.util.Date;

/**
 * Created by on 2017/5/20.
 */
@Entity
public class MovieSession {
    @Id
    @GeneratedValue
    private long id;

    @ManyToOne
    private MovieItem movieItem;

    @OneToMany(mappedBy = "movieSession")
    private List<Ticket> tickets = new ArrayList<Ticket>();

    private Date startTime;

    private Date endTime;

    private int seatCount;

    public MovieSession() { }

    public MovieSession(MovieItem movieItem, Date startTime, Date endTime, int seatCount) {
        this.movieItem = movieItem;
        this.startTime = startTime;
        this.endTime = endTime;
        this.seatCount = seatCount;
    }

    public long getId() {
        return id;
    }

    public MovieItem getMovieItem() {
        return movieItem;
    }

    public List<Ticket> getTickets() {
        return tickets;
    }

    public Date getStartTime() {
        return startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public int getSeatCount() {
        return seatCount;
    }
}
