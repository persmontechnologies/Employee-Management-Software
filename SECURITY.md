# Security Policy

## Supported Versions

We release patches for security vulnerabilities in the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

The PERSMON EMS team takes security bugs seriously. We appreciate your efforts to responsibly disclose your findings, and will make every effort to acknowledge your contributions.

To report a security issue, please use the GitHub Security Advisory ["Report a Vulnerability"](https://github.com/YOUR-USERNAME/employee-management-system/security/advisories/new) tab.

The Employee Management System team will send a response indicating the next steps in handling your report. After the initial reply to your report, the security team will keep you informed of the progress towards a fix and full announcement, and may ask for additional information or guidance.

## Security Best Practices

### For Users

1. **Environment Variables**: Never commit `.env` files with real credentials
2. **Database Security**: Use strong passwords and restrict database access
3. **JWT Secrets**: Generate cryptographically secure JWT secrets
4. **HTTPS**: Always use HTTPS in production
5. **Updates**: Keep dependencies up to date

### For Contributors

1. **Input Validation**: Always validate and sanitize user inputs
2. **Authentication**: Implement proper authentication and authorization
3. **SQL Injection**: Use parameterized queries (Prisma ORM handles this)
4. **XSS Prevention**: Sanitize data before rendering
5. **CSRF Protection**: Implement CSRF tokens for state-changing operations

## Security Features

Employee Management System includes several built-in security features:

- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access Control**: Granular permissions system
- **Password Hashing**: bcrypt for secure password storage
- **Input Validation**: Class-validator for request validation
- **CORS Configuration**: Configurable cross-origin resource sharing
- **Rate Limiting**: API rate limiting (implement as needed)

## Dependencies

We regularly monitor our dependencies for security vulnerabilities using:

- GitHub Dependabot
- npm audit
- Manual security reviews

## Disclosure Policy

- Security vulnerabilities will be fixed as soon as possible
- We will coordinate with researchers on disclosure timing
- Credit will be given to researchers who responsibly disclose vulnerabilities

Thank you for helping keep Employee Management System and our users safe!
