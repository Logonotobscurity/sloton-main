// A collection of simple SVG icons for various technologies.
import React from 'react';
import { Briefcase } from 'lucide-react';

export const IconReact = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg" {...props} className="w-16 h-16 text-cyan-400">
    <circle cx="0" cy="0" r="2" fill="currentColor"></circle>
    <g stroke="currentColor" strokeWidth="1" fill="none">
      <ellipse rx="10" ry="4.5"></ellipse>
      <ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse>
      <ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse>
    </g>
  </svg>
);

export const IconNextjs = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 128 128" {...props} className="w-16 h-16">
    <circle cx="64" cy="64" r="64" fill="black" />
    <path
      d="M106.331 113.039L54.333 40.5h-5.999v48.167H41V40.5H35v48.667h-5.999V40.5h-9.333V31h43.331l48.001 68.167v3.872h-37.669z"
      fill="white"
    />
  </svg>
);

export const IconTypescript = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 128 128" {...props} className="w-14 h-14">
    <rect width="128" height="128" rx="32" fill="#3178C6" />
    <path
      d="M93.31,83.84H74.52V52.12h-9.5V43.2H93.31ZM70.1,64.28a3,3,0,0,1,2.09-.85,2.69,2.69,0,0,1,1.9.8,3.23,3.23,0,0,1,.81,2.19,3.53,3.53,0,0,1-.81,2.37,2.55,2.55,0,0,1-1.88.9,3.16,3.16,0,0,1-2.11-.84,3.5,3.5,0,0,1-.84-2.38A3.17,3.17,0,0,1,70.1,64.28Zm-22.3-17v4.45h9.33v33H45.73V51.72h9.49V47.31H34V38.37H74.3V47.3Z"
      fill="white"
    />
  </svg>
);

export const IconJavascript = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 128 128" {...props} className="w-14 h-14">
    <rect width="128" height="128" rx="0" fill="#F7DF1E" />
    <path d="M60.36,99.28a9.41,9.41,0,0,1-8.19-4.83,11.53,11.53,0,0,1-1.29-10.22,9.39,9.39,0,0,1,8.19-5.71,7.5,7.5,0,0,1,6.3,2.58l-4.19,3.44a3.52,3.52,0,0,0-2.37-1.29,3.2,3.2,0,0,0-3.23,3.16,4.28,4.28,0,0,0,1,3,3,3,0,0,0,2.69,1.22,3.52,3.52,0,0,0,2.58-.93l4.19,3.87A7.47,7.47,0,0,1,60.36,99.28Zm24.8-19.14a8,8,0,0,1,6.56,3.23l-4.45,3a3.59,3.59,0,0,0-2.22-1.72,2.49,2.49,0,0,0-2.76,2.76,2.47,2.47,0,0,0,2.76,2.76,3.61,3.61,0,0,0,2.22-1.72l4.45,3a8,8,0,0,1-6.56,3.23,7.74,7.74,0,0,1-8.34-7.77,7.74,7.74,0,0,1,8.34-7.77Z" />
  </svg>
);

export const IconNodejs = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 256 256" {...props} className="w-16 h-16">
    <path
      d="M208.2,128.1a79.8,79.8,0,0,0-71.1-79.1,1.9,1.9,0,0,0-1-.1,80,80,0,0,0-80,80,1.9,1.9,0,0,0,.1,1,80,80,0,0,0,80,80,1.9,1.9,0,0,0,1-.1,80,80,0,0,0,71-81.8ZM128.1,200a72,72,0,0,1-72-72,71.4,71.4,0,0,1,28-56.1,1,1,0,0,0,.2-1.4L78,61a1,1,0,0,0-1.3-.3A56,56,0,0,0,56.1,128a72,72,0,0,0,72,72,71.4,71.4,0,0,0,56.1-28,1,1,0,0,0-1.4-.2l-9.5,6.3a1,1,0,0,0-.3,1.3A56,56,0,0,1,128.1,200Z"
      fill="#8CC84B"
    />
  </svg>
);

export const IconPython = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...props} className="w-16 h-16">
    <path d="M11.5,13.7v-2.3c0-1.2-0.8-1.5-1.4-1.5c-0.6,0-1.4,0.3-1.4,1.5v2.3C8.7,15,9.5,15.2,10.1,15.2C10.7,15.2,11.5,15,11.5,13.7z M12,20.7c2.9-0.1,4.9-0.7,4.9-0.7s-0.2-2.1-3-2.1H12v2.8H12z M10.2,3.3c-2.9,0.1-4.9,0.7-4.9,0.7s0.2,2.1,3,2.1h1.7V3.3H10.2z" fill="#FFD43B" />
    <path d="M12.5,10.3v2.3c0,1.2,0.8,1.5,1.4,1.5s1.4-0.3,1.4-1.5v-2.3c0-1.2-0.8-1.5-1.4-1.5C13.3,8.8,12.5,9.1,12.5,10.3z M12,3.3c-2.9,0.1-4.9,0.7-4.9,0.7s0.2,2.1,3,2.1H12V3.3z M13.8,20.7c2.9-0.1,4.9-0.7,4.9-0.7s-0.2-2.1-3-2.1h-1.7v2.8H13.8z" fill="#306998" />
  </svg>
);

export const IconAws = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 128 128" {...props} className="w-16 h-16">
    <path fill="#232F3E" d="M0 0h128v128H0z" />
    <path
      fill="#FF9900"
      d="M59.33 87.24a24.18 24.18 0 0 1-13.43-1.84 27.28 27.28 0 0 1-11.2-7.1 33.3 33.3 0 0 1-6.52-11.45 42.48 42.48 0 0 1-2-15.11 42.17 42.17 0 0 1 2-15.06 33.4 33.4 0 0 1 6.52-11.45 27.42 27.42 0 0 1 11.2-7.1 24.18 24.18 0 0 1 13.43-1.84 24.18 24.18 0 0 1 13.43 1.84 27.28 27.28 0 0 1 11.2 7.1 33.3 33.3 0 0 1 6.52 11.45 42.48 42.48 0 0 1 2 15.06 42.17 42.17 0 0 1-2 15.11 33.4 33.4 0 0 1-6.52 11.45 27.42 27.42 0 0 1-11.2 7.1 24.18 24.18 0 0 1-13.43 1.84zm11.77-59.27c.45 0 .89.09 1.3.26a1.9 1.9 0 0 1 .84 1.15l14.12 43.12a2 2 0 0 1-1.2 2.37c-.3.09-.6.13-.9.13a1.93 1.93 0 0 1-1.63-1l-3.66-10.74H48.42l-3.67 10.74a1.94 1.94 0 0 1-2.52 1.2c-.3-.09-.56-.23-.8-.42a1.9 1.9 0 0 1-.7-1.8l14.12-43.12a1.9 1.9 0 0 1 1.15-.83c.27-.05.54-.08.8-.08zM60.1 46.1l-6.4 19.5h12.8z"
    />
  </svg>
);

export const IconGoogleCloud = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 128 128" {...props} className="w-16 h-16">
    <path fill="#4285F4" d="M64 128c35.346 0 64-28.654 64-64S99.346 0 64 0 0 28.654 0 64s28.654 64 64 64z" />
    <path
      fill="#fff"
      d="M87.41 71.132c-3.83-3.08-6.326-4.665-6.326-7.398 0-2.31 1.496-4.238 4.29-4.238 2.64 0 4.95 1.65 5.56 4.07l10.89-2.585C99.284 52.193 91.96 46.86 82.28 46.86c-10.23 0-18.15 6.6-18.15 16.5 0 9.405 6.105 13.97 10.23 17.215 3.795 2.97 6.105 4.675 6.105 7.128 0 2.42-1.87 4.51-4.95 4.51-3.3 0-5.775-1.925-6.6-4.73l-11.22 2.585c2.64 9.405 10.12 14.63 20.625 14.63 11.66 0 19.415-6.82 19.415-16.885.055-7.755-4.895-12.87-10.28-16.73zM37.95 72.82c0 10.56 7.04 18.04 17.05 18.04 6.105 0 11.22-2.915 13.75-7.48l-9.9-4.015c-1.32 2.31-3.355 3.685-6.215 3.685-3.3 0-5.445-2.2-5.445-5.335h23.1V66.22c0-10.45-6.82-18.04-16.335-18.04-10.065 0-16.005 7.425-16.005 17.05z"
    />
    <path fill="#4285F4" d="M43.395 63.635c.44-2.86 2.53-4.95 5.225-4.95s4.785 2.09 5.225 4.95z" />
  </svg>
);

export const IconAzure = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 128 128" {...props} className="w-16 h-16">
    <path fill="#0078D4" d="M0 0h128v128H0z" />
    <path
      fill="#fff"
      d="M74.83 23.16L40.91 88.33h19.53L94.36 23.16zm-5.01 4.58l34.92 65.17h-19.53L50.29 27.74zM24 100.91l16.92-30.86L24 43.1v57.81z"
    />
  </svg>
);

export const IconFirebase = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 128 128" {...props} className="w-14 h-14">
    <path fill="#FFCA28" d="M4.77 100.44L30.3 14.28 47.9 25.13z" />
    <path fill="#FFA000" d="M110.15 78.41l-17-57.76L47.9 25.13v81.1z" />
    <path fill="#F57C00" d="M4.77 100.44l43.13 5.89V25.13z" />
    <path fill="#039BE5" d="M123.23 60.5L97.55 52.8l-49.65 53.53z" />
  </svg>
);

export const IconDocker = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 128 128" {...props} className="w-16 h-16">
    <path fill="#2496ED" d="M0 0h128v128H0z" />
    <path
      fill="#fff"
      d="M109.91 57.53c-1.33-4.73-5.22-10.27-11.41-13.68-6.19-3.41-13.33-4.1-19.58-4.1h-54.4c-4.92 0-8.87 3.96-8.87 8.87v40.35c0 4.92 3.96 8.87 8.87 8.87h58.55c11.97 0 21.68-9.71 21.68-21.68 0-7.39-3.71-13.88-9.37-17.93z"
    />
    <path
      fill="#2496ED"
      d="M37.84 57.48h8.87v8.87h-8.87zm13.3 0h8.87v8.87h-8.87zm13.3 0h8.87v8.87H64.44zm13.3 0h8.87v8.87h-8.87z"
    />
  </svg>
);

export const IconKubernetes = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 128 128" {...props} className="w-16 h-16">
    <path fill="#326CE5" d="M0 0h128v128H0z" />
    <path
      fill="#fff"
      d="M105.94 64L76.8 93.13l-.06-58.26zm-83.88 0l29.14-29.13.06 58.26zM64 22.06L34.87 51.19h58.26zM64 105.94L93.13 76.8H34.87z"
    />
  </svg>
);

export const IconGit = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 128 128" {...props} className="w-16 h-16">
    <path fill="#F05033" d="M0 0h128v128H0z" />
    <path
      fill="#fff"
      d="M93.13 83.13L76.24 66.24v-9.98l16.89-16.89 8.24 8.24-11.53 11.53 11.53 11.53zM66.24 94.75H22v-8.24h38.88l19.53-19.53H47.56v-8.24h32.84L60.87 40.03H47.56v-8.24h18.68l11.53-11.53 8.24 8.24L74.48 39.97l26.89 26.89-8.24 8.24-11.53-11.53-15.36 15.36v15.82z"
    />
  </svg>
);

export const IconFigma = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 128 128" {...props} className="w-14 h-14">
    <path fill="#F24E1E" d="M42.67 128h42.66V85.33H42.67z" />
    <path fill="#FF7262" d="M0 85.33h42.67V128H0z" />
    <path fill="#A259FF" d="M0 42.67h42.67v42.66H0z" />
    <path fill="#1ABCFE" d="M0 0h42.67v42.67H0z" />
    <path fill="#0ACF83" d="M42.67 0h42.66v42.67H42.67z" />
    <circle fill="#0ACF83" cx="64" cy="64" r="21.33" />
  </svg>
);

export const IconTailwind = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 128 128" {...props} className="w-16 h-16">
    <path fill="#38BDF8" d="M0 0h128v128H0z" />
    <path
      fill="#fff"
      d="M64 22.06c-23.19 0-41.94 18.75-41.94 41.94s18.75 41.94 41.94 41.94c12.33 0 23.3-5.32 30.82-13.62-4.14 5.37-10.25 8.91-17.18 8.91-13.88 0-25.13-11.25-25.13-25.13s11.25-25.13 25.13-25.13c6.93 0 13.04 3.54 17.18 8.91-7.52-8.3-18.49-13.62-30.82-13.62zm41.94 41.94c0-13.88-11.25-25.13-25.13-25.13-6.93 0-13.04 3.54-17.18 8.91 4.14-5.37 10.25-8.91 17.18-8.91 13.88 0 25.13 11.25 25.13 25.13s-11.25 25.13-25.13 25.13c-6.93 0-13.04-3.54-17.18-8.91 4.14 5.37 10.25 8.91 17.18 8.91 13.88 0 25.13-11.25 25.13-25.13z"
    />
  </svg>
);

export const IconFacebook = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
  </svg>
);

export const IconInstagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.644-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98C15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" />
  </svg>
);

export const IconLinkedIn = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
);

export const IconX = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const IconYouTube = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
);


export const IconHumanResources = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);

export const IconSales = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.16"/></svg>
);

export const IconMarketing = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1Z"/><path d="M9 3H4a1 1 0 0 0-1 1v1"/><path d="m21 14-9-9"/><path d="M3 10v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2"/><path d="M9 15v1a1 1 0 0 0 1 1h2"/></svg>
);

export const IconBriefcase = (props: React.SVGProps<SVGSVGElement>) => (
 <Briefcase {...props} />
);

export const IconProcurement = (props: React.SVGProps<SVGSVGElement>) => (
 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M8 2v4"/><path d="M16 2v4"/><path d="M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8"/><path d="M3 10h18"/><path d="m22 22-5-5"/><path d="m17 22 5-5"/></svg>
);

export const IconDevelopment = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
);

export const IconHealthcare = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 10.5v3m-3-1.5h6"/><path d="M22 12c0 5.5-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2s10 4.5 10 10z"/></svg>
);

export const IconItOperations = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="4" y="8" width="16" height="12" rx="2"/><path d="M8 12h.01"/><path d="M12 12h.01"/><path d="M16 12h.01"/><path d="M16 8V6a2 2 0 0 0-2-2H10a2 2 0 0 0-2 2v2"/></svg>
);

export const IconRealEstate = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
);

export const IconAdminOps = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M10 16.5 8 21h8l-2-4.5"/><path d="M12 2v10.5"/><path d="M12 12.5a2.5 2.5 0 0 1-2.5-2.5V4a2.5 2.5 0 0 1 5 0v6a2.5 2.5 0 0 1-2.5 2.5Z"/><path d="M8.5 12.5a2.5 2.5 0 0 1-2.5-2.5V6a2.5 2.5 0 0 1 5 0v4a2.5 2.5 0 0 1-2.5 2.5Z"/><path d="M15.5 12.5a2.5 2.5 0 0 1-2.5-2.5V6a2.5 2.5 0 0 1 5 0v4a2.5 2.5 0 0 1-2.5 2.5Z"/></svg>
);

export const IconSupport = (props: React.SVGProps<SVGSVGElement>) => (
 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
);

export const IconGeneral = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><rect width="10" height="10" x="7" y="7" rx="1"/></svg>
);
