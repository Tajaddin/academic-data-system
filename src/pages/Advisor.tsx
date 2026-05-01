import { Navigate, Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import AddDrop from "../components/AddDrop";
import WhatIf from "../components/WhatIf";
import Summary from "../components/Summary";

const Advisor = () => {
  let pages = ["Summary", "Add/Drop", "What-If"];

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
              <Route path="AddDrop" element={<AddDrop />} />
              <Route path="WhatIf" element={<WhatIf />} />
              <Route path="*" element={<Navigate to={"Summary"} />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default Advisor;
