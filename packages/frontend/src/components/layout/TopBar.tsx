// src/components/layout/TopBar.tsx
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { UserRole } from '../../types/local-types';

interface TopBarProps {
  toggleSidebar: () => void;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

const TopBar: React.FC<TopBarProps> = ({ toggleSidebar }) => {
  const [user, setUser] = useState<User | null>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<{ id: string; title: string; message: string; read: boolean }[]>([
    { id: '1', title: 'New leave request', message: 'John Doe has requested leave approval', read: false },
    { id: '2', title: 'Performance review', message: 'Your quarterly performance review is due next week', read: false },
    { id: '3', title: 'Payslip available', message: 'Your April 2025 payslip is now available', read: true },
  ]);
  
  const menuRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  
  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Fetch user from localStorage
  useEffect(() => {
    const userStr = localStorage.getItem('persmon_user');
    if (userStr) {
      try {
        const userData = JSON.parse(userStr);
        setUser(userData);
      } catch (error) {
        console.error('Failed to parse user data:', error);
      }
    }
  }, []);
  
  // Mark notification as read
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };
  
  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };
  
  // Count unread notifications
  const unreadCount = notifications.filter(n => !n.read).length;
  
  return (
    <div className="bg-white shadow h-16">
      <div className="h-full px-4 flex items-center justify-between">
        {/* Left section with hamburger menu */}
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="lg:hidden text-gray-600 hover:text-primary focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <h2 className="ml-4 lg:ml-0 text-lg font-semibold text-gray-700">
            Persmon Employee Management System
          </h2>
        </div>
        
        {/* Right section with user profile and notifications */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="hidden md:block relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <div className="absolute left-3 top-3 text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="flex items-center focus:outline-none"
            >
              <div className="relative">
                <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 rounded-full h-4 w-4 flex items-center justify-center text-xs text-white">{unreadCount}</span>
                )}
              </div>
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                <div className="px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-sm font-semibold text-gray-700">Notifications</h3>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-primary hover:text-primary-600 font-medium"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        onClick={() => markAsRead(notification.id)}
                        className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 ${!notification.read ? 'bg-blue-50' : ''}`}
                      >
                        <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                        <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-sm text-gray-500">No notifications</div>
                  )}
                </div>
                <div className="px-4 py-2 border-t border-gray-200">
                  <Link to="/notifications" className="text-xs text-primary hover:text-primary-600 font-medium">
                    View all notifications
                  </Link>
                </div>
              </div>
            )}
          </div>
          
          {/* User Profile */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center focus:outline-none"
            >
              <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <span className="ml-2 font-medium text-gray-700 hidden md:block">{user?.name || 'User'}</span>
              <svg 
                className="w-4 h-4 ml-1 text-gray-500 hidden md:block" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                <div className="px-4 py-2 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-900">{user?.name || 'User'}</p>
                  <p className="text-xs text-gray-600">{user?.email || 'user@persmon.com'}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {user?.role === UserRole.ADMIN 
                      ? 'Administrator' 
                      : user?.role === UserRole.HR 
                      ? 'Human Resources' 
                      : user?.role === UserRole.CFO 
                      ? 'Chief Financial Officer' 
                      : user?.role === UserRole.SYSTEM_ADMIN 
                      ? 'System Administrator' 
                      : 'Employee'}
                  </p>
                </div>
                <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Profile
                </Link>
                <Link to="/settings/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Account Settings
                </Link>
                <button
                  onClick={() => {
                    localStorage.removeItem('persmon_user');
                    localStorage.removeItem('persmon_token');
                    window.location.href = '/login';
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;