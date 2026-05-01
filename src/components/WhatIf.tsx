import { useState } from "react";

const gradeOptions = ["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D", "F"];
const gradePoints: Record<string, number> = {
  A: 4.0, "A-": 3.7, "B+": 3.3, B: 3.0, "B-": 2.7,
  "C+": 2.3, C: 2.0, "C-": 1.7, D: 1.0, F: 0.0,
};

const currentGpa = 3.15;
const currentCredits = 75;
const currentPoints = currentGpa * currentCredits;

interface HypoCourse {
  credits: number;
  grade: string;
}

interface Suggestion {
  courses: number;
  credits: number;
  grade: string;
  newGpa: number;
}

const WhatIf: React.FC = () => {
  const [scenario, setScenario] = useState<1 | 2>(1);

  // Scenario 1
  const [hypoCourses, setHypoCourses] = useState<HypoCourse[]>([{ credits: 3, grade: "A" }]);
  const [result1, setResult1] = useState<{ newGpa: number; newCredits: number } | null>(null);

  // Scenario 2
  const [targetGpa, setTargetGpa] = useState<string>("3.50");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  const addCourse = () => setHypoCourses((prev) => [...prev, { credits: 3, grade: "B" }]);
  const removeCourse = (i: number) => setHypoCourses((prev) => prev.filter((_, idx) => idx !== i));

  const updateCourse = (i: number, field: keyof HypoCourse, value: string | number) => {
    setHypoCourses((prev) => prev.map((c, idx) => (idx === i ? { ...c, [field]: value } : c)));
  };

  const calcScenario1 = () => {
    const addedPoints = hypoCourses.reduce((sum, c) => sum + gradePoints[c.grade] * c.credits, 0);
    const addedCredits = hypoCourses.reduce((sum, c) => sum + c.credits, 0);
    const newGpa = (currentPoints + addedPoints) / (currentCredits + addedCredits);
    setResult1({ newGpa: parseFloat(newGpa.toFixed(2)), newCredits: currentCredits + addedCredits });
  };

  const calcScenario2 = () => {
    const target = parseFloat(targetGpa);
    if (isNaN(target) || target < currentGpa || target > 4.0) {
      setSuggestions([]);
      return;
    }
    const results: Suggestion[] = [];
    for (const grade of ["A", "B+", "B", "A-"]) {
      const gp = gradePoints[grade];
      for (const credits of [3, 4]) {
        let n = 1;
        while (n <= 20) {
          const totalNewCredits = n * credits;
          const newGpa = (currentPoints + gp * totalNewCredits) / (currentCredits + totalNewCredits);
          if (newGpa >= target) {
            results.push({ courses: n, credits, grade, newGpa: parseFloat(newGpa.toFixed(2)) });
            break;
          }
          n++;
        }
      }
    }
    const seen = new Set<string>();
    const unique = results.filter((r) => {
      const key = `${r.courses}-${r.credits}-${r.grade}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    setSuggestions(unique.slice(0, 6));
  };

  return (
    <>
      <div className="display-6">What-If Analysis</div>
      <hr />

      {/* Current GPA banner */}
      <div className="alert alert-info mb-4">
        <strong>Current GPA:</strong> {currentGpa} &nbsp;|&nbsp;
        <strong>Credits Completed:</strong> {currentCredits} &nbsp;|&nbsp;
        <strong>Quality Points:</strong> {currentPoints.toFixed(1)}
      </div>

      {/* Scenario selector */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button className={`nav-link ${scenario === 1 ? "active" : ""}`} onClick={() => { setScenario(1); setResult1(null); }}>
            Scenario 1 — Add N Courses
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${scenario === 2 ? "active" : ""}`} onClick={() => { setScenario(2); setSuggestions([]); }}>
            Scenario 2 — Reach Target GPA
          </button>
        </li>
      </ul>

      {scenario === 1 && (
        <div>
          <p className="text-muted">Add hypothetical future courses and see how your GPA changes.</p>

          <table className="table table-bordered align-middle mb-3">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Credits</th>
                <th>Grade</th>
                <th>Quality Points</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {hypoCourses.map((c, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>
                    <select
                      className="form-select form-select-sm"
                      value={c.credits}
                      onChange={(e) => updateCourse(i, "credits", parseInt(e.target.value))}
                    >
                      {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </td>
                  <td>
                    <select
                      className="form-select form-select-sm"
                      value={c.grade}
                      onChange={(e) => updateCourse(i, "grade", e.target.value)}
                    >
                      {gradeOptions.map((g) => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </td>
                  <td>{(gradePoints[c.grade] * c.credits).toFixed(1)}</td>
                  <td>
                    {hypoCourses.length > 1 && (
                      <button className="btn btn-sm btn-outline-danger" onClick={() => removeCourse(i)}>Remove</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex gap-2 mb-3">
            <button className="btn btn-outline-secondary btn-sm" onClick={addCourse}>+ Add Course</button>
            <button className="btn btn-primary btn-sm" onClick={calcScenario1}>Calculate</button>
          </div>

          {result1 && (
            <div className={`alert ${result1.newGpa > currentGpa ? "alert-success" : "alert-warning"}`}>
              <strong>Projected GPA:</strong> {result1.newGpa} &nbsp;
              ({result1.newGpa > currentGpa ? "▲" : "▼"} {Math.abs(result1.newGpa - currentGpa).toFixed(2)} from current)
              &nbsp;|&nbsp;
              <strong>New Total Credits:</strong> {result1.newCredits}
            </div>
          )}
        </div>
      )}

      {scenario === 2 && (
        <div>
          <p className="text-muted">Enter a target GPA and see how many courses you need to get there.</p>

          <div className="row g-3 align-items-end mb-3">
            <div className="col-md-4">
              <label className="form-label"><strong>Target GPA</strong></label>
              <input
                type="number"
                className="form-control"
                min={currentGpa}
                max={4.0}
                step={0.01}
                value={targetGpa}
                onChange={(e) => setTargetGpa(e.target.value)}
              />
              <div className="form-text">Must be greater than current GPA ({currentGpa}) and ≤ 4.00</div>
            </div>
            <div className="col-md-2">
              <button className="btn btn-primary w-100" onClick={calcScenario2}>Calculate</button>
            </div>
          </div>

          {suggestions.length > 0 && (
            <>
              <div className="h6 mb-2">Suggested course combinations to reach GPA ≥ {targetGpa}:</div>
              <table className="table table-striped table-bordered">
                <thead className="table-dark">
                  <tr>
                    <th>Courses Needed</th>
                    <th>Credits Each</th>
                    <th>Grade Each</th>
                    <th>Projected GPA</th>
                  </tr>
                </thead>
                <tbody>
                  {suggestions.map((s, i) => (
                    <tr key={i}>
                      <td>{s.courses}</td>
                      <td>{s.credits}</td>
                      <td><span className="badge bg-success">{s.grade}</span></td>
                      <td><strong>{s.newGpa}</strong></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-muted small">Each row is an independent strategy. Total additional credits = courses × credits each.</p>
            </>
          )}

          {suggestions.length === 0 && targetGpa !== "" && (
            <div className="text-muted">Enter a valid target GPA above your current {currentGpa} and click Calculate.</div>
          )}
        </div>
      )}
    </>
  );
};

export default WhatIf;
