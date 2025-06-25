# PERSMON EMS Setup Script for Windows
# This script sets up the development environment for PERSMON EMS

Write-Host "🏢 Setting up PERSMON EMS Development Environment..." -ForegroundColor Green
Write-Host "=================================================" -ForegroundColor Green

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js $nodeVersion detected" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed. Please install Node.js 18+ first." -ForegroundColor Red
    Write-Host "   Download from: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Check if PostgreSQL is available
try {
    psql --version | Out-Null
    Write-Host "✅ PostgreSQL client detected" -ForegroundColor Green
} catch {
    Write-Host "⚠️  PostgreSQL client not found. Please install PostgreSQL." -ForegroundColor Yellow
    Write-Host "   Or use Docker: docker run --name postgres -e POSTGRES_PASSWORD=postgres123 -d -p 5432:5432 postgres:17" -ForegroundColor Yellow
}

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Blue
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    exit 1
}

# Setup backend environment
Write-Host "⚙️  Setting up backend environment..." -ForegroundColor Blue
Set-Location "packages\backend"

if (!(Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "✅ Created .env file from template" -ForegroundColor Green
    Write-Host "⚠️  Please edit packages\backend\.env with your database configuration" -ForegroundColor Yellow
} else {
    Write-Host "✅ .env file already exists" -ForegroundColor Green
}

# Generate Prisma client
Write-Host "🗃️  Setting up database..." -ForegroundColor Blue
npx prisma generate

Set-Location "..\..\"

# Next steps
Write-Host ""
Write-Host "🔧 Next steps:" -ForegroundColor Green
Write-Host "1. Configure your database in packages\backend\.env" -ForegroundColor White
Write-Host "2. Run database migrations: cd packages\backend && npx prisma migrate dev" -ForegroundColor White
Write-Host "3. Seed the database: npm run seed" -ForegroundColor White
Write-Host "4. Start development: npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "📖 For detailed setup instructions, see README.md" -ForegroundColor Cyan
Write-Host "✨ Happy coding!" -ForegroundColor Green
