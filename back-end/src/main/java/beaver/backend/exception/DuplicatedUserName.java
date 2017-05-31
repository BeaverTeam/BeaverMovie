package beaver.backend.exception;

/**
 * Created by parda on 2017/5/31.
 */
public class DuplicatedUserName extends Exception {
    public DuplicatedUserName() {
        super("用户名已存在");
    }
}
