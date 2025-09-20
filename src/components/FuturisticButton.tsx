import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface FuturisticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  glow?: boolean;
  children: ReactNode;
}

const FuturisticButton = ({ 
  variant = "primary", 
  size = "md", 
  glow = false, 
  className, 
  children, 
  ...props 
}: FuturisticButtonProps) => {
  const baseClasses = "btn-futuristic relative overflow-hidden font-space font-medium transition-all duration-300 hover:scale-105 whitespace-nowrap inline-flex items-center justify-center gap-2";
  
  const variantClasses = {
    primary: "liquid-glass-button text-white border-primary/30 hover:border-primary/60 shadow-lg hover:shadow-primary/50",
    secondary: "liquid-glass border-2 border-secondary/50 text-white hover:border-secondary hover:bg-secondary/10 hover:shadow-secondary/30",
    ghost: "bg-transparent hover:liquid-glass text-foreground hover:text-primary border border-border hover:border-primary/50",
    outline: "border-2 border-primary/50 text-white liquid-glass hover:border-primary hover:shadow-primary/30"
  };
  
  const sizeClasses = {
    sm: "px-3 py-2 text-sm min-h-[2.5rem]",
    md: "px-4 py-2.5 text-base min-h-[2.75rem]",
    lg: "px-6 py-3 text-lg min-h-[3rem]"
  };
  
  const glowClasses = glow ? "animate-gentle-glow" : "";

  return (
    <Button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        glowClasses,
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2 whitespace-nowrap">
        {children}
      </span>
    </Button>
  );
};

export default FuturisticButton;