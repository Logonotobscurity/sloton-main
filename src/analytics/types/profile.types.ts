/**
 * User profile types for the User Data Capture & Analytics System
 * 
 * These types define the structure of user profiles that aggregate
 * user interactions and behavior over time.
 */

/**
 * User traits (demographic and firmographic information)
 */
export interface UserTraits {
  name?: string;
  email?: string;
  phone?: string;
  industry?: string;
  companySize?: string;
  role?: string;
  location?: string;
}

/**
 * Aggregated user metrics
 */
export interface UserMetrics {
  totalInteractions: number;
  totalSessions: number;
  totalPageViews: number;
  totalFormSubmissions: number;
  totalChatbotMessages: number;
  totalAIToolUsage: number;
  averageSessionDuration: number; // in seconds
  lastInteractionType: string;
}

/**
 * Consent preferences for privacy compliance
 */
export interface ConsentPreferences {
  userId: string;
  analytics: boolean;
  marketing: boolean;
  personalization: boolean;
  timestamp: Date;
}

/**
 * Consent purpose enum
 */
export enum ConsentPurpose {
  Analytics = 'analytics',
  Marketing = 'marketing',
  Personalization = 'personalization'
}

/**
 * Complete user profile structure
 */
export interface UserProfile {
  // Core identifiers
  id: string; // UUID
  userId?: string; // null for anonymous users
  email?: string;
  
  // User traits
  traits: UserTraits;
  
  // Aggregated metrics
  metrics: UserMetrics;
  
  // Derived insights
  interests: string[]; // extracted from interactions
  engagementScore: number; // 0-100
  leadQualityScore?: number; // 0-100
  segment?: string; // user segment identifier
  
  // Timestamps
  firstSeenAt: Date;
  lastSeenAt: Date;
  createdAt: Date;
  updatedAt: Date;
  
  // Privacy
  consentPreferences: ConsentPreferences;
}

/**
 * Profile history record for tracking changes
 */
export interface ProfileHistoryRecord {
  id: string;
  profileId: string;
  changes: Partial<UserProfile>;
  changedAt: Date;
  changedBy?: string; // system or user ID
}

/**
 * Profile update input
 */
export type ProfileUpdate = Partial<Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt'>>;

/**
 * Profile query parameters
 */
export interface ProfileQueryParams {
  email?: string;
  industry?: string;
  minEngagementScore?: number;
  interests?: string[];
  segment?: string;
  limit?: number;
  offset?: number;
}

/**
 * Profile query result
 */
export interface ProfileQueryResult {
  profiles: UserProfile[];
  total: number;
  limit: number;
  offset: number;
}
