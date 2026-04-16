# Deploy School Management System on Microsoft Azure
## Complete Guide for Students with $100 Free Credits

---

## Overview

Microsoft Azure offers **$100 free credits** for students through the **Azure for Students** program. This guide shows you how to deploy your School Management System on Azure using these free credits.

### What You'll Deploy
- **Backend:** Spring Boot REST API on Azure App Service
- **Database:** MySQL on Azure Database for MySQL
- **Frontend:** Static web app or App Service

### Cost Estimate (With Free Credits)
- App Service (B1): ~$15/month → **FREE** (within $100)
- Database (Basic): ~$30/month → **FREE** (within $100)
- Storage: ~$5/month → **FREE** (within $100)
- **Total Months Covered:** 12+ months with $100 credits

---

## Prerequisites

✅ **You have:**
- GitHub repository (umang8954/SchoolManagementSystem)
- Java Spring Boot project
- MySQL database
- Frontend (HTML/CSS/JS)

✅ **You need:**
- Microsoft Azure account (with student email)
- Credit card (for verification, not charged)

---

## Step 1: Create Azure Student Account

### 1.1 Go to Azure for Students
Visit: **https://azure.microsoft.com/en-us/free/students/**

### 1.2 Click "Start Free"
- Sign in with your **student email** (@college.edu, @university.edu, etc.)
- Use your institutional email address

### 1.3 Verify Student Status
- Microsoft will verify your institution
- Takes 5-10 minutes usually
- Or use alternative verification methods

### 1.4 Accept Terms
- Review and accept Azure terms
- Click "Create account"

### 1.5 Get Your $100 Credits
- Credits appear in your account
- Valid for 12 months
- Expires if not used

**Time Required:** 10-15 minutes

---

## Step 2: Setup Azure Resources

### 2.1 Create Resource Group

1. Go to Azure Portal: https://portal.azure.com
2. Search for "Resource Groups"
3. Click "Create"
4. Fill in:
   - **Name:** `school-management-rg`
   - **Region:** Choose closest to you (e.g., `East US`, `West Europe`)
5. Click "Review + Create" → "Create"

**Time Required:** 2 minutes

---

### 2.2 Create MySQL Database

#### Step 1: Start Database Creation
1. Search for "Azure Database for MySQL"
2. Click "Create"
3. Select "Single Server" (most affordable for students)

#### Step 2: Fill Database Details
```
Server Name:              school-management-db
Admin Username:           adminuser
Admin Password:           YourSecurePassword123!
Location:                 [Same as resource group]
Version:                  5.7 (or 8.0)
Compute + Storage:        Basic, 1 vCore
```

#### Step 3: Networking
- Firewall Rules: Add your IP address
- Or check "Allow access from Azure services"

#### Step 4: Create
- Click "Review + Create"
- Click "Create"
- Wait 5-10 minutes for deployment

#### Step 3: Get Connection String
```
Server=school-management-db.mysql.database.azure.com
Username=adminuser@school-management-db
Password=YourSecurePassword123!
Database=school_system
Port=3306
```

**Time Required:** 15 minutes

---

### 2.3 Create App Service

#### Step 1: Search for App Service
1. Go to Azure Portal
2. Search for "App Service"
3. Click "Create"

#### Step 2: Fill App Details
```
Name:                  school-mgmt-api
Operating System:      Linux
Runtime Stack:         Java 17
App Service Plan:      Create new → B1 (Free tier eligible)
Region:                [Same as resource group]
```

#### Step 3: Click "Review + Create" → "Create"
- Wait for deployment (3-5 minutes)

**Time Required:** 10 minutes

---

## Step 3: Configure Application for Azure

### 3.1 Update application.yml for Azure

Edit your `application.yml` file in VS Code:

```yaml
spring:
  application:
    name: school-management-system
  datasource:
    url: jdbc:mysql://school-management-db.mysql.database.azure.com:3306/school_system?useSSL=true&serverTimezone=UTC
    username: adminuser@school-management-db
    password: YourSecurePassword123!
    driver-class-name: com.mysql.cj.jdbc.Driver
  jpa:
    hibernate:
      ddl-auto: update
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQL8Dialect
  
  web:
    cors:
      allowed-origins: "*"
      allowed-methods: "*"
      allowed-headers: "*"

server:
  port: 8080
```

### 3.2 Update pom.xml (if needed)

Ensure you have:
```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.33</version>
</dependency>
```

### 3.3 Commit Changes to GitHub

```bash
cd d:\Projects\SchoolManagementSystem
git add application.yml
git commit -m "Update database configuration for Azure deployment"
git push
```

**Time Required:** 5 minutes

---

## Step 4: Deploy from GitHub to Azure

### 4.1 Connect GitHub Repository

1. Go to your **App Service** in Azure Portal
2. Click **Deployment Center** (left menu)
3. Select **GitHub** as source
4. Click "Authorize"
5. Sign in with your GitHub account

### 4.2 Select Repository

```
Organization:    umang8954
Repository:      SchoolManagementSystem
Branch:          main
Build Provider:  GitHub Actions
```

### 4.3 Verify and Deploy

1. Click "Preview File" to see GitHub Actions workflow
2. Click "Save"
3. Azure automatically creates GitHub Actions workflow
4. Deployment starts automatically
5. Monitor in **Deployments** tab

**Time Required:** 10 minutes

---

## Step 5: Verify Deployment

### 5.1 Check Deployment Status

In Azure Portal:
1. Go to your App Service
2. Click **Deployments**
3. Watch the deployment progress
4. Should take 5-10 minutes

### 5.2 Get Application URL

1. Go to **Overview** tab
2. Find **Default Domain**
3. It looks like: `https://school-mgmt-api.azurewebsites.net`

### 5.3 Test Your API

Open browser and visit:
```
https://school-mgmt-api.azurewebsites.net/swagger-ui.html
```

Or test an endpoint:
```
GET https://school-mgmt-api.azurewebsites.net/api/students
```

**Time Required:** 15 minutes

---

## Step 6: Deploy Frontend

### Option A: Deploy Frontend on App Service (Recommended for Students)

#### 1. Update Frontend API URL

Edit `ui/script.js`:

```javascript
// Replace localhost with Azure URL
const API_URL = 'https://school-mgmt-api.azurewebsites.net/api';

// Or keep it flexible:
const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:8080/api'
    : 'https://school-mgmt-api.azurewebsites.net/api';
```

#### 2. Create Azure App Service for Frontend

1. Create another **App Service**
   - Name: `school-mgmt-ui`
   - Runtime: Node.js 18 LTS
   
2. After creation, go to **Advanced Tools** (Kudu Console)

3. Navigate to `wwwroot` folder

4. Upload your frontend files:
   - `index.html`
   - `style.css`
   - `script.js`

5. Create `web.config`:
```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <rule name="React Routes" stopProcessing="true">
          <match url=".*" />
          <conditions logicalGrouping="MatchList" trackAllCaptures="false">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
          </conditions>
          <action type="Rewrite" url="/" />
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>
```

#### 3. Test Frontend

Visit: `https://school-mgmt-ui.azurewebsites.net`

### Option B: Use Azure Static Web Apps (Free Tier)

1. Search for "Static Web Apps"
2. Click "Create"
3. Connect your GitHub repo
4. Select folder: `/ui`
5. Click "Create"
6. Azure deploys automatically

**Time Required:** 10-15 minutes

---

## Step 7: Monitor Your Application

### 7.1 Check Logs

In App Service:
1. Click **Log stream** (left menu)
2. Watch real-time logs
3. Helps debug issues

### 7.2 Monitor Performance

In App Service:
1. Click **Metrics**
2. View:
   - CPU usage
   - Memory usage
   - HTTP requests
   - Response times

### 7.3 Set Up Alerts (Optional)

1. Click **Alerts**
2. Add alert when:
   - CPU > 80%
   - Memory > 90%
   - Error rate > 5%

---

## Troubleshooting

### Problem 1: Database Connection Fails

**Error:** `Access denied for user 'adminuser'`

**Solution:**
1. Check connection string in `application.yml`
2. Verify username includes: `@school-management-db`
3. Check password is correct
4. Ensure firewall allows your IP

### Problem 2: Deployment Fails

**Error:** `Build failed` in GitHub Actions

**Solution:**
1. Check GitHub Actions logs
2. Usually: Maven build issue
3. Verify pom.xml has all dependencies
4. Ensure Java version matches

### Problem 3: Application Won't Start

**Error:** `Application error. An error occurred while processing your request.`

**Solution:**
1. Check **Log stream** in App Service
2. Look for actual error message
3. Likely database connection issue
4. Verify connection string

### Problem 4: Frontend Can't Reach Backend

**Error:** `CORS error` or `Failed to fetch`

**Solution:**
1. Verify API URL in `script.js`
2. Check backend has CORS enabled
3. Verify backend is running
4. Test API directly in browser

---

## Cost Breakdown (With Student Credits)

| Service | Monthly Cost | Free Credits Cover |
|---------|-------------|-------------------|
| App Service (B1) | $15 | ✅ Yes (Free) |
| MySQL Database (Basic) | $30 | ✅ Yes (Free) |
| Storage | $5 | ✅ Yes (Free) |
| Static Web Apps | $0 | ✅ Always Free |
| **Total Monthly** | **$50** | **Covered for 24 months!** |

**Your $100 credits will cover 20+ months of usage!**

---

## Useful Azure Commands

### Connect to Database Remotely

```bash
mysql -h school-management-db.mysql.database.azure.com -u adminuser@school-management-db -p
# Enter password when prompted
```

### Restart App Service

```bash
# Via Azure CLI
az webapp restart --name school-mgmt-api --resource-group school-management-rg
```

### View Application Logs

```bash
# Via Azure CLI
az webapp log tail --name school-mgmt-api --resource-group school-management-rg
```

### Scale Up Resources

1. Go to App Service
2. Click **Scale up** (left menu)
3. Select higher tier if needed
4. Click "Apply"

---

## After Deployment Checklist

- ✅ Database is running and accessible
- ✅ Backend API is deployed and responding
- ✅ Frontend is deployed and loads
- ✅ Frontend can communicate with backend
- ✅ CORS is configured correctly
- ✅ All CRUD operations work
- ✅ Logs are accessible
- ✅ Monitoring is enabled

---

## Important Azure Student Benefits

### Beyond This Deployment

**Free Services (Always):**
- App Service (B1 free tier)
- Azure SQL Database (12 months free)
- Azure Cosmos DB (Free tier)
- Azure Storage (Free tier)
- Azure Functions (1M executions/month free)
- Visual Studio Code

**With $100 Credits:**
- Premium services
- Higher tier resources
- 24+ months of usage
- Testing and experimentation

**Learn More:** https://azure.microsoft.com/en-us/free/students/

---

## Next Steps After Deployment

### 1. Share Your App
```
Backend API:  https://school-mgmt-api.azurewebsites.net
Frontend UI:  https://school-mgmt-ui.azurewebsites.net
```

### 2. Setup Custom Domain (Optional)
1. Buy domain on GoDaddy/Namecheap
2. Configure DNS in Azure
3. Add SSL certificate

### 3. Setup CI/CD Pipeline
- GitHub Actions already configured
- Auto-deploys on every push
- Run tests automatically

### 4. Add More Features
- Authentication (Azure AD)
- File Storage (Azure Blob Storage)
- Caching (Azure Redis)
- Analytics (Application Insights)

### 5. Scale Your Application
- If traffic increases
- Upgrade App Service tier
- Add multiple instances
- Use load balancer

---

## Quick Reference URLs

| Service | Link |
|---------|------|
| Azure Portal | https://portal.azure.com |
| Azure for Students | https://azure.microsoft.com/en-us/free/students/ |
| App Service | https://portal.azure.com → App Services |
| Database | https://portal.azure.com → Azure Database for MySQL |
| GitHub Repo | https://github.com/umang8954/SchoolManagementSystem |

---

## Getting Help

### Official Resources
- **Azure Documentation:** https://docs.microsoft.com/en-us/azure/
- **Azure CLI Reference:** https://docs.microsoft.com/en-us/cli/azure/
- **Java on Azure:** https://docs.microsoft.com/en-us/azure/java/

### Community Support
- **Stack Overflow:** Tag questions with `azure`
- **Microsoft Q&A:** https://docs.microsoft.com/en-us/answers/
- **Azure Forums:** https://forums.azure.microsoft.com/

### Student Resources
- **Microsoft Learn (FREE):** https://learn.microsoft.com/
- **Azure DevOps Labs:** https://azuredevopslabs.com/
- **Student Hub:** https://studenthub.microsoft.com/

---

## Summary

**Your Deployment Journey:**

1. ✅ Create Azure Student Account ($100 free)
2. ✅ Create Resource Group
3. ✅ Create MySQL Database
4. ✅ Create App Service for Backend
5. ✅ Update Configuration for Azure
6. ✅ Deploy from GitHub (Automatic)
7. ✅ Deploy Frontend (Static Web App or separate App Service)
8. ✅ Test Your Application
9. ✅ Monitor and Maintain

**Time Required:** 1-2 hours total
**Cost:** FREE with student credits!
**Benefit:** Your project is live on enterprise cloud platform!

---

## Your Live Application

After following this guide, you'll have:

```
Your School Management System
├── Frontend: https://school-mgmt-ui.azurewebsites.net
├── Backend: https://school-mgmt-api.azurewebsites.net
└── Database: Azure MySQL (Secure, Managed)
```

**Share this with potential employers, professors, or friends!** 🚀

---

**Happy Deploying on Azure!** 🎓

If you run into any issues, check the Troubleshooting section above. Most problems have simple solutions!
