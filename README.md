# 🏢 Employee Management System

[![License: MIT](https://img.shields.io/badg### Demo Credentials

```
Admin User:
Email: admin@company.com
Password: admin123

Employee User:  
Email: employee@company.com
Password: employee123
```IT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10.x-red.svg)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17.x-blue.svg)](https://www.postgresql.org/)

## 📋 Overview

**Employee Management System** is a modern, open-source Employee Management System built with cutting-edge web technologies. It features a stunning glassmorphism UI design and provides comprehensive HR functionality including employee management, attendance tracking, leave management, payroll processing, performance reviews, and document management.

### ✨ Key Features

- 🎨 **Modern Glassmorphism UI** - Beautiful, professional interface with glass-like effects
- 👥 **Employee Management** - Complete employee lifecycle management
- ⏰ **Attendance Tracking** - Real-time clock in/out with reporting
- 🏖️ **Leave Management** - Leave requests, approvals, and balance tracking
- 💰 **Payroll Processing** - Comprehensive payroll calculation and reporting
- 📊 **Performance Reviews** - Employee evaluation and goal tracking
- 📁 **Document Management** - Secure document storage and sharing
- 🔐 **Role-Based Access** - Granular permissions and security
- 📱 **Mobile Responsive** - Works perfectly on all devices

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL 12+
- Git

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/YOUR-USERNAME/employee-management-system.git
cd employee-management-system
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up the database**

```bash
cd packages/backend
cp .env.example .env
# Edit .env with your database configuration
```

4. **Run database migrations and seed data**

```bash
npx prisma migrate dev
npx prisma generate
npm run seed
```

5. **Start the development servers**

```bash
# Start backend (from packages/backend)
npm run start:dev

# Start frontend (from packages/frontend)
npm run dev
```

6. **Access the application**

- Frontend: http://localhost:3002
- Backend API: http://localhost:3003
- API Documentation: http://localhost:3003/api

### Demo Credentials

```
Admin User:
Email: admin@persmon.com
Password: admin123

Employee User:
Email: employee@persmon.com
Password: employee123
```

│ │ │ ├── pages/dashboard/ # Glassmorphism dashboard
│ │ │ ├── components/ # Reusable UI components
│ │ │ └── lib/ # API client and utilities
│ ├── backend/ # NestJS backend API
│ │ ├── src/
│ │ │ ├── auth/ # JWT authentication
│ │ │ ├── employees/ # Employee management
│ │ │ └── prisma/ # Database client
│ └── shared/ # Shared TypeScript types
├── docker-compose.prod.yml # Production Docker setup
├── Dockerfile.backend # Backend container config
├── Dockerfile.frontend # Frontend container config
├── deploy.ps1 # Windows deployment script
├── deploy.sh # Unix deployment script
└── DEPLOYMENT-GUIDE.md # Detailed deployment instructions

```

## 🔑 Core Features

### Authentication & Authorization

- JWT-based authentication with glassmorphism login UI
- Role-based access control (ADMIN, HR, CFO, EMPLOYEE, SYSTEM_ADMIN)
- Protected routes with automatic redirection
- Secure password hashing with bcrypt
- Email domain validation (@persmon.com required)

### Employee Management

- Complete CRUD operations for employees
- Department assignment and management
- Position and salary tracking
- Employee profile management

### Attendance System

- Clock in/out functionality
- Attendance history tracking
- Real-time attendance monitoring
- Attendance statistics and reports

### Leave Management

- Leave request system
- Leave balance tracking
- Approval workflow
- Leave statistics

### Payroll Processing

- Automated payroll generation
- Salary calculations
- Payroll history
- Financial reporting

### Performance Reviews

- Employee performance tracking
- Review cycles management
- Goal setting and monitoring
- Performance analytics

### Document Management

- Employee document storage
- Document categorization
- Secure file handling
- Document history

- **Email**: sysadmin@persmon.com
- **Password**: sysadmin123
- **Role**: SYSTEM_ADMIN
- **Permissions**: User management, system configuration, logs

### Employee

- **Email**: employee@persmon.com
- **Password**: employee123
- **Role**: EMPLOYEE
- **Permissions**: Personal data, attendance, leave requests

## Running the Project

1. Install dependencies:

```

npm install

```

2. Start the backend:

```

cd packages/backend
npm run start:dev

```

3. Start the frontend:

```

cd packages/frontend
npm run dev

````

4. Access the application at `http://localhost:3000`

## Development Notes

- The backend uses a PostgreSQL database through Prisma ORM
- Authentication is handled using JWT tokens
- Frontend uses React Query for data fetching and state management
- Styling is done with Tailwind CSS

## License

Copyright © 2025 Persmon Technologies. All rights reserved.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 17
- npm or yarn

### Local Development Setup

1. **Clone and Install**

```bash
git clone <repository-url>
cd persmon-ems
npm install
````

2. **Database Setup**

   ```bash
   # Update .env file in packages/backend/
   DATABASE_URL="postgresql://postgres:Josh200!@localhost:5432/persmon_ems?schema=public"

   # Run migrations and seed
   cd packages/backend
   npx prisma db push
   npx prisma db seed
   ```

3. **Start Development Servers**

   ```bash
   # Terminal 1 - Backend (will run on port 3003)
   cd packages/backend
   npm run start:dev

   # Terminal 2 - Frontend (will run on port 3002, proxying to backend)
   cd packages/frontend
   npm run dev
   ```

4. **Access Application**
   - **Frontend**: <http://localhost:3002> (Beautiful glassmorphism UI)
   - **Backend API**: <http://localhost:3003>
   - **API Documentation**: <http://localhost:3003/api> (Interactive Swagger docs)

### 🔐 Demo Credentials

Test the glassmorphism login page with these accounts:

- **Admin**: `admin@persmon.com` / `Password123!`
- **HR Manager**: `hr@persmon.com` / `Password123!`
- **CFO**: `cfo@persmon.com` / `Password123!`
- **Employee**: `employee@persmon.com` / `Password123!`
- **System Admin**: `sysadmin@persmon.com` / `Password123!`

> 💡 **Note**: Only `@persmon.com` email addresses are allowed for authentication.

## 🗄️ Database Schema

### Core Models

- **User**: Authentication and basic user info
- **Employee**: Employee details and work information
- **Department**: Organizational structure
- **Attendance**: Time tracking records
- **Leave**: Leave requests and approvals
- **Payroll**: Salary and payment records
- **PerformanceReview**: Performance evaluation data
- **Document**: File and document management

### Key Relationships

- User 1:1 Employee
- Department 1:N Employee
- Employee 1:N Attendance
- Employee 1:N Leave
- Employee 1:N Payroll
- Employee 1:N PerformanceReview (as reviewee)
- Employee 1:N PerformanceReview (as reviewer)
- Employee 1:N Document

## 🔧 Environment Configuration

### Backend Environment Variables (.env)

```env
# Database
DATABASE_URL="postgresql://postgres:Josh200!@localhost:5432/persmon_ems?schema=public"

# JWT Configuration
JWT_SECRET="persmon-prod-jwt-secret-2025-secure-key-change-in-deployment"
JWT_EXPIRES_IN="1d"

# Server Configuration
PORT=3001
NODE_ENV=development
```

### Frontend Environment Variables

```env
VITE_API_URL=http://localhost:3001
```

## 📝 API Documentation

### Authentication Endpoints

- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /auth/profile` - Get user profile

### Employee Endpoints

- `GET /employees` - List all employees
- `POST /employees` - Create employee
- `GET /employees/:id` - Get employee details
- `PATCH /employees/:id` - Update employee
- `DELETE /employees/:id` - Delete employee

### Attendance Endpoints

- `POST /attendance/my/clock-in` - Clock in
- `POST /attendance/my/clock-out` - Clock out
- `GET /attendance/my/history` - Get attendance history
- `GET /attendance/statistics` - Get attendance statistics

Complete API documentation available at: `/api` endpoint (Swagger)

## 🏗️ Architecture

### Tech Stack

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **Backend**: NestJS + TypeScript + Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: JWT with role-based access control
- **API Documentation**: Swagger/OpenAPI
- **Deployment**: Docker + Cloud platforms

## 📱 Features

### Core Modules

- **👥 Employee Management** - Complete employee lifecycle
- **⏰ Attendance Tracking** - Clock in/out with reports
- **🏖️ Leave Management** - Requests and approvals
- **💰 Payroll Processing** - Automated calculations
- **📊 Performance Reviews** - Employee evaluations
- **📁 Document Management** - Secure file handling
- **🏢 Department Management** - Organization structure
- **📈 Reports & Analytics** - Comprehensive insights

### Technical Features

- **🔐 Role-Based Access Control** - Admin, Manager, Employee roles
- **📱 Responsive Design** - Mobile-first approach
- **🎨 Modern UI** - Glassmorphism design
- **⚡ Real-time Updates** - Live data synchronization
- **🔒 Security** - JWT authentication, input validation
- **📊 API Documentation** - Interactive Swagger docs

## 🚀 Deployment

### Docker (Recommended)

```bash
# Clone and setup
git clone https://github.com/YOUR-USERNAME/employee-management-system.git
cd employee-management-system

# Start with Docker
docker-compose up -d
```

### Manual Setup

Use the provided setup scripts:

```bash
# Linux/macOS
./setup.sh

# Windows PowerShell
.\setup.ps1
```

Or manually:

```bash
# Install dependencies
npm install

# Setup environment
cd packages/backend
cp .env.example .env
# Edit .env with your database config

# Database setup
npx prisma migrate dev
npx prisma generate
npm run seed

# Start development
npm run dev
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React and NestJS communities
- Contributors and testers
- Open source maintainers

## 📞 Support

- 📖 [Documentation](PROJECT-STRUCTURE.md)
- 🐛 [Report Issues](https://github.com/YOUR-USERNAME/employee-management-system/issues)
- 💬 [Discussions](https://github.com/YOUR-USERNAME/employee-management-system/discussions)
- 🔒 [Security](SECURITY.md)

---

**Built with ❤️ by the Employee Management System community**
