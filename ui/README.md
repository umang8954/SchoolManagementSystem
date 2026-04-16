# School Management System - Web UI

A simple HTML, CSS, and JavaScript interface for the School Management System backend.

## Features

✅ **Student Management** - Create, view, and delete students
✅ **Course Management** - Create, view, and delete courses  
✅ **Enrollment Management** - Enroll students in courses
✅ **Real-time Updates** - Data syncs automatically with backend
✅ **Beautiful UI** - Modern, responsive design
✅ **Error Handling** - User-friendly error messages

## How to Run

### Step 1: Start Your Spring Boot Application
Open a terminal and run:
```bash
cd d:\Projects\SchoolManagementSystem
mvn spring-boot:run
```
The backend will start on: **http://localhost:8080**

### Step 2: Open the UI
Simply open the `index.html` file in your browser:
- **Windows**: Double-click `index.html`
- **Or**: Right-click → Open with → Your Browser
- **Or**: Use a simple HTTP server (recommended):

```bash
# If you have Python installed:
python -m http.server 8000

# Or if you have Node.js installed:
npx http-server
```

Then open: **http://localhost:8000** or **http://localhost:3000**

> **Note:** Do NOT use `file://` protocol directly as it will block API calls for security reasons.

## How It Works

### Data Flow

1. **User fills a form** → HTML captures input
2. **JavaScript validates** → Checks required fields
3. **Fetch API sends JSON** → POST request to backend
4. **Backend processes** → Validates, saves to MySQL
5. **Returns response** → JSON with new data (including auto-generated ID)
6. **UI updates** → Adds row to table, shows success message
7. **Database persists** → Data saved in MySQL

### Example: Creating a Student

```
User clicks "Create Student" button
        ↓
JavaScript reads form fields:
  firstName: "John"
  lastName: "Doe"
  email: "john@example.com"
  ... etc
        ↓
Sends POST request to: http://localhost:8080/api/students
        ↓
Backend (Spring Boot):
  1. Validates data
  2. Converts JSON to StudentDTO
  3. Saves to MySQL
  4. Returns: { id: 5, firstName: "John", ... }
        ↓
UI receives response
  1. Shows success message: "✅ Student John created!"
  2. Adds new row to table
  3. Clears the form
  4. Updates dropdown for enrollments
```

## File Structure

```
ui/
├── index.html          (HTML structure and forms)
├── style.css           (Beautiful styling)
├── script.js           (JavaScript logic for API calls)
└── README.md           (This file)
```

## Browser Compatibility

Works in all modern browsers:
- ✅ Chrome
- ✅ Firefox
- ✅ Safari
- ✅ Edge

## Features Explained

### 1. Students Tab
- **Add Student Form**: Fill details and create new student
- **Students List**: View all students in a table
- **Delete**: Remove unwanted students
- Auto-generated ID from database

### 2. Courses Tab
- **Add Course Form**: Create courses with name, code, credits, instructor
- **Courses List**: View all courses
- **Delete**: Remove courses

### 3. Enrollments Tab
- **Dropdown Lists**: Select student and course from available options
- **Enrollment Date**: Choose when student enrolled
- **Auto-populate**: Dropdowns update when you add students/courses
- **Display Relationships**: Shows student and course names together

### 4. Alert Messages
- ✅ Green success messages (3 seconds)
- ❌ Red error messages (3 seconds)
- ⚠️ Warning messages

## API Endpoints Used

The UI communicates with these backend endpoints:

```
Students:
  POST   /api/students              - Create new student
  GET    /api/students              - Get all students
  GET    /api/students/{id}         - Get student by ID
  PUT    /api/students/{id}         - Update student
  DELETE /api/students/{id}         - Delete student

Courses:
  POST   /api/courses               - Create new course
  GET    /api/courses               - Get all courses
  GET    /api/courses/{id}          - Get course by ID
  PUT    /api/courses/{id}          - Update course
  DELETE /api/courses/{id}          - Delete course

Enrollments:
  POST   /api/enrollments           - Create enrollment
  GET    /api/enrollments           - Get all enrollments
  DELETE /api/enrollments/{id}      - Delete enrollment
```

## Troubleshooting

### Problem: "Error connecting to server"
**Solution**: Make sure your Spring Boot application is running on `http://localhost:8080`

### Problem: Dropdowns are empty
**Solution**: Create some students and courses first, then they'll appear in the dropdowns

### Problem: Form won't submit
**Solution**: Make sure all required fields (marked with *) are filled

### Problem: Data doesn't persist after refresh
**Solution**: This is normal! Reload the page and:
1. Click the tab
2. Wait for data to load from backend
3. Data should appear (it was saved in MySQL)

### Problem: Form still has old data
**Solution**: Click the form button again to reload the latest data

## Keyboard Shortcuts

- **Tab**: Navigate between form fields
- **Enter**: Submit form (when cursor is in any field)
- **Esc**: Close alert messages

## Code Highlights

### Creating Data (POST)
```javascript
const response = await fetch('http://localhost:8080/api/students', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(studentData)
});
const newStudent = await response.json();
```

### Reading Data (GET)
```javascript
const response = await fetch('http://localhost:8080/api/students');
const students = await response.json();
```

### Deleting Data (DELETE)
```javascript
const response = await fetch('http://localhost:8080/api/students/5', {
    method: 'DELETE'
});
```

## Next Steps

1. ✅ Start your Spring Boot app
2. ✅ Open index.html in browser
3. ✅ Create a student
4. ✅ Create a course
5. ✅ Enroll the student in the course
6. ✅ Check MySQL Workbench to verify data persistence
7. ✅ Restart the app - data is still there!

## Tips

- **Real-time Sync**: When you create data, dropdowns update automatically
- **Error Messages**: Read them carefully - they tell you what went wrong
- **Responsive Design**: Works on mobile, tablet, and desktop
- **No Build Required**: Just open and use!

## Support

If you encounter any issues:
1. Check browser console (F12 → Console tab) for errors
2. Verify Spring Boot is running on port 8080
3. Check MySQL is connected and has data
4. Refresh the page to reload data

---

Enjoy managing your school! 📚
