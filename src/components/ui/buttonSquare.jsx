import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"

import { cn } from "../../lib/utils.js"

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap  text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 rounded-md",
    {
        variants: {
            variant: {
                default: `
  bg-btn-gradient 
  text-primary-foreground 
  hover:shadow-lg 
  hover:-translate-y-[1px] 
  transition-all 
  duration-200 
  ease-in-out 
`,

                destructive:
                    "bg-destructive text-destructive-foreground hover:bg-destructive/90  rounded-md",
                outline:
                    "border border-input   border-[2px] bg-transparent hover:shadow-lg hover:-translate-y-[1px]  rounded-md  border-brown-31 text-brown-31",
                secondary:
                    "bg-brown-31 text-background   rounded-md  hover:shadow-lg hover:-translate-y-[1px]",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-12 px-4 py-2",
                sm: "h-9  px-3",
                lg: "h-11  px-8",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

const ButtonSquare = React.forwardRef(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
ButtonSquare.displayName = "ButtonSquare"

export { ButtonSquare, buttonVariants }
