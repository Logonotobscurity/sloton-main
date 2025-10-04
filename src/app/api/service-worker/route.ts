/**
 * Dynamic Service Worker API
 * Serves a service worker with centralized configuration
 */

import { NextResponse } from 'next/server';
import { generateServiceWorkerScript } from '@/lib/service-worker-config';

export async function GET() {
  try {
    const serviceWorkerScript = generateServiceWorkerScript();
    
    return new NextResponse(serviceWorkerScript, {
      status: 200,
      headers: {
        'Content-Type': 'application/javascript',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    console.error('Failed to generate service worker:', error);
    return NextResponse.json(
      { error: 'Failed to generate service worker' },
      { status: 500 }
    );
  }
}