# Render Deployment Troubleshooting Guide

Common issues and solutions for deploying Tarkari to Render.

## 🔴 Build Failed

### Issue: `npm ERR!`
**Cause**: Dependency installation failed  
**Solution**:
1. Run locally: `npm install && npm run build`
2. Fix any errors locally first
3. Check `package.json` for correct dependencies
4. Verify Node version (18+ required)

### Issue: `failed at the build stage`
**Cause**: Build script exited with error  
**Solution**:
1. Check Render logs for specific error
2. Common reasons:
   - TypeScript errors: Run `npm run build` locally
   - Missing environment variables: Add to Render
   - Port conflicts: Render assigns ports automatically
3. Redeploy after fixing

### Issue: `Cannot find module 'next'`
**Cause**: Dependencies not installed  
**Solution**:
```bash
# Local test
npm clean-install
npm run build
```

## 🔴 MongoDB Connection Failed

### Issue: `MongooseServerSelectionError`
**Cause**: Cannot connect to MongoDB Atlas  
**Solution**:
1. Verify connection string format:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/tarkari?retryWrites=true&w=majority
   ```
2. Check MongoDB Atlas settings:
   - Whitelist Render's IP (or use `0.0.0.0/0` for development)
   - Verify username and password
   - Database name should be `tarkari`
3. Test connection locally with same string:
   ```bash
   MONGODB_URI="your-string" npm run dev
   ```

### Issue: `authentication failed`
**Cause**: Invalid MongoDB credentials  
**Solution**:
1. Check MongoDB Atlas user password (special chars must be URL encoded)
   - Example: `password@123` → `password%40123`
2. Verify username is correct
3. Re-enter credentials in MongoDB Atlas:
   - Database Access → Edit User
   - Reset password
   - Update Render env var

### Issue: `IP address not whitelisted`
**Cause**: Render's IP not allowed by MongoDB  
**Solution**:
1. MongoDB Atlas → Network Access
2. Add IP Address:
   - For dev: `0.0.0.0/0` (accept all)
   - For production: Add Render's specific IP
3. Click "Add"
4. Redeploy on Render

### Issue: `connection timeout after 30s`
**Cause**: Network connectivity issue  
**Solution**:
1. Verify MongoDB cluster is running
2. Check MongoDB Atlas cluster status
3. Restart cluster if needed
4. Increase timeout in code (if necessary)

## 🔴 Application Crashes

### Issue: `H13 - Connection Closed Without Response`
**Cause**: Application crashed or stuck  
**Solution**:
1. Check logs for errors
2. Verify environment variables are set
3. Test locally: `npm run dev`
4. Check for infinite loops or blocking operations

### Issue: `port already in use`
**Cause**: Port 3000 conflicts (shouldn't happen on Render)  
**Solution**:
- Render assigns ports automatically
- Don't hardcode port in code
- Use: `process.env.PORT || 3000`

### Issue: Application runs locally but crashes on Render
**Cause**: Missing environment variable  
**Solution**:
1. Check all env vars needed:
   - `MONGODB_URI` ✅
   - `AUTH_SECRET` ✅
   - `ENABLE_DEMO_MODE` ✅
   - `RAZORPAY_KEY_ID` (if using)
   - `RAZORPAY_KEY_SECRET` (if using)
2. Add missing vars to Render dashboard
3. Redeploy

## 🟡 Slow Performance

### Issue: Application loads slowly
**Cause**: Free Render instance is limited  
**Solution**:
- Upgrade to Starter ($7/month): 512MB RAM
- Upgrade to Standard ($25/month): 1GB RAM, faster CPU
- Optimize database queries
- Use MongoDB indexes

### Issue: Database queries slow
**Cause**: Free MongoDB Atlas tier or poor indexes  
**Solution**:
1. Upgrade MongoDB cluster tier ($0.30/day+)
2. Add database indexes to frequently queried fields
3. Optimize queries in code

## 🟡 Deployment Stuck

### Issue: `Build running... (>30 min)`
**Cause**: Build process hanging  
**Solution**:
1. Cancel and redeploy (Render dashboard → Cancel)
2. Check for infinite loops in build
3. Clear build cache
4. Push a new commit to trigger fresh build

## 🔴 Environment Variables Not Working

### Issue: `undefined is not a string` on undefined env var
**Cause**: Environment variable not passed to application  
**Solution**:
1. In Render dashboard, verify variable is listed
2. Check variable name spelling (case-sensitive)
3. Redeploy after adding variables
4. Wait 2-3 minutes for changes to take effect

### Issue: `NEXT_PUBLIC_*` variable not available in browser
**Cause**: Not prefixed with `NEXT_PUBLIC_`  
**Solution**:
- Add `NEXT_PUBLIC_` prefix for client-side variables
- Example: `NEXT_PUBLIC_RAZORPAY_KEY_ID`
- Rebuild after changing

### Issue: Sensitive data exposed in browser
**Cause**: Accidentally prefixed secret with `NEXT_PUBLIC_`  
**Solution**:
- Remove `NEXT_PUBLIC_` prefix from secrets
- Example: Keep as `AUTH_SECRET` (not `NEXT_PUBLIC_AUTH_SECRET`)
- Rotate compromised secrets

## 🔴 Custom Domain Issues

### Issue: Custom domain not resolving
**Cause**: DNS not configured  
**Solution**:
1. Get DNS records from Render dashboard
2. Update domain registrar DNS settings
3. Wait 24-48 hours for DNS propagation
4. Test with: `nslookup yourdomain.com`

### Issue: SSL Certificate error
**Cause**: Render's auto-SSL didn't generate  
**Solution**:
- Wait 10 minutes after adding domain
- Check Render dashboard for certificate status
- If stuck, try removing and re-adding domain

## 🟡 Feature Not Working

### Issue: Login/signup not working
**Cause**: Missing `AUTH_SECRET` or database issue  
**Solution**:
1. Check `AUTH_SECRET` is set in Render
2. Test MongoDB connection
3. Check admin logs for errors

### Issue: Payments not working
**Cause**: Missing Razorpay credentials  
**Solution**:
1. Set `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`
2. Set `NEXT_PUBLIC_RAZORPAY_KEY_ID` for frontend
3. Verify credentials are correct (test vs production)
4. Redeploy

### Issue: Menu not displaying
**Cause**: MongoDB empty or query issue  
**Solution**:
1. Verify MongoDB has data
2. Check database through admin panel
3. Run seed script if database is empty
4. Check browser console for API errors

## 🧪 Testing Checklist

After deployment, verify:

- [ ] Homepage loads: `https://yourdomain.com/`
- [ ] Can view menu: `/menu`
- [ ] Can login: `/login` → enter credentials
- [ ] Can add to cart: menu → add item
- [ ] Can view cart: click cart icon
- [ ] Search works: menu → type search term
- [ ] Language switching works: click language selector
- [ ] Admin login: `/admin` → enter admin credentials
- [ ] Check browser console: no errors
- [ ] Check Render logs: no warnings

## 📊 Monitor in Production

### Check Logs Daily
1. Render dashboard → Logs
2. Look for errors or warnings
3. Monitor crash frequency

### Performance Monitoring
1. Track response times
2. Monitor database query performance
3. Check error rates

### Security
1. Monitor auth failures
2. Check for unusual traffic
3. Review admin access logs

## 🆘 Emergency: Need to Restart

If application is stuck:

1. Render Dashboard → Select Service
2. Click "Restart Service"
3. Wait 1-2 minutes
4. Test application

## 📞 Advanced Help

### Get Render Support
- https://render.com/docs
- Email: support@render.com
- For paid customers: Priority support

### Get MongoDB Atlas Support
- https://docs.atlas.mongodb.com/
- MongoDB Forums: https://forums.mongodb.com/

### Debug with Local Environment

Test locally before deploying:
```bash
# Copy Render's env vars (carefully!)
MONGODB_URI="your-render-connection" npm run dev

# If works locally, issue is with Render config
# If fails locally, fix code first
```

---

## Quick Reference: Most Common Fixes

| Problem | Quick Fix |
|---------|-----------|
| MongoDB won't connect | Whitelist IP in MongoDB Atlas |
| Build fails | Run `npm run build` locally |
| App crashes | Check env vars are set |
| Slow performance | Upgrade Render instance type |
| Feature not working | Check logs, test locally |
| Domain not resolving | Wait 24-48hrs for DNS |

---

**Last Updated**: March 2026  
**Still Need Help?** Read [RENDER_DEPLOYMENT.md](./RENDER_DEPLOYMENT.md)
