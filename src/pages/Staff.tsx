import { Navigate, Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Summary from "../components/Summary";
import ModifyCourses from "../components/ModifyCourses";

const Staff = () => {
  let pages = ["Summary", "Modify Courses"];

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
              <Route path="Summary" element={<Summary />} />
              <Route path="ModifyCourses" element={<ModifyCourses />} />
              <Route path="*" element={<Navigate to={"Summary"} />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default Staff;
