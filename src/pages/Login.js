import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../redux/slices/authSlice";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";

const Login = () => {
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const values = {
      email,
      password,
    };

    dispatch(login(values));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message?.email || message?.password, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
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
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>

          <div className="register-actions">
            {isLoading ? (
              <div className="register-loader">
                <TailSpin
                  height="48"
                  width="60"
                  color="#243D8B"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              </div>
            ) : (
              <button type="submit" className="register-button">
                Login
              </button>
            )}

            <span className="login-prompt">
              Still without an account? <a href="/registration">Sign up</a>
            </span>
          </div>
        </form>
      </div>

      <div className="second-container-login"></div>
    </div>
  );
};

export default Login;
