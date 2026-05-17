'use client';
import React from 'react';

type ClockCircleProps = {
  size: 'sm' | 'lg';
  percent: number;
  children?: React.ReactNode;
  color?: string; // Optional CSS color or variable
};

function ClockCircle({ percent, size, children, color = 'var(--primary)' }: ClockCircleProps) {
  return (
    <div
      className={`relative my-10 mx-5 flex items-center justify-center ${
        size === 'sm' ? 'h-90 w-90' : 'h-[50vh] w-[50vh]'
      }`}
    >
      <div
        className="absolute h-full w-full rounded-full"
        style={{
          background: `conic-gradient(${color} ${percent}%, var(--card) 0)`,
          transition: 'background 0.5s ease-out',
        }}
      />
      <div className="absolute h-[92%] w-[92%] bg-background rounded-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}

export default ClockCircle;
