# 🎨 PERSMON EMS Frontend

## ✨ Modern Glassmorphism Employee Management Interface

This is the frontend application for PERSMON EMS, featuring a beautiful modern glassmorphism design built with React, TypeScript, and Tailwind CSS.

### 🚀 Key Features

- **🎭 Glassmorphism Design**: Beautiful modern UI with glass-like effects and animations
- **🔐 Authentication**: Secure JWT-based login with form validation
- **📱 Responsive**: Mobile-first design that works on all devices
- **♿ Accessible**: WCAG compliant with proper keyboard navigation and screen reader support
- **🎯 Type Safe**: Full TypeScript support with strict type checking
- **⚡ Fast**: Powered by Vite for lightning-fast development and builds

### 🛠️ Tech Stack

- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development with strict configuration
- **Vite** - Next-generation frontend tooling for fast development
- **Tailwind CSS** - Utility-first CSS framework with custom glassmorphism utilities
- **React Hook Form** - Performant forms with easy validation
- **Zod** - TypeScript-first schema validation
- **React Router** - Client-side routing with protected routes
- **Axios** - HTTP client with request/response interceptors

### 🎨 UI Components

#### Authentication

- **Glassmorphism Login Page**: Animated background with floating elements
- **Form Validation**: Real-time validation with error messages
- **Demo Credentials**: Easy access to test accounts

#### Dashboard

- **Modern Cards**: Glassmorphism metric cards with gradient backgrounds
- **Responsive Grid**: Adaptive layout for different screen sizes
- **Interactive Elements**: Hover effects and smooth transitions

#### Layout

- **Navigation**: Responsive sidebar and top navigation
- **Route Protection**: Automatic authentication checks
- **Loading States**: Smooth loading indicators

### 🚀 Getting Started

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Start Development Server**

   ```bash
   npm run dev
   ```

   The frontend will be available at <http://localhost:3002>

3. **Build for Production**
   ```bash
   npm run build
   ```

### 🔧 Configuration

#### Environment Variables

Create a `.env.local` file if needed for environment-specific settings.

#### Proxy Configuration

The Vite development server is configured to proxy API requests to the backend:

- API requests to `/api/*` are forwarded to `http://localhost:3003`

### 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Generic components (ProtectedRoute, etc.)
│   └── layout/          # Layout components (Sidebar, TopBar, etc.)
├── pages/               # Page components
│   ├── auth/           # Authentication pages (Login)
│   ├── dashboard/      # Dashboard page with glassmorphism cards
│   └── employees/      # Employee management pages
├── lib/                # Utility libraries
│   └── api-client.ts   # Axios configuration and API methods
├── types/              # TypeScript type definitions
├── styles/             # Global styles and Tailwind configuration
└── main.tsx           # Application entry point
```

### 🎯 Demo Credentials

Test the glassmorphism login interface with these accounts:

- **Admin**: `admin@persmon.com` / `Password123!`
- **HR Manager**: `hr@persmon.com` / `Password123!`
- **Employee**: `employee@persmon.com` / `Password123!`

> **Note**: Only `@persmon.com` email addresses are accepted

### 🔍 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality
- `npm run type-check` - Run TypeScript compiler checks

### 🎨 Tailwind Configuration

The project includes custom Tailwind utilities for glassmorphism effects:

- **Backdrop Blur**: Various blur intensities
- **Glass Effects**: Background opacity and border combinations
- **Animations**: Custom keyframes for floating elements
- **Gradients**: Predefined gradient combinations

### 📱 Responsive Design

The interface is designed mobile-first and includes:

- **Breakpoints**: sm, md, lg, xl, 2xl
- **Flexible Layouts**: CSS Grid and Flexbox
- **Adaptive Typography**: Responsive text sizing
- **Touch-Friendly**: Proper touch targets for mobile devices
  ...reactDom.configs.recommended.rules,
  },
  })

```

```
