# API Reference - School Management System

## URLs

| Service | URL |
|---------|-----|
| Swagger UI | http://localhost:8080/swagger-ui.html |
| API Docs | http://localhost:8080/v3/api-docs |
| Health | http://localhost:8080/actuator/health |
| API Base | http://localhost:8080/api |

---

## Commands

### Start the Application
```bash
cd D:\Projects\SchoolManagementSystem
java -jar target/school-management-system-1.0.0.jar
```

### Stop the Application
```bash
# Find process on port 8080
netstat -ano | findstr :8080

# Kill it (replace 15112 with your PID)
taskkill /PID 15112 /F
```

### Rebuild (if you modify code)
```bash
cd D:\Projects\SchoolManagementSystem
mvn clean install -DskipTests
```

---

## Endpoints

### Students
```
CREATE  POST   /api/students
READ    GET    /api/students
READ    GET    /api/students/{id}
UPDATE  PUT    /api/students/{id}
DELETE  DELETE /api/students/{id}
```

### Courses
```
CREATE  POST   /api/courses
READ    GET    /api/courses
READ    GET    /api/courses/{id}
UPDATE  PUT    /api/courses/{id}
DELETE  DELETE /api/courses/{id}
```

### Enrollments
```
CREATE  POST   /api/enrollments
READ    GET    /api/enrollments
READ    GET    /api/enrollments/{id}
READ    GET    /api/enrollments/student/{studentId}
UPDATE  PUT    /api/enrollments/{id}
DELETE  DELETE /api/enrollments/{id}
```

---

## Project Structure

```
SchoolManagementSystem
├── src/main/java/com/school/
│   ├── controller/      ← REST endpoints here
│   ├── service/         ← Business logic here
│   ├── repository/      ← Database queries here
│   ├── entity/          ← Database tables here
│   ├── dto/             ← Request/response objects
│   ├── kafka/           ← Messaging here
│   └── Application.java ← Entry point
│
├── src/main/resources/
│   └── application.yml  ← Configuration
│
├── pom.xml              ← Maven dependencies
├── target/              ← Compiled JAR file
└── Documentation files
```

---

## 🧪 Quick Test Commands

### Test in PowerShell
```powershell
# Get all students
Invoke-WebRequest http://localhost:8080/api/students -UseBasicParsing

# Get health
Invoke-WebRequest http://localhost:8080/actuator/health -UseBasicParsing

# Create student
$body = @{firstName="John"; lastName="Doe"; email="john@school.com"; grade="10A"; phone="1234567890"} | ConvertTo-Json
Invoke-WebRequest -Uri http://localhost:8080/api/students -Method POST -Headers @{"Content-Type"="application/json"} -Body $body -UseBasicParsing
```

---

## Tech Stack

- Spring Boot 3.1.0
- Java 17
- H2 (in-memory database)
- Hibernate/JPA ORM
- Maven
- Tomcat 10
- Swagger/OpenAPI 3.0

---

## Key Classes

| Class | Purpose |
|-------|---------|
| `Application` | Main entry point |
| `StudentController` | Student REST endpoints |
| `StudentService` | Student business logic |
| `StudentRepository` | Student data access |
| `Student` | Student entity |
| `StudentDTO` | Student DTO |

---

## Configuration

File: `src/main/resources/application.yml`

- **Port**: 8080
- **Database**: H2 in-memory
- **Logging**: DEBUG

---

## Documentation Files

- START_HERE.md - Getting started
- README.md - Complete guide
- QUICK_START.md - 5-minute setup
- ARCHITECTURE.md - System design
- SPRING_BOOT_GUIDE.md - Spring Boot concepts
- TROUBLESHOOTING.md - Problem solving

---
