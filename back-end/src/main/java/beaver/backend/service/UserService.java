package beaver.backend.service;

import beaver.backend.entity.User;
import beaver.backend.entity.responseType.UserDetail;
import beaver.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by parda on 2017/6/2.
 */
@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public UserDetail getUserDetail(long id) {
        return new UserDetail(userRepository.findOne(id));
    }

    public boolean checkNameExist(String name) {
        return userRepository.findByUsername(name) == null;
    }

    public String getName(long id) {
        return userRepository.findOne(id).getUsername();
    }

    public void update(long id, UserDetail userDetail) {
        User u = userRepository.findOne(id);
        if (userDetail.getUsername() != null)
            u.setUsername(userDetail.getUsername());
        if (userDetail.getAvater() != null)
            u.setAvater(userDetail.getAvater());
        if (userDetail.getPhone() != null)
            u.setPhone(userDetail.getPhone());
        userRepository.save(u);
    }
}
