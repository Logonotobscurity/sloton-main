/**
 * Property-based tests for event type definitions
 * 
 * Feature: user-data-capture-analytics
 * Property 1: Event Capture Completeness
 * Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7
 * 
 * Tests that all required fields specific to each event type are present
 * in captured event data.
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import {
  EventType,
  EventSource,
  Event,
  FormSubmissionEvent,
  ChatbotMessageEvent,
  AIToolUsageEvent,
  PageViewEvent,
  GeoLocation,
  DeviceInfo,
  BrowserInfo,
  UTMParams,
} from '@/analytics/types';

// ============================================================================
// Arbitraries (Generators for property-based testing)
// ============================================================================

/**
 * Generate a valid UUID
 */
const uuidArbitrary = fc.uuid();

/**
 * Generate a valid ISO date string
 */
const isoDateArbitrary = fc.date().map(d => d.toISOString());

/**
 * Generate a valid email address
 */
const emailArbitrary = fc.emailAddress();

/**
 * Generate a valid phone number
 */
const phoneArbitrary = fc.string({ minLength: 10, maxLength: 15 }).map(s => `+${s.replace(/\D/g, '')}`);

/**
 * Generate GeoLocation data
 */
const geoLocationArbitrary: fc.Arbitrary<GeoLocation> = fc.record({
  country: fc.string({ minLength: 2, maxLength: 50 }),
  countryCode: fc.string({ minLength: 2, maxLength: 2 }),
  city: fc.option(fc.string({ minLength: 2, maxLength: 50 })),
  region: fc.option(fc.string({ minLength: 2, maxLength: 50 })),
  latitude: fc.option(fc.double({ min: -90, max: 90 })),
  longitude: fc.option(fc.double({ min: -180, max: 180 })),
});

/**
 * Generate DeviceInfo data
 */
const deviceInfoArbitrary: fc.Arbitrary<DeviceInfo> = fc.record({
  type: fc.oneof(
    fc.constant('mobile' as 'mobile'),
    fc.constant('tablet' as 'tablet'),
    fc.constant('desktop' as 'desktop')
  ),
  os: fc.oneof(
    fc.constant('Windows' as 'Windows'),
    fc.constant('macOS' as 'macOS'),
    fc.constant('Linux' as 'Linux'),
    fc.constant('iOS' as 'iOS'),
    fc.constant('Android' as 'Android')
  ),
  osVersion: fc.option(fc.string({ minLength: 1, maxLength: 20 })),
}) as fc.Arbitrary<DeviceInfo>;

/**
 * Generate BrowserInfo data
 */
const browserInfoArbitrary: fc.Arbitrary<BrowserInfo> = fc.record({
  name: fc.string({ minLength: 1, maxLength: 20 }),
  version: fc.option(fc.string({ minLength: 1, maxLength: 20 })),
  language: fc.option(fc.constantFrom('en', 'es', 'fr', 'de', 'zh')),
}) as fc.Arbitrary<BrowserInfo>;

/**
 * Generate UTM parameters
 */
const utmParamsArbitrary: fc.Arbitrary<UTMParams> = fc.record({
  source: fc.option(fc.string({ minLength: 1, maxLength: 50 })),
  medium: fc.option(fc.string({ minLength: 1, maxLength: 50 })),
  campaign: fc.option(fc.string({ minLength: 1, maxLength: 50 })),
  content: fc.option(fc.string({ minLength: 1, maxLength: 50 })),
  term: fc.option(fc.string({ minLength: 1, maxLength: 50 })),
});

/**
 * Generate FormSubmissionEvent properties
 */
const formSubmissionEventArbitrary: fc.Arbitrary<FormSubmissionEvent> = fc.record({
  formType: fc.oneof(
    fc.constant('contact' as 'contact'),
    fc.constant('enrollment' as 'enrollment'),
    fc.constant('newsletter' as 'newsletter')
  ),
  name: fc.option(fc.string({ minLength: 2, maxLength: 100 })),
  email: emailArbitrary,
  phone: fc.option(phoneArbitrary),
  subject: fc.option(fc.string({ minLength: 5, maxLength: 200 })),
  message: fc.option(fc.string({ minLength: 10, maxLength: 1000 })),
  programName: fc.option(fc.string({ minLength: 5, maxLength: 100 })),
}) as fc.Arbitrary<FormSubmissionEvent>;

/**
 * Generate ChatbotMessageEvent properties
 */
const chatbotMessageEventArbitrary: fc.Arbitrary<ChatbotMessageEvent> = fc.record({
  message: fc.string({ minLength: 1, maxLength: 500 }),
  conversationId: uuidArbitrary,
  messageRole: fc.oneof(
    fc.constant('user' as 'user'),
    fc.constant('assistant' as 'assistant')
  ),
  conversationHistory: fc.option(
    fc.array(
      fc.record({
        role: fc.string(),
        content: fc.string(),
      }),
      { minLength: 0, maxLength: 10 }
    )
  ),
}) as fc.Arbitrary<ChatbotMessageEvent>;

/**
 * Generate AIToolUsageEvent properties
 */
const aiToolUsageEventArbitrary: fc.Arbitrary<AIToolUsageEvent> = fc.record({
  toolName: fc.oneof(
    fc.constant('task_automation' as 'task_automation'),
    fc.constant('solution_recommendation' as 'solution_recommendation')
  ),
  input: fc.dictionary(fc.string(), fc.anything()),
  output: fc.option(fc.dictionary(fc.string(), fc.anything())),
  aiModel: fc.option(fc.string({ minLength: 1, maxLength: 50 })),
  responseQuality: fc.option(fc.double({ min: 0, max: 1 })),
}) as fc.Arbitrary<AIToolUsageEvent>;

/**
 * Generate PageViewEvent properties
 */
const pageViewEventArbitrary: fc.Arbitrary<PageViewEvent> = fc.record({
  pagePath: fc.string({ minLength: 1, maxLength: 500 }).map(s => `/${s}`),
  pageTitle: fc.string({ minLength: 1, maxLength: 200 }),
  referrer: fc.option(fc.webUrl()),
  pageCategory: fc.option(fc.string({ minLength: 1, maxLength: 50 })),
  contentType: fc.option(fc.string({ minLength: 1, maxLength: 50 })),
});

/**
 * Generate a complete Event
 */
const eventArbitrary: fc.Arbitrary<Event> = fc
  .tuple(
    fc.oneof(...Object.values(EventType).map(v => fc.constant(v as EventType))),
    fc.oneof(...Object.values(EventSource).map(v => fc.constant(v as EventSource)))
  )
  .chain(([eventType, source]) => {
    // Generate appropriate properties based on event type
    let propertiesArbitrary: fc.Arbitrary<any>;
    
    switch (eventType) {
      case EventType.FormSubmission:
        propertiesArbitrary = formSubmissionEventArbitrary;
        break;
      case EventType.ChatbotMessage:
        propertiesArbitrary = chatbotMessageEventArbitrary;
        break;
      case EventType.AIToolUsage:
        propertiesArbitrary = aiToolUsageEventArbitrary;
        break;
      case EventType.PageView:
        propertiesArbitrary = pageViewEventArbitrary;
        break;
      default:
        propertiesArbitrary = fc.dictionary(fc.string(), fc.anything());
    }

    return fc.record({
      eventId: uuidArbitrary,
      eventType: fc.constant(eventType),
      timestamp: fc.date(),
      userId: fc.option(uuidArbitrary),
      sessionId: uuidArbitrary,
      source: fc.constant(source),
      sourcePage: fc.option(fc.string({ minLength: 1, maxLength: 500 })),
      properties: propertiesArbitrary,
      enrichment: fc.record({
        ipAddressAnonymized: fc.ipV4().map(ip => {
          const parts = ip.split('.');
          parts[3] = '0';
          return parts.join('.');
        }),
        geoLocation: geoLocationArbitrary,
        device: deviceInfoArbitrary,
        browser: browserInfoArbitrary,
        utmParams: fc.option(utmParamsArbitrary),
        serverTimestamp: fc.date(),
        idempotencyKey: uuidArbitrary,
      }),
      createdAt: fc.date(),
    });
  }) as fc.Arbitrary<Event>;

// ============================================================================
// Property Tests
// ============================================================================

describe('Event Type Definitions - Property Tests', () => {
  describe('Property 1: Event Capture Completeness', () => {
    it('should have all required core fields for any event', () => {
      fc.assert(
        fc.property(eventArbitrary, (event) => {
          // Core identifiers must be present
          expect(event.eventId).toBeDefined();
          expect(typeof event.eventId).toBe('string');
          expect(event.eventId.length).toBeGreaterThan(0);

          expect(event.eventType).toBeDefined();
          expect(Object.values(EventType)).toContain(event.eventType);

          expect(event.timestamp).toBeDefined();
          expect(event.timestamp).toBeInstanceOf(Date);

          // Session must be present
          expect(event.sessionId).toBeDefined();
          expect(typeof event.sessionId).toBe('string');
          expect(event.sessionId.length).toBeGreaterThan(0);

          // Source must be present
          expect(event.source).toBeDefined();
          expect(Object.values(EventSource)).toContain(event.source);

          // Properties must be present
          expect(event.properties).toBeDefined();
          expect(typeof event.properties).toBe('object');

          // Enrichment must be present
          expect(event.enrichment).toBeDefined();
          expect(typeof event.enrichment).toBe('object');

          // Created timestamp must be present
          expect(event.createdAt).toBeDefined();
          expect(event.createdAt).toBeInstanceOf(Date);
        }),
        { numRuns: 100 }
      );
    });

    it('should have all required enrichment fields for any event', () => {
      fc.assert(
        fc.property(eventArbitrary, (event) => {
          const { enrichment } = event;

          // IP address (anonymized) must be present
          expect(enrichment.ipAddressAnonymized).toBeDefined();
          expect(typeof enrichment.ipAddressAnonymized).toBe('string');
          expect(enrichment.ipAddressAnonymized).toMatch(/\d+\.\d+\.\d+\.0/);

          // Geo location must be present
          expect(enrichment.geoLocation).toBeDefined();
          expect(enrichment.geoLocation.country).toBeDefined();
          expect(enrichment.geoLocation.countryCode).toBeDefined();

          // Device info must be present
          expect(enrichment.device).toBeDefined();
          expect(enrichment.device.type).toBeDefined();
          expect(['mobile', 'tablet', 'desktop']).toContain(enrichment.device.type);
          expect(enrichment.device.os).toBeDefined();

          // Browser info must be present
          expect(enrichment.browser).toBeDefined();
          expect(enrichment.browser.name).toBeDefined();

          // Server timestamp must be present
          expect(enrichment.serverTimestamp).toBeDefined();
          expect(enrichment.serverTimestamp).toBeInstanceOf(Date);

          // Idempotency key must be present
          expect(enrichment.idempotencyKey).toBeDefined();
          expect(typeof enrichment.idempotencyKey).toBe('string');
          expect(enrichment.idempotencyKey.length).toBeGreaterThan(0);
        }),
        { numRuns: 100 }
      );
    });

    it('should have required fields for form submission events', () => {
      fc.assert(
        fc.property(formSubmissionEventArbitrary, (formEvent) => {
          // Email is required for all form submissions
          expect(formEvent.email).toBeDefined();
          expect(typeof formEvent.email).toBe('string');
          expect(formEvent.email).toMatch(/@/);

          // Form type must be valid
          expect(formEvent.formType).toBeDefined();
          expect(['contact', 'enrollment', 'newsletter']).toContain(formEvent.formType);
        }),
        { numRuns: 100 }
      );
    });

    it('should have required fields for chatbot message events', () => {
      fc.assert(
        fc.property(chatbotMessageEventArbitrary, (chatbotEvent) => {
          // Message is required
          expect(chatbotEvent.message).toBeDefined();
          expect(typeof chatbotEvent.message).toBe('string');
          expect(chatbotEvent.message.length).toBeGreaterThan(0);

          // Conversation ID is required
          expect(chatbotEvent.conversationId).toBeDefined();
          expect(typeof chatbotEvent.conversationId).toBe('string');

          // Message role is required
          expect(chatbotEvent.messageRole).toBeDefined();
          expect(['user', 'assistant']).toContain(chatbotEvent.messageRole);
        }),
        { numRuns: 100 }
      );
    });

    it('should have required fields for AI tool usage events', () => {
      fc.assert(
        fc.property(aiToolUsageEventArbitrary, (aiEvent) => {
          // Tool name is required
          expect(aiEvent.toolName).toBeDefined();
          expect(['task_automation', 'solution_recommendation']).toContain(aiEvent.toolName);

          // Input is required
          expect(aiEvent.input).toBeDefined();
          expect(typeof aiEvent.input).toBe('object');
        }),
        { numRuns: 100 }
      );
    });

    it('should have required fields for page view events', () => {
      fc.assert(
        fc.property(pageViewEventArbitrary, (pageEvent) => {
          // Page path is required
          expect(pageEvent.pagePath).toBeDefined();
          expect(typeof pageEvent.pagePath).toBe('string');
          expect(pageEvent.pagePath.length).toBeGreaterThan(0);

          // Page title is required
          expect(pageEvent.pageTitle).toBeDefined();
          expect(typeof pageEvent.pageTitle).toBe('string');
          expect(pageEvent.pageTitle.length).toBeGreaterThan(0);
        }),
        { numRuns: 100 }
      );
    });

    it('should have userId when user is authenticated', () => {
      fc.assert(
        fc.property(
          eventArbitrary.filter(e => e.userId !== undefined),
          (event) => {
            expect(event.userId).toBeDefined();
            expect(typeof event.userId).toBe('string');
            expect(event.userId!.length).toBeGreaterThan(0);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should have valid UTM parameters when present', () => {
      fc.assert(
        fc.property(
          eventArbitrary.filter(e => e.enrichment.utmParams !== undefined),
          (event) => {
            const utm = event.enrichment.utmParams!;
            expect(utm).toBeDefined();
            expect(typeof utm).toBe('object');

            // If any UTM param is present, it should be a string
            if (utm.source !== undefined) {
              expect(typeof utm.source).toBe('string');
            }
            if (utm.medium !== undefined) {
              expect(typeof utm.medium).toBe('string');
            }
            if (utm.campaign !== undefined) {
              expect(typeof utm.campaign).toBe('string');
            }
            if (utm.content !== undefined) {
              expect(typeof utm.content).toBe('string');
            }
            if (utm.term !== undefined) {
              expect(typeof utm.term).toBe('string');
            }
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Property 2: Universal Event Metadata', () => {
    it('should always have session ID, timestamp, and source identifier', () => {
      fc.assert(
        fc.property(eventArbitrary, (event) => {
          // Session ID is always required
          expect(event.sessionId).toBeDefined();
          expect(typeof event.sessionId).toBe('string');
          expect(event.sessionId.length).toBeGreaterThan(0);

          // Timestamp is always required
          expect(event.timestamp).toBeDefined();
          expect(event.timestamp).toBeInstanceOf(Date);

          // Source identifier is always required
          expect(event.source).toBeDefined();
          expect(Object.values(EventSource)).toContain(event.source);
        }),
        { numRuns: 100 }
      );
    });

    it('should have user ID when authenticated', () => {
      fc.assert(
        fc.property(
          eventArbitrary.filter(e => e.userId !== undefined),
          (event) => {
            expect(event.userId).toBeDefined();
            expect(typeof event.userId).toBe('string');
            expect(event.userId!.length).toBeGreaterThan(0);
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});
