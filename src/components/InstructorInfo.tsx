import { useState } from "react";

interface Student {
  id: string;
  name: string;
  major: string;
  grade: string;
}

interface Course {
  prefix: string;
  number: string;
  name: string;
  credits: number;
  semester: string;
  enrollments: number;
  students: Student[];
}

const instructorCourses: Course[] = [
  {
    prefix: "CIS", number: "4301", name: "Database Systems", credits: 3, semester: "F2024", enrollments: 4,
    students: [
      { id: "U112233", name: "Alice Chen", major: "Computer Science", grade: "A" },
      { id: "U223344", name: "Bob Martinez", major: "Information Systems", grade: "B+" },
      { id: "U334455", name: "Carol Nguyen", major: "Computer Science", grade: "A-" },
      { id: "U445566", name: "David Kim", major: "Data Science", grade: "B" },
    ],
  },
  {
    prefix: "CIS", number: "6300", name: "Advanced Database Topics", credits: 3, semester: "F2024", enrollments: 3,
    students: [
      { id: "U556677", name: "Emma Torres", major: "Computer Science (MS)", grade: "A" },
      { id: "U667788", name: "Frank Patel", major: "Computer Science (MS)", grade: "A-" },
      { id: "U778899", name: "Grace Liu", major: "Data Science (MS)", grade: "B+" },
    ],
  },
  {
    prefix: "CIS", number: "4301", name: "Database Systems", credits: 3, semester: "S2024", enrollments: 3,
    students: [
      { id: "U889900", name: "Hank Wilson", major: "Information Systems", grade: "B" },
      { id: "U990011", name: "Iris Brown", major: "Computer Science", grade: "A" },
      { id: "U101010", name: "Jack Davis", major: "Computer Science", grade: "C+" },
    ],
  },
];

const gradePoints: Record<string, number> = {
  A: 4.0, "A-": 3.7, "B+": 3.3, B: 3.0, "B-": 2.7,
  "C+": 2.3, C: 2.0, D: 1.0, F: 0.0,
};

const InstructorInfo: React.FC = () => {
  const [selectedCourseIdx, setSelectedCourseIdx] = useState<number | null>(null);

  const totalStudents = instructorCourses.reduce((sum, c) => sum + c.enrollments, 0);

  const avgGrade = (students: Student[]) => {
    const pts = students.map((s) => gradePoints[s.grade] ?? null).filter((p) => p !== null) as number[];
    if (pts.length === 0) return "N/A";
    return (pts.reduce((a, b) => a + b, 0) / pts.length).toFixed(2);
  };

  return (
    <>
      <div className="display-6">Instructor Summary</div>
      <hr />

      {/* Profile */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <p className="mb-1"><strong>Name:</strong> Dr. Patricia Moore</p>
              <p className="mb-1"><strong>Instructor ID:</strong> I20041</p>
              <p className="mb-1"><strong>Department:</strong> Computer & Information Sciences</p>
            </div>
            <div className="col-md-6">
              <p className="mb-1"><strong>Office:</strong> ENB 318</p>
              <p className="mb-1"><strong>Email:</strong> p.moore@university.edu</p>
              <p className="mb-1"><strong>Total Students (Current):</strong> {totalStudents}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Courses table */}
      <div className="h5 text-body-secondary mb-2">My Courses</div>
      <table className="table table-hover table-bordered mb-4">
        <thead className="table-dark">
          <tr>
            <th>Course</th>
            <th>Name</th>
            <th>Credits</th>
            <th>Semester</th>
            <th>Enrolled</th>
            <th>Avg Grade</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {instructorCourses.map((c, idx) => (
            <tr key={idx}>
              <td>{c.prefix} {c.number}</td>
              <td>{c.name}</td>
              <td>{c.credits}</td>
              <td>{c.semester}</td>
              <td>{c.enrollments}</td>
              <td>{avgGrade(c.students)}</td>
              <td>
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => setSelectedCourseIdx(selectedCourseIdx === idx ? null : idx)}
                >
                  {selectedCourseIdx === idx ? "Hide" : "View Students"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Student roster */}
      {selectedCourseIdx !== null && (
        <div className="card shadow-sm">
          <div className="card-header bg-secondary text-white">
            <strong>Student Roster — {instructorCourses[selectedCourseIdx].prefix} {instructorCourses[selectedCourseIdx].number} ({instructorCourses[selectedCourseIdx].semester})</strong>
          </div>
          <div className="card-body p-0">
            <table className="table table-striped mb-0">
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Name</th>
                  <th>Major</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {instructorCourses[selectedCourseIdx].students.map((s) => (
                  <tr key={s.id}>
                    <td>{s.id}</td>
                    <td>{s.name}</td>
                    <td>{s.major}</td>
                    <td>
                      <span className={`badge ${s.grade.startsWith("A") ? "bg-success" : s.grade.startsWith("B") ? "bg-primary" : "bg-secondary"}`}>
                        {s.grade}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default InstructorInfo;
