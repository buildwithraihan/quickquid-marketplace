import { useState } from "react";
import { cn } from "@/lib/utils";

interface ServiceImageProps {
  src?: string | null;
  alt: string;
  className?: string;
  fallbackClassName?: string;
  aspectRatio?: "video" | "square" | "portrait";
  lazy?: boolean;
}

/**
 * ServiceImage component with fallback support
 * Displays service preview images with graceful fallback to placeholder
 */
export function ServiceImage({
  src,
  alt,
  className,
  fallbackClassName,
  aspectRatio = "video",
  lazy = true,
}: ServiceImageProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const aspectClasses = {
    video: "aspect-video",
    square: "aspect-square",
    portrait: "aspect-[3/4]",
  };

  const baseClasses = cn(
    "relative overflow-hidden bg-secondary/50",
    aspectClasses[aspectRatio],
    className
  );

  const fallbackClasses = cn(
    "flex h-full items-center justify-center text-muted-foreground",
    fallbackClassName
  );

  // Show fallback if no src provided or image failed to load
  const showFallback = !src || imageError;

  if (showFallback) {
    return (
      <div className={baseClasses}>
        <img
          src="/default-service-image.svg"
          alt="Service preview placeholder"
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className={baseClasses}>
      {/* Loading placeholder */}
      {!imageLoaded && (
        <div className={fallbackClasses}>
          <div className="text-center">
            <div className="mb-2 text-2xl opacity-50">⏳</div>
            <span className="text-sm">Loading...</span>
          </div>
        </div>
      )}
      
      {/* Actual image */}
      <img
        src={src}
        alt={alt}
        loading={lazy ? "lazy" : "eager"}
        className={cn(
          "h-full w-full object-cover transition-opacity duration-300",
          imageLoaded ? "opacity-100" : "opacity-0"
        )}
        onLoad={() => setImageLoaded(true)}
        onError={() => {
          setImageError(true);
          setImageLoaded(false);
        }}
      />
    </div>
  );
}