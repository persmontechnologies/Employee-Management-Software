# 🎨 Frontend Documentation - Modern Glassmorphism UI

## 📋 Frontend Overview

The frontend is built with React 18, TypeScript, Vite, and Tailwind CSS, featuring a stunning modern glassmorphism design. It provides a beautiful, responsive interface for the EMS system with glass-like effects, animations, and a dark theme.

## ✨ UI/UX Features

### 🎭 Glassmorphism Design System

- **Glass Effects**: Translucent backgrounds with backdrop blur
- **Animated Elements**: Floating orbs and smooth transitions
- **Modern Typography**: Inter font family for clean readability
- **Dark Theme**: Professional dark color scheme
- **Gradient Accents**: Subtle gradient overlays and borders

### 🔐 Authentication UI

- **Beautiful Login Page**: Animated glassmorphism login form
- **Form Validation**: Real-time validation with Zod schema
- **Error Handling**: Elegant error states with glassmorphism styling
- **Loading States**: Smooth loading animations
- **Demo Credentials**: Built-in credential display for testing

### 📊 Dashboard Interface

- **Metric Cards**: Glassmorphism cards with gradient backgrounds
- **Responsive Grid**: Adaptive layout for different screen sizes
- **Interactive Elements**: Hover effects and smooth animations
- **Modern Icons**: SVG icons with consistent styling

## 🏗️ Architecture

### Tech Stack

- **React 18** - UI library with hooks and functional components
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework with custom glassmorphism utilities
- **React Router DOM** - Client-side routing with protected routes
- **React Query (TanStack)** - Server state management
- **Zustand** - Client state management
- **React Hook Form** - Form handling with validation
- **Zod** - Schema validation for forms and API responses
- **Axios** - HTTP client with interceptors

### Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Shared components (ProtectedRoute, etc.)
│   ├── layout/          # Layout components (Sidebar, TopBar, MainLayout)
│   └── ui/              # Basic UI elements with glassmorphism styling
├── pages/               # Route pages
│   ├── auth/           # Authentication pages (Login with glassmorphism)
│   ├── dashboard/      # Dashboard with modern metric cards
│   ├── employees/      # Employee management
│   ├── attendance/     # Attendance tracking
│   ├── leaves/         # Leave management
│   ├── payrolls/       # Payroll pages
│   ├── departments/    # Department management
│   ├── documents/      # Document management
│   └── finance/        # Financial pages
├── lib/                 # Utility libraries
│   ├── api.ts          # API configuration
│   ├── api-client.ts   # HTTP client setup with auth interceptors
│   └── api-hooks.ts    # React Query hooks
├── store/              # State management
├── styles/             # Global styles and Tailwind config
├── types/              # TypeScript type definitions
└── routes/             # Route configuration
```

## 🧩 Component Architecture

### Layout Components (`components/layout/`)

**MainLayout.tsx**

```typescript
interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Sidebar />
      <main className="ml-64 p-6">{children}</main>
    </div>
  );
};
```

**Header.tsx** - Top navigation with user info and logout
**Sidebar.tsx** - Left navigation menu with role-based visibility
**Footer.tsx** - Footer component (if needed)

### Common Components (`components/common/`)

**DataTable.tsx** - Reusable table component with pagination

```typescript
interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  isLoading?: boolean;
}
```

**Modal.tsx** - Reusable modal component
**LoadingSpinner.tsx** - Loading indicator
**ErrorBoundary.tsx** - Error handling component
**ConfirmDialog.tsx** - Confirmation dialogs

### UI Components (`components/ui/`)

**Button.tsx** - Styled button component
**Input.tsx** - Form input components
**Select.tsx** - Dropdown select component
**Card.tsx** - Card layout component
**Badge.tsx** - Status badges
**Toast.tsx** - Notification component

## 📄 Page Components

### Authentication Pages (`pages/auth/`)

**LoginPage.tsx**

```typescript
export const LoginPage: React.FC = () => {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
      navigate("/dashboard");
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoginForm onSubmit={onSubmit} isLoading={isLoading} />
    </div>
  );
};
```

**RegisterPage.tsx** - User registration (admin only)

### Dashboard Page (`pages/dashboard/`)

**DashboardPage.tsx**

- Overview statistics
- Recent activities
- Quick actions
- Charts and graphs

### Employee Management (`pages/employees/`)

**EmployeeListPage.tsx** - List all employees with search/filter
**EmployeeDetailPage.tsx** - View employee details
**EmployeeCreatePage.tsx** - Create new employee
**EmployeeEditPage.tsx** - Edit employee information

### Attendance Management (`pages/attendance/`)

**AttendanceListPage.tsx** - View attendance records
**AttendanceTrackingPage.tsx** - Clock in/out interface
**AttendanceReportsPage.tsx** - Attendance reports and analytics

### Leave Management (`pages/leaves/`)

**LeaveListPage.tsx** - View leave requests
**LeaveCreatePage.tsx** - Create leave request
**LeaveApprovalPage.tsx** - Approve/reject leaves (HR/Admin)

### Other Pages

- **Payrolls** - Payroll management and generation
- **Departments** - Department CRUD operations
- **Documents** - Document upload and management
- **Finance** - Financial reports and analytics

## 🔄 State Management

### React Query for Server State (`lib/api-hooks.ts`)

```typescript
// Employee queries
export const useEmployees = (params?: EmployeeQueryParams) => {
  return useQuery({
    queryKey: ["employees", params],
    queryFn: () => api.employees.getAll(params),
  });
};

export const useEmployee = (id: string) => {
  return useQuery({
    queryKey: ["employee", id],
    queryFn: () => api.employees.getById(id),
    enabled: !!id,
  });
};

// Employee mutations
export const useCreateEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.employees.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
};
```

### Zustand for Client State (`store/`)

**authStore.ts**

```typescript
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
```

**uiStore.ts** - UI state (sidebar, modals, etc.)
**settingsStore.ts** - User preferences and settings

## 🌐 API Integration

### API Client (`lib/api-client.ts`)

```typescript
import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001",
});

// Request interceptor for auth token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      localStorage.removeItem("auth_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
```

### API Methods (`lib/api.ts`)

```typescript
export const api = {
  auth: {
    login: (data: LoginData) => apiClient.post("/auth/login", data),
    register: (data: RegisterData) => apiClient.post("/auth/register", data),
    getProfile: () => apiClient.get("/auth/profile"),
  },
  employees: {
    getAll: (params?: QueryParams) => apiClient.get("/employees", { params }),
    getById: (id: string) => apiClient.get(`/employees/${id}`),
    create: (data: CreateEmployeeData) => apiClient.post("/employees", data),
    update: (id: string, data: UpdateEmployeeData) =>
      apiClient.patch(`/employees/${id}`, data),
    delete: (id: string) => apiClient.delete(`/employees/${id}`),
  },
  // ... other modules
};
```

## 🎨 Glassmorphism Design System with Tailwind CSS

### Custom Configuration (`tailwind.config.js`)

The project includes a comprehensive Tailwind configuration with custom glassmorphism utilities:

```javascript
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        primary: {
          50: "#eff6ff",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
        },
        glassmorphism: {
          bg: "rgba(255, 255, 255, 0.1)",
          border: "rgba(255, 255, 255, 0.2)",
        },
      },
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
        "3xl": "40px",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-slow": "bounce 3s infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
};
```

### Glassmorphism CSS Classes

```css
/* Glassmorphism components */
.glass-card {
  @apply bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl;
}

.glass-button {
  @apply bg-white/10 backdrop-blur-sm border border-white/30 rounded-2xl hover:bg-white/15 transition-all duration-300;
}

.glass-input {
  @apply bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 hover:bg-white/15 transition-all duration-300;
}

/* Gradient backgrounds */
.gradient-bg {
  @apply bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900;
}

.gradient-button {
  @apply bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700;
}

/* Animation utilities */
.animate-glass {
  @apply animate-pulse-slow;
}

.floating-element {
  @apply animate-float;
}
```

### Common Glassmorphism Patterns

```jsx
// Glassmorphism Card
<div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl">
  <h3 className="text-white text-xl font-semibold mb-4">Card Title</h3>
  <p className="text-white/80">Card content with glassmorphism effect</p>
</div>

// Glassmorphism Button
<button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-2xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 transform hover:scale-[1.02]">
  Click Me
</button>

// Glassmorphism Input
<input className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 hover:bg-white/15 transition-all duration-300" />
```

### Responsive Design Patterns

```jsx
// Responsive glassmorphism grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => (
    <div key={item.id} className="bg-white/10 backdrop-blur-2xl rounded-3xl p-6 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300">
      {/* Card content */}
    </div>
  ))}
</div>

// Mobile-first responsive navigation
<nav className="bg-white/10 backdrop-blur-2xl border-b border-white/20">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between h-16">
      {/* Navigation content */}
    </div>
  </div>
</nav>
```

}

````

## 🔐 Authentication & Authorization

### Protected Routes

```typescript
interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRoles = [],
}) => {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return <>{children}</>;
};
````

### Role-Based UI

```typescript
interface RoleGuardProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({
  allowedRoles,
  children,
}) => {
  const { user } = useAuthStore();

  if (!user || !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
};

// Usage
<RoleGuard allowedRoles={["ADMIN", "HR"]}>
  <DeleteButton onDelete={handleDelete} />
</RoleGuard>;
```

## 📱 Responsive Design

### Breakpoint Strategy

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

### Responsive Patterns

```typescript
// Responsive table
<div className="overflow-x-auto">
  <table className="min-w-full">
    <thead className="hidden md:table-header-group">
      {/* Desktop headers */}
    </thead>
    <tbody>
      <tr className="block md:table-row border-b md:border-none">
        <td className="block md:table-cell px-4 py-2">
          <span className="md:hidden font-medium">Name: </span>
          {employee.name}
        </td>
      </tr>
    </tbody>
  </table>
</div>

// Responsive navigation
<nav className="fixed bottom-0 md:relative md:bottom-auto">
  <div className="flex md:flex-col justify-around md:justify-start">
    {/* Navigation items */}
  </div>
</nav>
```

## 🧪 Testing Patterns

### Component Testing (React Testing Library)

```typescript
import { render, screen, fireEvent } from "@testing-library/react";
import { LoginForm } from "./LoginForm";

describe("LoginForm", () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    render(<LoginForm onSubmit={mockOnSubmit} />);
  });

  it("should submit form with valid data", async () => {
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(mockOnSubmit).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });
  });
});
```

### Custom Hooks Testing

```typescript
import { renderHook, act } from "@testing-library/react";
import { useEmployees } from "../api-hooks";

describe("useEmployees", () => {
  it("should fetch employees", async () => {
    const { result } = renderHook(() => useEmployees());

    await act(async () => {
      await result.current.refetch();
    });

    expect(result.current.data).toBeDefined();
    expect(result.current.isLoading).toBe(false);
  });
});
```

## 🚀 Performance Optimizations

### Code Splitting

```typescript
// Lazy load pages
const EmployeeListPage = lazy(
  () => import("./pages/employees/EmployeeListPage")
);
const AttendancePage = lazy(() => import("./pages/attendance/AttendancePage"));

// Route with suspense
<Route
  path="/employees"
  element={
    <Suspense fallback={<LoadingSpinner />}>
      <EmployeeListPage />
    </Suspense>
  }
/>;
```

### Memoization

```typescript
// Memoize expensive calculations
const expensiveData = useMemo(() => {
  return processLargeDataset(rawData);
}, [rawData]);

// Memoize components
export const EmployeeCard = memo(({ employee }: EmployeeCardProps) => {
  return <div className="card">{/* Employee details */}</div>;
});
```

### Virtual Scrolling for Large Lists

```typescript
import { FixedSizeList as List } from "react-window";

const EmployeeList = ({ employees }: { employees: Employee[] }) => {
  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => (
    <div style={style}>
      <EmployeeCard employee={employees[index]} />
    </div>
  );

  return (
    <List height={600} itemCount={employees.length} itemSize={100}>
      {Row}
    </List>
  );
};
```

## 📊 Analytics & Monitoring

### Error Tracking

```typescript
// Error boundary with logging
export class ErrorBoundary extends Component {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log to analytics service
    console.error("Frontend Error:", error, errorInfo);

    // Send to monitoring service (e.g., Sentry)
    // captureException(error);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }

    return this.props.children;
  }
}
```

### Performance Monitoring

```typescript
// Track page load times
useEffect(() => {
  const startTime = performance.now();

  return () => {
    const endTime = performance.now();
    const loadTime = endTime - startTime;

    // Log performance metric
    console.log(`Page loaded in ${loadTime}ms`);
  };
}, []);
```

## 🔧 Build & Deployment

### Build Configuration (`vite.config.ts`)

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
          ui: ["@headlessui/react", "@heroicons/react"],
        },
      },
    },
  },
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
});
```

### Environment Variables

```typescript
// .env files
VITE_API_URL=http://localhost:3001
VITE_APP_NAME=Persmon EMS
VITE_VERSION=1.0.0

// Usage in code
const apiUrl = import.meta.env.VITE_API_URL;
const appName = import.meta.env.VITE_APP_NAME;
```

---

**Frontend Documentation Updated**: June 24, 2025  
**React Version**: 18.x  
**TypeScript Version**: 5.x  
**Vite Version**: 5.x
