type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, any>;
}

// Logger configuration interface
export interface LoggerConfig {
  maxQueueSize: number;
  endpoint: string;
  flushInterval: number;
  isDevelopment: boolean;
}

// Default configuration - completely independent of config system to avoid circular dependencies
const DEFAULT_CONFIG: LoggerConfig = {
  maxQueueSize: 100,
  endpoint: '/api/logs',
  flushInterval: 30000, // 30 seconds
  isDevelopment: process.env.NODE_ENV === 'development'
};

export class Logger {
  private static instance: Logger;
  private logQueue: LogEntry[] = [];
  private flushIntervalId?: NodeJS.Timeout;
  private config: LoggerConfig = DEFAULT_CONFIG;

  private constructor() {
    if (typeof window !== 'undefined') {
      // Flush logs when the user leaves the page
      window.addEventListener('beforeunload', () => this.flush());
      
      // Periodically flush logs
      this.flushIntervalId = setInterval(() => this.flush(), this.config.flushInterval);
    }
  }

  /**
   * Configure the logger (optional - uses defaults if not called)
   * Call this after config system is initialized to override defaults
   */
  public configure(config: Partial<LoggerConfig>): void {
    this.config = { ...this.config, ...config };
    
    // Restart flush interval if it changed
    if (config.flushInterval && this.flushIntervalId && typeof window !== 'undefined') {
      clearInterval(this.flushIntervalId);
      this.flushIntervalId = setInterval(() => this.flush(), this.config.flushInterval);
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

      await fetch(this.config.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ logs }),
      });
    } catch (error) {
      console.error('Failed to flush logs:', error);
      // Re-add failed logs to the queue
      this.logQueue = [...this.logQueue, ...this.logQueue.slice(0, this.config.maxQueueSize)];
    }
  }

  private addLog(level: LogLevel, message: string, context?: Record<string, any>): void {
    const entry = this.createLogEntry(level, message, context);
    
    // Add to queue
    this.logQueue.push(entry);

    // Keep queue size in check
    if (this.logQueue.length >= this.config.maxQueueSize) {
      this.flush();
    }

    // Also log to console in development
    if (this.config.isDevelopment) {
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