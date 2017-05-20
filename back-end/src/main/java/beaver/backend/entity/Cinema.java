package beaver.backend.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import java.util.List;
import java.util.ArrayList;

/**
 * Created by on 2017/5/20.
 */
@Entity
public class Cinema {
    @Id
    @GeneratedValue
    private long id;

    @OneToMany(mappedBy = "cinema")
    private List<MovieItem> movieInvitations = new ArrayList<MovieItem>();

    public Cinema() { }

    public long getId() {
        return id;
    }

    public List<MovieItem> getMovieInvitations() {
        return movieInvitations;
    }
}
