import "./Register.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../redux/slices/authSlice";
import { toast } from "react-toastify";

const Register = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handlePasswordChange2 = (e) => {
    setPassword2(e.target.value);
  };
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        username,
        email,
        password,
        confirm: password2,
      };

      dispatch(register(userData));
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(
        message?.username || message?.email || message?.password || message,
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message]);

  return (
    <div className="register-container">
      <div className="first-container">
        <h3>
          Welcome to <span className="highlight-text">Ok Ko</span>
        </h3>
        <h5>
          Our platform conducts thorough code reviews, fostering collaborative
          feedback for top-notch code quality.
        </h5>
        <div className="line-container">
          <div className="line"></div>
          <div className="line-white"></div>
          <div className="line-white"></div>
          <div className="line-white"></div>
        </div>
        <form className="register-form" onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="userName">User Name:</label>
            <input
              type="text"
              id="userName"
              placeholder="Enter your user name"
              onChange={handleUsernameChange}
              value={username}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              placeholder="Enter your email"
              onChange={handleEmailChange}
              value={email}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              onChange={handlePasswordChange}
              value={password}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              onChange={handlePasswordChange2}
              value={password2}
            />
          </div>
          <div className="register-actions">
            <button className="register-button" type="submit">
              Register
            </button>
            <span className="login-prompt">
              Already have an account? <a href="/login">Sign in</a>
            </span>
          </div>
        </form>
      </div>

      <div className="second-container"></div>
    </div>
  );
};

export default Register;
