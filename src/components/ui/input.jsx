import * as React from "react"

import { cn } from "../../lib/utils.js"

const Input = React.forwardRef(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "flex h-10 sm:h-12 w-full rounded-full border border-input border-[#A9A6A6] bg-background px-3 sm:px-4 py-2 text-sm sm:text-base ring-offset-background file:border-0 file:bg-transparent file:text-xs sm:file:text-sm file:font-medium file:text-foreground placeholder:text-[#A9A6A6] placeholder:text-xs sm:placeholder:text-sm focus-visible:outline-none focus-visible:border-black focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Input.displayName = "Input"

export { Input }
