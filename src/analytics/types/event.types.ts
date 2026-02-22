/**
 * Core event types for the User Data Capture & Analytics System
 * 
 * These types define the structure of events captured from user interactions
 * across the platform.
 */

/**
 * Event types that can be captured
 */
export enum EventType {
  PageView = 'page_view',
  FormSubmission = 'form_submission',
  ChatbotMessage = 'chatbot_message',
  AIToolUsage = 'ai_tool_usage',
  NewsletterSignup = 'newsletter_signup',
  ButtonClick = 'button_click',
  FileDownload = 'file_download'
}

/**
 * Sources from which events can originate
 */
export enum EventSource {
  ContactForm = 'contact_form',
  EnrollmentForm = 'enrollment_form',
  TaskAutomationDesigner = 'task_automation_designer',
  SolutionRecommendation = 'solution_recommendation',
  Chatbot = 'chatbot',
  Newsletter = 'newsletter',
  WebPage = 'web_page'
}

/**
 * Geographic location information
 */
export interface GeoLocation {
  country: string;
  countryCode: string;
  city?: string;
  region?: string;
  latitude?: number;
  longitude?: number;
}

/**
 * Device information
 */
export interface DeviceInfo {
  type: 'mobile' | 'tablet' | 'desktop';
  os: string;
  osVersion?: string;
}

/**
 * Browser information
 */
export interface BrowserInfo {
  name: string;
  version?: string;
  language?: string;
}

/**
 * UTM tracking parameters
 */
export interface UTMParams {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
}

/**
 * Enrichment data added to events during processing
 */
export interface EventEnrichment {
  ipAddressAnonymized: string;
  geoLocation: GeoLocation;
  device: DeviceInfo;
  browser: BrowserInfo;
  utmParams?: UTMParams;
  serverTimestamp: Date;
  idempotencyKey: string;
}

/**
 * Raw event as captured from the client
 */
export interface RawEvent {
  eventId: string;
  eventType: string;
  timestamp: string;
  properties: Record<string, any>;
}

/**
 * Complete event structure with enrichment
 */
export interface Event {
  // Core identifiers
  eventId: string;
  eventType: EventType;
  timestamp: Date;
  
  // User and session
  userId?: string;
  sessionId: string;
  
  // Source information
  source: EventSource;
  sourcePage?: string;
  
  // Event-specific properties
  properties: Record<string, any>;
  
  // Enrichment data
  enrichment: EventEnrichment;
  
  // Metadata
  createdAt: Date;
}

/**
 * Form submission event properties
 */
export interface FormSubmissionEvent {
  formType: 'contact' | 'enrollment' | 'newsletter';
  name?: string;
  email: string;
  phone?: string;
  subject?: string;
  message?: string;
  programName?: string;
}

/**
 * Chatbot message event properties
 */
export interface ChatbotMessageEvent {
  message: string;
  conversationId: string;
  messageRole: 'user' | 'assistant';
  conversationHistory?: Array<{ role: string; content: string }>;
}

/**
 * AI tool usage event properties
 */
export interface AIToolUsageEvent {
  toolName: 'task_automation' | 'solution_recommendation';
  input: Record<string, any>;
  output?: Record<string, any>;
  aiModel?: string;
  responseQuality?: number;
}

/**
 * Page view event properties
 */
export interface PageViewEvent {
  pagePath: string;
  pageTitle: string;
  referrer?: string;
  pageCategory?: string;
  contentType?: string;
}

/**
 * Validation error structure
 */
export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

/**
 * Validation result
 */
export interface ValidationResult {
  isValid: boolean;
  errors?: ValidationError[];
}

/**
 * Batch validation result
 */
export interface BatchValidationResult {
  validEvents: RawEvent[];
  invalidEvents: Array<{ event: RawEvent; errors: ValidationError[] }>;
}
