import { useState } from "react";

interface MajorStat { major: string; highest: number; lowest: number; avg: number; count: number }
interface SemesterStat { semester: string; course: string; name: string; enrolled: number; avgGrade: number }
interface InstructorStat { instructor: string; course: string; cs: number; is: number; ds: number; math: number }
interface StudentRank { name: string; id: string; major: string; credits: number; gpa: number }

const majorStats: MajorStat[] = [
  { major: "Computer Science", highest: 4.0, lowest: 1.8, avg: 3.24, count: 312 },
  { major: "Information Systems", highest: 3.95, lowest: 2.1, avg: 3.11, count: 187 },
  { major: "Data Science", highest: 4.0, lowest: 2.3, avg: 3.38, count: 94 },
  { major: "Mathematics", highest: 4.0, lowest: 1.6, avg: 3.19, count: 143 },
  { major: "Electrical Engineering", highest: 3.9, lowest: 1.7, avg: 3.05, count: 221 },
];

const semesterStats: SemesterStat[] = [
  { semester: "F2024", course: "CIS 4301", name: "Database Systems", enrolled: 28, avgGrade: 3.21 },
  { semester: "F2024", course: "COP 4020", name: "Programming Languages", enrolled: 34, avgGrade: 3.05 },
  { semester: "F2024", course: "COT 4400", name: "Analysis of Algorithms", enrolled: 22, avgGrade: 2.89 },
  { semester: "S2024", course: "CIS 4301", name: "Database Systems", enrolled: 31, avgGrade: 3.15 },
  { semester: "S2024", course: "CEN 4010", name: "Software Engineering", enrolled: 29, avgGrade: 3.32 },
  { semester: "S2024", course: "COT 3100", name: "Algorithms", enrolled: 41, avgGrade: 2.74 },
  { semester: "F2023", course: "COP 3530", name: "Data Structures", enrolled: 45, avgGrade: 2.98 },
  { semester: "F2023", course: "CDA 3103", name: "Computer Organization", enrolled: 38, avgGrade: 3.02 },
];

const instructorStats: InstructorStat[] = [
  { instructor: "Dr. Patricia Moore", course: "CIS 4301 Database Systems", cs: 14, is: 8, ds: 4, math: 2 },
  { instructor: "Dr. James Rivera", course: "COT 4400 Algorithms", cs: 18, is: 3, ds: 5, math: 6 },
  { instructor: "Dr. Sandra Lee", course: "CEN 4010 Software Engineering", cs: 17, is: 9, ds: 2, math: 1 },
  { instructor: "Prof. Mark Chen", course: "COP 4020 Prog. Languages", cs: 22, is: 5, ds: 4, math: 3 },
];

const studentRanks: StudentRank[] = [
  { name: "Alice Chen", id: "U112233", major: "Computer Science", credits: 98, gpa: 3.91 },
  { name: "Bob Martinez", id: "U223344", major: "Computer Science", credits: 93, gpa: 3.67 },
  { name: "Carol Nguyen", id: "U334455", major: "Computer Science", credits: 88, gpa: 3.82 },
  { name: "Emma Torres", id: "U556677", major: "Data Science", credits: 104, gpa: 3.95 },
  { name: "Frank Patel", id: "U667788", major: "Data Science", credits: 87, gpa: 3.71 },
  { name: "Hank Wilson", id: "U889900", major: "Information Systems", credits: 96, gpa: 3.44 },
  { name: "Iris Brown", id: "U990011", major: "Information Systems", credits: 81, gpa: 3.55 },
  { name: "Jack Davis", id: "U101010", major: "Mathematics", credits: 107, gpa: 3.28 },
];

const sortedDepts = [...majorStats].sort((a, b) => b.avg - a.avg);

const tabs = [
  "GPA by Major",
  "Department Rankings",
  "Course Enrollment by Semester",
  "Instructor Roster",
  "Students by Major & Credits",
] as const;
type Tab = typeof tabs[number];

const Summary: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("GPA by Major");

  return (
    <>
      <div className="display-6">College Summary Reports</div>
      <hr />

      <ul className="nav nav-tabs flex-wrap mb-4">
        {tabs.map((t) => (
          <li key={t} className="nav-item">
            <button
              className={`nav-link ${activeTab === t ? "active" : ""}`}
              onClick={() => setActiveTab(t)}
              style={{ fontSize: "0.85rem" }}
            >
              {t}
            </button>
          </li>
        ))}
      </ul>

      {activeTab === "GPA by Major" && (
        <>
          <p className="text-muted mb-3">Highest, lowest, and average GPA of students in each major.</p>
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Major</th>
                <th>Students</th>
                <th>Highest GPA</th>
                <th>Lowest GPA</th>
                <th>Average GPA</th>
              </tr>
            </thead>
            <tbody>
              {majorStats.map((m) => (
                <tr key={m.major}>
                  <td>{m.major}</td>
                  <td>{m.count}</td>
                  <td><span className="text-success fw-bold">{m.highest.toFixed(2)}</span></td>
                  <td><span className="text-danger">{m.lowest.toFixed(2)}</span></td>
                  <td><strong>{m.avg.toFixed(2)}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {activeTab === "Department Rankings" && (
        <>
          <p className="text-muted mb-3">Departments ranked by student average GPA (highest to lowest).</p>
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Rank</th>
                <th>Department / Major</th>
                <th>Avg GPA</th>
                <th>Students</th>
              </tr>
            </thead>
            <tbody>
              {sortedDepts.map((m, i) => (
                <tr key={m.major} className={i === 0 ? "table-success" : i === sortedDepts.length - 1 ? "table-danger" : ""}>
                  <td>
                    {i === 0 ? "🥇 1" : i === 1 ? "🥈 2" : i === 2 ? "🥉 3" : i + 1}
                  </td>
                  <td>{m.major}</td>
                  <td><strong>{m.avg.toFixed(2)}</strong></td>
                  <td>{m.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {activeTab === "Course Enrollment by Semester" && (
        <>
          <p className="text-muted mb-3">Total enrollments and average grade points per course each semester.</p>
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Semester</th>
                <th>Course</th>
                <th>Name</th>
                <th>Enrolled</th>
                <th>Avg Grade Points</th>
              </tr>
            </thead>
            <tbody>
              {semesterStats.map((s, i) => (
                <tr key={i}>
                  <td>{s.semester}</td>
                  <td>{s.course}</td>
                  <td>{s.name}</td>
                  <td>{s.enrolled}</td>
                  <td>
                    <span className={`badge ${s.avgGrade >= 3.5 ? "bg-success" : s.avgGrade >= 3.0 ? "bg-primary" : s.avgGrade >= 2.5 ? "bg-warning text-dark" : "bg-danger"}`}>
                      {s.avgGrade.toFixed(2)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-muted small">Grade points: A/S=4, B=3, C=2, D=1, F/U/I=0</p>
        </>
      )}

      {activeTab === "Instructor Roster" && (
        <>
          <p className="text-muted mb-3">For each instructor, total students by major across all their courses.</p>
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Instructor</th>
                <th>Course</th>
                <th>CS</th>
                <th>IS</th>
                <th>Data Sci</th>
                <th>Math</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {instructorStats.map((inst, i) => (
                <tr key={i}>
                  <td>{inst.instructor}</td>
                  <td>{inst.course}</td>
                  <td>{inst.cs}</td>
                  <td>{inst.is}</td>
                  <td>{inst.ds}</td>
                  <td>{inst.math}</td>
                  <td><strong>{inst.cs + inst.is + inst.ds + inst.math}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {activeTab === "Students by Major & Credits" && (
        <>
          <p className="text-muted mb-3">All students grouped by major, sorted by total credits completed (descending).</p>
          {Array.from(new Set(studentRanks.map((s) => s.major))).map((major) => {
            const group = studentRanks.filter((s) => s.major === major).sort((a, b) => b.credits - a.credits);
            return (
              <div key={major} className="mb-4">
                <div className="h6 fw-bold border-bottom pb-1">{major}</div>
                <table className="table table-sm table-striped">
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Student ID</th>
                      <th>Name</th>
                      <th>Credits</th>
                      <th>GPA</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.map((s, i) => (
                      <tr key={s.id}>
                        <td>{i + 1}</td>
                        <td>{s.id}</td>
                        <td>{s.name}</td>
                        <td><strong>{s.credits}</strong></td>
                        <td>{s.gpa.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

export default Summary;
