type LogLevel = "debug" | "info" | "warn" | "error";

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, unknown>;
}

export interface LoggerConfig {
  maxQueueSize: number;
  endpoint: string;
  flushInterval: number;
  isDevelopment: boolean;
}

const DEFAULT_CONFIG: LoggerConfig = {
  maxQueueSize: 100,
  endpoint: "/api/logs",
  flushInterval: 30000,
  isDevelopment: process.env.NODE_ENV === "development",
};

function asRecord(value: unknown): Record<string, unknown> | undefined {
  if (!value || typeof value !== "object") return undefined;
  try {
    return JSON.parse(JSON.stringify(value)) as Record<string, unknown>;
  } catch {
    return { note: "Context was not serializable" };
  }
}

export class Logger {
  private static instance: Logger;
  private logQueue: LogEntry[] = [];
  private flushIntervalId?: ReturnType<typeof setInterval>;
  private config: LoggerConfig = DEFAULT_CONFIG;

  private constructor() {
    this.logQueue = [];
    if (typeof window !== "undefined") {
      window.addEventListener("beforeunload", () => {
        void this.flush();
      });
      this.flushIntervalId = setInterval(() => {
        void this.flush();
      }, this.config.flushInterval);
    }
  }

  public configure(config: Partial<LoggerConfig>): void {
    this.config = { ...this.config, ...config };
    if (config.flushInterval && this.flushIntervalId && typeof window !== "undefined") {
      clearInterval(this.flushIntervalId);
      this.flushIntervalId = setInterval(() => {
        void this.flush();
      }, this.config.flushInterval);
    }
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    if (!Array.isArray(Logger.instance.logQueue)) {
      Logger.instance.logQueue = [];
    }
    return Logger.instance;
  }

  private createLogEntry(level: LogLevel, message: string, context?: Record<string, unknown>): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      context: {
        url: typeof window !== "undefined" ? window.location.href : undefined,
        userAgent: typeof window !== "undefined" ? window.navigator.userAgent : undefined,
        ...context,
      },
    };
  }

  private async flush(): Promise<void> {
    if (!Array.isArray(this.logQueue) || this.logQueue.length === 0) return;
    const logs = this.logQueue.slice();
    this.logQueue = [];
    try {
      await fetch(this.config.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ logs }),
      });
    } catch (error) {
      console.error("Failed to flush logs:", error);
    }
  }

  private addLog(level: LogLevel, message: string, context?: Record<string, unknown>): void {
    try {
      if (!Array.isArray(this.logQueue)) this.logQueue = [];
      const safeMessage = typeof message === "string" ? message : String(message ?? "");
      const entry = this.createLogEntry(level, safeMessage, asRecord(context));
      this.logQueue.push(entry);
      if (this.config.isDevelopment) {
        console.error(safeMessage, context ?? "");
      }
    } catch (error) {
      console.error(message, context, error);
    }
  }

  public debug(message: string, context?: Record<string, unknown>): void {
    this.addLog("debug", message, context);
  }

  public info(message: string, context?: Record<string, unknown>): void {
    this.addLog("info", message, context);
  }

  public warn(message: string, context?: Record<string, unknown>): void {
    this.addLog("warn", message, context);
  }

  public error(message: string, context?: Record<string, unknown>): void {
    this.addLog("error", message, context);
  }
}

export const logger = Logger.getInstance();
