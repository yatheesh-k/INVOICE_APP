package com.invoicelogin.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class UserLoginRequest {

    @NotEmpty(message = "{user.userEmail.message}")
    @Schema(required = true, description = "${login.userEmail.description}", example = "admin")
    @JsonProperty("userEmail")
    private String userEmail;

    @NotEmpty(message = "{user.password.message}")
    @Schema(required = true, description = "${login.password.description}", example = "password")
    @JsonProperty("password")
    private String password;
}
