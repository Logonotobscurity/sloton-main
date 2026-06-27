/**
 * Technologies Data Tests
 * Unit tests for technology stack data
 */

import { describe, it, expect } from 'vitest';
import { technologies, Technology } from '@/lib/data/technologies';

describe('technologies data', () => {
  it('should export an array of technologies', () => {
    expect(Array.isArray(technologies)).toBe(true);
    expect(technologies.length).toBeGreaterThan(0);
  });

  it('should have valid structure for each technology', () => {
    technologies.forEach((tech: Technology) => {
      expect(tech).toHaveProperty('name');
      expect(tech).toHaveProperty('icon');
      expect(typeof tech.name).toBe('string');
      expect(tech.name.length).toBeGreaterThan(0);
    });
  });

  it('should have unique technology names', () => {
    const names = technologies.map((t: Technology) => t.name);
    const uniqueNames = new Set(names);
    expect(uniqueNames.size).toBe(names.length);
  });

  it('should include common technologies', () => {
    const names = technologies.map((t: Technology) => t.name.toLowerCase());
    
    // Check for some expected technologies
    const expectedTechs = ['react', 'typescript', 'next.js', 'node.js'];
    expectedTechs.forEach((tech) => {
      const found = names.some((name) => name.includes(tech.toLowerCase()));
      expect(found).toBe(true);
    });
  });

  it('should have at least 10 technologies', () => {
    expect(technologies.length).toBeGreaterThanOrEqual(10);
  });
});
