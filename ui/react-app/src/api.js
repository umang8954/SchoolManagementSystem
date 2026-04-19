// Point to local backend during development.
// When deploying to Azure, change this to your App Service URL.
const API_BASE = '/api';

async function request(url, options = {}) {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Request failed: ${res.status}`);
  }
  // DELETE returns 204 No Content
  if (res.status === 204) return null;
  return res.json();
}

export const studentsApi = {
  getAll: () => request(`${API_BASE}/students`),
  create: (data) => request(`${API_BASE}/students`, { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`${API_BASE}/students/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => request(`${API_BASE}/students/${id}`, { method: 'DELETE' }),
};

export const coursesApi = {
  getAll: () => request(`${API_BASE}/courses`),
  create: (data) => request(`${API_BASE}/courses`, { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`${API_BASE}/courses/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => request(`${API_BASE}/courses/${id}`, { method: 'DELETE' }),
};

export const enrollmentsApi = {
  getAll: () => request(`${API_BASE}/enrollments`),
  create: (data) => request(`${API_BASE}/enrollments`, { method: 'POST', body: JSON.stringify(data) }),
  delete: (id) => request(`${API_BASE}/enrollments/${id}`, { method: 'DELETE' }),
};
