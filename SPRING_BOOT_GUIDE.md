# 🚀 Updated Project - Quick Start Guide

## What Changed?
✅ **Removed**: Apache Kafka and all event streaming code
✅ **Kept**: Pure Spring Boot REST API with CRUD operations
✅ **Result**: Simpler project focused on core Spring Boot concepts

---

## 📦 Project Now Includes

- **Spring Boot REST API**
- **JPA/Hibernate ORM**
- **MySQL Database** (with H2 in-memory fallback)
- **Swagger UI** for API documentation
- **3-Layer Architecture** (Controller → Service → Repository)

---

## 🔧 Quick Setup

### 1. Build the Project
```bash
cd D:\Projects\SchoolManagementSystem
mvn clean install -DskipTests
```

### 2. Run the Application
```bash
mvn spring-boot:run
```

The application will start on **http://localhost:8080**

### 3. Test the API
**Option A: Swagger UI (Recommended)**
```
Open: http://localhost:8080/swagger-ui.html
```

**Option B: cURL**
```bash
# Create a student
curl -X POST http://localhost:8080/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@school.com",
    "grade": "10A",
    "phone": "9876543210",
    "dateOfBirth": "2007-05-15"
  }'

# Get all students
curl http://localhost:8080/api/students
```

---

## 📚 Key Files to Understand

### 1. **Entities** (Database Models)
- `src/main/java/com/school/entity/Student.java`
- `src/main/java/com/school/entity/Course.java`
- `src/main/java/com/school/entity/Enrollment.java`

### 2. **Repositories** (Data Access)
- `src/main/java/com/school/repository/StudentRepository.java`
- `src/main/java/com/school/repository/CourseRepository.java`
- `src/main/java/com/school/repository/EnrollmentRepository.java`

### 3. **Services** (Business Logic)
- `src/main/java/com/school/service/StudentService.java`
- `src/main/java/com/school/service/CourseService.java`
- `src/main/java/com/school/service/EnrollmentService.java`

### 4. **Controllers** (REST API)
- `src/main/java/com/school/controller/StudentController.java`
- `src/main/java/com/school/controller/CourseController.java`
- `src/main/java/com/school/controller/EnrollmentController.java`

---

## 🎯 Learn Spring Boot Concepts

### 1. **@RestController & @RequestMapping**
- Found in: `StudentController.java`
- Purpose: Handle HTTP requests and return JSON responses

### 2. **@Service & @Repository**
- Found in: `StudentService.java`, `StudentRepository.java`
- Purpose: Separation of concerns (business logic vs data access)

### 3. **@Entity & @Table**
- Found in: `Student.java`, `Course.java`, `Enrollment.java`
- Purpose: Map Java classes to database tables

### 4. **@Column & Constraints**
- Found in: Entity classes
- Purpose: Define database column properties

### 5. **@PrePersist & @PreUpdate**
- Found in: Entity classes
- Purpose: Auto-set timestamps on create/update

### 6. **JpaRepository**
- Found in: Repository interfaces
- Purpose: Automatic CRUD operations

### 7. **@Transactional**
- Found in: Service classes
- Purpose: Database transaction management

### 8. **Swagger Annotations**
- Found in: `SwaggerConfig.java` and Controllers
- Purpose: Auto-generate API documentation

---

## 📊 Database Schema

### Students Table
```sql
CREATE TABLE students (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    grade VARCHAR(50) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    date_of_birth VARCHAR(50),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP
);
```

### Courses Table
```sql
CREATE TABLE courses (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    course_name VARCHAR(100) NOT NULL,
    course_code VARCHAR(50) UNIQUE NOT NULL,
    description VARCHAR(500),
    credits INT NOT NULL,
    instructor VARCHAR(100) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP
);
```

### Enrollments Table
```sql
CREATE TABLE enrollments (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    student_id BIGINT NOT NULL,
    course_id BIGINT NOT NULL,
    enrollment_status VARCHAR(50) NOT NULL,
    grade DOUBLE NOT NULL,
    enrollment_date TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP
);
```

---

## 🔗 API Endpoints Reference

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/students` | Get all students |
| GET | `/api/students/{id}` | Get student by ID |
| POST | `/api/students` | Create new student |
| PUT | `/api/students/{id}` | Update student |
| DELETE | `/api/students/{id}` | Delete student |
| GET | `/api/courses` | Get all courses |
| GET | `/api/courses/{id}` | Get course by ID |
| POST | `/api/courses` | Create new course |
| PUT | `/api/courses/{id}` | Update course |
| DELETE | `/api/courses/{id}` | Delete course |
| GET | `/api/enrollments` | Get all enrollments |
| GET | `/api/enrollments/{id}` | Get enrollment by ID |
| POST | `/api/enrollments` | Create enrollment |
| PUT | `/api/enrollments/{id}` | Update enrollment |
| DELETE | `/api/enrollments/{id}` | Delete enrollment |

---

## 💡 Best Practices Demonstrated

✅ **Separation of Concerns**
- Controllers handle HTTP
- Services handle business logic
- Repositories handle database

✅ **DTOs (Data Transfer Objects)**
- Entities not directly exposed in API
- DTOs control API contract

✅ **Transactions**
- `@Transactional` ensures data consistency

✅ **Error Handling**
- RuntimeException for not found
- Should be improved with custom exceptions

✅ **Logging**
- Using Slf4j with Lombok `@Slf4j`

✅ **Configuration**
- YAML-based configuration
- Environment-specific settings

---

## 📝 Sample API Request/Response

### Create a Student
**Request:**
```bash
POST /api/students
Content-Type: application/json

{
  "firstName": "Alice",
  "lastName": "Smith",
  "email": "alice@school.com",
  "grade": "11B",
  "phone": "9876543210",
  "dateOfBirth": "2006-03-20"
}
```

**Response:**
```json
{
  "id": 1,
  "firstName": "Alice",
  "lastName": "Smith",
  "email": "alice@school.com",
  "grade": "11B",
  "phone": "9876543210",
  "dateOfBirth": "2006-03-20",
  "createdAt": "2026-04-11T10:30:45.123456",
  "updatedAt": "2026-04-11T10:30:45.123456"
}
```

---

## 🛠️ Common Tasks

### Add a New Field to Student
1. Update `Student.java` entity - add field with `@Column`
2. Update `StudentDTO.java` - add field for API
3. Update `StudentController.java` - document in Swagger
4. Database schema auto-updates (JPA ddl-auto: create-drop)

### Create a New API Endpoint
1. Add method in `StudentService.java`
2. Add method in `StudentController.java` with `@GetMapping`, `@PostMapping`, etc.
3. Add Swagger annotations (`@Operation`, `@ApiResponse`)
4. Test via Swagger UI

### Query Custom Data
1. Add method in `StudentRepository.java` - uses Spring Data method naming
2. Example: `List<Student> findByGrade(String grade);`
3. Call from service and return as DTO

---

## 🚀 Next Enhancements

Consider adding:
- ✅ Input validation (`@Valid`, `@NotNull`)
- ✅ Custom exception handling (`@ControllerAdvice`)
- ✅ Pagination (`Pageable`, `Page<T>`)
- ✅ JWT Security (`spring-boot-starter-security`)
- ✅ Unit tests (JUnit, Mockito)
- ✅ Integration tests (TestRestTemplate)
- ✅ Caching (Redis, `@Cacheable`)

---

## 📖 Documentation

- **REST API Docs**: `/swagger-ui.html`
- **OpenAPI Spec**: `/v3/api-docs`
- **Health Check**: `/actuator/health`

---

## ✅ Status

**Project**: School Management System (Pure Spring Boot)
**Status**: ✅ Ready to use
**Version**: 1.0.0
**Java**: 17
**Spring Boot**: 3.1.0
**Database**: MySQL 8.0 / H2

---

**Last Updated**: April 11, 2026
