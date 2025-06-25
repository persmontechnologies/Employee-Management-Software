# 🏢 Employee Management Software

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10.x-red.svg)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17.x-blue.svg)](https://www.postgresql.org/)

## 📋 Overview

A modern, comprehensive Employee Management System built with cutting-edge web technologies. Features a stunning glassmorphism UI design and provides complete HR functionality including employee management, attendance tracking, leave management, payroll processing, performance reviews, and document management.

### ✨ Key Features

- 🎨 **Modern Glassmorphism UI** - Beautiful, professional interface with glass-like effects
- 👥 **Employee Management** - Complete employee lifecycle management
- ⏰ **Attendance Tracking** - Real-time clock in/out with comprehensive reporting
- 🏖️ **Leave Management** - Leave requests, approvals, and balance tracking
- 💰 **Payroll Processing** - Comprehensive payroll calculation and reporting
- 📊 **Performance Reviews** - Employee evaluation and goal tracking
- 📁 **Document Management** - Secure document storage and sharing
- 🔐 **Role-Based Access** - Granular permissions and security
- 📱 **Mobile Responsive** - Works perfectly on all devices
- 🏢 **Department Management** - Organizational structure management

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL 12+
- Git

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/persmontechnologies/Employee-Management-Software.git
cd Employee-Management-Software
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

- Frontend: [http://localhost:3002](http://localhost:3002)
- Backend API: [http://localhost:3003](http://localhost:3003)
- API Documentation: [http://localhost:3003/api](http://localhost:3003/api)

### Demo Credentials

Test the application with these accounts:

```text
Admin User:
Email: admin@persmon.com
Password: Password123!

HR Manager:
Email: hr@persmon.com
Password: Password123!

CFO:
Email: cfo@persmon.com
Password: Password123!

Employee User:
Email: employee@persmon.com
Password: Password123!

System Admin:
Email: sysadmin@persmon.com
Password: Password123!
```

> **Note**: Only `@persmon.com` email addresses are allowed for authentication.

## 🏗️ Architecture

### Tech Stack

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS + Glassmorphism Design
- **Backend**: NestJS + TypeScript + Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: JWT with role-based access control
- **API Documentation**: Swagger/OpenAPI
- **Deployment**: Docker + Cloud platforms

### Project Structure

```text
├── packages/
│   ├── frontend/        # React frontend with glassmorphism UI
│   │   ├── src/
│   │   │   ├── pages/   # Application pages
│   │   │   ├── components/ # Reusable UI components
│   │   │   └── lib/     # API client and utilities
│   ├── backend/         # NestJS backend API
│   │   ├── src/
│   │   │   ├── auth/    # JWT authentication
│   │   │   ├── employees/ # Employee management
│   │   │   ├── attendance/ # Attendance tracking
│   │   │   ├── leaves/  # Leave management
│   │   │   ├── payrolls/ # Payroll processing
│   │   │   └── prisma/  # Database client
│   └── shared/          # Shared TypeScript types
├── docker-compose.yml   # Development Docker setup
├── docker-compose.prod.yml # Production Docker setup
├── Dockerfile.backend   # Backend container config
├── Dockerfile.frontend  # Frontend container config
├── deploy.ps1          # Windows deployment script
├── deploy.sh           # Unix deployment script
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
- Employee profile management with photo upload
- Employee status tracking (active, inactive, terminated)

### Attendance System

- Clock in/out functionality with real-time tracking
- Attendance history and analytics
- Break time management
- Overtime calculation
- Attendance reports and statistics

### Leave Management

- Leave request submission system
- Multi-level approval workflow
- Leave balance tracking and calculation
- Different leave types (annual, sick, emergency, etc.)
- Leave calendar and planning

### Payroll Processing

- Automated payroll generation
- Salary calculations with deductions
- Payroll history and records
- Tax calculations and reporting
- Payment method management

### Performance Reviews

- Employee performance tracking
- Review cycles and scheduling
- Goal setting and monitoring
- 360-degree feedback system
- Performance analytics and reports

### Document Management

- Employee document storage
- Document categorization and tagging
- Version control and history
- Secure file upload and download
- Document expiry tracking

## 🚀 Deployment

### Docker (Recommended)

```bash
# Clone and setup
git clone https://github.com/persmontechnologies/Employee-Management-Software.git
cd Employee-Management-Software

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

### Cloud Deployment

The application includes configurations for:

- **Railway**: Backend deployment with PostgreSQL
- **Vercel**: Frontend deployment with environment variables
- **Docker**: Containerized deployment for any cloud provider

See [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md) for detailed instructions.

## 📊 API Documentation

The backend provides a comprehensive REST API with interactive documentation:

- **Swagger UI**: Available at `/api` endpoint
- **OpenAPI Spec**: Complete API specification
- **Authentication**: JWT token-based security
- **Rate Limiting**: Built-in request throttling
- **Validation**: Input validation with detailed error messages

### Key API Endpoints

- `POST /auth/login` - User authentication
- `GET /employees` - List employees with pagination
- `POST /attendance/my/clock-in` - Clock in attendance
- `GET /leaves/my` - Get user's leave requests
- `POST /payrolls/process` - Process payroll (admin only)
- `GET /performance-reviews` - Get performance reviews

## 🛡️ Security Features

- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access Control**: Granular permission system
- **Input Validation**: Comprehensive data validation
- **SQL Injection Protection**: Prisma ORM prevents SQL injection
- **CORS Configuration**: Proper cross-origin resource sharing
- **Environment Variables**: Secure configuration management
- **Password Hashing**: bcrypt for secure password storage

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- 📖 [Documentation](PROJECT-STRUCTURE.md)
- 🐛 [Report Issues](https://github.com/persmontechnologies/Employee-Management-Software/issues)
- 💬 [Discussions](https://github.com/persmontechnologies/Employee-Management-Software/discussions)
- 🔒 [Security](SECURITY.md)

## 🙏 Acknowledgments

- React and NestJS communities for excellent frameworks
- Contributors and testers for their valuable feedback
- Open source maintainers for inspiration and tools

---

**Built with ❤️ by Persmon Technologies**
