# 📁 Project Structure

This document provides an overview of the Employee Management System project structure and organization.

## 🏗️ Root Directory

```
employee-management-system/
├── packages/                 # Monorepo packages
├── .gitignore               # Git ignore rules
├── LICENSE                  # MIT License
├── README.md               # Main project documentation
├── CONTRIBUTING.md         # Contribution guidelines
├── PROJECT-STRUCTURE.md    # This file
├── package.json            # Root package configuration
├── docker-compose.yml      # Development environment
├── docker-compose.prod.yml # Production environment
└── vercel.json            # Vercel deployment config
```

## 📦 Packages Structure

### 🎨 Frontend (`packages/frontend/`)

Modern React application with glassmorphism UI design.

```
packages/frontend/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── common/        # Shared components
│   │   ├── layout/        # Layout components (Header, Sidebar)
│   │   └── ui/            # Base UI components
│   ├── pages/             # Page components
│   │   ├── auth/          # Authentication pages
│   │   ├── dashboard/     # Dashboard page
│   │   ├── employees/     # Employee management
│   │   ├── attendance/    # Attendance tracking
│   │   ├── leaves/        # Leave management
│   │   ├── payrolls/      # Payroll processing
│   │   ├── documents/     # Document management
│   │   ├── performance-reviews/ # Performance reviews
│   │   ├── departments/   # Department management
│   │   ├── finance/       # Finance reports
│   │   ├── system/        # System administration
│   │   └── profile/       # User profile
│   ├── lib/               # Utility libraries
│   ├── types/             # TypeScript type definitions
│   ├── styles/            # Global styles
│   └── routes/            # Route definitions
├── public/                # Static assets
├── package.json          # Frontend dependencies
├── vite.config.ts        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

### ⚙️ Backend (`packages/backend/`)

NestJS API server with Prisma ORM and PostgreSQL.

```
packages/backend/
├── src/
│   ├── modules/           # Feature modules
│   │   ├── auth/         # Authentication & authorization
│   │   ├── users/        # User management
│   │   ├── employees/    # Employee management
│   │   ├── departments/  # Department management
│   │   ├── attendance/   # Attendance tracking
│   │   ├── leaves/       # Leave management
│   │   ├── payrolls/     # Payroll processing
│   │   ├── documents/    # Document management
│   │   └── performance-reviews/ # Performance reviews
│   ├── common/           # Shared utilities
│   │   ├── decorators/   # Custom decorators
│   │   ├── guards/       # Route guards
│   │   ├── interceptors/ # Request interceptors
│   │   └── pipes/        # Validation pipes
│   ├── config/           # Configuration files
│   └── main.ts          # Application entry point
├── prisma/               # Database schema & migrations
│   ├── schema.prisma    # Database schema
│   ├── migrations/      # Database migrations
│   └── seed.ts          # Database seeding
├── package.json         # Backend dependencies
├── nest-cli.json        # NestJS CLI configuration
└── tsconfig.json        # TypeScript configuration
```

### 🔗 Shared (`packages/shared/`)

Common types and utilities shared between frontend and backend.

```
packages/shared/
├── src/
│   ├── types.ts         # Shared TypeScript interfaces
│   └── index.ts         # Main export file
├── package.json         # Shared package configuration
└── tsconfig.json        # TypeScript configuration
```

## 🗃️ Database Schema

The application uses PostgreSQL with the following main entities:

- **Users** - System users with role-based access
- **Employees** - Employee profiles and information
- **Departments** - Organizational departments
- **Attendance** - Time tracking and attendance records
- **Leaves** - Leave requests and balances
- **Payrolls** - Payroll calculations and history
- **Documents** - File storage and management
- **PerformanceReviews** - Employee evaluations

## 🚀 Deployment Structure

### Docker Configuration

- `Dockerfile` - Main application container
- `Dockerfile.frontend` - Frontend-specific container
- `Dockerfile.backend` - Backend-specific container
- `docker-compose.yml` - Development environment
- `docker-compose.prod.yml` - Production environment

### Cloud Deployment

- **Vercel** - Frontend deployment (`vercel.json`)
- **Railway** - Backend deployment (`railway.yml`)
- **Neon/Supabase** - PostgreSQL hosting

## 📝 Configuration Files

- `.env.example` - Environment variables template
- `.gitignore` - Git ignore patterns
- `tailwind.config.js` - Tailwind CSS configuration
- `vite.config.ts` - Vite build configuration
- `nest-cli.json` - NestJS CLI settings
- `prisma/schema.prisma` - Database schema

## 🔧 Development Workflow

1. **Root level** - Workspace management and scripts
2. **Frontend** - React development with hot reload
3. **Backend** - NestJS development with auto-restart
4. **Database** - Prisma migrations and seeding
5. **Shared** - Type definitions and utilities

This structure follows modern monorepo patterns and enables efficient development, testing, and deployment of the complete EMS solution.
