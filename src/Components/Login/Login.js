import React from "react";
import "./Login.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Nav from "../Navbar/Nav";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Please Enter valid email")
    .required("Please enter your email."),
  password: yup
    .string()
    .required("Please Enter a password.")
    .min(8, "Password must be at least 8 characters long.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must include a mix of letters, numbers, and special characters. At least one character must be a capital letter."
    ),
});

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = async (data) => {
    try {
      const response = await fetch(
        "https://6630e648c92f351c03db7f68.mockapi.io/api/signup",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("failed to get data");
      }
      const result = await response.json();

      const checkemail = (userdata) => {
        return (
          userdata.email === data.email && userdata.password === data.password
        );
      };
      const user = result.find(checkemail);
      if (user) {
        localStorage.setItem("isLoggedIn", "true");
        reset();
        navigate("/blogs");
      } else {
        alert("Invalid email or password");
      }
      // Assuming reset is defined somewhere to clear form data

      // Navigate to home page after successful registration
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };
  return (
    <>
      <Nav showCard={false} />
      <div className="container-fluid loginform">
        <div className="screen">
          <div className="screen__content">
            <form className="login" onSubmit={handleSubmit(onSubmitHandler)}>
              <div className="login__field">
                <i className="login__icon fas fa-user"></i>
                <input
                  {...register("email")}
                  type="text"
                  className="login__input"
                  placeholder="Email"
                />
                <span className="errormessage">{errors.email?.message}</span>
              </div>
              <div className="login__field">
                <i className="login__icon fas fa-lock"></i>
                <input
                  {...register("password")}
                  type="password"
                  className="login__input"
                  placeholder="Password"
                />
                <span className="errormessage">{errors.password?.message}</span>
              </div>
              <button className="button login__submit">
                <span className="button__text">Log In Now</span>
                <i className="button__icon fas fa-chevron-right"></i>
              </button>
            </form>
            {/* <div className="social-login">
            <h3>log in via</h3>
            <div className="social-icons">
              <a href="#" className="social-login__icon fab fa-instagram"></a>
              <a href="#" className="social-login__icon fab fa-facebook"></a>
              <a href="#" className="social-login__icon fab fa-twitter"></a>
            </div>
          </div> */}
          </div>
          <div className="screen__background">
            <span className="screen__background__shape screen__background__shape4"></span>
            <span className="screen__background__shape screen__background__shape3"></span>
            <span className="screen__background__shape screen__background__shape2"></span>
            <span className="screen__background__shape screen__background__shape1"></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
