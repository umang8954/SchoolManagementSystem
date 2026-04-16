# Azure Deployment - Copy Paste Only (SIMPLE)

## STEP 1: Create Azure Account
Go to: https://azure.microsoft.com/en-us/free/students/
- Click "Start Free"
- Sign in with your student email
- Get $100 free credits
- Takes 5 minutes

---

## STEP 2: Update Your Code

### Edit file: `src/main/resources/application.yml`
Replace the DATABASE part with this:

```yaml
spring:
  datasource:
    url: jdbc:sqlserver://school-mgmt-sql-server.database.windows.net:1433;database=school_system;encrypt=true;trustServerCertificate=false;hostNameInCertificate=*.database.windows.net;loginTimeout=30;
    username: 0241mca249@niet.co.in
    driver-class-name: com.microsoft.sqlserver.jdbc.SQLServerDriver
  jpa:
    database-platform: org.hibernate.dialect.SQLServer2019Dialect
    hibernate:
      ddl-auto: update
  web:
    cors:
      allowed-origins: "*"
      allowed-methods: "*"
      allowed-headers: "*"

server:
  port: 8080
```

### Edit file: `ui/script.js`
Find this line:
```javascript
const API_URL = 'http://localhost:8080/api';
```

Replace with:
```javascript
const API_URL = 'https://school-mgmt-api.azurewebsites.net/api';
```

### Push to GitHub
```bash
cd d:\Projects\SchoolManagementSystem
git add .
git commit -m "Update for Azure SQL Server deployment"
git push
```

---

## STEP 3: Create Database on Azure ✅ COMPLETED

**Database Successfully Created in India Region!**

Your database details:
```
Server: school-mgmt-sql-server.database.windows.net
Database: school_system
Region: Central India
Authentication: Azure Active Directory (Entra ID)
Admin Email: 0241mca249@niet.co.in
```

**Status:** ✅ Deployed and Ready
- SQL Server created
- Firewall rules configured
- Database deployed

---

## STEP 4: Create App Service for Backend ✅ IN PROGRESS

**App Service Being Deployed!**

Your App Service details:
```
Name:              school-mgmt-api
Resource Group:    school-mgmt-api_group
Operating System:  Linux
Runtime Stack:     Java 17 LTS
App Service Plan:  B1 Free Tier
Region:            Central India
Status:            Deployment in progress
```

**Status:** ⏳ Deploying (wait 5 minutes for completion)
- Web App Portal deployment started
- Subscription: Azure for Students
- Auto-scaling enabled

---

## STEP 5: Connect GitHub to Azure

In your new App Service:
1. Click "Deployment Center" (left menu)
2. Select "GitHub"
3. Click "Authorize"
4. Sign in with GitHub

Select:
```
Organization:   umang8954
Repository:     SchoolManagementSystem
Branch:         main
```

Click "Save" and wait 10 minutes for deployment.

---

## STEP 6: Add Database Connection

In your App Service:
1. Click "Configuration" (left menu)
2. Click "New application setting"

Add each line separately:

```
Name: spring.datasource.url
Value: jdbc:sqlserver://school-mgmt-sql-server.database.windows.net:1433;database=school_system;encrypt=true;trustServerCertificate=false;hostNameInCertificate=*.database.windows.net;loginTimeout=30;

Name: spring.datasource.username
Value: 0241mca249@niet.co.in

Name: spring.datasource.driver-class-name
Value: com.microsoft.sqlserver.jdbc.SQLServerDriver

Name: spring.jpa.database-platform
Value: org.hibernate.dialect.SQLServer2019Dialect

Name: spring.jpa.hibernate.ddl-auto
Value: update
```

Note: SQL Server uses Azure AD authentication, so username is your email address.

Click "Save".

---

## STEP 7: Restart App

In App Service:
1. Click "Overview"
2. Click "Restart"
3. Wait 2 minutes

---

## STEP 8: Test Your Backend

Copy your App Service URL from Overview tab.

Open in browser:
```
https://your-app-name.azurewebsites.net/swagger-ui.html
```

Or test API:
```
https://your-app-name.azurewebsites.net/api/students
```

---

## STEP 9: Deploy Frontend

### Option A: Simple (Recommended)

1. Go to Azure Portal
2. Search "Static Web Apps"
3. Click "Create"
4. Select your GitHub repo
5. Location: `/ui` folder
6. Click "Create"

Wait 5 minutes. Your frontend is live!

### Option B: Another App Service

1. Create new App Service (same as backend)
2. Name: `school-mgmt-ui`
3. Runtime: Node.js 18
4. Use Deployment Center to connect GitHub
5. Select `/ui` folder

---

## STEP 10: Test Everything

Frontend URL:
```
https://school-mgmt-ui.azurewebsites.net
```

Try to:
- Add a student
- Add a course
- Create enrollment
- See data in tables

---

## URLS AFTER DEPLOYMENT

Copy these and save:

```
Backend API:   https://your-app-name.azurewebsites.net
Frontend:      https://school-mgmt-ui.azurewebsites.net
Database:      school-mgmt-db.mysql.database.azure.com
```

Share these URLs with anyone!

---

## QUICK FIXES

**Problem: Can't connect to database?**
- Check password in Configuration settings
- Check server name is correct
- Restart App Service

**Problem: Frontend shows errors?**
- Check API URL in script.js is correct
- Check backend is running
- Open browser Developer Tools (F12) to see errors

**Problem: App won't start?**
- Go to "Log stream" to see errors
- Check all Configuration settings are entered
- Restart the App Service

---

## That's It!

Your app is now LIVE on Azure cloud!

Time taken: 1-2 hours
Cost: FREE (using student credits)

Share your app link with friends and professors! 🚀
