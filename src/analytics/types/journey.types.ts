/**
 * User journey types for the User Data Capture & Analytics System
 * 
 * These types define the structure of user journeys that track
 * sequences of user interactions through the platform.
 */

import { EventType } from './event.types';

/**
 * Journey event (simplified event for journey tracking)
 */
export interface JourneyEvent {
  eventId: string;
  eventType: EventType;
  timestamp: Date;
  pagePath?: string;
  properties: Record<string, any>;
  sequenceNumber: number; // order in journey
}

/**
 * Conversion event within a journey
 */
export interface ConversionEvent {
  eventType: EventType;
  timestamp: Date;
  value?: number;
}

/**
 * Complete user journey structure
 */
export interface UserJourney {
  // Core identifiers
  id: string; // UUID
  sessionId: string;
  userId?: string;
  
  // Journey data
  events: JourneyEvent[];
  entryPoint: string; // first page/source
  exitPoint?: string; // last page/source
  duration?: number; // milliseconds
  
  // Analysis
  conversions: ConversionEvent[];
  dropOffPoint?: string;
  pattern?: string; // journey pattern identifier
  
  // Timestamps
  startedAt: Date;
  endedAt?: Date;
  createdAt: Date;
}

/**
 * Journey pattern (for grouping similar journeys)
 */
export interface JourneyPattern {
  id: string;
  patternName: string;
  eventSequence: EventType[];
  journeyCount: number;
  averageDuration: number;
  conversionRate: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Journey query parameters
 */
export interface JourneyQueryParams {
  userId?: string;
  sessionId?: string;
  pattern?: string;
  hasConversion?: boolean;
  minDuration?: number;
  maxDuration?: number;
  startDate?: string;
  endDate?: string;
  limit?: number;
  offset?: number;
}

/**
 * Journey query result
 */
export interface JourneyQueryResult {
  journeys: UserJourney[];
  total: number;
  limit: number;
  offset: number;
}

/**
 * Journey analysis result
 */
export interface JourneyAnalysis {
  totalJourneys: number;
  averageDuration: number;
  conversionRate: number;
  topEntryPoints: Array<{ entryPoint: string; count: number }>;
  topExitPoints: Array<{ exitPoint: string; count: number }>;
  topDropOffPoints: Array<{ dropOffPoint: string; count: number }>;
  commonPatterns: JourneyPattern[];
}
