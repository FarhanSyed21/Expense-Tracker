import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  signOut
} from "firebase/auth";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [emailVerified, setEmailVerified] = useState(false);

  const handleLogOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log("Error signing out:", error.message);
      });
  };

  const handleClick = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user && !user.emailVerified) {
      sendVerificationEmail(user);
    } else {
      navigate("/complete");
    }
  };

  const sendVerificationEmail = (user) => {
    sendEmailVerification(user)
      .then(() => {
        console.log("Verification email sent.");
      })
      .catch((error) => {
        console.error("Error sending verification email:", error.message);
      });
  };

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user && user.emailVerified) {
      setEmailVerified(true);
    }
  }, []);

  return (
    <>
      <div className="home-container">
        <nav>
          <h1>Welcome</h1>
          <p>
            Your profile is incomplete.
            <button onClick={handleClick} className="complete">
              Complete now
            </button>
          </p>
          <button onClick={handleLogOut} className="logout">
            Log Out
          </button>
        </nav>
      </div>
      <div className="home-body">
        <h1>Verify your email </h1>
        {emailVerified || getAuth().currentUser?.emailVerified ? (
          <p>Email already verified.</p>
        ) : (
          <button onClick={handleClick} className="verify-button">
            Verify Email
          </button>
        )}
      </div>
    </>
  );
};
export default Home;
