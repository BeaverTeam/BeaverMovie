package beaver.backend.exception;

import beaver.backend.entity.responseType.Info;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by parda on 2017/5/31.
 */
@ControllerAdvice
@ResponseBody
@ResponseStatus(HttpStatus.OK)
public class GlobalExceptionHandler {

    @ExceptionHandler(UserNotFound.class)
    public Info userNotFoundHandler(HttpServletRequest req, UserNotFound e) {
        return new Info("failed", e.getMessage());
    }

    @ExceptionHandler(BadRequest.class)
    public Info badRequestHandler(HttpServletRequest req, BadRequest e) {
        return new Info("failed", e.getMessage());
    }

    @ExceptionHandler(DuplicatedUserName.class)
    public Info duplicatedHandler(HttpServletRequest req, DuplicatedUserName e) {
        return new Info("failed", e.getMessage());
    }

    @ExceptionHandler(NotLogin.class)
    public Info notLoginHandler(HttpServletRequest req, NotLogin e) {
        return new Info("failed", e.getMessage());
    }

    @ExceptionHandler(SeatUnavaliable.class)
    public Info seatUnavailable(HttpServletRequest req, SeatUnavaliable e) {
        return new Info("failed", e.getMessage());
    }

    @ExceptionHandler(Exception.class)
    public Info unkownException(HttpServletRequest req) {
        return new Info("failed", "Unkown Failure");
    }
}
