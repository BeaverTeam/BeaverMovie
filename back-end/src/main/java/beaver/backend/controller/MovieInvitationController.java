package beaver.backend.controller;

import beaver.backend.entity.responseType.Info;
import beaver.backend.entity.responseType.MovieInvitationItem;
import beaver.backend.exception.NotLogin;
import beaver.backend.service.MovieInvitationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
