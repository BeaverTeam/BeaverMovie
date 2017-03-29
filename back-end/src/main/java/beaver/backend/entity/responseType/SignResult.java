package beaver.backend.entity.responseType;

/**
 * Created by parda on 2017/3/29.
 */
public class SignResult {
    private boolean success;
    private long userId;

    public SignResult() { }

    public SignResult(boolean success, long userId) {
        this.success = success;
        this.userId = userId;
    }

    public boolean isSuccess() {
        return success;
    }

    public long getUserId() {
        return userId;
    }
}
