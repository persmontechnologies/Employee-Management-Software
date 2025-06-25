@echo off
REM Production Database Setup Script for Windows

echo 🚀 Setting up Production Database...

REM Generate Prisma client
echo 📦 Generating Prisma client...
npx prisma generate

REM Push database schema
echo 🗄️ Pushing database schema...
npx prisma db push

REM Seed database with production data
echo 🌱 Seeding database...
npx prisma db seed

echo ✅ Database setup complete!
echo 🌐 Your application is ready for production!
