package beaver.backend.controller;

import beaver.backend.controller.Validator;
import beaver.backend.entity.User;
import beaver.backend.entity.requestType.SignRequest;
import beaver.backend.entity.responseType.SignResult;
import beaver.backend.exception.BadRequest;
import beaver.backend.exception.DuplicatedUserName;
import beaver.backend.exception.NotLogin;
import beaver.backend.exception.UserNotFound;
import beaver.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.regex.Pattern;

/**
 * Created by parda on 2017/3/29.
 */
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @RequestMapping("/sign-up")
    public ResponseEntity signUp(@RequestBody SignRequest request) throws BadRequest, DuplicatedUserName, Exception {

        Validator validator = new Validator();
        if(!validator.isUsername(request.getUsername()) || !validator.isEncryptedPassword(request.getEncryptedPassword())) {
            throw new BadRequest("Request not valid");
        } else if (userRepository.findByUsername(request.getUsername()) != null) {
            throw new DuplicatedUserName();
        }

        userRepository.save(new User(request.getUsername(), request.getEncryptedPassword()));

        return new ResponseEntity(HttpStatus.OK);
    }

    @RequestMapping("/sign-in")
    public ResponseEntity signIn(@RequestBody SignRequest request, HttpSession session) throws UserNotFound, Exception {
        User u = userRepository.findByUsernameAndPassword(request.getUsername(), request.getEncryptedPassword());
        if (u == null)
            throw new UserNotFound();

        session.setMaxInactiveInterval(5 * 60);
        session.setAttribute("currentUser", u.getId());
        return new ResponseEntity(HttpStatus.OK);
    }

    @RequestMapping("/sign-out")
    public ResponseEntity signOut(HttpSession session) throws NotLogin, Exception {
        if (session.getAttribute("currentUser") == null)
            throw new NotLogin();
        session.invalidate();
        return new ResponseEntity(HttpStatus.OK);
    }
}
