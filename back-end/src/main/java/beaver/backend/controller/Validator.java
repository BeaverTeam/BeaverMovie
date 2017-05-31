package beaver.backend.controller;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Validator {
    public static boolean isUsername(String str) {
        String regex = "^[A-Za-z0-9]{5,10}$"; //username regex
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(str);
        return matcher.matches();
//        return true;
    }

    public static boolean isEncryptedPassword(String str) {
        String regex = "^[A-Za-z0-9]{16}$"; //MD5 regex
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(str);
        return matcher.matches();
//        return true;
    }
}