import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline";
}

const Badge: React.FC<BadgeProps> = ({
  variant = "default",
  className = "",
  ...props
}) => {
  const base =
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants: Record<NonNullable<BadgeProps["variant"]>, string> = {
    default: "border-transparent bg-blue-600 text-white hover:bg-blue-700",
    secondary: "border-transparent bg-gray-200 text-gray-800 hover:bg-gray-300",
    destructive: "border-transparent bg-red-100 text-red-700 hover:bg-red-200",
    outline: "border border-gray-300 text-gray-800",
  };


  return (
    <div className={`${base} ${variants[variant]} ${className}`} {...props} />
  );
};

export default Badge;
