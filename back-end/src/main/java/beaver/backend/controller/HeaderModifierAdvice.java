package beaver.backend.controller;

import org.springframework.core.MethodParameter;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;
import java.util.Arrays;

/**
 * Created by parda on 2017/4/8.
 */
@ControllerAdvice
public class HeaderModifierAdvice implements ResponseBodyAdvice<Object> {

    @Override
    public boolean supports(MethodParameter returnType, Class<? extends HttpMessageConverter<?>> converterType) {
        return true;
    }

    @Override
    public Object beforeBodyWrite(Object body, MethodParameter returnType, MediaType selectedContentType, Class<? extends HttpMessageConverter<?>> selectedConverterType, ServerHttpRequest request, ServerHttpResponse response) {
        response.getHeaders().setAccessControlExposeHeaders(Arrays.asList(HttpHeaders.SET_COOKIE));
        response.getHeaders().setAccessControlAllowHeaders(Arrays.asList(HttpHeaders.SET_COOKIE, HttpHeaders.CONTENT_TYPE, HttpHeaders.ORIGIN, HttpHeaders.ACCEPT, HttpHeaders.AUTHORIZATION));
        return body;
    }
}