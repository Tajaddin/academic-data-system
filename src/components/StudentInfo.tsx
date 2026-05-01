import { useState } from "react";

interface Enrollment {
  prefix: string;
  number: string;
  name: string;
  credits: number;
  grade: string;
  semester: string;
}

const gradePoints: Record<string, number> = {
  A: 4.0, "A-": 3.7, "B+": 3.3, B: 3.0, "B-": 2.7,
  "C+": 2.3, C: 2.0, "C-": 1.7, D: 1.0, F: 0.0, S: 4.0, U: 0.0,
};

const pastEnrollments: Enrollment[] = [
  { prefix: "COP", number: "2220", name: "Intro to Programming", credits: 3, grade: "A", semester: "F2022" },
  { prefix: "MAC", number: "2311", name: "Calculus I", credits: 4, grade: "B+", semester: "F2022" },
  { prefix: "COP", number: "3530", name: "Data Structures", credits: 3, grade: "A", semester: "S2023" },
  { prefix: "MAD", number: "2104", name: "Discrete Math", credits: 3, grade: "B", semester: "S2023" },
  { prefix: "CDA", number: "3103", name: "Computer Organization", credits: 3, grade: "A-", semester: "F2023" },
  { prefix: "COT", number: "3100", name: "Algorithms", credits: 3, grade: "B+", semester: "F2023" },
  { prefix: "CIS", number: "4301", name: "Database Systems", credits: 3, grade: "A", semester: "S2024" },
  { prefix: "CEN", number: "4010", name: "Software Engineering", credits: 3, grade: "B+", semester: "S2024" },
];

const currentEnrollments: Enrollment[] = [
  { prefix: "COP", number: "4020", name: "Programming Languages", credits: 3, grade: "IP", semester: "F2024" },
  { prefix: "CIS", number: "4930", name: "Machine Learning", credits: 3, grade: "IP", semester: "F2024" },
  { prefix: "COT", number: "4400", name: "Analysis of Algorithms", credits: 3, grade: "IP", semester: "F2024" },
];

function computeGpa(courses: Enrollment[]): string {
  const graded = courses.filter((c) => c.grade in gradePoints);
  if (graded.length === 0) return "N/A";
  const totalPoints = graded.reduce((sum, c) => sum + gradePoints[c.grade] * c.credits, 0);
  const totalCredits = graded.reduce((sum, c) => sum + c.credits, 0);
  return (totalPoints / totalCredits).toFixed(2);
}

const StudentInfo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"current" | "past">("current");
  const gpa = computeGpa(pastEnrollments);
  const completedCredits = pastEnrollments.reduce((sum, c) => sum + c.credits, 0);

  return (
    <>
      <div className="display-6">Student Summary</div>
      <hr />

      {/* Profile card */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <p className="mb-1"><strong>Name:</strong> Alex Johnson</p>
              <p className="mb-1"><strong>Student ID:</strong> U123456</p>
              <p className="mb-1"><strong>Major:</strong> Computer Science</p>
              <p className="mb-1"><strong>Advisor:</strong> Dr. Patricia Moore</p>
            </div>
            <div className="col-md-6">
              <p className="mb-1"><strong>GPA:</strong> {gpa}</p>
              <p className="mb-1"><strong>Credits Completed:</strong> {completedCredits}</p>
              <p className="mb-1"><strong>Classification:</strong> Senior</p>
              <p className="mb-1"><strong>Expected Graduation:</strong> Spring 2025</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "current" ? "active" : ""}`}
            onClick={() => setActiveTab("current")}
          >
            Current Enrollments ({currentEnrollments.length})
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "past" ? "active" : ""}`}
            onClick={() => setActiveTab("past")}
          >
            Past Enrollments ({pastEnrollments.length})
          </button>
        </li>
      </ul>

      {activeTab === "current" && (
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Course</th>
              <th>Name</th>
              <th>Credits</th>
              <th>Status</th>
              <th>Semester</th>
            </tr>
          </thead>
          <tbody>
            {currentEnrollments.map((c) => (
              <tr key={c.prefix + c.number}>
                <td>{c.prefix} {c.number}</td>
                <td>{c.name}</td>
                <td>{c.credits}</td>
                <td><span className="badge bg-warning text-dark">In Progress</span></td>
                <td>{c.semester}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {activeTab === "past" && (
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Course</th>
              <th>Name</th>
              <th>Credits</th>
              <th>Grade</th>
              <th>Semester</th>
            </tr>
          </thead>
          <tbody>
            {pastEnrollments.map((c) => (
              <tr key={c.prefix + c.number + c.semester}>
                <td>{c.prefix} {c.number}</td>
                <td>{c.name}</td>
                <td>{c.credits}</td>
                <td>
                  <span className={`badge ${c.grade.startsWith("A") ? "bg-success" : c.grade === "B" || c.grade.startsWith("B") ? "bg-primary" : "bg-secondary"}`}>
                    {c.grade}
                  </span>
                </td>
                <td>{c.semester}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="table-light">
            <tr>
              <td colSpan={2}><strong>Totals</strong></td>
              <td><strong>{completedCredits}</strong></td>
              <td><strong>GPA: {gpa}</strong></td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      )}
    </>
  );
};

export default StudentInfo;
