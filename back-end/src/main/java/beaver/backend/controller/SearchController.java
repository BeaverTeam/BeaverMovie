package beaver.backend.controller;

import beaver.backend.entity.responseType.Info;
import beaver.backend.entity.User;
import beaver.backend.exception.NotLogin;
import beaver.backend.exception.UserNotFound;
import beaver.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by parda on 2017/6/8.
 */
@RestController
@RequestMapping("/search")
public class SearchController {
    @Autowired
    UserRepository userRepository;

    @GetMapping
    public ResponseEntity<Info> getDetail(@RequestParam String query, HttpSession session) throws UserNotFound, Exception {
        Long userId = (Long)session.getAttribute("currentUser");
        if (userId == null)
            throw new NotLogin();
        List<User> matchedString = userRepository.findUsersWithPartOfName(query);
        if (matchedString.size() == 0)
            throw new UserNotFound();
        return new ResponseEntity<Info>(new Info("success", "Get Users Info", matchedString), HttpStatus.OK);
    }
}
