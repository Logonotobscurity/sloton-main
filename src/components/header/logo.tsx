import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const Logo = () => (
    <Link href="/" className="flex flex-col items-start group cursor-pointer hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-sm p-1 -ml-1 transition-all duration-300">
        <span className="sr-only">LOG_ON</span>
        
        {/* Main Text Container */}
        <span className="flex items-center font-extrabold text-3xl md:text-4xl tracking-tighter leading-none text-foreground" aria-hidden="true">
            {/* LOG_ Prefix */}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 transition-all duration-300 group-hover:brightness-125">
                LOG_
            </span>
            
            {/* The dynamic 2D Circuit 'O' */}
            <span className="relative flex items-center justify-center mx-[2px] sm:mx-1 transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]">
                {/* Glow ring on hover */}
                <span className="absolute inset-0 rounded-full bg-primary/40 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <Image 
                    src="/icons/circuit-o.svg" 
                    alt="O" 
                    width={26} 
                    height={26} 
                    className="rounded-full object-cover relative z-10 drop-shadow-[0_0_8px_rgba(0,213,135,0.4)] md:w-[32px] md:h-[32px] transition-transform duration-300 group-hover:scale-110"
                    priority
                />
            </span>
            
            {/* N Suffix */}
            <span className="bg-clip-text text-transparent bg-gradient-to-l from-primary to-primary/80 transition-all duration-300 group-hover:brightness-125">
                N
            </span>
        </span>

        {/* Tagline */}
        <span className="text-[9px] md:text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground mt-1 ml-[4px] transition-colors duration-300 group-hover:text-primary" aria-hidden="true">
            Connecting Advantages
        </span>
    </Link>
);
