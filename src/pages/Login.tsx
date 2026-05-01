import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

type Role = "staff" | "advisor" | "student" | "instructor";

interface Props {
  onLogin: (username: string, role: Role) => void;
}

const Login = ({ onLogin }: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  /**
   * Verify and login user
   * Logged in users are redirected to their homepage
   * TODO: take log in data from database, rather than hardcoded
   * @param event
   */
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (username === "testStaff" && password == "pass") {
      navigate("staff");
      onLogin(username, "staff");
    } else if (username === "testAdvisor" && password == "pass") {
      navigate("/advisor");
      onLogin(username, "advisor");
    } else if (username === "testStudent" && password == "pass") {
      navigate("/student");
      onLogin(username, "student");
    } else if (username === "testInstructor" && password == "pass") {
      navigate("/instructor");
      onLogin(username, "instructor");
    } else {
      setErrorMessage("Invalid username or password");
    }
  };

  return (
    <>
      {/* Title header */}
      <div className="h3 p-3 text-primary text-center">
        Academic Data System
      </div>

      {/* Login form */}
      <div className="col-5 mx-auto" style={{ maxWidth: "500px" }}>
        <form onSubmit={handleSubmit}>
          {/* Username field */}
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              id="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          {/* Password field */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              id="password"
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {/* Submit button */}
          <button type="submit" className="btn btn-primary d-flex mx-auto">
            Login
          </button>

          {/* Error message */}
          <div className="mt-3">
            {errorMessage && (
              <div className="alert alert-primary" role="alert">
                {errorMessage}
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
