package beaver.backend.controller;

import beaver.backend.entity.responseType.Info;
import beaver.backend.service.ShowtimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by parda on 2017/6/2.
 */
@RestController
@RequestMapping("/showtime")
public class ShowtimeController {

    @Autowired
    ShowtimeService showtimeService;

    @GetMapping("/{id}/unavailableSeats")
    public ResponseEntity<Info> getUnavailableSeats(@PathVariable long id) {
        return new ResponseEntity<Info>(new Info("success", "Get Seats", showtimeService.getUnavailableSeats(id)), HttpStatus.OK);
    }
}
