import { React } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../Redux/reducers/registerSlice";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Nav from "../Navbar/Nav";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Please enter your first name.")
    .matches(
      /^[a-zA-Z'-]*[a-zA-Z][a-zA-Z'-]*$/,
      "Name can only contain letters and standard punctuation."
    )
    .min(1, "Name must be at least 1 character.")
    .max(50, "Name must be at most 50 characters."),
  email: yup
    .string()
    .email("Please Enter valid email")
    .required("Please enter your email."),
  password: yup
    .string()
    .required("Please create a password.")
    .min(8, "Password must be at least 8 characters long.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must include a mix of letters, numbers, and special characters. At least one character must be a capital letter."
    ),
  cpassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (data) => {
    try {
      const response = await fetch(
        "https://6630e648c92f351c03db7f68.mockapi.io/api/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to register");
      }

      // Assuming you want to dispatch an action after successful registration
      dispatch(registerUser(data));

      // Reset form
      reset(); // Assuming reset is defined somewhere to clear form data

      // Navigate to home page after successful registration
      navigate("/signin");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  //   const formValues = useSelector((state) => state.register)
  return (
    <>
      <Nav showCard={false} />
      <div class="formgroup">
        <div class="center">
          <h1>Register</h1>
          <form onSubmit={handleSubmit(onSubmitHandler)} id="form">
            <div class="txt_field">
              <input {...register("name")} type="text" name="name" />
              <span className="errormessage">{errors.name?.message}</span>
              <label>Name</label>
            </div>
            <div class="txt_field">
              <input {...register("email")} type="email" name="email" />
              <span className="errormessage">{errors.email?.message}</span>
              <label>Email</label>
            </div>
            <div class="txt_field">
              <input
                {...register("password")}
                type="password"
                name="password"
              />
              <span className="errormessage">{errors.password?.message}</span>
              <label>Password</label>
            </div>
            <div class="txt_field">
              <input
                {...register("cpassword")}
                type="password"
                name="cpassword"
              />
              <span className="errormessage">{errors.cpassword?.message}</span>
              <label>Confirm Password</label>
            </div>
            <input name="submit" type="Submit" value="Sign Up" />
            <div class="signup_link">
              Have an Account ? <a href="loginForm.php">Login Here</a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
