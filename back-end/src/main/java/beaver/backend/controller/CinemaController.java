package beaver.backend.controller;

import beaver.backend.entity.responseType.Info;
import beaver.backend.repository.CinemaRepository;
import beaver.backend.service.CinemaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by parda on 2017/6/1.
 */
@RestController
@RequestMapping("/cinema")
public class CinemaController {

    @Autowired
    private CinemaRepository cinemaRepository;

    @Autowired
    private CinemaService cinemaService;

    @GetMapping
    public ResponseEntity<Info> getCinemas() throws Exception {
        return new ResponseEntity<Info>(new Info("success", "Get Cinema", cinemaRepository.findAll()), HttpStatus.OK);
    }

    @GetMapping("/{id}/showtimes/{page}")
    public ResponseEntity<Info> getShowtimes(@PathVariable long id, @PathVariable int page) throws Exception {
        return new ResponseEntity<Info>(new Info("success", "Get Showtimes", cinemaService.getShowtimes(id, (page - 1)*10)), HttpStatus.OK);
    }
}
