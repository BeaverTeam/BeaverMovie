package beaver.backend.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Calendar;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by parda on 2017/6/1.
 */
@Entity
public class Showtime {
    @Id
    @GeneratedValue
    private long id;

    @ManyToOne
    @JoinColumn(name="cinema_id")
    private Cinema cinema;

    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm a z")
    private Date startTime;

    @ManyToOne
    @JoinColumn(name="movie_id")
    private Movie movie;

    @OneToMany(mappedBy = "showtime")
    @JsonIgnore
    private Set<Ticket> tickets = new HashSet<>();

    public Showtime() {
    }

    public Showtime(Cinema cinema, Date startTime, Movie movie) {
        this.cinema = cinema;
        this.startTime = startTime;
        this.movie = movie;
    }

    public Movie getMovie() {
        return movie;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Cinema getCinema() {
        return cinema;
    }

    public void setCinema(Cinema cinema) {
        this.cinema = cinema;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Set<Ticket> getTickets() {
        return tickets;
    }

    public void setTickets(Set<Ticket> tickets) {
        this.tickets = tickets;
    }
}
