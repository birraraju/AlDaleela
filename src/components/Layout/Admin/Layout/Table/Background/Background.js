import React from 'react';

export function Background({ children }) {
  return (
    <div className="bg-background min-h-screen p-4 md:p-8">
      {children}
    </div>
  );
}
