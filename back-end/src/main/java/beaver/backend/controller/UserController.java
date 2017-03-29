package beaver.backend.controller;

import beaver.backend.entity.User;
import beaver.backend.entity.requestType.SignRequest;
import beaver.backend.entity.responseType.SignResult;
import beaver.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

/**
 * Created by parda on 2017/3/29.
 */
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @RequestMapping("/sign-up")
    public SignResult signUp(SignRequest request) {
        User u = new User(request.getUsername(), request.getEncryptedPassword());
        try {
            userRepository.save(u);
        } catch (Exception e) {
            return new SignResult(false, -1);
        }
        return new SignResult(true, u.getId());
    }

    @RequestMapping("/sign-in")
    public SignResult signIn(SignRequest request, HttpSession session) {
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
