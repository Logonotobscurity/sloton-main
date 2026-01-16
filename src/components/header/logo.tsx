import React from 'react';

export const Logo = () => (
    <div className="flex flex-col items-start">
        <span className="sr-only">LOG_ON</span>
        <span className="font-bold text-2xl tracking-tighter text-primary leading-tight" aria-hidden="true">LOG_ON</span>
        <span className="text-xs text-muted-foreground -mt-1" aria-hidden="true">Connecting Advantages...</span>
    </div>
);
