# School Management System - Spring Boot Project

## Components

Spring Boot application with:
- REST API endpoints
- CRUD operations
- JPA/Hibernate ORM
- Swagger/OpenAPI documentation
- Service layer architecture

## 🚀 Quick Start

### Prerequisites
- Java 17+
- Maven 3.6+

### Step 1: Build the Project

```bash
mvn clean install
```

### Step 2: Run the Application

```bash
mvn spring-boot:run
```

Or run using Java:
```bash
java -jar target/school-management-system-1.0.0.jar
```

The application will start on: **http://localhost:8080**

### Step 3: Access Swagger UI

Open your browser and go to:
```
http://localhost:8080/swagger-ui.html
```

Or view the OpenAPI JSON:
```
http://localhost:8080/v3/api-docs
```

## 📊 Project Structure

```
SchoolManagementSystem/
├── src/main/java/com/school/
│   ├── Application.java                    # Main entry point
│   ├── controller/
│   │   ├── StudentController.java          # Student REST endpoints
│   │   ├── CourseController.java           # Course REST endpoints
│   │   └── EnrollmentController.java       # Enrollment REST endpoints
│   ├── service/
│   │   ├── StudentService.java             # Student business logic
│   │   ├── CourseService.java              # Course business logic
│   │   └── EnrollmentService.java          # Enrollment business logic
│   ├── repository/
│   │   ├── StudentRepository.java          # Student data access
│   │   ├── CourseRepository.java           # Course data access
│   │   └── EnrollmentRepository.java       # Enrollment data access
│   ├── entity/
│   │   ├── Student.java                    # Student entity
│   │   ├── Course.java                     # Course entity
│   │   └── Enrollment.java                 # Enrollment entity
│   ├── dto/
│   │   ├── StudentDTO.java                 # Student DTO
│   │   ├── CourseDTO.java                  # Course DTO
│   │   └── EnrollmentDTO.java              # Enrollment DTO
│   └── config/
│       └── SwaggerConfig.java              # Swagger configuration
├── src/main/resources/
│   └── application.yml                     # Application configuration
├── pom.xml                                 # Maven dependencies
├── docker-compose.yml                      # Docker setup
└── README.md                               # This file
```

## 🗄️ Database Schema

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
  updated_at TIMESTAMP NOT NULL
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
  updated_at TIMESTAMP NOT NULL
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
  updated_at TIMESTAMP NOT NULL
);
```

## 📝 API Examples

### Create a Student

```bash
curl -X POST http://localhost:8080/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Alice",
    "lastName": "Smith",
    "email": "alice@school.com",
    "grade": "11B",
    "phone": "9876543210",
    "dateOfBirth": "2007-05-20"
  }'
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
  "dateOfBirth": "2007-05-20"
}
```

### Create a Course

```bash
curl -X POST http://localhost:8080/api/courses \
  -H "Content-Type: application/json" \
  -d '{
    "courseName": "Mathematics",
    "courseCode": "MATH101",
    "description": "Basic Mathematics",
    "credits": 4,
    "instructor": "Dr. Smith"
  }'
```

### Create an Enrollment

```bash
curl -X POST http://localhost:8080/api/enrollments \
  -H "Content-Type: application/json" \
  -d '{
    "studentId": 1,
    "courseId": 1,
    "enrollmentStatus": "ACTIVE",
    "grade": 0.0
  }'
```

### Get All Students

```bash
curl http://localhost:8080/api/students
```

### Update a Student

```bash
curl -X PUT http://localhost:8080/api/students/1 \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Alice",
    "lastName": "Johnson",
    "email": "alice.johnson@school.com",
    "grade": "11B",
    "phone": "9876543210",
    "dateOfBirth": "2007-05-20"
  }'
```

### Delete a Student

```bash
curl -X DELETE http://localhost:8080/api/students/1
```

## 🧪 Testing with Swagger UI

1. Open http://localhost:8080/swagger-ui.html
2. Expand any endpoint (e.g., "POST /api/students")
3. Click "Try it out"
4. Enter request body
5. Click "Execute"
6. View the response

## 📊 Monitoring

### Application Logs
```bash
# The application logs request/response data in the terminal
2024-04-08 10:30:45 - Creating student: alice@school.com
2024-04-08 10:30:46 - Student created with ID: 1
2024-04-08 10:30:47 - Fetching student with ID: 1
```

### H2 Database (In-Memory)
H2 console available at: http://localhost:8080/h2-console
```bash
# Or query via MySQL if using MySQL instead
mysql -u root -proot school_db
SHOW TABLES;
SELECT * FROM students;
```

## 🔍 Understanding the Code Flow

### Example: When You Update a Student

1. **REST Request** → `StudentController.updateStudent()`
2. **Validation** → Check if student exists
3. **Database Update** → Save to database using JPA
4. **Response** → Return updated student data to client
5. **Service Layer** → All business logic handled here
6. **Repository** → Database operations abstracted

## 🛠️ Troubleshooting

### H2 Database Issues
```
ERROR: Database not found
```
**Solution:** H2 is created automatically. It will be in memory by default.

### MySQL Connection Error (if using MySQL)
```
ERROR: Cannot connect to MySQL
```
**Solution:** Ensure MySQL is running
```bash
# Install Docker if needed, or start MySQL locally
mysql -u root -proot

# Verify connection string in application.yml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/school_db
    username: root
    password: root
```

### Port Already in Use
```
ERROR: Port 8080 already in use
```
**Solution:** Change port in `application.yml`:
```yaml
server:
  port: 8081  # Change to available port
```

## 📚 Learning Resources

### Key Files to Study

1. **StudentService.java** - Complete CRUD business logic
2. **StudentController.java** - REST endpoints with Swagger annotations
3. **StudentRepository.java** - Database access layer
4. **Student.java** - Entity mapping with JPA

### Important Concepts

| Concept | File | Purpose |
|---------|------|---------|
| Entity Mapping | `Student.java` | Database table mapping |
| DTO Pattern | `StudentDTO.java` | Data transfer between layers |
| Repository | `StudentRepository.java` | Database access |
| Service | `StudentService.java` | Business logic |
| Controller | `StudentController.java` | REST endpoints |

## 🎓 Advanced Learning

### Try These Exercises:

1. **Add Error Handling:**
   - Implement custom exception handlers
   - Add validation to DTOs

2. **Add More Features:**
   - Implement enrollment grade updates
   - Add course capacity limits
   - Add student registration date validation

3. **Database Optimization:**
   - Add database indexes
   - Implement pagination in get endpoints
   - Add search filters

## 📞 Summary

This project teaches you:
- ✅ How to build a complete REST API with Spring Boot
- ✅ How to perform CRUD operations
- ✅ How to integrate with MySQL database
- ✅ How to design a proper 3-layer architecture
- ✅ How to document APIs with Swagger/OpenAPI
- ✅ How to use JPA/Hibernate for ORM

Keep exploring and learning! 🚀
