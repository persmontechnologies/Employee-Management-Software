#!/bin/bash
# Quick Production Deployment Script for PERSMON EMS

echo "🚀 PERSMON EMS - Production Deployment Script"
echo "=============================================="

# Check if environment variables are set
if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL environment variable not set"
    echo "Please set your cloud database URL:"
    echo "export DATABASE_URL='postgresql://user:pass@host:5432/dbname'"
    exit 1
fi

if [ -z "$JWT_SECRET" ]; then
    echo "❌ JWT_SECRET environment variable not set"
    echo "Please set a secure JWT secret:"
    echo "export JWT_SECRET='your-super-secure-secret-here'"
    exit 1
fi

echo "✅ Environment variables set"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build shared package
echo "🔧 Building shared package..."
cd packages/shared && npm run build && cd ../..

# Generate Prisma client
echo "🗄️  Generating Prisma client..."
cd packages/backend && npx prisma generate && cd ../..

# Run database migrations
echo "🏗️  Running database migrations..."
cd packages/backend && npx prisma db push && cd ../..

# Seed database
echo "🌱 Seeding database..."
cd packages/backend && npx prisma db seed && cd ../..

# Build backend
echo "🏗️  Building backend..."
cd packages/backend && npm run build && cd ../..

# Build frontend
echo "🎨 Building frontend..."
cd packages/frontend && npm run build && cd ../..

echo ""
echo "🎉 DEPLOYMENT COMPLETE!"
echo "========================"
echo "🌐 Frontend built in: packages/frontend/dist"
echo "🖥️  Backend built in: packages/backend/dist"
echo ""
echo "Next steps:"
echo "1. Deploy frontend to Vercel/Netlify"
echo "2. Deploy backend to Railway/Render"
echo "3. Update CORS settings"
echo "4. Test live application"
echo ""
echo "Demo credentials:"
echo "📧 admin@persmon.com / admin123"
echo "📧 hr@persmon.com / admin123"
