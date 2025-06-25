import * as React from "react";

// Simple dropdown implementation without the actual Radix UI functionality.
// For a real app, you'd want to use @radix-ui/react-dropdown-menu.

interface DropdownMenuProps {
  children: React.ReactNode;
}
const DropdownMenu = ({ children }: DropdownMenuProps) => {
  return <div className="relative inline-block text-left">{children}</div>;
};

type DropdownMenuTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
};

const DropdownMenuTrigger = React.forwardRef<HTMLButtonElement, DropdownMenuTriggerProps>(
  ({ className, asChild = false, ...props }, ref) => {
    // If `asChild` is true, we render the children without wrapping in a button.
    // Note: React.Fragment does not accept refs, so when asChild is true, ref forwarding is skipped.
    const Comp: React.ElementType = asChild ? React.Fragment : "button";
    return asChild ? (
      <Comp {...props} />
    ) : (
      <Comp className={className || ""} ref={ref} {...props} />
    );
  }
);
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

type DropdownMenuContentProps = React.HTMLAttributes<HTMLDivElement> & {
  align?: "start" | "end" | "center";
};

const DropdownMenuContent = React.forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  ({ className, align = "center", ...props }, ref) => {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
      const handleClickOutside = () => setOpen(false);
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    // Simulate opening the dropdown on mount.
    React.useEffect(() => {
      setOpen(true);
    }, []);

    if (!open) return null;

    const alignmentClasses = {
      start: "left-0",
      center: "left-1/2 -translate-x-1/2",
      end: "right-0",
    };

    return (
      <div
        ref={ref}
        className={`absolute z-50 mt-2 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white p-1 shadow-md ${
          alignmentClasses[align]
        } ${className || ""}`}
        onClick={(e) => e.stopPropagation()}
        {...props}
      />
    );
  }
);
DropdownMenuContent.displayName = "DropdownMenuContent";

const DropdownMenuItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={`relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-gray-100 ${
        className || ""
      }`}
      {...props}
    />
  )
);
DropdownMenuItem.displayName = "DropdownMenuItem";

const DropdownMenuLabel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={`px-2 py-1.5 text-sm font-semibold ${className || ""}`}
      {...props}
    />
  )
);
DropdownMenuLabel.displayName = "DropdownMenuLabel";

const DropdownMenuSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={`-mx-1 my-1 h-px bg-gray-200 ${className || ""}`}
      {...props}
    />
  )
);
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
};
