#!/bin/bash

# PERSMON EMS Setup Script
# This script sets up the development environment for PERSMON EMS

echo "🏢 Setting up PERSMON EMS Development Environment..."
echo "================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Check if PostgreSQL is running
if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL client not found. Please install PostgreSQL."
    echo "   Or use Docker: docker run --name postgres -e POSTGRES_PASSWORD=postgres123 -d -p 5432:5432 postgres:17"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Setup backend environment
echo "⚙️  Setting up backend environment..."
cd packages/backend

if [ ! -f ".env" ]; then
    cp .env.example .env
    echo "✅ Created .env file from template"
    echo "⚠️  Please edit packages/backend/.env with your database configuration"
else
    echo "✅ .env file already exists"
fi

# Generate Prisma client
echo "🗃️  Setting up database..."
npx prisma generate

# Note about database setup
echo ""
echo "🔧 Next steps:"
echo "1. Configure your database in packages/backend/.env"
echo "2. Run database migrations: cd packages/backend && npx prisma migrate dev"
echo "3. Seed the database: npm run seed"
echo "4. Start development: npm run dev"
echo ""
echo "📖 For detailed setup instructions, see README.md"
echo "✨ Happy coding!"
