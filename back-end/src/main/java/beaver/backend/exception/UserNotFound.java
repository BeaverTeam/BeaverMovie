package beaver.backend.exception;

/**
 * Created by parda on 2017/5/31.
 */
public class UserNotFound extends Exception {
    public UserNotFound () {
        super("用户不存在");
    }
}
