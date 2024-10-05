import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility function to merge class names
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Example React component that uses the cn function
const ExampleComponent = ({ className, children }) => {
  return (
    <div className={cn('base-class', className)}>
      {children}
    </div>
  );
};

export default ExampleComponent;
