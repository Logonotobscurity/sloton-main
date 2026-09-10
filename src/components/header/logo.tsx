import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export const Logo = ({
  linked = true,
  compact = false,
  className,
}: {
  linked?: boolean;
  compact?: boolean;
  className?: string;
}) => {
  const mark = (
    <span className={cn('flex flex-col items-start group', className)}>
      <span className="sr-only">LOG_ON</span>
      <span
        className={cn(
          'flex items-center font-extrabold tracking-tighter leading-none text-foreground',
          compact ? 'text-xl md:text-2xl' : 'text-3xl md:text-4xl'
        )}
        aria-hidden="true"
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 transition-all duration-300 group-hover:brightness-125">
          LOG_
        </span>
        <span className="relative flex items-center justify-center mx-[2px] sm:mx-1">
          <span className="absolute inset-0 rounded-full bg-primary/40 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <Image
            src="/icons/circuit-o.svg"
            alt=""
            width={compact ? 22 : 26}
            height={compact ? 22 : 26}
            className={cn(
              'rounded-full object-cover relative z-10 drop-shadow-[0_0_8px_rgba(0,213,135,0.4)]',
              compact ? 'w-5 h-5 md:w-6 md:h-6' : 'md:w-[32px] md:h-[32px]'
            )}
            priority
          />
        </span>
        <span className="bg-clip-text text-transparent bg-gradient-to-l from-primary to-primary/80 transition-all duration-300 group-hover:brightness-125">
          N
        </span>
      </span>
      <span
        className={cn(
          'font-semibold uppercase tracking-[0.22em] text-muted-foreground ml-[2px] group-hover:text-primary',
          compact ? 'text-[8px] md:text-[9px] mt-0.5 hidden sm:block' : 'text-[9px] md:text-[11px] mt-1'
        )}
        aria-hidden="true"
      >
        Connecting Advantages
      </span>
    </span>
  );

  if (!linked) return mark;

  return (
    <Link
      href="/"
      className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      aria-label="LOG_ON — home"
    >
      {mark}
    </Link>
  );
};
