/**
 * Analytics types for the User Data Capture & Analytics System
 * 
 * These types define the structure of analytics metrics and aggregations.
 */

/**
 * Time period for analytics
 */
export interface TimePeriod {
  type: 'hour' | 'day' | 'week' | 'month';
  value: string; // ISO date string
}

/**
 * Active users metric
 */
export interface ActiveUsersMetric {
  period: TimePeriod;
  dailyActiveUsers: number;
  weeklyActiveUsers: number;
  monthlyActiveUsers: number;
  timestamp: Date;
}

/**
 * Conversion rate metric
 */
export interface ConversionRateMetric {
  touchpoint: string;
  totalVisitors: number;
  conversions: number;
  conversionRate: number; // percentage
  period: TimePeriod;
}

/**
 * Content popularity metric
 */
export interface ContentPopularityMetric {
  contentId: string;
  contentTitle: string;
  contentType: string;
  viewCount: number;
  uniqueVisitors: number;
  averageTimeSpent: number; // seconds
  period: TimePeriod;
}

/**
 * User segmentation criteria
 */
export interface SegmentationCriteria {
  minEngagementScore?: number;
  maxEngagementScore?: number;
  interests?: string[];
  industry?: string;
  eventTypes?: string[];
  minInteractions?: number;
  maxInteractions?: number;
}

/**
 * User segment
 */
export interface UserSegment {
  name: string;
  criteria: SegmentationCriteria;
  userCount: number;
  averageEngagement: number;
  topInterests: string[];
}

/**
 * Session metrics
 */
export interface SessionMetrics {
  period: TimePeriod;
  totalSessions: number;
  averageSessionDuration: number; // seconds
  averagePagesPerSession: number;
  bounceRate: number; // percentage
}

/**
 * Trending topic
 */
export interface TrendingTopic {
  topic: string;
  mentionCount: number;
  growthRate: number; // percentage change from previous period
  period: TimePeriod;
}

/**
 * Lead quality metric
 */
export interface LeadQualityMetric {
  userId: string;
  email?: string;
  leadQualityScore: number; // 0-100
  engagementDepth: number; // number of different event types
  expressedNeeds: string[]; // from form submissions and AI tool usage
  calculatedAt: Date;
}

/**
 * At-risk user
 */
export interface AtRiskUser {
  userId: string;
  email?: string;
  currentEngagementScore: number;
  previousEngagementScore: number;
  engagementDecline: number; // percentage
  lastInteractionDate: Date;
  daysInactive: number;
}

/**
 * Weekly report
 */
export interface WeeklyReport {
  weekStartDate: Date;
  weekEndDate: Date;
  activeUsers: ActiveUsersMetric;
  conversionRates: ConversionRateMetric[];
  popularContent: ContentPopularityMetric[];
  trendingTopics: TrendingTopic[];
  atRiskUsers: AtRiskUser[];
  userSegments: UserSegment[];
  generatedAt: Date;
}

/**
 * Analytics aggregation (generic container for pre-calculated metrics)
 */
export interface AnalyticsAggregation {
  id: string;
  metricType: string;
  period: TimePeriod;
  startDate: Date;
  endDate: Date;
  data: Record<string, any>;
  calculatedAt: Date;
  version: number; // for schema evolution
}

/**
 * Metrics query parameters
 */
export interface MetricsQueryParams {
  metricType: 'active-users' | 'conversion-rates' | 'session-metrics' | 'trending-topics' | 'popular-content';
  period: TimePeriod;
  groupBy?: string;
  startDate?: string;
  endDate?: string;
}

/**
 * Real-time metrics subscription
 */
export interface RealtimeMetricsSubscription {
  metrics: string[]; // which metrics to subscribe to
  updateInterval: number; // milliseconds
}

/**
 * Real-time metrics update
 */
export interface RealtimeMetricsUpdate {
  metric: string;
  value: any;
  timestamp: Date;
}
