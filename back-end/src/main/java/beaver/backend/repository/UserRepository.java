package beaver.backend.repository;

import beaver.backend.entity.User;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by parda on 2017/3/29.
 */
public interface UserRepository  extends CrudRepository<User, Long> {
    User findByUsername(String name);

    User findByUsernameAndPassword(String name, String password);
}
