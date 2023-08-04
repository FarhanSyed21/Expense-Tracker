import SignUp from "./components/User-Authentication/SignUp";
import "./styles.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/User-Authentication/Login";
import Home from "./components/Home/Home";
import CompleteProfile from "./components/Home/CompleteProfile";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./components/UserAuthContext";

export default function App() {
  const [emailVerified, setEmailVerified] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        setEmailVerified(true);
        setUserLoggedIn(true);
      } else {
        setEmailVerified(false);
        setUserLoggedIn(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <UserAuthContextProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/complete"
              element={
                <ProtectedRoute>
                  <CompleteProfile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </UserAuthContextProvider>
      </div>
    </BrowserRouter>
  );
}
