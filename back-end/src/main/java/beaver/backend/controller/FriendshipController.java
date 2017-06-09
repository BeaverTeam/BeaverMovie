package beaver.backend.controller;

import beaver.backend.entity.responseType.FriendInvitationItem;
import beaver.backend.entity.responseType.Info;
import beaver.backend.exception.NotLogin;
import beaver.backend.exception.UserNotFound;
import beaver.backend.service.FriendshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * Created by parda on 2017/6/9.
 */
@RestController
@RequestMapping("/friendship")
public class FriendshipController {

    @Autowired
    FriendshipService friendshipService;

    @GetMapping("/invite")
    public ResponseEntity<Info> invite(@RequestParam String username, HttpSession session) throws NotLogin, UserNotFound, Exception {
        if (session.getAttribute("currentUser") == null)
            throw new NotLogin();
        if(!friendshipService.addFriendship((long)session.getAttribute("currentUser"), username))
            throw new UserNotFound();
        else
            return new ResponseEntity<Info>(new Info("success", "Invitation Sent"), HttpStatus.OK);
    }

    @GetMapping("/get-invitation")
    public ResponseEntity<Info> InvitationItem(HttpSession session) throws NotLogin, Exception {
        if (session.getAttribute("currentUser") == null)
            throw new NotLogin();
        return new ResponseEntity<Info>(new Info("success", "Invitation Get", friendshipService.getInvitationItem((long)session.getAttribute("currentUser"))), HttpStatus.OK);
//        return friendshipService.getInvitationItem((long)session.getAttribute("currentUser"));
    }
}
