package com.invoicelogin.common;

import com.invoicelogin.util.Constants;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import javax.ws.rs.WebApplicationException;

@Builder
@Getter
@Setter
public class ResponseBuilder {
    public static <T> ResponseObject<T> createFailureResponse(ResponseErrorObject object) {
        return ResponseObject.<T>builder()
                .path(ServletUriComponentsBuilder.fromCurrentRequest().toUriString())
                .error(object)
                .build();
    }

    public static <T> ResponseObject<T> createSuccessResponse(T object) {
        return ResponseObject.<T>builder()
                .path(ServletUriComponentsBuilder.fromCurrentRequest().toUriString())
                .message("Success")
                .data(object)
                .build();
    }

    public <T> ResponseObject<T> failureResponse(T object) {
        return ResponseObject.<T>builder()
                .path(ServletUriComponentsBuilder.fromCurrentRequest().toUriString())
                .message("Failed Due To Duplicate Values")
                .data(object)
                .build();
    }

    public ResponseObject createFailureResponse(RuntimeException e) {
        ResponseErrorObject responseErrorObject =
                ResponseErrorObject.builder().message(e.getMessage()).build();
        return ResponseObject.builder()
                .path(ServletUriComponentsBuilder.fromCurrentRequest().toUriString())
                .message(e.getMessage())
                .error(responseErrorObject)
                .build();
    }

    public static ResponseObject createFailureResponse(Throwable e, String message) {
        String path = ServletUriComponentsBuilder.fromCurrentRequest().toUriString();
        String causeErrorMessage = resolveErrorMessage(e);
        String responseErrorMessage = message;

        ResponseErrorObject responseErrorObject =
                ResponseErrorObject.builder().message(causeErrorMessage).build();
        return ResponseObject.builder()
                .path(path)
                .message(responseErrorMessage)
                .error(responseErrorObject)
                .build();
    }

    public static <T> ResponseObject<T> createFailureResponse(Exception e) {
        ResponseErrorObject responseErrorObject = ResponseErrorObject.builder().error(e).message(e.getMessage()).build();
        return ResponseObject.<T>builder()
                .path(ServletUriComponentsBuilder.fromCurrentRequest().toUriString())
                .message(e.getMessage())
                .error(responseErrorObject)
                .build();
    }

    private static String resolveErrorMessage(Throwable e) {
        if (e instanceof WebApplicationException) {
            return e.getMessage();
        }
        return ExceptionUtils.getMessage(e);
    }

    public <T> ResponseObject<T> createSuccessResponseWithTask(T object) {
        return ResponseObject.<T>builder()
                .path(ServletUriComponentsBuilder.fromCurrentRequest().toUriString())
                .message(Constants.SUCCESS)
                .data(object)
                .build();
    }

    public static ResponseObject createFailureResponse(String message) {
        ResponseObject response = new ResponseObject();
        response.setMessage(Constants.SUCCESS);
        response.setMessage(message);
        return response;
    }

    public ResponseObject createFailureResponse(ResponseObject errorResponse) {
        return errorResponse;
    }
}


