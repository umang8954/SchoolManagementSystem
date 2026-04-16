# 🔧 Troubleshooting Guide

## Common Issues and Solutions

### 1. Port Already in Use

#### Issue
```
ERROR: bind: address already in use [:]:8080
```

**Solution - Windows PowerShell:**
```powershell
# Find process using port 8080
netstat -ano | findstr :8080

# Output example: TCP 127.0.0.1:8080 127.0.0.1:50505 ESTABLISHED 1234
# Note the PID (1234)

# Kill the process
taskkill /PID 1234 /F

# Or, change port in application.yml
```

---

### 2. Maven Build Fails

#### Issue
```
[ERROR] Failed to execute goal ...
```

**Solution:**
```bash
# Clean Maven cache
mvn clean

# Update dependencies
mvn dependency:resolve

# Try building again
mvn install -DskipTests

# If still failing, check Java version
java -version  # Should be 17 or higher
```

---

### 3. Swagger UI Not Loading

#### Issue
```
http://localhost:8080/swagger-ui.html shows 404 or blank
```

**Solution:**
```bash
# Check if application is running
# Open http://localhost:8080 - should return something

# If blank page:
1. Wait 10-15 seconds after starting app
2. Hard refresh: Ctrl+Shift+R
3. Open http://localhost:8080/v3/api-docs (JSON version)

# If 404:
1. Check application logs for startup errors
2. Ensure port 8080 is correct in logs
3. Check application.yml context-path
```

### 3. Swagger UI Not Loading

#### Issue
```
http://localhost:8080/swagger-ui.html shows 404 or blank
```

**Solution:**
```bash
# Check if application is running
# Open http://localhost:8080/swagger-ui.html

# If blank page:
1. Wait 10-15 seconds after starting app
2. Hard refresh: Ctrl+Shift+R
3. Open http://localhost:8080/v3/api-docs (JSON version)

# If 404:
1. Check application logs for startup errors
2. Verify springdoc-openapi dependency in pom.xml
3. Ensure port 8080 is correct in logs
```

---

### 4. Application Won't Start