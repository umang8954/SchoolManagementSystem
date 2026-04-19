import { useState, useEffect } from 'react';
import { coursesApi } from '../api';

const empty = { courseName: '', courseCode: '', instructor: '', credits: '', description: '' };

export default function Courses({ onAlert }) {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { load(); }, []);

  async function load() {
    try {
      const data = await coursesApi.getAll();
      setCourses(data);
    } catch (e) {
      onAlert('Failed to load courses: ' + e.message, 'error');
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const payload = { ...form, credits: parseInt(form.credits, 10) };
    try {
      if (editId) {
        await coursesApi.update(editId, payload);
        onAlert('✅ Course updated successfully!', 'success');
        setEditId(null);
      } else {
        const created = await coursesApi.create(payload);
        onAlert(`✅ Course ${created.courseName} created successfully!`, 'success');
      }
      setForm(empty);
      load();
    } catch (e) {
      onAlert('❌ ' + e.message, 'error');
    } finally {
      setLoading(false);
    }
  }

  function handleEdit(course) {
    setEditId(course.id);
    setForm({
      courseName: course.courseName,
      courseCode: course.courseCode,
      instructor: course.instructor,
      credits: String(course.credits),
      description: course.description || '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleCancel() {
    setEditId(null);
    setForm(empty);
  }

  async function handleDelete(id) {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    try {
      await coursesApi.delete(id);
      onAlert('✅ Course deleted successfully!', 'success');
      load();
    } catch (e) {
      onAlert('❌ ' + e.message, 'error');
    }
  }

  return (
    <div className="tab-panel">
      <h2>Course Management</h2>

      <div className="form-section">
        <h3>{editId ? '✏️ Edit Course' : '➕ Add New Course'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Course Name</label>
              <input name="courseName" value={form.courseName} onChange={handleChange} placeholder="Mathematics" required />
            </div>
            <div className="form-group">
              <label>Course Code</label>
              <input name="courseCode" value={form.courseCode} onChange={handleChange} placeholder="MATH101" required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Instructor</label>
              <input name="instructor" value={form.instructor} onChange={handleChange} placeholder="Mr. Smith" required />
            </div>
            <div className="form-group">
              <label>Credits</label>
              <input name="credits" type="number" value={form.credits} onChange={handleChange} placeholder="3" min="1" max="10" required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group full-width">
              <label>Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} placeholder="Course description…" rows={3} />
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving…' : editId ? 'Update Course' : 'Create Course'}
            </button>
            {editId && (
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="table-section">
        <h3>📖 Courses List</h3>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Course Name</th>
                <th>Code</th>
                <th>Instructor</th>
                <th>Credits</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.length === 0 ? (
                <tr><td colSpan={7} className="no-data">No courses yet. Create one above!</td></tr>
              ) : (
                courses.map(c => (
                  <tr key={c.id}>
                    <td>{c.id}</td>
                    <td>{c.courseName}</td>
                    <td>{c.courseCode}</td>
                    <td>{c.instructor}</td>
                    <td>{c.credits}</td>
                    <td>{c.description || 'N/A'}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn btn-edit btn-small" onClick={() => handleEdit(c)}>Edit</button>
                        <button className="btn btn-danger btn-small" onClick={() => handleDelete(c.id)}>Delete</button>
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
