package beaver.backend.entity.responseType;

import beaver.backend.entity.Movie;

import java.util.List;

/**
 * Created by parda on 2017/5/27.
 */
public class ResponseMovies {
    private List<Movie> movies;
    private String state;

    public ResponseMovies() {
    }

    public List<Movie> getMovies() {
        return movies;
    }

    public void setMovies(List<Movie> movies) {
        this.movies = movies;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }
}