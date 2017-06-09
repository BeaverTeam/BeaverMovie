package beaver.backend.service;

import beaver.backend.entity.User;
import beaver.backend.entity.responseType.Info;
import beaver.backend.entity.responseType.UserDetail;
import beaver.backend.exception.NotLogin;
import beaver.backend.exception.UserNotFound;
import beaver.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Optional;

/**
 * Created by parda on 2017/6/2.
 */
@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public Optional<User> getOne(long id) {
        return Optional.of(userRepository.findOne(id));
    }

    public UserDetail getUserDetail(long id) {
        return new UserDetail(userRepository.findOne(id));
    }

    public boolean checkNameExist(String name) {
        return userRepository.findByUsername(name) != null;
    }

    public String getName(long id) {
        return userRepository.findOne(id).getUsername();
    }

    public void update(long id, UserDetail userDetail) {
        User u = userRepository.findOne(id);
        if (userDetail.getUsername() != null)
            u.setUsername(userDetail.getUsername());
        if (userDetail.getAvatar() != null)
            u.setAvatar(userDetail.getAvatar());
        if (userDetail.getPhone() != null)
            u.setPhone(userDetail.getPhone());
        userRepository.save(u);
    }

    public List<User> searchLikeUsers(String query) { return userRepository.findUsersWithPartOfName(query); }
}
