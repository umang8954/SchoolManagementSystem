# 🚀 Quick Start - 5 Minutes

## Step 1: Build (2 min)
```bash
cd D:\Projects\SchoolManagementSystem
mvn clean install -DskipTests
```

## Step 2: Run (1 min)
```bash
mvn spring-boot:run
```

## Step 3: Test (2 min)
Open browser: http://localhost:8080/swagger-ui.html

Use Swagger UI to:
1. Create a student
2. Create a course
3. Create an enrollment

---

## API Endpoints Reference

### Students
- `GET /api/students` - Get all
- `GET /api/students/{id}` - Get by ID
- `POST /api/students` - Create
- `PUT /api/students/{id}` - Update
- `DELETE /api/students/{id}` - Delete

### Courses
- `GET /api/courses` - Get all
- `GET /api/courses/{id}` - Get by ID
- `POST /api/courses` - Create
- `PUT /api/courses/{id}` - Update
- `DELETE /api/courses/{id}` - Delete

### Enrollments
- `GET /api/enrollments` - Get all
- `GET /api/enrollments/{id}` - Get by ID
- `POST /api/enrollments` - Create
- `PUT /api/enrollments/{id}` - Update
- `DELETE /api/enrollments/{id}` - Delete

---

## Example: Create a Student

```bash
curl -X POST http://localhost:8080/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@school.com",
    "grade": "10A",
    "phone": "9876543210",
    "dateOfBirth": "2008-01-15"
  }'
```

---

## Troubleshooting

### Build fails
```bash
mvn clean
mvn install -DskipTests
```

### Port 8080 in use
Edit `application.yml` and change `server.port` to 8081

### Swagger UI is blank
Hard refresh browser: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

---

## Next Steps

1. Read **README.md** for complete guide
2. Review **ARCHITECTURE.md** for system design
3. Study **SPRING_BOOT_GUIDE.md** for detailed annotations
4. Explore the **source code** in `src/main/java/com/school/`

---

**Happy Learning!** 🎓
