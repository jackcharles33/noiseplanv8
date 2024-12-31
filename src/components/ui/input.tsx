import * as React from "react";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={`w-full px-6 py-4 rounded-2xl bg-[#1a1528] text-white border-none focus:outline-none ${className}`}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };