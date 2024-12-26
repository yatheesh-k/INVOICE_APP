package com.invoicelogin.util;
import org.springframework.stereotype.Component;

import javax.swing.plaf.PanelUI;

@Component
public class Constants {
    // Error Messages
    public static final String REMOTE_SERVICE_UNAVAILABLE = "Remote service is not available at the moment";
    public static final String REQUEST_PAYLOAD_INVALID = "Request payload is not valid";
    public static final String REQUEST_UNAUTHORIZED = "Request is unauthorized";
    public static final String REQUEST_RESOURCE_DUPLICATE = "Resource already exists";
    public static final String REQUEST_RESOURCE_NOT_FOUND = "Resource not found";
    public static final String REQUEST_OPERATION_INVALID = "This operation is not allowed";
    public static final String REQUEST_UNABLE_TO_PROCESS = "Remote service is not able to process the request at the moment";
    public static final String USER ="user";
    public static final String COMPANY = "company";
    public static final String ROLES = "roles";
    public static final String SUCCESS ="success" ;
    public static final String PASSWORD = "password";
    public static final String OTP = "otp";
    public static final String EXPIRY_TIME = "expiry_time";
    public static final String COMPANY_ID ="company_Id";
    public static final String USER_ID = "user_Id";
    public static final String BEARER = "Bearer";
    public static final String JWT = "JWT";
    public static final String AUTHORIZATION = "Authorization";
}

