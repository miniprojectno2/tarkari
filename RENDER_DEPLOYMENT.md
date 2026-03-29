# Render Deployment Guide for Tarkari

Complete step-by-step guide to deploy the Tarkari restaurant ordering platform on Render.

## Prerequisites

- Render account (https://render.com)
- MongoDB Atlas account (https://www.mongodb.com/cloud/atlas) - Free tier available
- GitHub account with this repository
- Razorpay account (optional, for payment processing)

## Step 1: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user with:
   - Username: `tarkari_user`
   - Password: Generate a strong password
4. Whitelist Render's IP (or use `0.0.0.0/0` for development, restrict in production)
5. Get your connection string:
   - Click "Connect" → "Drivers"
   - Copy the connection string: `mongodb+srv://username:password@cluster.mongodb.net/tarkari?retryWrites=true&w=majority`

## Step 2: Push Repository to GitHub

Ensure your repository is pushed to GitHub (public or private):

```bash
git remote -v
git push origin main
```

## Step 3: Create Web Service on Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **New** → **Web Service**
3. Connect your GitHub repository
4. Fill in the details:
   - **Name**: `tarkari` (or your preferred name)
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: Free (for development) or Starter (recommended)

## Step 4: Configure Environment Variables

In the Render dashboard, add the following environment variables:

| Variable | Value | Notes |
|----------|-------|-------|
| `MONGODB_URI` | `mongodb+srv://tarkari_user:PASSWORD@cluster.mongodb.net/tarkari?retryWrites=true&w=majority` | Replace PASSWORD, username, and cluster name |
| `AUTH_SECRET` | Generate a random string (32+ chars) | Use `openssl rand -base64 32` or similar |
| `ENABLE_DEMO_MODE` | `false` | Set to true only for testing |
| `RAZORPAY_KEY_ID` | Your Razorpay Key ID | Optional - only if using payments |
| `RAZORPAY_KEY_SECRET` | Your Razorpay Secret | Optional - only if using payments |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Your Razorpay Key ID | Optional - only if using payments |

## Step 5: Deploy

1. Click **Create Web Service**
2. Render will automatically start the deployment
3. Monitor the deployment in the **Logs** tab
4. Once deployed, Render provides a URL like `https://tarkari.onrender.com`

## Step 6: Verify Deployment

1. Visit your Render URL
2. Test basic functionality:
   - Home page loads
   - Menu displays
   - Login/signup works
   - Can add items to cart

## Step 7: Set Custom Domain (Optional)

1. In Render dashboard, go to **Settings**
2. Under **Custom Domains**, add your domain
3. Follow DNS configuration instructions

## Post-Deployment Configuration

### Enable Production Mode

Update environment variables:
- `ENABLE_DEMO_MODE=false` (disable demo mode)
- Ensure strong `AUTH_SECRET`

### Seed Database (First Time Only)

Run the seed script via an API call or terminal:

```bash
# If you have seed data, upload it manually or through admin panel
```

### Set Up SSL/HTTPS

Render provides free SSL certificates automatically - no action needed.

### Configure Logs and Monitoring

- Use Render's built-in log viewer
- Set up alerts for crashes (Render Pro feature)

## Troubleshooting

### Build Fails
- Check logs in Render dashboard
- Verify all environment variables are set
- Ensure MongoDB connection string is correct
- Run `npm run build` locally to test

### Application Crashes After Deploy
- Check logs for errors
- Verify MongoDB is accessible from Render's IP
- Check that all required environment variables are set

### MongoDB Connection Timeout
- Whitelist Render's IP in MongoDB Atlas
- Verify connection string format
- Check username/password special characters are URL-encoded

### Application Slow
- Use Render's Starter+ instance for better performance
- Check MongoDB Atlas cluster type (free tier has limitations)
- Enable caching where appropriate

## Maintenance

### Update Deployment

1. Push changes to GitHub
2. Render automatically redeploys (if auto-deploy is enabled)
3. Monitor deployment in logs

### Backup Database

1. Use MongoDB Atlas's automated backups (included with paid plans)
2. Export data regularly for critical systems

### Scale Resources

As traffic increases:
1. Upgrade Render instance type
2. Upgrade MongoDB Atlas cluster
3. Add caching layer (Redis)

## Cost Estimation

- **Render Web Service**: Free tier (limited) or $7+/month (Starter)
- **MongoDB Atlas**: Free tier (512MB) or $0.30/day+ (paid)
- **Total**: ~$7-15/month for development, scales with traffic

## Security Checklist

- [ ] `AUTH_SECRET` is strong and random
- [ ] MongoDB user password is strong
- [ ] Database name changed from default
- [ ] `ENABLE_DEMO_MODE=false` in production
- [ ] Razorpay secrets are never exposed in logs
- [ ] Database backups are configured
- [ ] HTTPS is enabled (automatic on Render)
- [ ] Access logs are monitored
- [ ] Environment variables are not committed to Git

## Support & Resources

- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)

---

**Last Updated**: March 2026  
**Version**: 1.0
