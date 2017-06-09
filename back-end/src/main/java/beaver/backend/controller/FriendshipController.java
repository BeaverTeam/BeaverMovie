package beaver.backend.controller;

import beaver.backend.entity.responseType.FriendInvitationItem;
import beaver.backend.entity.responseType.Info;
import beaver.backend.exception.NotLogin;
import beaver.backend.exception.UserNotFound;
import beaver.backend.service.FriendshipService;
import beaver.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by parda on 2017/6/9.
 */
@RestController
@RequestMapping("/friendship")
public class FriendshipController {

    @Autowired
    FriendshipService friendshipService;

    @Autowired
    UserService userService;

    @GetMapping
    public ResponseEntity<Info> getFriends(HttpSession session) throws NotLogin {
        Long userId = (Long)session.getAttribute("currentUser");
        if (userId == null)
            throw new NotLogin();
        return new ResponseEntity<Info>(new Info("success", "Get Friends", userService.getFriends(userId)), HttpStatus.OK);
    }

    @GetMapping("/accept/{id}")
    public ResponseEntity<Info> acceptInvitation(@PathVariable long id, HttpSession session) throws NotLogin, Exception {
        Long userId = (Long)session.getAttribute("currentUser");
        if (userId == null)
            throw new NotLogin();
        friendshipService.acceptInvitation(userId, id);
        return new ResponseEntity<Info>(new Info("success", "Accept Success"), HttpStatus.OK);
    }

    @GetMapping("/reject/{id}")
    public ResponseEntity<Info> rejectInvitation(@PathVariable long id, HttpSession session) throws NotLogin, Exception {
        Long userId = (Long)session.getAttribute("currentUser");
        if (userId == null)
            throw new NotLogin();
        friendshipService.rejectInvitation(id);
        return new ResponseEntity<Info>(new Info("success", "Accept Success"), HttpStatus.OK);
    }

    @GetMapping("/invite")
    public ResponseEntity<Info> invite(@RequestParam String username, HttpSession session) throws NotLogin, UserNotFound, Exception {
        if (session.getAttribute("currentUser") == null)
            throw new NotLogin();
        if(!friendshipService.addFriendInvitation((long)session.getAttribute("currentUser"), username))
            throw new UserNotFound();
        return new ResponseEntity<Info>(new Info("success", "Invitation Sent"), HttpStatus.OK);
    }

    // 只返回已发出且被处理的邀请和已接受且没有被处理的邀请
    @GetMapping("/get-invitation")
    public ResponseEntity<Info> InvitationItem(HttpSession session) throws NotLogin, Exception {
        Long userId = (Long)session.getAttribute("currentUser");
        if (userId == null)
            throw new NotLogin();
        Map<String, List<FriendInvitationItem>> map = new HashMap<>();
        map.put("PostAndHandled", friendshipService.getPostedAndHandledInvitation(userId));
        map.put("ReceivedNotHandled", friendshipService.getReceivedButUnhandledInvitation(userId));
        return new ResponseEntity<Info>(new Info("success", "Get post & handled invitation and received but not handled invitation", map), HttpStatus.OK);
    }
}
