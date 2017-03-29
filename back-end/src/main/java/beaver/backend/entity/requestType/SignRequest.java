package beaver.backend.entity.requestType;

/**
 * Created by parda on 2017/3/29.
 */
public class SignRequest {
    private String username;
    private String encryptedPassword;

    public SignRequest() { }

    public SignRequest(String username, String encryptedPassword) {
        this.username = username;
        this.encryptedPassword = encryptedPassword;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEncryptedPassword() {
        return encryptedPassword;
    }

    public void setEncryptedPassword(String encryptedPassword) {
        this.encryptedPassword = encryptedPassword;
    }
}
