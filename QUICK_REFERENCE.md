# Render Deployment - Quick Reference Card

## 🎯 5-Minute Deployment Path

```
MongoDB Atlas Setup → GitHub Push → Render Dashboard → Deploy → Done ✅
```

---

## 📍 Key URLs

| Service | URL |
|---------|-----|
| MongoDB Atlas | https://www.mongodb.com/cloud/atlas |
| Render Dashboard | https://dashboard.render.com |
| Your App | https://tarkari.onrender.com |
| GitHub | https://github.com |

---

## ⚙️ Render Configuration

```
Build:   npm install && npm run build
Start:   npm start
Runtime: Node
Instance: Free (or Starter if slow)
```

---

## 🔐 Environment Variables

```bash
# REQUIRED
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/tarkari?retryWrites=true&w=majority
AUTH_SECRET=<random-32-chars>
ENABLE_DEMO_MODE=false

# OPTIONAL (Razorpay)
RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=...
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_...
```

---

## 🚀 Deployment Steps

```
1. MongoDB Atlas: Create cluster, get connection string
2. GitHub: Push code
3. Render: Create Web Service
4. Render: Add environment variables
5. Render: Deploy
6. Wait: 3-5 minutes
7. Test: Visit your URL
```

---

## ✅ Pre-Deployment Checklist

- [ ] `npm run build` succeeds locally
- [ ] `npm run lint` passes
- [ ] All changes committed to Git
- [ ] MongoDB cluster created
- [ ] MongoDB connection string copied
- [ ] Repository pushed to GitHub

---

## 🧪 Verification Commands

```bash
# Local build test
npm run build

# Lint check
npm run lint

# Run preflight verification
./render-preflight.sh        # Linux/Mac
.\render-preflight.ps1       # Windows
```

---

## 📖 Documentation Map

| File | Purpose | Read Time |
|------|---------|-----------|
| RENDER_SETUP_COMPLETE.md | Quick start & overview | 10 min |
| RENDER_DEPLOYMENT.md | Detailed guide | 30 min |
| RENDER_CHECKLIST.md | Quick checklist | 5 min |
| RENDER_TROUBLESHOOTING.md | Problem solving | 10 min |
| README_RENDER_FILES.md | File reference | 5 min |

---

## 🔍 Verify After Deployment

```
[ ] Homepage loads
[ ] Menu displays
[ ] Login works
[ ] Add to cart works
[ ] No console errors
[ ] Mobile responsive
[ ] Render logs green
```

---

## 🆘 Troubleshooting Quick Fixes

```
MongoDB won't connect?
→ Whitelist Render IP in MongoDB Atlas

Build fails?
→ Run npm run build locally

App crashes?
→ Check env variables in Render

Slow?
→ Upgrade Render instance
```

---

## 💰 Cost Breakdown

| Service | Cost | Tier |
|---------|------|------|
| Render Instance | $0-7/mo | Free-Starter |
| MongoDB | $0-10/mo | Free-Paid |
| Domain (optional) | $10-15/yr | Your registrar |
| **Total** | **$0-20/mo** | |

---

## 📱 Technology Stack

- **Frontend**: React 19, Next.js 16
- **Backend**: Node.js, Express-like routing
- **Database**: MongoDB
- **Auth**: Custom token-based
- **Payments**: Razorpay (optional)
- **Styling**: Tailwind CSS v4

---

## 🔗 Important Commands

```bash
# Build locally
npm run build

# Run locally
npm run dev

# Test start
npm start

# Lint check
npm run lint

# Run preflight (Linux/Mac)
./render-preflight.sh

# Run preflight (Windows)
.\render-preflight.ps1
```

---

## ⏱️ Timeline

| Step | Time |
|------|------|
| MongoDB setup | 2 min |
| Local verification | 1 min |
| Git push | 1 min |
| Render config | 1 min |
| Deployment | 3-5 min |
| Testing | 2 min |
| **Total** | **~15 min** |

---

## 🎓 MongoDB Atlas Quick Setup

```
1. Sign up: https://www.mongodb.com/cloud/atlas
2. Create cluster (Free M0)
3. Create user: tarkari_user
4. Whitelist IP: 0.0.0.0/0
5. Get connection string
6. Copy to MONGODB_URI env var
```

---

## 📋 Files Created

- ✅ render.yaml
- ✅ .env.example (updated)
- ✅ RENDER_SETUP_COMPLETE.md
- ✅ RENDER_DEPLOYMENT.md
- ✅ RENDER_CHECKLIST.md
- ✅ RENDER_TROUBLESHOOTING.md
- ✅ README_RENDER_FILES.md
- ✅ render-preflight.sh
- ✅ render-preflight.ps1
- ✅ SETUP_SUMMARY.md
- ✅ This file (QUICK_REFERENCE.md)

---

## 🎯 Where to Start

```
👉 READ: RENDER_SETUP_COMPLETE.md
   ↓
🛠  RUN: render-preflight.sh/ps1
   ↓
📖 FOLLOW: RENDER_DEPLOYMENT.md
   ↓
✅ VERIFY: RENDER_CHECKLIST.md
   ↓
🚀 DEPLOY!
```

---

## 📞 Support

- Render: https://render.com/docs
- MongoDB: https://docs.atlas.mongodb.com/
- Next.js: https://nextjs.org/docs/deployment
- Issue? Check RENDER_TROUBLESHOOTING.md

---

## ✨ Pro Tips

1. Test locally first: `npm run build`
2. Whitelist MongoDB IP early
3. Use free tier for testing
4. Monitor Render logs after deploy
5. Start simple, scale later
6. Keep .env.local secure
7. Generate strong AUTH_SECRET

---

## 🎉 Status

✅ Repository configured  
✅ Documentation complete  
✅ Helper scripts ready  
✅ **READY TO DEPLOY!**

---

**Setup Date**: March 29, 2026  
**Version**: 1.0  
**Status**: ✅ COMPLETE

**Next Action**: Read RENDER_SETUP_COMPLETE.md
