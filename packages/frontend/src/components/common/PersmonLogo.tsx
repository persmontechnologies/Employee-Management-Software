import React from "react";

interface PersmonLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * Persmon Technologies logo component
 */
const PersmonLogo: React.FC<PersmonLogoProps> = ({
  className = "",
  size = "md",
}) => {
  // Determine size classes
  const sizeClasses = {
    sm: "h-8",
    md: "h-10",
    lg: "h-12",
  };

  return (
    <div className={`flex items-center ${className}`}>
      <div className="p-2 bg-indigo-700 rounded-lg shadow-md mr-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`${sizeClasses[size]} text-white`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
          <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
        </svg>
      </div>
      <span className="font-bold text-xl text-gray-800">Persmon EMS</span>
    </div>
  );
};

export default PersmonLogo;
