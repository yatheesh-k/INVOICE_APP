import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { Modal, ModalBody, ModalHeader, ModalTitle } from "react-bootstrap";
import Loader from "../Loader"
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { loginApi } from "../Axios";

const Login = () => {
    const { register, handleSubmit,trigger, formState: { errors } } = useForm({ defaultValues: { userName: "", password: "" }, mode: "onChange" });
    //   const { setAuthUser } = useAuth();
    const navigate = useNavigate();
    const [passwordShown, setPasswordShown] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const togglePasswordVisibility = () => {
        setPasswordShown(!passwordShown);
    };

    const onSubmit = async (data) => {
        setLoading(true); // Set loading to true when the request starts
        try {
            const response = await loginApi(data)
            const token = response.data?.token;
            if (token) {
                try {
                    const decodedToken = jwtDecode(token);
                    const { sub: userId, roles: userRole, company, employeeId } = decodedToken;
                    //   setAuthUser({ userId, userRole, company, employeeId });

                    toast.success("Login Successful");
                    console.log("Navigating to /main");
                    navigate("/main");
                } catch (decodeError) {
                    setErrorMessage("Failed to decode token. Ensure token is valid.");
                    setShowErrorModal(true);
                }
            } else {
                setErrorMessage("Unexpected response format. Token not found.");
                setShowErrorModal(true);
            }
        } catch (error) {
            if (error) {
                const errorMessage = error;
                setErrorMessage(errorMessage);
                setShowErrorModal(true);
            } else {
                setErrorMessage("Login failed. Please try again later.");
                setShowErrorModal(true);
            }
        } finally {
            setLoading(false); // Set loading to false after the request is completed
        }
    };
    const closeModal = () => {
        setShowErrorModal(false);
        setErrorMessage(""); // Clear error message when modal is closed
    };
    const handleEmailChange = (e) => {
        if (e.keyCode === 32) {
            e.preventDefault();
        }
    };
    const validatePassword = (value) => {
        const errors = [];
        if (!/(?=.*[0-9])/.test(value)) {
            errors.push("at least one digit");
        }
        if (!/(?=.*[a-z])/.test(value)) {
            errors.push("at least one lowercase letter");
        }
        if (!/(?=.*[A-Z])/.test(value)) {
            errors.push("at least one uppercase letter");
        }
        if (!/(?=.*\W)/.test(value)) {
            errors.push("at least one special character");
        }
        if (value.includes(" ")) {
            errors.push("no spaces");
        }
        if (errors.length > 0) {
            return `Password must contain ${errors.join(", ")}.`;
        }
        return true;
    };
    const EmailValidation = (value) => {
        if (/[A-Z]/.test(value)) {
            return "Email cannot contain uppercase letters";
        }
        return /^[a-z]([a-z0-9._-]*[a-z0-9])?@[a-z]([a-z0-9.-]*[a-z0-9])?\.(com|in|net|gov|org|edu)$/.test(value) || "Invalid Email format";
    };
    return (
        <div className="main-wrapper">
            {loading && <Loader />}
            <div className="auth-wrapper d-flex justify-content-center align-items-center" style={{ backgroundColor: "#11375B" }}>
                <div className="auth-box border-top border-secondary" style={{ backgroundColor: "#fefef" }} >
                    <div id="loginform">
                        <div className="text-center p-t-20 p-b-20">
                            <span className="db"><img src="assets/images/pathbreaker_logo.png" style={{ height: "80px", width: "300px", marginBottom: "18px" }} alt="logo" /></span>
                        </div>
                        <form className="form-horizontal m-t-20" onSubmit={handleSubmit(onSubmit)}>
                            <div className="row p-b-30">
                                <div className="col-12">
                                    <div className="input-group-prepend">
                                        <label style={{ color: "orange" }}>Email Id</label>
                                    </div>
                                    <input className="form-control"
                                        type="email"
                                        placeholder="Email Id"
                                        autoComplete="off"
                                        onKeyDown={handleEmailChange}
                                        {...register("userName", {
                                            required: "Email Id is Required.",
                                            validate: EmailValidation,
                                            onChange: async (e) => {
                                                e.target.value = e.target.value.trim();
                                                await trigger('userName');
                                            },
                                        })}
                                    />
                                    {errors.userName && <p className="errorsMsg">{errors.userName.message}</p>}
                                    <div className="input-group-prepend">
                                        <label style={{ color: "orange" }}>Password</label>
                                    </div>
                                    <div className="input-group">
                                        <input className="form-control" name="password" id="password" placeholder="Enter Password"
                                            onChange={handleEmailChange}
                                            type={passwordShown ? "text" : "password"}
                                            {...register("password", {
                                                required: "Enter Password",
                                                minLength: {
                                                    value: 8,
                                                    message: "Password must be at least 8 characters long"
                                                },
                                                validate: validatePassword,
                                            })}
                                        />
                                        <span
                                            onClick={togglePasswordVisibility}
                                            style={{ cursor: 'pointer', marginLeft: '10px', marginTop: '7px' }}
                                            aria-label={passwordShown ? "Hide password" : "Show password"}
                                        >
                                            {passwordShown ? <Eye size={20} /> : <EyeSlash size={20} />}
                                        </span>
                                    </div>
                                    {errors.password && ((<p className="errorsMsg">{errors.password.message}</p>))}
                                </div>
                            </div>
                            <div className="row border-secondary">
                                <div className="col-12">
                                    <div className="form-group">
                                        <div className="p-t-20">
                                            <button className="btn btn-success mt-3" style={{ marginLeft: "40%" }} >Login</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
            {/* Error Modal */}
            < Modal
                show={showErrorModal}
                onHide={closeModal}
                centered
                style={{ zIndex: "1050" }}
                className="custom-modal"
            >
                <ModalHeader closeButton>
                    <ModalTitle className="text-center">Error</ModalTitle>
                </ModalHeader>
                <ModalBody className="text-center fs-bold">
                    {errorMessage}
                </ModalBody>
            </Modal >
        </div >
    );
};
export default Login;
