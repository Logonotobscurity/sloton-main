/**
 * Industries Data Tests
 * Unit tests for industry features data
 */

import { describe, it, expect } from 'vitest';
import { industryFeatures, industryFeaturesAlt, IndustryFeature } from '../industries';

describe('industries data', () => {
  describe('industryFeatures', () => {
    it('should export an array of industry features', () => {
      expect(Array.isArray(industryFeatures)).toBe(true);
      expect(industryFeatures.length).toBeGreaterThan(0);
    });

    it('should have valid structure for each industry', () => {
      industryFeatures.forEach((industry: IndustryFeature) => {
        expect(industry).toHaveProperty('title');
        expect(industry).toHaveProperty('description');
        expect(industry).toHaveProperty('icon');
        expect(typeof industry.title).toBe('string');
        expect(typeof industry.description).toBe('string');
        expect(industry.title.length).toBeGreaterThan(0);
        expect(industry.description.length).toBeGreaterThan(0);
      });
    });

    it('should have unique industry titles', () => {
      const titles = industryFeatures.map((i: IndustryFeature) => i.title);
      const uniqueTitles = new Set(titles);
      expect(uniqueTitles.size).toBe(titles.length);
    });

    it('should have at least 5 industries', () => {
      expect(industryFeatures.length).toBeGreaterThanOrEqual(5);
    });
  });

  describe('industryFeaturesAlt', () => {
    it('should export an array of alternative industry features', () => {
      expect(Array.isArray(industryFeaturesAlt)).toBe(true);
      expect(industryFeaturesAlt.length).toBeGreaterThan(0);
    });

    it('should have valid structure for each industry', () => {
      industryFeaturesAlt.forEach((industry: IndustryFeature) => {
        expect(industry).toHaveProperty('title');
        expect(industry).toHaveProperty('description');
        expect(industry).toHaveProperty('icon');
        expect(typeof industry.title).toBe('string');
        expect(typeof industry.description).toBe('string');
      });
    });

    it('should have unique industry titles', () => {
      const titles = industryFeaturesAlt.map((i: IndustryFeature) => i.title);
      const uniqueTitles = new Set(titles);
      expect(uniqueTitles.size).toBe(titles.length);
    });
  });

  describe('data consistency', () => {
    it('should have same number of industries in both variants', () => {
      expect(industryFeatures.length).toBe(industryFeaturesAlt.length);
    });

    it('should have different content in alt variant', () => {
      // At least some titles should be different
      const mainTitles = new Set(industryFeatures.map((i: IndustryFeature) => i.title));
      const altTitles = industryFeaturesAlt.map((i: IndustryFeature) => i.title);
      
      const differentTitles = altTitles.filter((t) => !mainTitles.has(t));
      expect(differentTitles.length).toBeGreaterThan(0);
    });
  });
});
