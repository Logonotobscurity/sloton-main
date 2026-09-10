import { NextResponse } from 'next/server';
import type { LogEntry } from '@/lib/logger';
import { handleError, createErrorResponse, createSuccessResponse, ErrorCode } from '@/lib/error-handler';

const MAX_BATCH = 50;
const MAX_MESSAGE = 2000;
const MAX_STORED = 500;
const MAX_BODY_BYTES = 64_000;

let logs: LogEntry[] = [];

function authorize(request: Request): boolean {
  const secret = process.env.LOGS_INGEST_SECRET;
  if (process.env.NODE_ENV !== 'development') {
    if (!secret) return false;
  }
  if (!secret) return true;
  const header = request.headers.get('authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  return token === secret;
}

export async function POST(request: Request) {
  try {
    if (!authorize(request)) {
      const errorResponse = createErrorResponse('Unauthorized', ErrorCode.UNAUTHORIZED);
      return NextResponse.json(errorResponse, { status: 401 });
    }

    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      const errorResponse = createErrorResponse('Payload too large', ErrorCode.VALIDATION_ERROR);
      return NextResponse.json(errorResponse, { status: 413 });
    }

    const body = JSON.parse(raw) as { logs?: unknown };
    const newLogs = body.logs;

    if (!Array.isArray(newLogs) || newLogs.length === 0 || newLogs.length > MAX_BATCH) {
      const errorResponse = createErrorResponse(
        'Invalid logs format - expected a non-empty array',
        ErrorCode.VALIDATION_ERROR
      );
      return NextResponse.json(errorResponse, { status: 400 });
    }

    const sanitized: LogEntry[] = newLogs.slice(0, MAX_BATCH).map((entry) => {
      const e = entry as Partial<LogEntry>;
      return {
        timestamp: typeof e.timestamp === 'string' ? e.timestamp.slice(0, 40) : new Date().toISOString(),
        level: (['debug', 'info', 'warn', 'error'] as const).includes(e.level as LogEntry['level'])
          ? (e.level as LogEntry['level'])
          : 'info',
        message: String(e.message ?? '').slice(0, MAX_MESSAGE),
        context: undefined,
      };
    });

    logs = [...logs, ...sanitized].slice(-MAX_STORED);

    return NextResponse.json(createSuccessResponse({ count: sanitized.length }));
  } catch (error) {
    const errorResponse = handleError(error, 'API.logs.POST', { logLevel: 'error' });
    return NextResponse.json(errorResponse, { status: 500 });
  }
}
