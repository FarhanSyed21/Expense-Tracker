import { useState } from "react";
import "./SignUp.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setSuccessMessage("User has successfully signed up.");
        setErrorMessage("");
        navigate("/");
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setSuccessMessage("");
      });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible((prevVisible) => !prevVisible);
  };

  return (
    <div className="signup-container">
      <form className="form-container" onSubmit={handleSignUp}>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        <br />
        <label htmlFor="email">Email Id</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <div className="password-input-container">
          <input
            type={passwordVisible ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div
            className="password-toggle-icon"
            onClick={togglePasswordVisibility}
          >
            {passwordVisible ? <FaEye /> : <FaEyeSlash />}
          </div>
        </div>
        <label htmlFor="confirm-password">Confirm Password</label>
        <div className="password-input-container">
          <input
            type={confirmPasswordVisible ? "text" : "password"}
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div
            className="password-toggle-icon"
            onClick={toggleConfirmPasswordVisibility}
          >
            {confirmPasswordVisible ? <FaEye /> : <FaEyeSlash />}
          </div>
        </div>
        <button type="submit">Sign up</button>
        <br />
      </form>
      <div className="already-have-account">
        Already have an account? <Link to="/">Log In</Link>
      </div>
    </div>
  );
};

export default SignUp;
