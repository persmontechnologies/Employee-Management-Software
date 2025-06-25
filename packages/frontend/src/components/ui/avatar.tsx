import * as React from "react";

// Avatar component: A container for avatar content.
const Avatar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className || ""}`}
      {...props}
    />
  )
);
Avatar.displayName = "Avatar";

// AvatarImage component: Renders an image styled as an avatar.
const AvatarImage = React.forwardRef<HTMLImageElement, React.ImgHTMLAttributes<HTMLImageElement>>(
  ({ className, ...props }, ref) => (
    <img
      ref={ref}
      className={`aspect-square h-full w-full object-cover ${className || ""}`}
      {...props}
    />
  )
);
AvatarImage.displayName = "AvatarImage";

// AvatarFallback component: Provides a fallback UI when the image fails to load.
const AvatarFallback = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={`flex h-full w-full items-center justify-center rounded-full bg-gray-100 text-gray-600 ${className || ""}`}
      {...props}
    />
  )
);
AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback };
