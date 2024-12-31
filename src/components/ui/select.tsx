import * as React from "react";

const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <select
    ref={ref}
    className={`w-full px-6 py-4 rounded-2xl bg-[#1a1528] text-white border-none focus:outline-none appearance-none ${className}`}
    {...props}
  >
    {children}
  </select>
));
Select.displayName = "Select";

export { Select };