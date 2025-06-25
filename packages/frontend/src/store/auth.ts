// packages/frontend/src/store/auth.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserRole } from "shared";
import { post } from "../lib/api-client"; // Removed unused 'get' import

// Define our User interface for local use to avoid compatibility issues
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the authentication response from API
interface AuthResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
  };
}

// Define our authentication state
interface AuthState {
  // State
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    firstName: string,
    lastName: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
  fetchProfile: () => Promise<void>;
  clearError: () => void;
}

// Create the store with persist middleware for localStorage
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      isAuthenticated: false,
      user: null,
      token: null,
      isLoading: false,
      error: null,

      // Login action
      login: async (email, password) => {
        try {
          set({ isLoading: true, error: null });

          // Call API to login
          const response = await post<AuthResponse>("/auth/login", {
            email,
            password,
          });

          // Store token in localStorage for API calls
          localStorage.setItem("persmon_auth_token", response.accessToken);

          // Update state with user info
          set({
            isAuthenticated: true,
            user: response.user,
            token: response.accessToken,
            isLoading: false,
            error: null,
          });
        } catch (error: any) {
          console.error("Login error:", error);

          // Set error state with message from API or default
          set({
            isLoading: false,
            error:
              error.response?.data?.message ||
              "Failed to login. Please check your credentials.",
          });
        }
      },

      // Register action
      register: async (email, firstName, lastName, password) => {
        try {
          set({ isLoading: true, error: null });

          // Call API to register
          const response = await post<AuthResponse>("/auth/register", {
            email,
            firstName,
            lastName,
            password,
          });

          // Store token in localStorage for API calls
          localStorage.setItem("persmon_auth_token", response.accessToken);

          // Update state with user info
          set({
            isAuthenticated: true,
            user: response.user,
            token: response.accessToken,
            isLoading: false,
            error: null,
          });
        } catch (error: any) {
          console.error("Registration error:", error);

          // Set error state with message from API or default
          set({
            isLoading: false,
            error:
              error.response?.data?.message ||
              "Failed to register. Please try again.",
          });
        }
      },

      // Fetch current user profile
      fetchProfile: async () => {
        try {
          // Only fetch if we have a token
          const token =
            get().token || localStorage.getItem("persmon_auth_token");
          if (!token) return;

          set({ isLoading: true });

          // Call API to get current user profile
          const response = await post<User>("/auth/profile", {});

          // Update state with user info
          set({
            isAuthenticated: true,
            user: response,
            token,
            isLoading: false,
          });
        } catch (error: any) {
          console.error("Profile fetch error:", error);

          // If we get an error, log the user out
          get().logout();
        }
      },

      // Logout action
      logout: () => {
        // Remove token from localStorage
        localStorage.removeItem("persmon_auth_token");

        // Reset state
        set({
          isAuthenticated: false,
          user: null,
          token: null,
          isLoading: false,
          error: null,
        });
      },

      // Clear any error message
      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: "persmon-auth", // Name in localStorage
      // Only persist these fields
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        token: state.token,
      }),
    }
  )
);
