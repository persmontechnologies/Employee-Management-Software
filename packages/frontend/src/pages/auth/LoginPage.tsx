import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { post } from "../../lib/api-client";

// Login response type from backend
interface LoginResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
}

// Define form validation schema using Zod
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Define the form data type from the schema
type LoginFormData = z.infer<typeof loginSchema>;

// Define the component props
interface LoginPageProps {
  onLogin?: () => void;
}

const LoginPage = ({ onLogin }: LoginPageProps = {}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initialize React Hook Form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    setMounted(true);
  }, []);
  // Handle form submission
  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      setError(null);

      // Check if email domain is from persmon
      if (!data.email.endsWith("@persmon.com")) {
        throw new Error(
          "Only Persmon Technologies email addresses are allowed"
        );
      }

      console.log("Attempting login with:", { email: data.email }); // Call API to login
      const response = await post<LoginResponse>("/auth/login", {
        email: data.email,
        password: data.password,
      });

      console.log("Login response received:", response);

      // Store token in localStorage
      if (response?.accessToken) {
        localStorage.setItem("persmon_auth_token", response.accessToken);

        // Store user data for role-based UI
        if (response.user) {
          localStorage.setItem("persmon_user", JSON.stringify(response.user));
        }

        // Call onLogin callback if provided
        if (onLogin) {
          onLogin();
        }

        // Navigate to dashboard
        navigate("/dashboard");
      } else {
        console.error("Invalid response format:", response);
        throw new Error("No authentication token received");
      }
    } catch (err: any) {
      console.error("Login error:", err);

      // Set detailed error information
      let errorMessage = "Failed to login. Please check your credentials.";
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {" "}
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="dots"
                x="0"
                y="0"
                width="60"
                height="60"
                patternUnits="userSpaceOnUse"
              >
                <circle
                  cx="30"
                  cy="30"
                  r="4"
                  fill="#9C92AC"
                  fillOpacity="0.1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        {/* Floating Animation Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/4 right-20 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-purple-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 right-1/3 w-16 h-16 bg-pink-400/20 rounded-full blur-lg animate-bounce delay-500"></div>

        {/* Gradient Orbs */}
        <div className="absolute top-0 -right-40 w-80 h-80 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-full blur-3xl opacity-70"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-full blur-3xl opacity-70"></div>
      </div>
      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div
          className={`w-full max-w-md transition-all duration-1000 transform ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* Logo and Brand */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-lg rounded-2xl mb-6 border border-white/30">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">PERSMON EMS</h1>
            <p className="text-white/80 text-sm">Employee Management System</p>
          </div>

          {/* Glassmorphism Login Card */}
          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">
                Welcome Back
              </h2>
              <p className="text-white/70 text-sm">
                Sign in to access your dashboard
              </p>
            </div>
            {/* Error Display */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-2xl">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-red-300 mr-3 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-red-100 text-sm">{error}</span>
                </div>
              </div>
            )}
            {/* Login Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {" "}
              {/* Email Input */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-white/90 text-sm font-medium block"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-white/50"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </div>
                  <input
                    {...register("email")}
                    id="email"
                    type="email"
                    placeholder="username@persmon.com"
                    className={`w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 ${
                      errors.email
                        ? "border-red-400/50 focus:ring-red-400/50"
                        : "border-white/20 focus:ring-white/30 hover:bg-white/15"
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-300 text-xs mt-1 flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.email.message}
                  </p>
                )}
              </div>{" "}
              {/* Password Input */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-white/90 text-sm font-medium block"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-white/50"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    {...register("password")}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={`w-full pl-12 pr-12 py-4 bg-white/10 backdrop-blur-sm border rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 ${
                      errors.password
                        ? "border-red-400/50 focus:ring-red-400/50"
                        : "border-white/20 focus:ring-white/30 hover:bg-white/15"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/50 hover:text-white/70 transition-colors"
                  >
                    {showPassword ? (
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-300 text-xs mt-1 flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.password.message}
                  </p>
                )}
              </div>
              {/* Remember Me and Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="sr-only" />
                  <div className="relative">
                    <div className="w-5 h-5 bg-white/10 border border-white/30 rounded-lg"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-white opacity-0 transition-opacity"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <span className="ml-2 text-sm text-white/70">
                    Remember me
                  </span>
                </label>
                <button
                  type="button"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing in...
                  </div>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5 inline mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                    Sign In
                  </>
                )}
              </button>
            </form>{" "}
            {/* Demo Credentials */}
            <div className="mt-8 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <p className="text-white/60 text-xs text-center mb-2">
                Demo Credentials:
              </p>
              <div className="grid grid-cols-1 gap-2 text-xs">
                <div className="text-white/80">
                  <span className="text-white/60">Admin:</span>{" "}
                  admin@persmon.com / Password123!
                </div>
                <div className="text-white/80">
                  <span className="text-white/60">HR:</span> hr@persmon.com /
                  Password123!
                </div>
                <div className="text-white/80">
                  <span className="text-white/60">Employee:</span>{" "}
                  employee@persmon.com / Password123!
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-white/50 text-sm">
              © {new Date().getFullYear()} Persmon Technologies. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
