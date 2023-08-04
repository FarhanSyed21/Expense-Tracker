import { navigate } from "react-router-dom";
import "./CompleteProfile.css";
import { AiOutlineGithub } from "react-icons/ai";
import { BsGlobe2 } from "react-icons/bs";
import { getAuth, updateProfile, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

const CompleteProfile = () => {
  const [fullName, setFullName] = useState("");
  const [profilePhotoURL, setProfilePhotoURL] = useState("");
  const [updateStatus, setUpdateStatus] = useState(null);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User Data:", user);
        setFullName(user.displayName || "");
        setProfilePhotoURL(user.photoURL || "");
        setDataFetched(true);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleUpdate = () => {
    console.log("Updating profile...");

    if (!fullName || !profilePhotoURL) {
      // console.error("Error: Fill in all required fields.");
      setUpdateStatus("error");
      return;
    }

    const auth = getAuth();
    const user = auth.currentUser;

    updateProfile(user, {
      displayName: fullName,
      photoURL: profilePhotoURL
    })
      .then(() => {
        // console.log("Profile updated successfully");
        setUpdateStatus("success");
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        setUpdateStatus("error");
      });
  };

  return (
    <div className="main-container">
      <nav>
        <div className="complete-navbar">
          <h1>Winner never quite, Quitters never win.</h1>
          {updateStatus !== "success" ? (
            <p>
              {dataFetched
                ? "Your Profile is 64% completed. A complete Profile has a higher chance of landing a job."
                : "Fetching your profile data..."}
            </p>
          ) : (
            <p>Your Profile is 100% completed.</p>
          )}
        </div>
      </nav>
      {updateStatus !== "success" && (
        <div className="detail-container">
          <div>
            <div className="complete-head">
              <h1>Contact Details</h1>
              <button>Cancel</button>
            </div>
            <div className="details">
              <div>
                <AiOutlineGithub />
                <label htmlFor="name">Full Name </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div>
                <BsGlobe2 />
                <label htmlFor="photo">Profile Photo URL </label>
                <input
                  type="url"
                  value={profilePhotoURL}
                  onChange={(e) => setProfilePhotoURL(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="btn">
              <button onClick={handleUpdate}>Update</button>
            </div>
          </div>
        </div>
      )}
      {updateStatus === "success" && (
        <div className="success-message">Profile updated successfully!</div>
      )}
      {updateStatus === "error" && (
        <div className="error-message">
          Error updating profile. Please try again.
        </div>
      )}
    </div>
  );
};
export default CompleteProfile;
