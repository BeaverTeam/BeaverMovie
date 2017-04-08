package beaver.backend.controller;

import beaver.backend.controller.Validator;
import beaver.backend.entity.User;
import beaver.backend.entity.requestType.SignRequest;
import beaver.backend.entity.responseType.SignResult;
import beaver.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
    public SignResult signUp(@RequestBody SignRequest request) {
//        System.out.println(request.getEncryptedPassword());

        Validator validator = new Validator();
        if(!validator.isUsername(request.getUsername()) || !validator.isEncryptedPassword(request.getEncryptedPassword()))
            return new SignResult(false, -1);

        User u = new User(request.getUsername(), request.getEncryptedPassword());
        try {
            userRepository.save(u);
        } catch (Exception e) {
            return new SignResult(false, -1);
        }
        return new SignResult(true, u.getId());
    }

    @RequestMapping("/sign-in")
    public SignResult signIn(@RequestBody SignRequest request, HttpSession session) {
        User u = userRepository.findByUsernameAndPassword(request.getUsername(), request.getEncryptedPassword());
        if (u == null)
            return new SignResult(false, -1);

        session.setMaxInactiveInterval(5 * 60);
        session.setAttribute("currentUser", u.getId());
        return new SignResult(true, u.getId());
    }

    @RequestMapping("/sign-out")
    public void signOut(HttpSession session) {
        session.invalidate();
    }
}
