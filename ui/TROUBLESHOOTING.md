# UI - Troubleshooting & FAQ

## Getting Started Issues

### Issue: "Cannot GET / localhost:8000"

**Cause:** UI server not running

**Fix:**
1. Open Terminal
2. Navigate: `cd d:\Projects\SchoolManagementSystem\ui`
3. Run: `python -m http.server 8000`
4. Open browser: `http://localhost:8000`

---

### Issue: "Error connecting to server"

**Cause:** Backend not running

**Fix:**
1. Open Terminal
2. Navigate: `cd d:\Projects\SchoolManagementSystem`
3. Run: `mvn spring-boot:run`
4. Wait for: `Started Application in X.XXX seconds`
5. Refresh browser: `F5`

---

### Issue: Blank white page

**Cause:** UI server started but content not loading

**Fix:**
1. Press: `Ctrl + Shift + R` (hard refresh)
2. Check browser console: `F12 → Console`
3. Look for red error messages
4. If nothing loads, restart Python server

---

## Form Issues

### Issue: Cannot fill form fields

**Cause:** Form not loaded or JavaScript error

**Fix:**
1. Hard refresh: `Ctrl + Shift + R`
2. Check browser console: `F12 → Console`
3. Look for errors in red
4. Try different browser (Chrome, Firefox, Edge)

---

### Issue: "Please select both a student and a course"

**Cause:** You didn't select from dropdown

**Fix:**
1. Click "Select Student" dropdown
2. Click an actual student name (not placeholder)
3. Click "Select Course" dropdown
4. Click an actual course name (not placeholder)
5. Then click "Enroll Student"

---

### Issue: Form won't submit

**Cause:** Missing required fields

**Fix:**
- All fields with **\*** are required
- Check every field is filled:
  - First Name ✓
  - Last Name ✓
  - Email ✓
  - Grade ✓
  - Phone ✓
  - Date of Birth ✓
- Try again

---

### Issue: Fields keep clearing

**Cause:** Form resets after successful submit (normal behavior)

**No fix needed** - This is intentional! Allows rapid data entry.

---

## Data Display Issues

### Issue: Table shows "No data yet"

**Cause 1:** No data created yet
**Fix:** Create a student/course/enrollment using the form

**Cause 2:** Data exists but not displaying
**Fix:**
1. Scroll down - table may be below form
2. Refresh page: `F5`
3. Click another tab and back
4. Hard refresh: `Ctrl + Shift + R`

---

### Issue: Dropdowns are empty (Enrollments tab)

**Cause:** No students or courses created yet

**Fix:**
1. Go to Students tab
2. Create at least 1 student
3. Go to Courses tab
4. Create at least 1 course
5. Go to Enrollments tab
6. Dropdowns now populated!

---

### Issue: Table shows "N/A" for student/course names

**Cause:** Backend needs restart

**Fix:**
1. Stop backend: `Ctrl + C` in Terminal 1
2. Rebuild: `mvn clean install -q`
3. Restart: `mvn spring-boot:run`
4. Refresh browser: `Ctrl + Shift + R`

---

### Issue: Data disappears after page refresh

**Cause:** Misunderstanding - data is in database, just needs reload

**This is normal!** Follow these steps:
1. Refresh page: `F5`
2. Wait 2-3 seconds
3. Data loads from MySQL
4. Should reappear

---

## Button/Action Issues

### Issue: "Delete" button doesn't work

**Cause:** Button click not registering

**Fix:**
1. Make sure you clicked on DELETE button
2. If dialog appears, click "OK" to confirm
3. Refresh page to verify deletion
4. Data should be gone from table AND database

---

### Issue: Can't create enrollment

**Cause:** Multiple possible reasons

**Fix checklist:**
- ✅ Backend running?
- ✅ Dropdowns have selections (not "Choose..." placeholder)?
- ✅ Date is selected?
- ✅ Refreshed browser recently?

---

### Issue: Create button appears disabled

**Cause:** Form has invalid or empty fields

**Fix:**
1. Click in each field
2. Type something valid
3. Button should become active
4. Try again

---

## Error Messages

### "Error: Failed to create enrollment"

**Possible causes:**
1. Student/Course IDs invalid
2. Date format wrong
3. Required fields empty
4. Backend error

**Fix:**
1. Check all dropdowns filled
2. Hard refresh: `Ctrl + Shift + R`
3. Try again
4. Check backend logs (Terminal 1)

---

### "Error: Failed to create student"

**Possible causes:**
1. Email already exists
2. Invalid phone number
3. Invalid date
4. Required field empty

**Fix:**
1. Use different email
2. Try: 9876543210 format
3. Use valid date (YYYY-MM-DD)
4. Fill all fields

---

### "Error connecting to server"

**Cause:** Backend not responding

**Fix:**
1. Check Terminal 1 - is backend running?
2. If not, start: `mvn spring-boot:run`
3. Wait 10 seconds
4. Refresh browser: `F5`

---

## Display Issues

### Issue: Text is too small/large

**Cause:** Browser zoom level

**Fix:**
- Zoom in: `Ctrl + +`
- Zoom out: `Ctrl + -`
- Reset: `Ctrl + 0`

---

### Issue: Table columns are cut off

**Cause:** Screen is narrow

**Fix:**
1. Zoom out: `Ctrl + -`
2. Rotate phone to landscape
3. Use desktop instead
4. Scroll horizontally in table

---

### Issue: Colors look weird

**Cause:** Browser dark mode

**Fix:**
1. Turn off dark mode
2. Or refresh: `Ctrl + Shift + R`
3. Try different browser
4. Clear cookies: `Ctrl + Shift + Delete`

---

### Issue: Alert messages won't disappear

**Cause:** CSS not loaded

**Fix:**
1. Hard refresh: `Ctrl + Shift + R`
2. Close and reopen browser tab
3. Try different browser
4. Restart Python server

---

## Performance Issues

### Issue: Page loads slowly

**Cause:** Multiple factors

**Fix:**
1. Close other browser tabs
2. Restart browser
3. Restart Python server: `Ctrl + C` then `python -m http.server 8000`
4. Check internet connection

---

### Issue: Form responds slowly

**Cause:** Backend slow

**Fix:**
1. Check backend logs (Terminal 1)
2. Restart backend
3. Rebuild: `mvn clean install -q`
4. Wait for startup

---

### Issue: Table slow to load

**Cause:** Too much data

**Fix:**
1. Delete old test data
2. Clear MySQL: `DELETE FROM enrollments; DELETE FROM courses; DELETE FROM students;`
3. Refresh page

---

## Browser-Specific Issues

### Chrome
- ✅ Works perfectly
- If issues: Clear cache `Ctrl + Shift + Delete`

### Firefox
- ✅ Works perfectly
- If issues: Disable extensions, try Safe Mode

### Safari
- ✅ Should work
- If issues: Update Safari, try different browser

### Edge
- ✅ Works perfectly
- If issues: Clear cookies, try Incognito mode

---

## Database Issues

### Issue: "Cannot connect to database"

**Cause:** MySQL not running

**Fix:**
1. Start MySQL service
2. Check credentials in `application.yml`:
   - Host: localhost
   - Port: 3306
   - Username: root
   - Password: Root123
3. Restart backend

---

### Issue: "Table doesn't exist"

**Cause:** Tables not created on startup

**Fix:**
1. Stop backend: `Ctrl + C`
2. Delete `target` folder
3. Rebuild: `mvn clean install`
4. Start: `mvn spring-boot:run`
5. Tables auto-create!

---

### Issue: Data not saving to MySQL

**Cause:** Connection issue

**Fix:**
1. Open MySQL Workbench
2. Connect to database
3. Check tables exist
4. Check `application.yml` configuration
5. Restart everything

---

## Advanced Troubleshooting

### Open Browser Console (F12)

**Steps:**
1. Press: `F12`
2. Click: "Console" tab
3. Look for red error messages
4. Read the error carefully

**Example error:**
```
Failed to fetch: http://localhost:8080/api/students
```

**Fix:** Backend not running

---

### Check Backend Logs

**In Terminal 1 where backend is running:**

**Look for:**
- ✅ `Started Application in X.XXX seconds` = Good
- ❌ `ERROR` messages = Problem
- ❌ `Exception` messages = Error occurred

**Read the full error message** - it usually tells you what's wrong.

---

### Check Network Requests

**In Browser (F12):**
1. Open: `F12 → Network`
2. Create a student
3. Look for network requests
4. Click on `/api/students`
5. Check "Response" tab

**Success:** Status 201, JSON response
**Failure:** Status 400/500, error message

---

## Getting Help

### What to do if stuck:

1. **Check browser console** (F12)
2. **Check backend logs** (Terminal 1)
3. **Try hard refresh** (Ctrl+Shift+R)
4. **Restart everything** (backend + UI server)
5. **Check database** (MySQL Workbench)
6. **Read error messages** carefully

### Error Checklist

- [ ] Backend running? (Terminal 1)
- [ ] UI server running? (Terminal 2)
- [ ] Browser can reach? (http://localhost:8000)
- [ ] MySQL running?
- [ ] Forms filled correctly?
- [ ] Dropdowns selected?
- [ ] No browser errors? (F12)
- [ ] Tried refresh? (F5)
- [ ] Tried hard refresh? (Ctrl+Shift+R)

If all checked, restart everything:
1. Stop both terminals
2. `mvn clean install`
3. Start both servers fresh
4. Try again

---

## Common Solutions

### Problem: "Everything is broken"

**Solution:**
```powershell
# Terminal 1 - Stop both
Ctrl + C
Ctrl + C

# Clean and rebuild
cd d:\Projects\SchoolManagementSystem
mvn clean install -q

# Start backend
mvn spring-boot:run

# Terminal 2 - Start UI
cd ui
python -m http.server 8000

# Browser
http://localhost:8000
Ctrl+Shift+R
```

---

### Problem: "Data lost"

**Solution:** Data is in MySQL, reload:
1. Refresh page: `F5`
2. Wait 2 seconds
3. Data loads from database
4. Should see everything

---

### Problem: "Can't remember what I did"

**Solution:** Check MySQL directly:
1. Open MySQL Workbench
2. Query: `SELECT * FROM students;`
3. Query: `SELECT * FROM courses;`
4. Query: `SELECT * FROM enrollments;`
5. See all your data

---

## FAQ

### Q: Will my data be lost if I close the browser?
**A:** No! Data is in MySQL database, stays forever.

### Q: Can I have duplicate students?
**A:** Yes, system allows duplicate names/emails.

### Q: What if I delete a course students are enrolled in?
**A:** Enrollments still reference it (shows N/A for course).

### Q: Can I edit student data?
**A:** UI doesn't have edit feature, but you can delete and recreate.

### Q: How many students can I add?
**A:** Unlimited! MySQL can handle thousands.

### Q: Can I backup my data?
**A:** Yes! Use MySQL Workbench → Data Export

### Q: Can I use the UI on another computer?
**A:** Yes! Change IP in browser: `http://YOUR-IP:8000`

### Q: What if Python isn't installed?
**A:** Use Node.js: `npx http-server`
Or just double-click `index.html` (less reliable)

### Q: Can I change the UI colors?
**A:** Yes! Edit `ui/style.css`

### Q: Is my data secure?
**A:** It's local (not on internet), so yes. Password is "Root123".

---

## Still Stuck?

### Step-by-Step Recovery:

1. **Close everything**
   - Close browser tabs
   - Close all terminals
   - Close MySQL Workbench

2. **Restart clean**
   ```powershell
   cd d:\Projects\SchoolManagementSystem
   mvn clean install -q
   ```

3. **Start fresh**
   - Terminal 1: `mvn spring-boot:run`
   - Terminal 2: `cd ui && python -m http.server 8000`
   - Browser: `http://localhost:8000`

4. **Verify everything**
   - Backend logs show "Started Application"
   - Python shows "Serving HTTP"
   - Browser shows form

5. **Try simple task**
   - Create 1 student
   - Does it work? Good!
   - No? Continue debugging

---

## Success Checklist

When everything works, you'll see:

✅ Backend running (Terminal 1 shows "Started Application")
✅ UI server running (Terminal 2 shows "Serving HTTP")
✅ Form appears in browser
✅ Can fill and submit form
✅ Success message appears ✅
✅ Data appears in table
✅ Data appears in MySQL Workbench
✅ Refresh page - data still there
✅ Delete record - it's gone everywhere
✅ All 3 tabs working

**If all these work, you're done!** 🎉

---

Enjoy your fully functional School Management System!
