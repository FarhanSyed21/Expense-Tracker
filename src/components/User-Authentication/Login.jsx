import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("Please provide both email and password.");
      return;
    }

    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setErrorMessage("");
      navigate("/home");
    } catch (error) {
      setErrorMessage("Invalid email or password.");
    }
  };

  return (
    <div className="login-container">
      <form className="form-container" onSubmit={handleSubmit}>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <br />
        <label htmlFor="email">Email Id</label>
        <input
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <div className="password-input-container">
          <input
            type={passwordVisible ? "text" : "password"}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <div
            className="password-toggle-icon"
            onClick={togglePasswordVisibility}
          >
            {passwordVisible ? <FaEye /> : <FaEyeSlash />}
          </div>
        </div>
        <div className="buttons-container">
          <button type="submit">Log In</button>
        </div>
        <br />
        Forget Password
      </form>
      <div className="dont-have-account">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};
export default Login;
