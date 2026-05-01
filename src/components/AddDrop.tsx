import React, { useState } from "react";

interface Course {
  code: string;
  name: string;
  credits: number;
  instructor: string;
  schedule: string;
}

const initialEnrolled: Course[] = [
  { code: "COP 4020", name: "Programming Language Concepts", credits: 3, instructor: "Dr. Smith", schedule: "MWF 9:00am" },
  { code: "CDA 4150", name: "Computer Organization", credits: 3, instructor: "Dr. Patel", schedule: "TTh 11:00am" },
  { code: "COP 4710", name: "Database Systems", credits: 3, instructor: "Dr. Lee", schedule: "MWF 2:00pm" },
];

const initialAvailable: Course[] = [
  { code: "COP 4600", name: "Operating Systems", credits: 3, instructor: "Dr. Johnson", schedule: "MWF 10:00am" },
  { code: "CAP 4630", name: "Artificial Intelligence", credits: 3, instructor: "Dr. Chen", schedule: "TTh 1:00pm" },
  { code: "COP 4531", name: "Complexity & Algorithms", credits: 3, instructor: "Dr. Williams", schedule: "MWF 11:00am" },
  { code: "CEN 4010", name: "Software Engineering", credits: 3, instructor: "Dr. Brown", schedule: "TTh 3:30pm" },
  { code: "COP 4521", name: "Mobile App Development", credits: 3, instructor: "Dr. Davis", schedule: "MWF 1:00pm" },
];

const AddDrop: React.FC = () => {
  const [enrolled, setEnrolled] = useState<Course[]>(initialEnrolled);
  const [available, setAvailable] = useState<Course[]>(initialAvailable);
  const [alert, setAlert] = useState<{ message: string; visible: boolean }>({ message: "", visible: false });

  const totalCredits = enrolled.reduce((sum, c) => sum + c.credits, 0);

  const showAlert = (message: string) => {
    setAlert({ message, visible: true });
  };

  const dismissAlert = () => {
    setAlert({ message: "", visible: false });
  };

  const handleDrop = (course: Course) => {
    setEnrolled((prev) => prev.filter((c) => c.code !== course.code));
    setAvailable((prev) => [...prev, course]);
    showAlert("Course dropped successfully");
  };

  const handleAdd = (course: Course) => {
    setAvailable((prev) => prev.filter((c) => c.code !== course.code));
    setEnrolled((prev) => [...prev, course]);
    showAlert("Course added successfully");
  };

  return (
    <>
      <div className="display-6">Add/Drop</div>
      <hr />

      {alert.visible && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {alert.message}
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={dismissAlert}
          ></button>
        </div>
      )}

      <div className="mb-3">
        <span className="fw-semibold fs-5">Current Credit Load: {totalCredits} credits</span>
      </div>

      <h5 className="mt-3">Current Enrollments</h5>
      <table className="table table-bordered table-striped table-hover mb-4">
        <thead className="table-dark">
          <tr>
            <th>Course Code</th>
            <th>Course Name</th>
            <th>Credits</th>
            <th>Instructor</th>
            <th>Schedule</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {enrolled.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center text-muted">
                No courses currently enrolled.
              </td>
            </tr>
          ) : (
            enrolled.map((course) => (
              <tr key={course.code}>
                <td>{course.code}</td>
                <td>{course.name}</td>
                <td>{course.credits}</td>
                <td>{course.instructor}</td>
                <td>{course.schedule}</td>
                <td>
                  <span className="badge bg-success">Enrolled</span>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDrop(course)}
                  >
                    Drop
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <h5 className="mt-3">Available Courses</h5>
      <table className="table table-bordered table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Course Code</th>
            <th>Course Name</th>
            <th>Credits</th>
            <th>Instructor</th>
            <th>Schedule</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {available.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center text-muted">
                No available courses at this time.
              </td>
            </tr>
          ) : (
            available.map((course) => (
              <tr key={course.code}>
                <td>{course.code}</td>
                <td>{course.name}</td>
                <td>{course.credits}</td>
                <td>{course.instructor}</td>
                <td>{course.schedule}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleAdd(course)}
                  >
                    Add
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
};

export default AddDrop;
