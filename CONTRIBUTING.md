# Contributing to Employee Management System

Thank you for your interest in contributing to Employee Management System! We welcome contributions from the community.

## How to Contribute

### 1. Fork the Repository

- Fork the project to your GitHub account
- Clone your fork locally

### 2. Set Up Development Environment

```bash
# Clone your fork
git clone https://github.com/YOUR-USERNAME/employee-management-system.git
cd employee-management-system

# Install dependencies
npm install

# Set up the database (see README.md for database setup)
cd packages/backend
cp .env.example .env
# Edit .env with your database configuration

# Run database migrations
npx prisma migrate dev
npx prisma generate

# Seed the database
npm run seed

# Start development servers
npm run dev
```

### 3. Make Your Changes

- Create a new branch for your feature/fix: `git checkout -b feature/your-feature-name`
- Make your changes
- Test your changes thoroughly
- Follow the existing code style and conventions

### 4. Code Style Guidelines

- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Write meaningful commit messages
- Add tests for new functionality
- Update documentation as needed

### 5. Submit a Pull Request

- Push your changes to your fork
- Create a pull request with a clear description
- Reference any related issues
- Ensure all tests pass

## Code of Conduct

- Be respectful and inclusive
- Follow the project's coding standards
- Help maintain a positive community environment

## Reporting Issues

- Use GitHub Issues to report bugs or request features
- Provide detailed information about the issue
- Include steps to reproduce for bugs

## Development Guidelines

- Backend: NestJS with Prisma ORM
- Frontend: React with TypeScript, Vite, and Tailwind CSS
- Database: PostgreSQL
- State Management: TanStack Query (React Query)

## Getting Help

- Check existing issues and documentation
- Ask questions in GitHub Discussions
- Review the README.md for setup instructions

Thank you for contributing to Employee Management System!
