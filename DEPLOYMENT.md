# Real Estate App Deployment Guide

## 🚀 Deployment Strategy

### 1. API Server (Railway)
### 2. Socket Server (Railway) 
### 3. Client (Vercel)

---

## 📋 Deployment Steps

### Step 1: Deploy API on Railway

1. **Create Railway Account**: Go to [railway.app](https://railway.app)
2. **Create New Project**: Click "New Project"
3. **Deploy from GitHub**: 
   - Connect your GitHub account
   - Select your repository
   - Choose the `api` folder
4. **Set Environment Variables**:
   ```
   NODE_ENV=production
   CLIENT_URL=https://your-vercel-app.vercel.app
   DATABASE_URL=your-database-connection-string
   JWT_SECRET_KEY=your-jwt-secret
   ```
5. **Deploy**: Railway will automatically deploy your API

### Step 2: Deploy Socket Server on Railway

1. **Create Another Railway Project**
2. **Deploy from GitHub**:
   - Select same repository
   - Choose the `socket` folder
3. **Set Environment Variables**:
   ```
   NODE_ENV=production
   ```
4. **Deploy**: Railway will deploy your socket server

### Step 3: Update Client Configuration

1. **Update Environment Variables**:
   Edit `client/.env.production`:
   ```
   VITE_API_URL=https://your-api-railway-url.railway.app/api
   VITE_SOCKET_URL=https://your-socket-railway-url.railway.app
   ```

### Step 4: Deploy Client on Vercel

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Navigate to Client Folder**:
   ```bash
   cd client
   ```

3. **Deploy to Vercel**:
   ```bash
   vercel --prod
   ```

4. **Set Environment Variables in Vercel Dashboard**:
   - Go to Vercel Dashboard
   - Select your project
   - Go to Settings > Environment Variables
   - Add:
     ```
     VITE_API_URL=https://your-api-railway-url.railway.app/api
     VITE_SOCKET_URL=https://your-socket-railway-url.railway.app
     ```

---

## 🔧 Important Notes

### Database Setup
- Use Railway's PostgreSQL addon for your database
- Update your Prisma schema if needed
- Run migrations: `npx prisma db push`

### CORS Configuration
Make sure your API allows requests from your Vercel domain:
```javascript
app.use(cors({ 
  origin: [
    "http://localhost:3000",
    "https://your-vercel-app.vercel.app"
  ], 
  credentials: true 
}));
```

### Socket.io CORS
Update your socket server CORS:
```javascript
const io = new Server({
    cors: {
        origin: [
          "http://localhost:3000",
          "https://your-vercel-app.vercel.app"
        ],
        credentials: true
    },
});
```

---

## 🚀 Quick Deployment Commands

```bash
# Build client locally (optional)
cd client
npm run build

# Deploy to Vercel
vercel --prod

# Check if everything is working
curl https://your-api-url.railway.app/api/test
```

---

## 🔍 Troubleshooting

1. **CORS Issues**: Make sure all URLs are correct in CORS settings
2. **Environment Variables**: Double-check all environment variables
3. **Database Connection**: Ensure DATABASE_URL is correct
4. **Socket Connection**: Check if socket server is running and accessible

---

## 📱 Testing Deployment

1. **Test API**: Visit `https://your-api-url.railway.app/api/test`
2. **Test Socket**: Check browser console for socket connection
3. **Test App**: Visit your Vercel URL and test all features
