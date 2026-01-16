/**
 * Test Utilities
 * Common utilities and helpers for testing React components
 */

import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

/**
 * Custom render function that wraps components with necessary providers
 */
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  // Add any provider options here
}

function customRender(
  ui: ReactElement,
  options?: CustomRenderOptions
) {
  const AllProviders = ({ children }: { children: React.ReactNode }) => {
    return (
      // Add providers here as needed (ThemeProvider, etc.)
      <>{children}</>
    );
  };

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: AllProviders, ...options }),
  };
}

// Re-export everything from testing-library
export * from '@testing-library/react';

// Override render with custom render
export { customRender as render };

/**
 * Helper to wait for async operations
 */
export const waitForAsync = () => new Promise((resolve) => setTimeout(resolve, 0));

/**
 * Helper to create mock functions with type safety
 */
export const createMockFn = <T extends (...args: unknown[]) => unknown>() => {
  return vi.fn() as unknown as T;
};

/**
 * Helper to mock fetch responses
 */
export const mockFetch = (response: unknown, status = 200) => {
  global.fetch = vi.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(response),
    text: () => Promise.resolve(JSON.stringify(response)),
  });
};

/**
 * Helper to mock fetch errors
 */
export const mockFetchError = (error: Error) => {
  global.fetch = vi.fn().mockRejectedValue(error);
};

/**
 * Helper to reset all mocks
 */
export const resetAllMocks = () => {
  vi.clearAllMocks();
  vi.resetAllMocks();
};
