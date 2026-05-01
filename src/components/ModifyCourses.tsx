import React, { useState } from "react";

interface Course {
  code: string;
  name: string;
  department: string;
  credits: number;
  instructor: string;
  status: string;
}

const initialCourses: Course[] = [
  { code: "COP 4020", name: "Programming Language Concepts", department: "CS", credits: 3, instructor: "Dr. Smith", status: "Active" },
  { code: "CDA 4150", name: "Computer Organization", department: "CS", credits: 3, instructor: "Dr. Patel", status: "Active" },
  { code: "COP 4710", name: "Database Systems", department: "CS", credits: 3, instructor: "Dr. Lee", status: "Active" },
  { code: "COP 4600", name: "Operating Systems", department: "CS", credits: 3, instructor: "Dr. Johnson", status: "Active" },
  { code: "CAP 4630", name: "Artificial Intelligence", department: "CS", credits: 3, instructor: "Dr. Chen", status: "Active" },
  { code: "COP 4531", name: "Complexity & Algorithms", department: "CS", credits: 3, instructor: "Dr. Williams", status: "Active" },
  { code: "MAD 4203", name: "Combinatorics", department: "Math", credits: 3, instructor: "Dr. Garcia", status: "Active" },
  { code: "CEN 4010", name: "Software Engineering", department: "CS", credits: 3, instructor: "Dr. Brown", status: "Active" },
  { code: "CIS 4360", name: "Information Security", department: "CS", credits: 3, instructor: "Dr. Martinez", status: "Active" },
  { code: "COP 4521", name: "Mobile App Development", department: "CS", credits: 3, instructor: "Dr. Davis", status: "Active" },
];

const emptyForm: Omit<Course, "status"> = {
  code: "",
  name: "",
  department: "",
  credits: 3,
  instructor: "",
};

const ModifyCourses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [editingCode, setEditingCode] = useState<string | null>(null);
  const [editRow, setEditRow] = useState<Course | null>(null);
  const [newCourse, setNewCourse] = useState<Omit<Course, "status">>(emptyForm);

  // --- Add new course ---
  const handleNewCourseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCourse((prev) => ({
      ...prev,
      [name]: name === "credits" ? Number(value) : value,
    }));
  };

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourse.code.trim() || !newCourse.name.trim()) return;
    const course: Course = { ...newCourse, status: "Active" };
    setCourses((prev) => [...prev, course]);
    setNewCourse(emptyForm);
  };

  // --- Delete course ---
  const handleDelete = (code: string) => {
    if (window.confirm(`Are you sure you want to delete course ${code}?`)) {
      setCourses((prev) => prev.filter((c) => c.code !== code));
      if (editingCode === code) {
        setEditingCode(null);
        setEditRow(null);
      }
    }
  };

  // --- Edit course ---
  const handleEditStart = (course: Course) => {
    setEditingCode(course.code);
    setEditRow({ ...course });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editRow) return;
    const { name, value } = e.target;
    setEditRow((prev) =>
      prev ? { ...prev, [name]: name === "credits" ? Number(value) : value } : prev
    );
  };

  const handleEditSave = () => {
    if (!editRow) return;
    setCourses((prev) =>
      prev.map((c) => (c.code === editingCode ? editRow : c))
    );
    setEditingCode(null);
    setEditRow(null);
  };

  const handleEditCancel = () => {
    setEditingCode(null);
    setEditRow(null);
  };

  return (
    <>
      <div className="display-6">Modify Courses</div>
      <hr />

      {/* Add New Course Form */}
      <h5 className="mt-3">Add New Course</h5>
      <form onSubmit={handleAddCourse} className="row g-2 mb-4 align-items-end">
        <div className="col-md-2">
          <label className="form-label fw-semibold">Course Code</label>
          <input
            type="text"
            className="form-control"
            name="code"
            placeholder="e.g. COP 4999"
            value={newCourse.code}
            onChange={handleNewCourseChange}
            required
          />
        </div>
        <div className="col-md-3">
          <label className="form-label fw-semibold">Course Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Course Name"
            value={newCourse.name}
            onChange={handleNewCourseChange}
            required
          />
        </div>
        <div className="col-md-2">
          <label className="form-label fw-semibold">Department</label>
          <input
            type="text"
            className="form-control"
            name="department"
            placeholder="e.g. CS"
            value={newCourse.department}
            onChange={handleNewCourseChange}
            required
          />
        </div>
        <div className="col-md-1">
          <label className="form-label fw-semibold">Credits</label>
          <input
            type="number"
            className="form-control"
            name="credits"
            min={1}
            max={6}
            value={newCourse.credits}
            onChange={handleNewCourseChange}
            required
          />
        </div>
        <div className="col-md-2">
          <label className="form-label fw-semibold">Instructor</label>
          <input
            type="text"
            className="form-control"
            name="instructor"
            placeholder="e.g. Dr. Smith"
            value={newCourse.instructor}
            onChange={handleNewCourseChange}
            required
          />
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-success w-100">
            Add Course
          </button>
        </div>
      </form>

      {/* Course Count */}
      <div className="mb-2">
        <span className="fw-semibold fs-5">Total Courses: {courses.length}</span>
      </div>

      {/* Course Catalog Table */}
      <h5>Course Catalog</h5>
      <table className="table table-bordered table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Course Code</th>
            <th>Course Name</th>
            <th>Department</th>
            <th>Credits</th>
            <th>Instructor</th>
            <th>Status</th>
            <th style={{ minWidth: "160px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center text-muted">
                No courses in catalog.
              </td>
            </tr>
          ) : (
            courses.map((course) =>
              editingCode === course.code && editRow ? (
                <tr key={course.code} className="table-warning">
                  <td>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="code"
                      value={editRow.code}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="name"
                      value={editRow.name}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="department"
                      value={editRow.department}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      name="credits"
                      min={1}
                      max={6}
                      value={editRow.credits}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="instructor"
                      value={editRow.instructor}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="status"
                      value={editRow.status}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-success btn-sm me-1"
                      onClick={handleEditSave}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={handleEditCancel}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={course.code}>
                  <td>{course.code}</td>
                  <td>{course.name}</td>
                  <td>{course.department}</td>
                  <td>{course.credits}</td>
                  <td>{course.instructor}</td>
                  <td>
                    <span className="badge bg-success">{course.status}</span>
                  </td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-1"
                      onClick={() => handleEditStart(course)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(course.code)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )
          )}
        </tbody>
      </table>
    </>
  );
};

export default ModifyCourses;
