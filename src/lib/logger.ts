import { getConfig } from '@/config';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, any>;
}

export class Logger {
  private static instance: Logger;
  private logQueue: LogEntry[] = [];
  private readonly maxQueueSize: number;
  private readonly logEndpoint: string;
  private readonly flushInterval: number;

  private constructor() {
    const config = getConfig().logging;
    this.maxQueueSize = config.maxQueueSize;
    this.logEndpoint = config.endpoint;
    this.flushInterval = config.flushInterval;

    if (typeof window !== 'undefined') {
      // Flush logs when the user leaves the page
      window.addEventListener('beforeunload', () => this.flush());
      
      // Periodically flush logs
      setInterval(() => this.flush(), this.flushInterval);
    }
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private createLogEntry(level: LogLevel, message: string, context?: Record<string, any>): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      context: {
        url: typeof window !== 'undefined' ? window.location.href : undefined,
        userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
        ...context,
      },
    };
  }

  private async flush(): Promise<void> {
    if (this.logQueue.length === 0) return;

    try {
      const logs = [...this.logQueue];
      this.logQueue = [];

      await fetch(this.logEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ logs }),
      });
    } catch (error) {
      console.error('Failed to flush logs:', error);
      // Re-add failed logs to the queue
      this.logQueue = [...this.logQueue, ...this.logQueue.slice(0, this.maxQueueSize)];
    }
  }

  private addLog(level: LogLevel, message: string, context?: Record<string, any>): void {
    const entry = this.createLogEntry(level, message, context);
    
    // Add to queue
    this.logQueue.push(entry);

    // Keep queue size in check
    if (this.logQueue.length >= this.maxQueueSize) {
      this.flush();
    }

    // Also log to console in development
    if (getConfig().isDevelopment) {
      console[level](message, context);
    }
  }

  public debug(message: string, context?: Record<string, any>): void {
    this.addLog('debug', message, context);
  }

  public info(message: string, context?: Record<string, any>): void {
    this.addLog('info', message, context);
  }

  public warn(message: string, context?: Record<string, any>): void {
    this.addLog('warn', message, context);
  }

  public error(message: string, context?: Record<string, any>): void {
    this.addLog('error', message, context);
  }
}

// Create a singleton instance
export const logger = Logger.getInstance();