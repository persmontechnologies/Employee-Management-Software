// src/components/layout/Sidebar.tsx
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserRole } from "../../types/local-types";
import PersmonLogo from "../common/PersmonLogo";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  isMobile: boolean;
}

interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  userRoles: UserRole[];
  children?: NavItem[];
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  toggleSidebar,
  isMobile,
}) => {
  const [user, setUser] = useState<{ role: UserRole } | null>(null);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch user from localStorage
  useEffect(() => {
    const userData = localStorage.getItem("persmon_user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Function to toggle submenu expanded state
  const toggleExpand = (path: string) => {
    setExpandedItems((prevState) => {
      const newState = new Set(prevState);
      if (newState.has(path)) {
        newState.delete(path);
      } else {
        newState.add(path);
      }
      return newState;
    });
  };

  // Check if path is active
  const isActivePath = (path: string): boolean => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };
  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("persmon_user");
    localStorage.removeItem("persmon_auth_token");
    navigate("/auth/login");
  };

  // Navigation items with role-based access control
  const navItems: NavItem[] = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
      userRoles: [
        UserRole.ADMIN,
        UserRole.HR,
        UserRole.CFO,
        UserRole.EMPLOYEE,
        UserRole.SYSTEM_ADMIN,
      ],
    },
    {
      name: "Employees",
      path: "/employees",
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      userRoles: [UserRole.ADMIN, UserRole.HR],
    },
    {
      name: "Departments",
      path: "/departments",
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
      userRoles: [UserRole.ADMIN, UserRole.HR],
    },
    {
      name: "Attendance",
      path: "/attendance",
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      userRoles: [UserRole.ADMIN, UserRole.HR, UserRole.EMPLOYEE],
      children: [
        {
          name: "My Attendance",
          path: "/attendance/me",
          icon: <></>,
          userRoles: [
            UserRole.EMPLOYEE,
            UserRole.ADMIN,
            UserRole.HR,
            UserRole.CFO,
            UserRole.SYSTEM_ADMIN,
          ],
        },
        {
          name: "Team Attendance",
          path: "/attendance/team",
          icon: <></>,
          userRoles: [UserRole.ADMIN, UserRole.HR],
        },
        {
          name: "Reports",
          path: "/attendance/reports",
          icon: <></>,
          userRoles: [UserRole.ADMIN, UserRole.HR],
        },
      ],
    },
    {
      name: "Leave Management",
      path: "/leaves",
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      userRoles: [UserRole.ADMIN, UserRole.HR, UserRole.EMPLOYEE],
      children: [
        {
          name: "My Leaves",
          path: "/leaves/me",
          icon: <></>,
          userRoles: [
            UserRole.EMPLOYEE,
            UserRole.ADMIN,
            UserRole.HR,
            UserRole.CFO,
            UserRole.SYSTEM_ADMIN,
          ],
        },
        {
          name: "Team Leaves",
          path: "/leaves/team",
          icon: <></>,
          userRoles: [UserRole.ADMIN, UserRole.HR],
        },
        {
          name: "Leave Requests",
          path: "/leaves/requests",
          icon: <></>,
          userRoles: [UserRole.ADMIN, UserRole.HR],
        },
      ],
    },
    {
      name: "Payroll",
      path: "/payroll",
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      userRoles: [UserRole.ADMIN, UserRole.CFO, UserRole.HR],
      children: [
        {
          name: "My Payslips",
          path: "/payroll/me",
          icon: <></>,
          userRoles: [
            UserRole.ADMIN,
            UserRole.HR,
            UserRole.CFO,
            UserRole.EMPLOYEE,
            UserRole.SYSTEM_ADMIN,
          ],
        },
        {
          name: "Team Payroll",
          path: "/payroll/team",
          icon: <></>,
          userRoles: [UserRole.ADMIN, UserRole.CFO, UserRole.HR],
        },
        {
          name: "Reports",
          path: "/payroll/reports",
          icon: <></>,
          userRoles: [UserRole.ADMIN, UserRole.CFO],
        },
      ],
    },
    {
      name: "Performance",
      path: "/performance",
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      userRoles: [UserRole.ADMIN, UserRole.HR, UserRole.EMPLOYEE],
      children: [
        {
          name: "My Performance",
          path: "/performance/me",
          icon: <></>,
          userRoles: [
            UserRole.EMPLOYEE,
            UserRole.ADMIN,
            UserRole.HR,
            UserRole.CFO,
            UserRole.SYSTEM_ADMIN,
          ],
        },
        {
          name: "Team Performance",
          path: "/performance/team",
          icon: <></>,
          userRoles: [UserRole.ADMIN, UserRole.HR],
        },
        {
          name: "Reviews",
          path: "/performance/reviews",
          icon: <></>,
          userRoles: [UserRole.ADMIN, UserRole.HR],
        },
      ],
    },
    {
      name: "Documents",
      path: "/documents",
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      userRoles: [
        UserRole.ADMIN,
        UserRole.HR,
        UserRole.EMPLOYEE,
        UserRole.SYSTEM_ADMIN,
        UserRole.CFO,
      ],
    },
    {
      name: "Settings",
      path: "/settings",
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      userRoles: [UserRole.ADMIN, UserRole.SYSTEM_ADMIN],
    },
  ];

  // Filter navigation items based on user role
  const filteredNavItems = user
    ? navItems.filter((item) => item.userRoles.includes(user.role))
    : [];

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 w-64 bg-primary text-white transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-primary-600">
        <div className="flex items-center">
          <div className="flex-shrink-0 w-10 h-10">
            <PersmonLogo />
          </div>
          <div className="ml-2">
            <h1 className="text-lg font-semibold">Persmon EMS</h1>
          </div>
        </div>
        {isMobile && (
          <button
            onClick={toggleSidebar}
            className="lg:hidden text-white hover:text-gray-200 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="mt-5 px-2 overflow-y-auto h-[calc(100%-10rem)]">
        <ul className="space-y-1">
          {filteredNavItems.map((item) => {
            // Check if this item has visible children for the current user
            const hasVisibleChildren =
              item.children &&
              user &&
              item.children.some((child) =>
                child.userRoles.includes(user.role)
              );

            const isActive = isActivePath(item.path);
            const isExpanded = expandedItems.has(item.path);
            const shouldExpand =
              isExpanded ||
              (hasVisibleChildren &&
                item.children?.some((child) => isActivePath(child.path)));

            return (
              <li key={item.path} className="py-1">
                {hasVisibleChildren ? (
                  // Item with submenu
                  <div>
                    <button
                      onClick={() => toggleExpand(item.path)}
                      className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-md ${
                        isActive
                          ? "bg-primary-600 text-white"
                          : "text-gray-100 hover:bg-primary-700"
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="mr-3">{item.icon}</span>
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <svg
                        className={`h-4 w-4 transition-transform ${
                          shouldExpand ? "rotate-90" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>

                    {/* Submenu Items */}
                    {shouldExpand && item.children && (
                      <ul className="mt-1 pl-7 space-y-1">
                        {item.children
                          .filter(
                            (child) =>
                              user && child.userRoles.includes(user.role)
                          )
                          .map((child) => (
                            <li key={child.path}>
                              <Link
                                to={child.path}
                                className={`flex items-center px-3 py-2 text-sm rounded-md ${
                                  isActivePath(child.path)
                                    ? "bg-primary-600 text-white"
                                    : "text-gray-100 hover:bg-primary-700"
                                }`}
                              >
                                {child.name}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  // Regular menu item without children
                  <Link
                    to={item.path}
                    className={`flex items-center px-3 py-2 text-sm rounded-md ${
                      isActive
                        ? "bg-primary-600 text-white"
                        : "text-gray-100 hover:bg-primary-700"
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile Section */}
      <div className="absolute bottom-0 w-full border-t border-primary-600 p-4">
        {user && (
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-9 w-9 rounded-full bg-primary-600 flex items-center justify-center text-white font-medium">
                {user.role === UserRole.ADMIN
                  ? "AD"
                  : user.role === UserRole.HR
                  ? "HR"
                  : user.role === UserRole.CFO
                  ? "CF"
                  : user.role === UserRole.SYSTEM_ADMIN
                  ? "SA"
                  : "EM"}
              </div>
            </div>
            <div className="ml-3 flex-1 min-w-0 flex flex-col">
              <Link
                to="/profile"
                className="text-sm font-medium text-white truncate hover:underline"
              >
                My Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-xs text-gray-300 hover:text-white text-left"
              >
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
