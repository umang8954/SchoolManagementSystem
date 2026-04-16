# System Architecture

## 3-Layer Architecture

```
Client Layer → REST API (Port 8080)
                    ↓
        REST Controller Layer
        - StudentController
        - CourseController
        - EnrollmentController
                    ↓
        Service Layer (Business Logic)
        - StudentService
        - CourseService
        - EnrollmentService
                    ↓
        Repository Layer (Data Access)
        - StudentRepository (JpaRepository)
        - CourseRepository (JpaRepository)
        - EnrollmentRepository (JpaRepository)
                    ↓
        Database Layer
        - H2 (in-memory) or MySQL
        - tables: students, courses, enrollments
```

---

## Request Flow Example: Create a Student

1. Client sends: POST /api/students { firstName: "John", ... }
2. StudentController.createStudent() receives request
3. StudentService.createStudent() processes business logic
4. StudentRepository.save() stores to database
5. Service returns StudentDTO
6. Controller returns HTTP 201 response with created student

---

## Database Schema

```
┌──────────────────┐
│     STUDENTS     │
├──────────────────┤
│ id (PK)          │
│ first_name       │ 1
│ last_name        │──────┐
│ email (UNIQUE)   │      │
│ grade            │      │ 0..*
│ phone            │      │
│ date_of_birth    │      │
│ created_at       │      │
│ updated_at       │      │
└──────────────────┘      │
                          │
                          │ ENROLLMENTS
                          │ (Junction Table)
                          │
                          │ ├─ id (PK)
                          │ ├─ student_id (FK)
                          │ ├─ course_id (FK)
                          │ ├─ enrollment_status
                          │ ├─ grade
                          │ ├─ enrollment_date
                          │ ├─ created_at
                          │ └─ updated_at
                          │
┌──────────────────┐      │
│     COURSES      │      │
├──────────────────┤      │
│ id (PK)          │      │
│ course_name      │      │
│ course_code (U)  │      │
│ description      │      │
│ credits          │ 0..* │
│ instructor       │──────┘
│ created_at       │
│ updated_at       │
└──────────────────┘

Relationships:
- One Student can have many Enrollments
- One Course can have many Enrollments
- One Enrollment connects one Student to one Course
