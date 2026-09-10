/**
 * Image Utilities
 * Centralized image handling for consistent image rendering across the application
 * Provides wrapper components and utilities for Next.js Image optimization
 */

import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

/**
 * Standard image sizes for responsive images
 */
export const ImageSizes = {
  /** Small thumbnail - 64x64 */
  THUMBNAIL_SM: { width: 64, height: 64 },
  /** Medium thumbnail - 96x96 */
  THUMBNAIL_MD: { width: 96, height: 96 },
  /** Large thumbnail - 128x128 */
  THUMBNAIL_LG: { width: 128, height: 128 },
  /** Avatar size - 40x40 */
  AVATAR: { width: 40, height: 40 },
  /** Card image - 400x300 */
  CARD: { width: 400, height: 300 },
  /** Hero image - 1200x600 */
  HERO: { width: 1200, height: 600 },
  /** Full width - 1920x1080 */
  FULL: { width: 1920, height: 1080 },
} as const;

/**
 * Standard responsive sizes strings for different contexts
 */
export const ResponsiveSizes = {
  /** Full width on all screens */
  FULL_WIDTH: '100vw',
  /** Half width on desktop, full on mobile */
  HALF_DESKTOP: '(max-width: 768px) 100vw, 50vw',
  /** Third width on desktop, half on tablet, full on mobile */
  THIRD_DESKTOP: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  /** Card in grid - responsive based on columns */
  CARD_GRID: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  /** Thumbnail sizes */
  THUMBNAIL: '(max-width: 768px) 96px, 128px',
  /** Icon/logo sizes */
  ICON: '32px',
} as const;

/**
 * Common image aspect ratios
 */
export const AspectRatio = {
  SQUARE: 1,
  LANDSCAPE: 16 / 9,
  PORTRAIT: 3 / 4,
  WIDE: 21 / 9,
  CARD: 4 / 3,
} as const;

/**
 * Props for OptimizedImage component
 */
export interface OptimizedImageProps extends Omit<ImageProps, 'alt'> {
  /** Alt text for accessibility (required) */
  alt: string;
  /** AI hint for image generation/description */
  dataAiHint?: string;
  /** Whether to apply hover scale effect */
  hoverScale?: boolean;
  /** Custom container className */
  containerClassName?: string;
  /** Aspect ratio for the container */
  aspectRatio?: number;
}

/**
 * Optimized Image component with consistent defaults
 * Wraps Next.js Image with common patterns and accessibility features
 */
export function OptimizedImage({
  alt,
  dataAiHint,
  hoverScale = false,
  containerClassName,
  aspectRatio,
  className,
  ...props
}: OptimizedImageProps) {
  const imageElement = (
    <Image
      alt={alt}
      className={cn(
        'object-cover',
        hoverScale && 'transition-transform duration-300 group-hover:scale-105',
        className
      )}
      {...props}
    />
  );

  // If we have a container wrapper needed
  if (dataAiHint || containerClassName || aspectRatio) {
    return (
      <div
        data-ai-hint={dataAiHint}
        className={cn(
          aspectRatio && 'relative overflow-hidden',
          containerClassName
        )}
        style={aspectRatio ? { aspectRatio } : undefined}
      >
        {imageElement}
      </div>
    );
  }

  return imageElement;
}

/**
 * Props for CardImage component
 */
export interface CardImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  dataAiHint?: string;
  className?: string;
  priority?: boolean;
}

/**
 * Card Image component for use in cards and list items
 * Includes hover effect and consistent sizing
 */
export function CardImage({
  src,
  alt,
  width = ImageSizes.CARD.width,
  height = ImageSizes.CARD.height,
  dataAiHint,
  className,
  priority = false,
}: CardImageProps) {
  return (
    <div className="overflow-hidden rounded-t-xl group">
      <div data-ai-hint={dataAiHint}>
        {src.endsWith('.svg') ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={cn(
              'w-full h-48 sm:h-56 object-cover transition-transform duration-300 ease-in-out group-hover:scale-105',
              className
            )}
          />
        ) : (
          <Image
            src={src.startsWith('http') ? '/images/marks/hero-default.svg' : src}
            alt={alt}
            width={width}
            height={height}
            className={cn(
              'w-full h-48 sm:h-56 object-cover transition-transform duration-300 ease-in-out group-hover:scale-105',
              className
            )}
            sizes={ResponsiveSizes.CARD_GRID}
            priority={priority}
          />
        )}
      </div>
    </div>
  );
}

/**
 * Props for LogoImage component
 */
export interface LogoImageProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Logo Image component for partner/tech logos
 */
export function LogoImage({
  src,
  alt,
  size = 'md',
  className,
}: LogoImageProps) {
  const sizeMap = {
    sm: { width: 24, height: 24, className: 'h-6 w-auto' },
    md: { width: 32, height: 32, className: 'h-8 w-auto' },
    lg: { width: 48, height: 48, className: 'h-12 w-auto' },
  };

  const { width, height, className: sizeClassName } = sizeMap[size];

  // Remote CDNs (icons8, picsum) fail in this environment via /_next/image.
  if (src.startsWith('http://') || src.startsWith('https://')) {
    const mark = alt.replace(/ Partner$/i, '').slice(0, 2).toUpperCase();
    return (
      <span
        aria-label={alt}
        title={alt}
        className={cn(
          'inline-flex items-center justify-center rounded-md border border-border bg-secondary/40 font-mono font-semibold text-primary',
          size === 'sm' && 'h-6 w-6 text-[9px]',
          size === 'md' && 'h-8 w-8 text-[10px]',
          size === 'lg' && 'h-12 w-12 text-xs',
          className
        )}
      >
        {mark}
      </span>
    );
  }

  if (src.endsWith('.svg')) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={alt} width={width} height={height} className={cn(sizeClassName, className)} />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn(sizeClassName, className)}
    />
  );
}

/**
 * Props for FillImage component
 */
export interface FillImageProps {
  src: string;
  alt: string;
  dataAiHint?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none';
}

/**
 * Fill Image component for images that fill their container
 * Container must have position: relative and defined dimensions
 */
export function FillImage({
  src,
  alt,
  dataAiHint,
  className,
  sizes = ResponsiveSizes.FULL_WIDTH,
  priority = false,
  objectFit = 'cover',
}: FillImageProps) {
  const objectFitClass = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
    none: 'object-none',
  };

  return (
    <div data-ai-hint={dataAiHint} className="relative w-full h-full">
      <Image
        src={src}
        alt={alt}
        fill
        className={cn(objectFitClass[objectFit], className)}
        sizes={sizes}
        priority={priority}
      />
    </div>
  );
}

/**
 * Generate blur placeholder data URL
 * Use for custom blur placeholders
 */
export function generateBlurPlaceholder(
  width: number = 10,
  height: number = 10,
  color: string = '#e5e7eb'
): string {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${color}"/>
    </svg>
  `;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

/**
 * Calculate dimensions maintaining aspect ratio
 */
export function calculateDimensions(
  originalWidth: number,
  originalHeight: number,
  maxWidth?: number,
  maxHeight?: number
): { width: number; height: number } {
  const aspectRatio = originalWidth / originalHeight;

  let width = originalWidth;
  let height = originalHeight;

  if (maxWidth && width > maxWidth) {
    width = maxWidth;
    height = width / aspectRatio;
  }

  if (maxHeight && height > maxHeight) {
    height = maxHeight;
    width = height * aspectRatio;
  }

  return {
    width: Math.round(width),
    height: Math.round(height),
  };
}

/**
 * Get optimized image URL with quality and format parameters
 * For use with external image services
 */
export function getOptimizedImageUrl(
  src: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'avif' | 'jpeg' | 'png';
  } = {}
): string {
  // If it's already a Next.js optimized URL or external, return as-is
  if (src.startsWith('/_next/') || src.startsWith('data:')) {
    return src;
  }

  // For picsum.photos, we can adjust the URL
  if (src.includes('picsum.photos')) {
    const { width = 400, height = 300 } = options;
    // Replace dimensions in picsum URL
    return src.replace(/\/\d+\/\d+/, `/${width}/${height}`);
  }

  return src;
}

/**
 * Check if image source is external
 */
export function isExternalImage(src: string): boolean {
  return src.startsWith('http://') || src.startsWith('https://');
}

/**
 * Check if image source is a data URL
 */
export function isDataUrl(src: string): boolean {
  return src.startsWith('data:');
}

/**
 * Default image props for common use cases
 */
export const defaultImageProps = {
  /** Default props for card images */
  card: {
    sizes: ResponsiveSizes.CARD_GRID,
    className: 'w-full h-full object-cover',
  },
  /** Default props for hero images */
  hero: {
    sizes: ResponsiveSizes.FULL_WIDTH,
    priority: true,
    className: 'w-full h-full object-cover',
  },
  /** Default props for thumbnail images */
  thumbnail: {
    sizes: ResponsiveSizes.THUMBNAIL,
    className: 'object-contain',
  },
  /** Default props for logo images */
  logo: {
    sizes: ResponsiveSizes.ICON,
    className: 'h-8 w-auto',
  },
} as const;
