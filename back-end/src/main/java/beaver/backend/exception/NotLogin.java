package beaver.backend.exception;

/**
 * Created by parda on 2017/5/31.
 */
public class NotLogin extends Exception {
    public NotLogin() {
        super("未登录");
    }
}
