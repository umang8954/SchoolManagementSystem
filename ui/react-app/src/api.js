// Use relative API path locally, and explicit backend host in production.
const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  (typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? '/api'
    : 'https://school-ops-api.azurewebsites.net/api');

async function request(url, options = {}) {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  const contentType = res.headers.get('content-type') || '';

  if (!res.ok) {
    const err = contentType.includes('application/json')
      ? await res.json().catch(() => ({}))
      : {};
    throw new Error(err.message || `Request failed: ${res.status}`);
  }

  // DELETE returns 204 No Content
  if (res.status === 204) return null;

  if (!contentType.includes('application/json')) {
    throw new Error('API did not return JSON. Check API base URL configuration.');
  }

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
