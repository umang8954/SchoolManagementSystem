// API Configuration
const API_BASE = 'http://localhost:8080/api';

// State Management
const state = {
    students: [],
    courses: [],
    enrollments: []
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Form submissions
    document.getElementById('studentForm').addEventListener('submit', createStudent);
    document.getElementById('courseForm').addEventListener('submit', createCourse);
    document.getElementById('enrollmentForm').addEventListener('submit', createEnrollment);

    // Load initial data
    loadStudents();
    loadCourses();
    loadEnrollments();

    // Set today's date as default for enrollment date
    document.getElementById('enrollmentDate').valueAsDate = new Date();
});

// ============================================
// TAB SWITCHING
// ============================================
function showTab(tabName) {
    // Hide all tabs
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Remove active class from all nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));

    // Show selected tab
    document.getElementById(tabName).classList.add('active');

    // Add active class to clicked nav link
    event.target.classList.add('active');

    // Prevent page reload
    event.preventDefault();
}

// ============================================
// ALERT MESSAGES
// ============================================
function showAlert(message, type = 'success', duration = 3000) {
    const alertBox = document.getElementById('alertBox');
    alertBox.textContent = message;
    alertBox.className = `alert ${type}`;

    setTimeout(() => {
        alertBox.classList.add('hidden');
    }, duration);
}

// ============================================
// STUDENTS MANAGEMENT
// ============================================

async function createStudent(event) {
    event.preventDefault();

    const studentData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        grade: document.getElementById('grade').value,
        phone: document.getElementById('phone').value,
        dateOfBirth: document.getElementById('dateOfBirth').value
    };

    try {
        const response = await fetch(`${API_BASE}/students`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(studentData)
        });

        if (response.ok) {
            const newStudent = await response.json();
            state.students.push(newStudent);
            showAlert(`✅ Student ${newStudent.firstName} created successfully!`, 'success');
            document.getElementById('studentForm').reset();
            loadStudents();
            updateStudentDropdown();
        } else {
            const error = await response.json();
            showAlert(`❌ Error: ${error.message || 'Failed to create student'}`, 'error');
        }
    } catch (error) {
        showAlert(`❌ Error connecting to server: ${error.message}`, 'error');
        console.error('Error:', error);
    }
}

async function loadStudents() {
    try {
        const response = await fetch(`${API_BASE}/students`);
        if (response.ok) {
            state.students = await response.json();
            displayStudents();
            updateStudentDropdown();
        }
    } catch (error) {
        console.error('Error loading students:', error);
    }
}

function displayStudents() {
    const tableBody = document.getElementById('studentsTableBody');

    if (state.students.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="8" class="no-data">No students yet. Create one above!</td></tr>';
        return;
    }

    tableBody.innerHTML = state.students.map(student => `
        <tr>
            <td>${student.id}</td>
            <td>${student.firstName}</td>
            <td>${student.lastName}</td>
            <td>${student.email}</td>
            <td>${student.grade}</td>
            <td>${student.phone}</td>
            <td>${formatDate(student.dateOfBirth)}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-danger btn-small" onclick="deleteStudent(${student.id})">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

async function deleteStudent(studentId) {
    if (!confirm('Are you sure you want to delete this student?')) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/students/${studentId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            state.students = state.students.filter(s => s.id !== studentId);
            showAlert('✅ Student deleted successfully!', 'success');
            loadStudents();
            updateStudentDropdown();
        } else {
            showAlert('❌ Failed to delete student', 'error');
        }
    } catch (error) {
        showAlert(`❌ Error: ${error.message}`, 'error');
    }
}

function updateStudentDropdown() {
    const select = document.getElementById('studentId');
    const currentValue = select.value;

    select.innerHTML = '<option value="">-- Choose a Student --</option>';
    state.students.forEach(student => {
        const option = document.createElement('option');
        option.value = student.id;
        option.textContent = `${student.firstName} ${student.lastName}`;
        select.appendChild(option);
    });

    select.value = currentValue;
}

// ============================================
// COURSES MANAGEMENT
// ============================================

async function createCourse(event) {
    event.preventDefault();

    const courseData = {
        courseName: document.getElementById('courseName').value,
        courseCode: document.getElementById('courseCode').value,
        description: document.getElementById('description').value,
        credits: parseInt(document.getElementById('credits').value),
        instructor: document.getElementById('instructor').value
    };

    try {
        const response = await fetch(`${API_BASE}/courses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(courseData)
        });

        if (response.ok) {
            const newCourse = await response.json();
            state.courses.push(newCourse);
            showAlert(`✅ Course ${newCourse.courseName} created successfully!`, 'success');
            document.getElementById('courseForm').reset();
            loadCourses();
            updateCourseDropdown();
        } else {
            const error = await response.json();
            showAlert(`❌ Error: ${error.message || 'Failed to create course'}`, 'error');
        }
    } catch (error) {
        showAlert(`❌ Error connecting to server: ${error.message}`, 'error');
        console.error('Error:', error);
    }
}

async function loadCourses() {
    try {
        const response = await fetch(`${API_BASE}/courses`);
        if (response.ok) {
            state.courses = await response.json();
            displayCourses();
            updateCourseDropdown();
        }
    } catch (error) {
        console.error('Error loading courses:', error);
    }
}

function displayCourses() {
    const tableBody = document.getElementById('coursesTableBody');

    if (state.courses.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="7" class="no-data">No courses yet. Create one above!</td></tr>';
        return;
    }

    tableBody.innerHTML = state.courses.map(course => `
        <tr>
            <td>${course.id}</td>
            <td>${course.courseName}</td>
            <td>${course.courseCode}</td>
            <td>${course.instructor}</td>
            <td>${course.credits}</td>
            <td>${course.description || 'N/A'}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-danger btn-small" onclick="deleteCourse(${course.id})">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

async function deleteCourse(courseId) {
    if (!confirm('Are you sure you want to delete this course?')) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/courses/${courseId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            state.courses = state.courses.filter(c => c.id !== courseId);
            showAlert('✅ Course deleted successfully!', 'success');
            loadCourses();
            updateCourseDropdown();
        } else {
            showAlert('❌ Failed to delete course', 'error');
        }
    } catch (error) {
        showAlert(`❌ Error: ${error.message}`, 'error');
    }
}

function updateCourseDropdown() {
    const select = document.getElementById('courseId');
    const currentValue = select.value;

    select.innerHTML = '<option value="">-- Choose a Course --</option>';
    state.courses.forEach(course => {
        const option = document.createElement('option');
        option.value = course.id;
        option.textContent = `${course.courseName} (${course.courseCode})`;
        select.appendChild(option);
    });

    select.value = currentValue;
}

// ============================================
// ENROLLMENTS MANAGEMENT
// ============================================

async function createEnrollment(event) {
    event.preventDefault();

    // Get the date string from input (Format: YYYY-MM-DD from date input)
    const dateString = document.getElementById('enrollmentDate').value;

    const enrollmentData = {
        studentId: parseInt(document.getElementById('studentId').value),
        courseId: parseInt(document.getElementById('courseId').value),
        enrollmentDate: dateString,  // Send as simple date string
        enrollmentStatus: 'ACTIVE',
        grade: 0.0
    };

    if (enrollmentData.studentId === 0 || enrollmentData.courseId === 0) {
        showAlert('⚠️ Please select both a student and a course', 'error');
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/enrollments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(enrollmentData)
        });

        if (response.ok) {
            const newEnrollment = await response.json();
            state.enrollments.push(newEnrollment);
            showAlert('✅ Student enrolled in course successfully!', 'success');
            document.getElementById('enrollmentForm').reset();
            document.getElementById('enrollmentDate').valueAsDate = new Date();
            loadEnrollments();
        } else {
            const error = await response.json();
            showAlert(`❌ Error: ${error.message || 'Failed to create enrollment'}`, 'error');
        }
    } catch (error) {
        showAlert(`❌ Error connecting to server: ${error.message}`, 'error');
        console.error('Error:', error);
    }
}

async function loadEnrollments() {
    try {
        const response = await fetch(`${API_BASE}/enrollments`);
        if (response.ok) {
            state.enrollments = await response.json();
            displayEnrollments();
        }
    } catch (error) {
        console.error('Error loading enrollments:', error);
    }
}

function displayEnrollments() {
    const tableBody = document.getElementById('enrollmentsTableBody');

    if (state.enrollments.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" class="no-data">No enrollments yet. Create one above!</td></tr>';
        return;
    }

    tableBody.innerHTML = state.enrollments.map(enrollment => `
        <tr>
            <td>${enrollment.id}</td>
            <td>${enrollment.studentName || 'N/A'}</td>
            <td>${enrollment.courseName || 'N/A'}</td>
            <td>${formatDate(enrollment.enrollmentDate)}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-danger btn-small" onclick="deleteEnrollment(${enrollment.id})">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

async function deleteEnrollment(enrollmentId) {
    if (!confirm('Are you sure you want to delete this enrollment?')) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/enrollments/${enrollmentId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            state.enrollments = state.enrollments.filter(e => e.id !== enrollmentId);
            showAlert('✅ Enrollment deleted successfully!', 'success');
            loadEnrollments();
        } else {
            showAlert('❌ Failed to delete enrollment', 'error');
        }
    } catch (error) {
        showAlert(`❌ Error: ${error.message}`, 'error');
    }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}
