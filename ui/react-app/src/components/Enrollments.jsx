import { useState, useEffect } from 'react';
import { enrollmentsApi, studentsApi, coursesApi } from '../api';

const today = new Date().toISOString().split('T')[0];
const empty = { studentId: '', courseId: '', enrollmentDate: today, enrollmentStatus: 'ACTIVE' };

export default function Enrollments({ onAlert }) {
  const [enrollments, setEnrollments] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    load();
    studentsApi.getAll().then(setStudents).catch(() => {});
    coursesApi.getAll().then(setCourses).catch(() => {});
  }, []);

  async function load() {
    try {
      const data = await enrollmentsApi.getAll();
      setEnrollments(data);
    } catch (e) {
      onAlert('Failed to load enrollments: ' + e.message, 'error');
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const payload = {
      studentId: parseInt(form.studentId, 10),
      courseId: parseInt(form.courseId, 10),
      enrollmentDate: form.enrollmentDate,
      enrollmentStatus: form.enrollmentStatus,
    };
    try {
      await enrollmentsApi.create(payload);
      onAlert('✅ Student enrolled successfully!', 'success');
      setForm(empty);
      load();
    } catch (e) {
      onAlert('❌ ' + e.message, 'error');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Are you sure you want to remove this enrollment?')) return;
    try {
      await enrollmentsApi.delete(id);
      onAlert('✅ Enrollment removed successfully!', 'success');
      load();
    } catch (e) {
      onAlert('❌ ' + e.message, 'error');
    }
  }

  function formatDate(d) {
    if (!d) return 'N/A';
    return new Date(d).toLocaleDateString();
  }

  return (
    <div className="tab-panel">
      <h2>Enrollment Management</h2>

      <div className="form-section">
        <h3>➕ Enroll Student in Course</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Select Student</label>
              <select name="studentId" value={form.studentId} onChange={handleChange} required>
                <option value="">-- Choose a Student --</option>
                {students.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.firstName} {s.lastName}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Select Course</label>
              <select name="courseId" value={form.courseId} onChange={handleChange} required>
                <option value="">-- Choose a Course --</option>
                {courses.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.courseName} ({c.courseCode})
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Enrollment Date</label>
              <input name="enrollmentDate" type="date" value={form.enrollmentDate} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select name="enrollmentStatus" value={form.enrollmentStatus} onChange={handleChange}>
                <option value="ACTIVE">ACTIVE</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="DROPPED">DROPPED</option>
              </select>
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Enrolling…' : 'Enroll Student'}
            </button>
          </div>
        </form>
      </div>

      <div className="table-section">
        <h3>📋 Enrollments List</h3>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Student</th>
                <th>Course</th>
                <th>Enrollment Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {enrollments.length === 0 ? (
                <tr><td colSpan={6} className="no-data">No enrollments yet. Enroll a student above!</td></tr>
              ) : (
                enrollments.map(en => (
                  <tr key={en.id}>
                    <td>{en.id}</td>
                    <td>{en.studentName || en.studentId}</td>
                    <td>{en.courseName || en.courseId}</td>
                    <td>{formatDate(en.enrollmentDate)}</td>
                    <td>
                      <span className={`badge badge-${(en.enrollmentStatus || 'ACTIVE').toLowerCase()}`}>
                        {en.enrollmentStatus || 'ACTIVE'}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn btn-danger btn-small" onClick={() => handleDelete(en.id)}>Remove</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
