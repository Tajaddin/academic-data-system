import { Navigate, Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import WhatIf from "../components/WhatIf";
import AddDrop from "../components/AddDrop";
import StudentInfo from "../components/StudentInfo";

const Student = () => {
  let pages = ["Home", "Add/Drop", "What-If"];

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
              <Route path="Home" element={<StudentInfo />} />
              <Route path="AddDrop" element={<AddDrop />} />
              <Route path="WhatIf" element={<WhatIf />} />
              <Route path="*" element={<Navigate to={"Home"} />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default Student;
