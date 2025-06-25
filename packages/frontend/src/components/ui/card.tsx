// src/components/ui/Card.tsx
import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  footer?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  title, 
  subtitle, 
  footer, 
  className = '',
  ...props 
}) => {
  return (
    <div 
      className={`bg-white rounded-lg shadow overflow-hidden ${className}`}
      {...props}
    >
      {(title || subtitle) && (
        <div className="px-6 py-4 border-b">
          {title && <h3 className="text-lg font-medium">{title}</h3>}
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
      )}
      
      <div className="p-6">
        {children}
      </div>
      
      {footer && (
        <div className="px-6 py-4 bg-gray-50 border-t">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;