import { useState, useEffect } from 'react';
import { studentsApi } from '../api';

const empty = { firstName: '', lastName: '', email: '', grade: '', phone: '', dateOfBirth: '' };

export default function Students({ onAlert }) {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { load(); }, []);

  async function load() {
    try {
      const data = await studentsApi.getAll();
      setStudents(data);
    } catch (e) {
      onAlert('Failed to load students: ' + e.message, 'error');
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (editId) {
        await studentsApi.update(editId, form);
        onAlert(`✅ Student updated successfully!`, 'success');
        setEditId(null);
      } else {
        const created = await studentsApi.create(form);
        onAlert(`✅ Student ${created.firstName} created successfully!`, 'success');
      }
      setForm(empty);
      load();
    } catch (e) {
      onAlert('❌ ' + e.message, 'error');
    } finally {
      setLoading(false);
    }
  }

  function handleEdit(student) {
    setEditId(student.id);
    setForm({
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      grade: student.grade,
      phone: student.phone,
      dateOfBirth: student.dateOfBirth || '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleCancel() {
    setEditId(null);
    setForm(empty);
  }

  async function handleDelete(id) {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    try {
      await studentsApi.delete(id);
      onAlert('✅ Student deleted successfully!', 'success');
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
      <h2>Student Management</h2>

      <div className="form-section">
        <h3>{editId ? '✏️ Edit Student' : '➕ Add New Student'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="John" required />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Doe" required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Email</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@example.com" required />
            </div>
            <div className="form-group">
              <label>Grade</label>
              <input name="grade" value={form.grade} onChange={handleChange} placeholder="10" required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Phone</label>
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="9876543210" required />
            </div>
            <div className="form-group">
              <label>Date of Birth</label>
              <input name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleChange} required />
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving…' : editId ? 'Update Student' : 'Create Student'}
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
        <h3>👥 Students List</h3>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Grade</th>
                <th>Phone</th>
                <th>Date of Birth</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr><td colSpan={8} className="no-data">No students yet. Create one above!</td></tr>
              ) : (
                students.map(s => (
                  <tr key={s.id}>
                    <td>{s.id}</td>
                    <td>{s.firstName}</td>
                    <td>{s.lastName}</td>
                    <td>{s.email}</td>
                    <td>{s.grade}</td>
                    <td>{s.phone}</td>
                    <td>{formatDate(s.dateOfBirth)}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn btn-edit btn-small" onClick={() => handleEdit(s)}>Edit</button>
                        <button className="btn btn-danger btn-small" onClick={() => handleDelete(s.id)}>Delete</button>
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
