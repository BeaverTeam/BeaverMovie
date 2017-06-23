package beaver.backend.controller;

import beaver.backend.entity.TicketOrder;
import beaver.backend.entity.requestType.AcceptMovieInvitationRequest;
import beaver.backend.entity.requestType.MovieInvitationRequest;
import beaver.backend.entity.responseType.Info;
import beaver.backend.entity.responseType.MovieInvitationItem;
import beaver.backend.exception.NotLogin;
import beaver.backend.service.MovieInvitationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

/**
 * Created by parda on 2017/6/14.
 */
@RestController
@RequestMapping("/movie-invitation")
public class MovieInvitationController {
    @Autowired
    MovieInvitationService movieInvitationService;

    @GetMapping
    public ResponseEntity<Info> getInvitation(HttpSession session) throws NotLogin, Exception {
        Long userId = (Long)session.getAttribute("currentUser");
        if (userId == null)
            throw new NotLogin();
        Map<String, Set<MovieInvitationItem>> map = new HashMap<>();
        map.put("PostAndHandled", movieInvitationService.getPostedAndHandledInvitation(userId));
        map.put("ReceivedNotHandled", movieInvitationService.getReceivedButUnhandledInvitation(userId));
        return new ResponseEntity<Info>(new Info("success", "Get post & handled invitation and received but not handled invitation", map), HttpStatus.OK);
    }

    @PostMapping("/invite")
    public ResponseEntity<Info> invite(@RequestBody MovieInvitationRequest movieInvitationRequest, HttpSession session) throws NotLogin, Exception {
        Long userId = (Long)session.getAttribute("currentUser");
        if (userId == null)
            throw new NotLogin();

        TicketOrder order = movieInvitationService.addInvitation(userId, movieInvitationRequest.getPosterSeats(), movieInvitationRequest.getReceiverNames(), movieInvitationRequest.getReceiverSeats(), movieInvitationRequest.getShowtimeId());
        return new ResponseEntity<Info>(new Info("success", "Invitation Sent", order.getId()), HttpStatus.OK);
    }

    @PostMapping("/accept")
    public ResponseEntity<Info> acceptInvitation(@RequestBody AcceptMovieInvitationRequest acceptMovieInvitationRequest, HttpSession session) throws NotLogin, Exception {
        Long userId = (Long)session.getAttribute("currentUser");
        if (userId == null)
            throw new NotLogin();
        TicketOrder order = movieInvitationService.acceptInvitation(userId, acceptMovieInvitationRequest.getMovieInvitationId(), acceptMovieInvitationRequest.getSeats());
        return new ResponseEntity<Info>(new Info("success", "Accept Success", order.getId()), HttpStatus.OK);
    }

    @GetMapping("/reject/{id}")
    public ResponseEntity<Info> rejectInvitation(@PathVariable long id, HttpSession session) throws NotLogin, Exception {
        Long userId = (Long)session.getAttribute("currentUser");
        if (userId == null)
            throw new NotLogin();
        movieInvitationService.rejectInvitation(id);
        return new ResponseEntity<Info>(new Info("success", "Reject Success"), HttpStatus.OK);
    }
}
