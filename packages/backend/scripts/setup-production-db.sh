#!/bin/bash
# Production Database Setup Script

echo "🚀 Setting up Production Database..."

# Generate Prisma client
echo "📦 Generating Prisma client..."
npx prisma generate

# Push database schema
echo "🗄️ Pushing database schema..."
npx prisma db push

# Seed database with production data
echo "🌱 Seeding database..."
npx prisma db seed

echo "✅ Database setup complete!"
echo "🌐 Your application is ready for production!"
