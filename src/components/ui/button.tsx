import * as React from "react";

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => (
  <button
    ref={ref}
    className={`px-8 py-4 rounded-2xl font-semibold text-white bg-[#E561A0] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    {...props}
  >
    {children}
  </button>
));