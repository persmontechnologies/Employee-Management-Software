# PowerShell Production Deployment Script for PERSMON EMS

Write-Host "🚀 PERSMON EMS - Production Deployment Script" -ForegroundColor Green
Write-Host "=============================================="

# Check if environment variables are set
if (-not $env:DATABASE_URL) {
    Write-Host "❌ DATABASE_URL environment variable not set" -ForegroundColor Red
    Write-Host "Please set your cloud database URL:"
    Write-Host '$env:DATABASE_URL = "postgresql://user:pass@host:5432/dbname"'
    exit 1
}

if (-not $env:JWT_SECRET) {
    Write-Host "❌ JWT_SECRET environment variable not set" -ForegroundColor Red
    Write-Host "Please set a secure JWT secret:"
    Write-Host '$env:JWT_SECRET = "your-super-secure-secret-here"'
    exit 1
}

Write-Host "✅ Environment variables set" -ForegroundColor Green

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

# Build shared package
Write-Host "🔧 Building shared package..." -ForegroundColor Yellow
Set-Location packages/shared
npm run build
Set-Location ../..

# Generate Prisma client
Write-Host "🗄️ Generating Prisma client..." -ForegroundColor Yellow
Set-Location packages/backend
npx prisma generate
Set-Location ../..

# Run database migrations
Write-Host "🏗️ Running database migrations..." -ForegroundColor Yellow
Set-Location packages/backend
npx prisma db push
Set-Location ../..

# Seed database
Write-Host "🌱 Seeding database..." -ForegroundColor Yellow
Set-Location packages/backend
npx prisma db seed
Set-Location ../..

# Build backend
Write-Host "🏗️ Building backend..." -ForegroundColor Yellow
Set-Location packages/backend
npm run build
Set-Location ../..

# Build frontend
Write-Host "🎨 Building frontend..." -ForegroundColor Yellow
Set-Location packages/frontend
npm run build
Set-Location ../..

Write-Host ""
Write-Host "🎉 DEPLOYMENT COMPLETE!" -ForegroundColor Green
Write-Host "========================"
Write-Host "🌐 Frontend built in: packages/frontend/dist"
Write-Host "🖥️ Backend built in: packages/backend/dist"
Write-Host ""
Write-Host "Next steps:"
Write-Host "1. Deploy frontend to Vercel/Netlify"
Write-Host "2. Deploy backend to Railway/Render"
Write-Host "3. Update CORS settings"
Write-Host "4. Test live application"
Write-Host ""
Write-Host "Demo credentials:"
Write-Host "📧 admin@persmon.com / admin123"
Write-Host "📧 hr@persmon.com / admin123"
