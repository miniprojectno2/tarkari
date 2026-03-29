# Render Deployment Checklist

Quick checklist to prepare the Tarkari repository for deployment on Render.

## Pre-Deployment ✅

- [ ] All code is committed to Git
- [ ] No `.env.local` or secrets in Git (verify with `git log`)
- [ ] Build succeeds locally: `npm run build`
- [ ] No TypeScript errors: `npm run lint`
- [ ] All dependencies are listed in `package.json`

## Render Configuration ✅

- [ ] Read [RENDER_DEPLOYMENT.md](./RENDER_DEPLOYMENT.md) completely
- [ ] MongoDB Atlas cluster created
- [ ] MongoDB connection string ready
- [ ] GitHub repository is public or Render has access
- [ ] Repository URL copied

## Environment Variables ✅

Required variables to add to Render dashboard:

```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/tarkari?retryWrites=true&w=majority
AUTH_SECRET=<generate-32-char-random-string>
ENABLE_DEMO_MODE=false
RAZORPAY_KEY_ID=<optional>
RAZORPAY_KEY_SECRET=<optional>
NEXT_PUBLIC_RAZORPAY_KEY_ID=<optional>
```

## Deployment Steps ✅

1. [ ] Go to https://render.com/dashboard
2. [ ] Click "New" → "Web Service"
3. [ ] Connect GitHub repository
4. [ ] Set build command: `npm install && npm run build`
5. [ ] Set start command: `npm start`
6. [ ] Add all environment variables
7. [ ] Select Free or Starter instance
8. [ ] Click "Create Web Service"
9. [ ] Wait for deployment (3-5 minutes)
10. [ ] Test deployed URL

## Post-Deployment ✅

- [ ] Visit `https://tarkari.onrender.com` (or your URL)
- [ ] Homepage loads without errors
- [ ] Menu displays correctly
- [ ] Login/signup works
- [ ] Can add items to cart
- [ ] Check browser console for errors
- [ ] Check Render logs for warnings
- [ ] Test mobile responsiveness

## Optional Next Steps ✅

- [ ] Set up custom domain
- [ ] Configure automated deployments
- [ ] Add monitoring/alerts
- [ ] Set up database backups
- [ ] Configure Razorpay if using payments
- [ ] Enable admin access

## Quick Reference

| Item | Value |
|------|-------|
| **Build Time** | ~2-3 minutes |
| **Start Command** | `npm start` |
| **Port** | 3000 (Render handles routing) |
| **Database** | MongoDB Atlas (free tier: 512MB) |
| **Cost** | Free tier available |
| **SSL** | Automatic (included) |

## Troubleshooting

If deployment fails:

1. **Check Logs**: Click "Logs" tab in Render dashboard
2. **Common Issues**:
   - MongoDB connection failed → Check connection string and whitelist IP
   - Build failed → Run `npm run build` locally to test
   - Port in use → Render assigns ports automatically
   - Missing env vars → Add to Render dashboard, redeploy

## Support

- **Render Docs**: https://render.com/docs
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **MongoDB Atlas Help**: https://docs.atlas.mongodb.com/

---

**Need Help?** Review [RENDER_DEPLOYMENT.md](./RENDER_DEPLOYMENT.md) for detailed instructions.
