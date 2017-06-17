package beaver.backend.controller;

import beaver.backend.entity.Movie;
import beaver.backend.entity.Showtime;
import beaver.backend.entity.responseType.Info;
import beaver.backend.exception.BadRequest;
import beaver.backend.repository.CinemaRepository;
import beaver.backend.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Created by parda on 2017/5/27.
 */
@RestController
@RequestMapping("/movie")
public class MovieController {
    @Autowired
    MovieService movieService;

    @GetMapping("/{id}")
    public ResponseEntity getMovie(@PathVariable long id) {
         return movieService.getMovieDetail(id);
    }

    @GetMapping("/lastest/{page}")
    public ResponseEntity<Info> getLastestMovies(@PathVariable int page) throws BadRequest {
        if (page <= 0)
            throw new BadRequest("Request not valid");
        List<Movie> movies = movieService.getLastest((page - 1) * 10);
        if (page == 1 && movies.isEmpty()) {
            movies = movieService.addMovies().stream().limit(10).collect(Collectors.toList());
        }
        return new ResponseEntity<Info>(new Info<>("success", "Retrieve Success", movies), HttpStatus.OK);
    }

    @GetMapping("/{id}/showtimes")
    public ResponseEntity<Info> getShowtimes(@PathVariable int id) throws Exception {
        return new ResponseEntity<Info>(new Info("success", "Retrive Showtimes", movieService.getShowtimes(id)), HttpStatus.OK);
    }
}
