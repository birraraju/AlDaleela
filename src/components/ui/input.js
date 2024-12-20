import * as React from "react";
import { cn } from "../../lib/utils";

const Input = React.forwardRef(({ className, type = "text", ...props }, ref) => {

  return (
    <input
      type={type}
      className={cn(
        "flex h-9 w-full rounded-md border font-light  font-omes text-[#000000CC] text-[14px] border-transparent bg-transparent px-3 py-1 outline-none text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground  disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };
