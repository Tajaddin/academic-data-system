import { Navigate, Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Summary from "../components/Summary";
import InstructorInfo from "../components/InstructorInfo";

const Instructor = () => {
  let pages = ["Home", "Summary"];

  return (
    <>
      <div className="container-fluid px-0">
        <div className="d-flex">
          <div>
            <Sidebar
              pages={pages}
              user={sessionStorage.getItem("username") as string}
            />
          </div>
          <div className="flex-grow-1 p-3">
            <Routes>
              <Route path="Home" element={<InstructorInfo />} />
              <Route path="Summary" element={<Summary />} />
              <Route path="*" element={<Navigate to={"Home"} />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default Instructor;
