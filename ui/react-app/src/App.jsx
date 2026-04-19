import { useState, useEffect } from 'react';
import Students from './components/Students';
import Courses from './components/Courses';
import Enrollments from './components/Enrollments';

const TABS = ['students', 'courses', 'enrollments'];
const TAB_LABELS = { students: 'Students', courses: 'Courses', enrollments: 'Enrollments' };

export default function App() {
  const [activeTab, setActiveTab] = useState('students');
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    if (!alert) return;
    const timer = setTimeout(() => setAlert(null), 3500);
    return () => clearTimeout(timer);
  }, [alert]);

  function showAlert(message, type = 'success') {
    setAlert({ message, type });
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">📚 School Management System</div>
        <div className="nav-links">
          {TABS.map(tab => (
            <button
              key={tab}
              className={`nav-link ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {TAB_LABELS[tab]}
            </button>
          ))}
        </div>
      </nav>

      {alert && (
        <div className={`alert alert-${alert.type}`}>
          {alert.message}
          <button className="alert-close" onClick={() => setAlert(null)}>×</button>
        </div>
      )}

      <main className="main-content">
        {activeTab === 'students' && <Students onAlert={showAlert} />}
        {activeTab === 'courses' && <Courses onAlert={showAlert} />}
        {activeTab === 'enrollments' && <Enrollments onAlert={showAlert} />}
      </main>
    </div>
  );
}
