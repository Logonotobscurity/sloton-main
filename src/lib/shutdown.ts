/**
 * Graceful Shutdown Handler
 * Handles SIGTERM and SIGINT signals for clean application shutdown
 */

import { logger } from '@/lib/logger';

type ShutdownHandler = () => Promise<void> | void;

class ShutdownManager {
  private static instance: ShutdownManager;
  private handlers: ShutdownHandler[] = [];
  private isShuttingDown = false;
  private shutdownTimeout = 30000; // 30 seconds

  private constructor() {
    this.setupSignalHandlers();
  }

  public static getInstance(): ShutdownManager {
    if (!ShutdownManager.instance) {
      ShutdownManager.instance = new ShutdownManager();
    }
    return ShutdownManager.instance;
  }

  /**
   * Register a cleanup handler to be called on shutdown
   */
  public registerHandler(handler: ShutdownHandler): void {
    this.handlers.push(handler);
  }

  /**
   * Set the shutdown timeout (default: 30 seconds)
   */
  public setShutdownTimeout(timeout: number): void {
    this.shutdownTimeout = timeout;
  }

  /**
   * Setup signal handlers for graceful shutdown
   */
  private setupSignalHandlers(): void {
    // Handle SIGTERM (e.g., from Kubernetes, Docker)
    process.on('SIGTERM', () => {
      logger.info('SIGTERM signal received: closing HTTP server');
      this.shutdown('SIGTERM');
    });

    // Handle SIGINT (e.g., Ctrl+C)
    process.on('SIGINT', () => {
      logger.info('SIGINT signal received: closing HTTP server');
      this.shutdown('SIGINT');
    });

    // Handle uncaught exceptions
    process.on('uncaughtException', (error: Error) => {
      logger.error('Uncaught exception', { error });
      this.shutdown('uncaughtException', 1);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (reason: unknown) => {
      logger.error('Unhandled rejection', { reason });
      this.shutdown('unhandledRejection', 1);
    });
  }

  /**
   * Execute graceful shutdown
   */
  private async shutdown(signal: string, exitCode: number = 0): Promise<void> {
    if (this.isShuttingDown) {
      logger.warn('Shutdown already in progress');
      return;
    }

    this.isShuttingDown = true;
    logger.info('Starting graceful shutdown', { signal });

    // Set a timeout to force exit if shutdown takes too long
    const forceExitTimer = setTimeout(() => {
      logger.error('Shutdown timeout exceeded, forcing exit');
      process.exit(1);
    }, this.shutdownTimeout);

    try {
      // Execute all registered handlers
      logger.info(`Executing ${this.handlers.length} shutdown handlers`);
      
      await Promise.all(
        this.handlers.map(async (handler, index) => {
          try {
            await handler();
            logger.debug(`Shutdown handler ${index + 1} completed`);
          } catch (error) {
            logger.error(`Shutdown handler ${index + 1} failed`, { error });
          }
        })
      );

      logger.info('All shutdown handlers completed successfully');
      
      // Clear the force exit timer
      clearTimeout(forceExitTimer);

      // Flush logs before exit
      await this.flushLogs();

      logger.info('Graceful shutdown complete', { exitCode });
      
      // Exit the process
      process.exit(exitCode);
    } catch (error) {
      logger.error('Error during shutdown', { error });
      clearTimeout(forceExitTimer);
      process.exit(1);
    }
  }

  /**
   * Flush any pending logs
   */
  private async flushLogs(): Promise<void> {
    try {
      // Give logger time to flush
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Failed to flush logs:', error);
    }
  }
}

/**
 * Get the shutdown manager instance
 */
export function getShutdownManager(): ShutdownManager {
  return ShutdownManager.getInstance();
}

/**
 * Register a cleanup handler
 */
export function onShutdown(handler: ShutdownHandler): void {
  getShutdownManager().registerHandler(handler);
}

/**
 * Initialize graceful shutdown handling
 */
export function initializeShutdownHandlers(): void {
  const manager = getShutdownManager();
  
  // Register common cleanup tasks
  onShutdown(async () => {
    logger.info('Cleaning up resources...');
    // Add any global cleanup here
  });

  logger.info('Graceful shutdown handlers initialized');
}

// Auto-initialize in Node.js environment
if (typeof process !== 'undefined' && process.versions?.node) {
  initializeShutdownHandlers();
}
