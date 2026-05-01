import { useState } from "react";
import Login from "./pages/Login";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Student from "./pages/Student";
import Staff from "./pages/Staff";
import Advisor from "./pages/Advisor";
import Instructor from "./pages/Instructor";

type Role = "staff" | "advisor" | "student" | "instructor";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  /**
   * Log in user by setting sessionStorage with their info
   * @param username
   * @param role "staff" | "advisor" | "student" | "instructor"
   */
  const handleLogin = (username: string, role: Role) => {
    setIsAuthenticated(true);
    setUsername(username);
    setUserRole(role);
    sessionStorage.setItem("isAuthenticated", "true");
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("userRole", role);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login onLogin={handleLogin} />} />
          <Route
            path="staff/*"
            element={
              sessionStorage.getItem("isAuthenticated") === "true" &&
              sessionStorage.getItem("userRole") === "staff" ? (
                <Staff />
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />
          <Route
            path="advisor/*"
            element={
              sessionStorage.getItem("isAuthenticated") === "true" &&
              sessionStorage.getItem("userRole") === "advisor" ? (
                <Advisor />
              ) : (
                <Navigate to={"../login"} />
              )
            }
          />
          <Route
            path="instructor/*"
            element={
              sessionStorage.getItem("isAuthenticated") === "true" &&
              sessionStorage.getItem("userRole") === "instructor" ? (
                <Instructor />
              ) : (
                <Navigate to={"../login"} />
              )
            }
          />
          <Route
            path="student/*"
            element={
              sessionStorage.getItem("isAuthenticated") === "true" &&
              sessionStorage.getItem("userRole") === "student" ? (
                <Student />
              ) : (
                <Navigate to={"../login"} />
              )
            }
          />
          <Route
            path="*"
            element={
              //Redirect to user homepage if logged in, otherwise redirect to login page
              <Navigate to={sessionStorage.getItem("userRole") || "../login"} />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
