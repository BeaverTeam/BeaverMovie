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
 * Created by on 2017/5/20.
 */
@Entity
public class MovieItem {
    @Id
    @GeneratedValue
    private long id;

    @ManyToOne
    private Cinema cinemainema;

    @ManyToOne
    private Movie movie;

    @OneToMany(mappedBy = "movieItem")
    private List<MovieSession> movieSessions = new ArrayList<MovieSession>();

    public MovieItem() { }

    public MovieItem(Cinema cinemainema, Movie movie) {
        this.cinemainema = cinemainema;
        this.movie = movie;
    }

    public long getId() {
        return id;
    }

    public Cinema getCinemainema() {
        return cinemainema;
    }

    public Movie getMovie() {
        return movie;
    }

    public List<MovieSession> getMovieSessions() {
        return movieSessions;
    }
}
