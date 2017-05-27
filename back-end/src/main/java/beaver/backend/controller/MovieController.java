package beaver.backend.controller;

import beaver.backend.entity.Movie;
import beaver.backend.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by parda on 2017/5/27.
 */
@RestController
@RequestMapping("/movie")
public class MovieController {
    @Autowired
    MovieService movieService;

    @GetMapping("/refresh")
    public List<Movie> refreshMovies() {
        return movieService.addMovies();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getMovie(@PathVariable long id) {
         return movieService.getMovie(id)
                 .map(movie -> new ResponseEntity<Movie>(movie, HttpStatus.OK))
                 .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/lastest/{page}")
    public List<Movie> getLastestMovies(@PathVariable int page) {
        return movieService.getLastest(page * 5);
    }
}
