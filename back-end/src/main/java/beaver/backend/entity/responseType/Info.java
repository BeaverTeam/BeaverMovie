package beaver.backend.entity.responseType;

/**
 * Created by parda on 2017/5/31.
 */
public class Info<T> {
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

    public Info(String message, T data) {
        this.message = message;
        this.data = data;
    }

    public Info(String message) {
        this.message = message;
        data = null;
    }

    public Info() {

    }
}

