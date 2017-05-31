package beaver.backend.entity.responseType;

/**
 * Created by parda on 2017/5/31.
 */
public class Info<T> {
    private String state;
    private String message;
    private T data;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Info(String state, String message, T data) {
        this.state = state;
        this.message = message;
        this.data = data;
    }

    public Info(String state, String message) {
        this.state = state;
        this.message = message;
        data = null;
    }

    public Info() {

    }
}

