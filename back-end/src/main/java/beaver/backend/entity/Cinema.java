package beaver.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by parda on 2017/6/1.
 */
@Entity
public class Cinema {
    @Id
    @GeneratedValue
    private long id;

    private String name;
    private String location;

    @JsonIgnore
    @OneToMany(mappedBy = "cinema")
    private Set<Showtime> showtimes = new HashSet<>();

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Set<Showtime> getShowtimes() {
        return showtimes;
    }

    public void setShowtimes(Set<Showtime> showtimes) {
        this.showtimes = showtimes;
    }

    public Cinema() {
    }

    public Cinema(String name, String location) {
        this.name = name;
        this.location = location;
    }
}
