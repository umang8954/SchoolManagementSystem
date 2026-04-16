# Quick Start Guide

## Setup (2 min)

### Step 1: Build & Run (2 min)
```bash
cd D:\Projects\SchoolManagementSystem
mvn clean install -DskipTests
mvn spring-boot:run
```

Or if using IDE:
- Open project in IntelliJ/Eclipse
- Right-click `Application.java` → Run

The application will start on `http://localhost:8080`

## Testing (2 min)

**Option A: Swagger UI (Recommended)**
- Open: http://localhost:8080/swagger-ui.html
- Expand any endpoint (e.g., "POST /api/students")
- Click "Try it out"
- Fill in the request body
- Click "Execute"

**Option B: cURL**
```bash
# Create a student
curl -X POST http://localhost:8080/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Alice",
    "lastName": "Smith",
    "email": "alice@school.com",
    "grade": "10A",
    "phone": "9876543210",
    "dateOfBirth": "2007-05-15"
  }'

# Get all students
curl http://localhost:8080/api/students
```

### Step 3: Explore the API (1 min)
- Create student
- Create course
- Create enrollment
- Update student
- View data in Swagger UI

## Workflow

Try this to understand how the system works:

### 1. Create a Student
```bash
POST /api/students
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@school.com",
  "grade": "11B",
  "phone": "9876543210",
  "dateOfBirth": "2006-03-20"
}
```
Response: Returns student with auto-generated ID (e.g., id: 1)

### 2. Create a Course
```bash
POST /api/courses
{
  "courseName": "Physics",
  "courseCode": "PHY101",
  "description": "Introduction to Physics - Forces, Motion, Energy",
  "credits": 4,
  "instructor": "Dr. Wilson"
}
```
Response: Returns course with auto-generated ID (e.g., id: 1)

**Another Example:**
```json
{
  "courseName": "Mathematics",
  "courseCode": "MATH101",
  "description": "Algebra and Calculus Fundamentals",
  "credits": 3,
  "instructor": "Prof. Smith"
}
```

**Or Chemistry:**
```json
{
  "courseName": "Chemistry",
  "courseCode": "CHEM201",
  "description": "Organic Chemistry - Chemical Reactions and Bonding",
  "credits": 4,
  "instructor": "Dr. Johnson"
}
```

### 3. Enroll Student in Course
```bash
POST /api/enrollments
{
  "studentId": 1,
  "courseId": 1,
  "enrollmentStatus": "ACTIVE",
  "grade": 0.0,
  "enrollmentDate": "2026-04-11"
}
```
Response: Returns enrollment with auto-generated ID

### 4. Update Student
```bash
PUT /api/students/1
{
  "firstName": "John",
  "lastName": "Smith",
  "email": "john.smith@school.com",
  "grade": "11A",
  "phone": "9876543210",
  "dateOfBirth": "2006-03-20"
}
```
Response: Returns updated student

### 5. Get All Students
```bash
GET /api/students
```
Response: Returns list of all students

## 📱 Using Postman

1. Download Postman: https://www.postman.com/downloads/
2. Import collection: `Postman_Collection.json`
3. Each request is pre-configured
4. Just click Send!

## 📝 API Endpoints Quick Reference

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | /api/students | Create student |
| GET | /api/students | Get all students |
| GET | /api/students/{id} | Get student by ID |
| PUT | /api/students/{id} | Update student |
| DELETE | /api/students/{id} | Delete student |
| POST | /api/courses | Create course |
| GET | /api/courses | Get all courses |
| GET | /api/courses/{id} | Get course by ID |
| POST | /api/enrollments | Create enrollment |
| GET | /api/enrollments | Get all enrollments |
| GET | /api/enrollments/{id} | Get enrollment by ID |
| PUT | /api/enrollments/{id} | Update enrollment |
| DELETE | /api/enrollments/{id} | Delete enrollment |

## 🐛 Troubleshooting

### Application won't start
```bash
# Check Java version (should be 17+)
java -version

# Check Maven is installed
mvn -version---

## Flow

When POST to create a student:

1. REST Request → StudentController.createStudent()
2. Validation → Check required fields
3. Service → StudentService.createStudent()
4. Database → Save to H2/MySQL
5. Response → Return created student with ID

---

## Key Concepts

- **REST API** - HTTP methods for CRUD
- **DTO** - Data Transfer Object
- **Service** - Business logic
- **Repository** - Database access
- **Entity** - Database table mapping
- **Controller** - REST endpoints

---

## Next

1. Create student via Swagger
2. Create course
3. Create enrollment
4. Read README.md
5. Study ARCHITECTURE.md
6. Explore source code
