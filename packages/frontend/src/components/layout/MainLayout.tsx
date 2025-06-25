// src/components/layout/MainLayout.tsx
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

interface MainLayoutProps {
  sidebarOpen?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  sidebarOpen: initialSidebarOpen = true,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(initialSidebarOpen);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile viewport and adjust sidebar visibility
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    // Initial check
    checkScreenSize();

    // Add event listener
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Toggle sidebar function
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        isMobile={isMobile}
      />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Bar */}
        <TopBar toggleSidebar={toggleSidebar} />

        {/* Page Content */}
        <main
          className={`flex-1 overflow-y-auto transition-all duration-300 ease-in-out p-4 md:p-6 bg-gray-50`}
        >
          <div className="container mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default MainLayout;
