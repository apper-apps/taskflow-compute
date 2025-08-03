import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Checkbox = forwardRef(({ 
  className, 
  checked, 
  ...props 
}, ref) => {
  return (
    <div className="relative">
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        ref={ref}
        {...props}
      />
      <div
        className={cn(
          "flex h-5 w-5 items-center justify-center rounded border-2 transition-all duration-200 cursor-pointer",
          checked
            ? "bg-gradient-to-br from-primary-500 to-primary-600 border-primary-500 shadow-glow"
            : "border-gray-300 bg-white hover:border-primary-300",
          className
        )}
      >
        {checked && (
          <ApperIcon 
            name="Check" 
            className="h-3 w-3 text-white animate-check-draw" 
          />
        )}
      </div>
    </div>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;