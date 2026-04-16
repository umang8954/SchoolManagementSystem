# School Management System - UI Guide

## Quick Start

### Open the UI
1. Make sure both servers are running:
   - Backend: `mvn spring-boot:run` (port 8080)
   - UI Server: `python -m http.server 8000` (port 8000)

2. Open browser: **`http://localhost:8000`**

---

## UI Overview

The application has **3 main tabs** for managing your school data:

```
┌─────────────────────────────────────────────────────────────────┐
│ 📚 School Management System                                      │
│ [Students] [Courses] [Enrollments]                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│ Each tab has 2 sections:                                        │
│ 1. ➕ Form to CREATE/ADD new data                               │
│ 2. 📋 Table to VIEW all data                                    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## TAB 1: STUDENTS

### Form: Add New Student

```
📚 Student Management

➕ Add New Student
┌──────────────────────────────────────────────┐
│ First Name:        [________________]         │
│ Last Name:         [________________]         │
│                                               │
│ Email:             [________________]         │
│ Grade:             [_____]                    │
│                                               │
│ Phone:             [________________]         │
│ Date of Birth:     [__________]    📅         │
│                                               │
│         [CREATE STUDENT]                     │
└──────────────────────────────────────────────┘
```

### How to Create a Student

1. **Fill all fields:**
   - First Name: `John`
   - Last Name: `Doe`
   - Email: `john@school.com`
   - Grade: `10`
   - Phone: `9876543210`
   - Date of Birth: `2005-05-15`

2. **Click "Create Student" button**

3. **See success message:** ✅ `Student John created successfully!`

4. **Scroll down** - Student appears in table!

---

### Table: Students List

```
👥 Students List

┌──────────────────────────────────────────────────────────────────┐
│ ID │ FIRST NAME │ LAST NAME │ EMAIL │ GRADE │ PHONE │ DOB │ ... │
├──────────────────────────────────────────────────────────────────┤
│ 1  │ John       │ Doe       │ john@ │ 10    │ 98765 │ 200 │ ❌  │
│ 2  │ Jane       │ Smith     │ jane@ │ 11    │ 98765 │ 200 │ ❌  │
│ 3  │ Bob        │ Johnson   │ bob@  │ 10    │ 98765 │ 200 │ ❌  │
└──────────────────────────────────────────────────────────────────┘
```

### Table Features

- **View all students** - Scroll down to see the table
- **Delete student** - Click the red "Delete" button in the Actions column
- **Auto-refresh** - Table updates when you create/delete

---

## TAB 2: COURSES

### Form: Add New Course

```
📖 Course Management

➕ Add New Course
┌──────────────────────────────────────────────┐
│ Course Name:       [________________]         │
│ Course Code:       [________________]         │
│                                               │
│ Instructor:        [________________]         │
│ Credits:           [_____]                    │
│                                               │
│ Description:       [________________]         │
│                    [________________]         │
│                    [________________]         │
│                                               │
│         [CREATE COURSE]                      │
└──────────────────────────────────────────────┘
```

### How to Create a Course

1. **Fill the form:**
   - Course Name: `Mathematics`
   - Course Code: `MATH101`
   - Instructor: `Mr. Smith`
   - Credits: `3`
   - Description: `Introduction to Algebra and Geometry`

2. **Click "Create Course" button**

3. **See success message:** ✅ `Course Mathematics created successfully!`

4. **Scroll down** - Course appears in table!

---

### Table: Courses List

```
📖 Courses List

┌────────────────────────────────────────────────────────────────┐
│ ID │ COURSE NAME │ CODE │ INSTRUCTOR │ CREDITS │ DESC │ ... │
├────────────────────────────────────────────────────────────────┤
│ 1  │ Mathematics │ MAT1 │ Mr. Smith  │ 3       │ Int. │ ❌  │
│ 2  │ English     │ ENG1 │ Ms. Jones  │ 3       │ Lit. │ ❌  │
│ 3  │ Physics     │ PHY1 │ Dr. Brown  │ 4       │ Sci. │ ❌  │
└────────────────────────────────────────────────────────────────┘
```

### Table Features

- **View all courses** - Scroll down
- **Delete course** - Click red "Delete" button
- **Auto-populate** - Courses appear in enrollments dropdown

---

## TAB 3: ENROLLMENTS

### Form: Enroll Student in Course

```
📋 Enrollment Management

➕ Enroll Student in Course
┌──────────────────────────────────────────────┐
│ Select Student:    [Dropdown ▼]               │
│                    ├─ John Doe                │
│                    ├─ Jane Smith              │
│                    └─ Bob Johnson             │
│                                               │
│ Select Course:     [Dropdown ▼]               │
│                    ├─ Mathematics (MATH101)   │
│                    ├─ English (ENG101)        │
│                    └─ Physics (PHY101)        │
│                                               │
│ Enrollment Date:   [__________]    📅         │
│                                               │
│         [ENROLL STUDENT]                     │
└──────────────────────────────────────────────┘
```

### How to Create an Enrollment

1. **Select Student:**
   - Click dropdown under "Select Student"
   - Choose `John Doe`

2. **Select Course:**
   - Click dropdown under "Select Course"
   - Choose `Mathematics (MATH101)`

3. **Set Enrollment Date:**
   - Click calendar
   - Select date (e.g., `15-04-2026`)

4. **Click "Enroll Student" button**

5. **See success message:** ✅ `Student enrolled in course successfully!`

6. **Scroll down** - Enrollment appears in table!

---

### Table: Enrollments List

```
📋 Enrollments List

┌────────────────────────────────────────────────────────────┐
│ ID │ STUDENT NAME │ COURSE NAME │ ENROLLMENT DATE │ ... │
├────────────────────────────────────────────────────────────┤
│ 1  │ John Doe     │ Mathematics │ Apr 15, 2026    │ ❌  │
│ 2  │ Jane Smith   │ English     │ Apr 15, 2026    │ ❌  │
│ 3  │ Bob Johnson  │ Physics     │ Apr 15, 2026    │ ❌  │
└────────────────────────────────────────────────────────────┘
```

### Table Features

- **View all enrollments** - Shows student + course combinations
- **Delete enrollment** - Student drops the course
- **Auto-update** - When you add students/courses, dropdowns update

---

## Complete Workflow Example

### Scenario: Enroll John Doe in Math

#### Step 1: Create Student (Students Tab)
```
Form Input:
- First Name: John
- Last Name: Doe
- Email: john@school.com
- Grade: 10
- Phone: 9876543210
- Date of Birth: 2005-05-15

Click: [CREATE STUDENT]
Result: ✅ Student John created!
Table shows: John Doe in Students List
```

#### Step 2: Create Course (Courses Tab)
```
Form Input:
- Course Name: Mathematics
- Course Code: MATH101
- Instructor: Mr. Smith
- Credits: 3
- Description: Algebra & Geometry

Click: [CREATE COURSE]
Result: ✅ Course Mathematics created!
Table shows: Mathematics in Courses List
```

#### Step 3: Create Enrollment (Enrollments Tab)
```
Form Input:
- Select Student: John Doe (dropdown populated)
- Select Course: Mathematics (dropdown populated)
- Enrollment Date: 15-04-2026

Click: [ENROLL STUDENT]
Result: ✅ Student enrolled successfully!
Table shows: John Doe | Mathematics | Apr 15, 2026
```

---

## Features Explained

### ✅ Success Messages
- Green boxes appear in top-right
- Auto-disappear after 3 seconds
- Show "✅ Action completed successfully!"

### ❌ Error Messages
- Red boxes appear in top-right
- Explain what went wrong
- Tell you how to fix it

### 📋 Tables
- **Show all data** from database
- **Auto-refresh** when you create/delete
- **Sortable columns** - Click header to sort
- **Responsive** - Works on mobile/tablet/desktop

### 🔄 Auto-Sync
- Create student → Dropdown updates instantly
- Create course → Dropdown updates instantly
- Delete record → Table refreshes automatically

---

## Common Actions

### To Create Data
1. Go to the **Form Section** (top of tab)
2. Fill **all required fields** (marked with *)
3. Click **"CREATE"** button
4. See **success message** ✅
5. **Scroll down** to see in table

### To View All Data
1. Go to any **Tab** (Students, Courses, Enrollments)
2. **Scroll down** to see table
3. All data from **database** appears automatically
4. Refresh page (F5) to **reload** from database

### To Delete Data
1. Find record in **table**
2. Click **red "Delete"** button
3. **Confirm** deletion
4. Record **disappears** from table
5. Data **removed** from database

### To See Latest Data
- **Refresh page:** Press `F5`
- **Switch tabs:** Click another tab then back
- **Hard refresh:** Press `Ctrl + Shift + R`

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Tab` | Jump between form fields |
| `Enter` | Submit form (when in field) |
| `F5` | Reload page |
| `Ctrl + Shift + R` | Hard refresh (clear cache) |
| `Escape` | Close alert messages |

---

## Troubleshooting

### Problem: "Error connecting to server"
**Solution:** Make sure backend is running (`mvn spring-boot:run` in Terminal 1)

### Problem: Dropdowns are empty
**Solution:** Create students/courses first, then dropdowns will populate

### Problem: Data not showing in table
**Solution:** Scroll down - table is below the form

### Problem: Same student/course twice
**Solution:** Frontend shows all records - duplicates are in database

### Problem: "Error: Failed to create enrollment"
**Solution:** Make sure you selected both student AND course from dropdowns

### Problem: Data disappeared after refresh
**Solution:** Normal! Reload page and wait 2 seconds - data loads from MySQL

---

## Data Flow Diagram

```
┌─────────────────────────────────┐
│ YOU (User at Computer)          │
│ Opens: http://localhost:8000    │
└──────────────┬──────────────────┘
               │
               ↓
    ┌──────────────────────┐
    │ UI (HTML, CSS, JS)   │
    │ ┌────────────────┐   │
    │ │ Forms          │   │ ← You fill these
    │ │ Tables         │   │ ← You see data here
    │ │ Buttons        │   │
    │ └────────────────┘   │
    └──────────────┬───────┘
                   │
                   │ HTTP Requests (JSON)
                   ↓
        ┌──────────────────────────┐
        │ Backend API (Port 8080)  │
        │ Spring Boot              │
        │ ┌──────────────────────┐ │
        │ │ Student Controller   │ │
        │ │ Course Controller    │ │
        │ │ Enrollment Controller│ │
        │ └──────────────────────┘ │
        └──────────────┬────────────┘
                       │
                       │ SQL Queries
                       ↓
        ┌──────────────────────────┐
        │ MySQL Database           │
        │ (localhost:3306)         │
        │ ┌──────────────────────┐ │
        │ │ students table       │ │
        │ │ courses table        │ │
        │ │ enrollments table    │ │
        │ └──────────────────────┘ │
        │ Data persists forever!   │
        └──────────────────────────┘
```

---

## Tips & Tricks

### ⚡ Speed Tips
- Create multiple students at once
- Batch create courses before enrollments
- Enrollments work faster if students/courses exist

### 🎯 Best Practices
- Create student → Then create course → Then enroll
- Use consistent email formats (name@school.com)
- Use course codes like MATH101, ENG102
- Set meaningful instructor names

### 🔍 Debugging
- Open **F12** (Developer Tools)
- Go to **Network** tab
- Create something - see the API call
- Check **Console** for errors

### 📊 Bulk Operations
- You can create multiple students
- You can enroll one student in multiple courses
- You can have multiple enrollments per course

---

## API Endpoints (For Reference)

If you want to test via Swagger:

**Backend Swagger UI:** `http://localhost:8080/swagger-ui.html`

```
Students:
  POST   /api/students              Create
  GET    /api/students              Get all
  GET    /api/students/{id}         Get by ID
  PUT    /api/students/{id}         Update
  DELETE /api/students/{id}         Delete

Courses:
  POST   /api/courses               Create
  GET    /api/courses               Get all
  GET    /api/courses/{id}          Get by ID
  PUT    /api/courses/{id}          Update
  DELETE /api/courses/{id}          Delete

Enrollments:
  POST   /api/enrollments           Create
  GET    /api/enrollments           Get all
  DELETE /api/enrollments/{id}      Delete
```

---

## Summary

Your UI has everything you need:

✅ **3 Tabs** - Students, Courses, Enrollments
✅ **Forms** - Create new data easily
✅ **Tables** - View all data at a glance
✅ **Buttons** - Delete unwanted records
✅ **Messages** - Know what happened
✅ **Auto-Sync** - Everything updates automatically
✅ **Persistent** - Data saved in MySQL forever

**Just fill form → Click button → See data appear!** 🎉

---

## Next Steps

1. ✅ Create 3-4 students
2. ✅ Create 2-3 courses
3. ✅ Enroll students in courses
4. ✅ Go to MySQL Workbench - see all data
5. ✅ Refresh page - data still there!
6. ✅ Delete a record - watch it disappear
7. ✅ Refresh - data gone from MySQL too!

Enjoy managing your school! 📚✨
