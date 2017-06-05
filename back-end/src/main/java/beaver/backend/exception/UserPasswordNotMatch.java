package beaver.backend.exception;

/**
 * Created by parda on 2017/5/31.
 */
public class UserPasswordNotMatch extends Exception {
    public UserPasswordNotMatch () {
        super("用户名或密码错误");
    }
}
