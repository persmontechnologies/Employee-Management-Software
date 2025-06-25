import * as React from "react";

// Simple Sheet implementation without the actual Radix UI functionality.
// For a real app, you'd want to use @radix-ui/react-dialog.

interface SheetProps {
  children: React.ReactNode;
}

const Sheet = ({ children }: SheetProps) => {
  return <div>{children}</div>;
};

type SheetTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
};

const SheetTrigger = React.forwardRef<HTMLButtonElement, SheetTriggerProps>(
  ({ className, asChild = false, ...props }, ref) => {
    // When asChild is true, we render the child element directly.
    // Note: React.Fragment does not support refs.
    const Comp: React.ElementType = asChild ? React.Fragment : "button";
    if (asChild) {
      return <Comp {...props} />;
    }
    return <Comp className={className || ""} ref={ref} {...props} />;
  }
);
SheetTrigger.displayName = "SheetTrigger";

type SheetContentProps = React.HTMLAttributes<HTMLDivElement> & {
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
};

const SheetContent = React.forwardRef<HTMLDivElement, SheetContentProps>(
  ({ className, side = "right", children, ...props }, ref) => {
    const [open, setOpen] = React.useState(false);

    // Close the sheet when clicking outside.
    React.useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as Node;
        if ((target as HTMLElement).nodeName === "BUTTON") return; // Ignore clicks on the trigger.
        setOpen(false);
      };

      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, []);

    // Close the sheet when pressing the Escape key.
    React.useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
      };

      if (open) {
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
      }
    }, [open]);

    // Toggle the sheet when a trigger is clicked.
    const handleTriggerClick = () => {
      setOpen((prev) => !prev);
    };

    // Attach the click handler to all SheetTrigger elements with data-sheet-trigger="true".
    React.useEffect(() => {
      const triggers = document.querySelectorAll("[data-sheet-trigger='true']");
      triggers.forEach((trigger) => {
        trigger.addEventListener("click", handleTriggerClick);
      });

      return () => {
        triggers.forEach((trigger) => {
          trigger.removeEventListener("click", handleTriggerClick);
        });
      };
    }, []);

    if (!open) return null;

    const sideClasses: Record<string, string> = {
      top: "top-0 left-0 right-0 h-auto animate-in slide-in-from-top",
      right: "top-0 right-0 h-full animate-in slide-in-from-right",
      bottom: "bottom-0 left-0 right-0 h-auto animate-in slide-in-from-bottom",
      left: "top-0 left-0 h-full animate-in slide-in-from-left",
    };

    return (
      <div className="fixed inset-0 z-50 bg-black/50">
        <div
          ref={ref}
          className={`fixed ${sideClasses[side]} z-50 w-80 max-w-full bg-white p-6 shadow-lg ${className || ""}`}
          onClick={(e) => e.stopPropagation()}
          {...props}
        >
          {children}
        </div>
      </div>
    );
  }
);
SheetContent.displayName = "SheetContent";

export { Sheet, SheetTrigger, SheetContent };
