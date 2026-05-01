import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("userRole");
    navigate("../login");
  };
  return (
    <>
      <button type="button" className="btn btn-primary" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
};

export default LogoutButton;
