export type ServiceArea =
  | "local"
  | "multi-city"
  | "nationwide"
  | "international"
  | "online"
  | "";

export type IntakeAnswers = {
  businessName: string;
  whatYouDo: string;
  category: string;
  categoryOther: string;
  city: string;
  state: string;
  country: string;
  serviceArea: ServiceArea;
  offerings: string;
  primaryServices: string[];
  customers: string;
  customerProblems: string;
  differentiators: string[];
  differentiatorOther: string;
  yearsOperating: string;
  credentials: string;
  proofTypes: string[];
  links: string;
  contactMethods: string[];
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  existingMaterial: string;
  attachments: string[];
  goals: string[];
  anythingElse: string;
  ownerName: string;
};

export type BusinessKnowledgeObject = {
  business: {
    name: string;
    category: string;
    description: string;
    location: { city: string; state: string; country: string };
    service_area: string[];
    services: string[];
    primary_services: string[];
    target_customers: string[];
    customer_problems: string[];
    differentiators: string[];
    experience: string;
    credentials: string[];
    proof: string[];
    contact: { phone: string; whatsapp: string; email: string; website: string };
    socials: string[];
    source_material: string[];
    business_goals: string[];
  };
};

export type SeoArtifacts = {
  title: string;
  metaDescription: string;
  h1: string;
  sections: string[];
  keywords: string[];
  jsonLd: Record<string, unknown>;
};

export type StructureKind =
  | "whatYouDo"
  | "offerings"
  | "customers"
  | "problems"
  | "credentials"
  | "existingMaterial"
  | "anythingElse";

export type StructuredLine = { key: string; value: string };

export type StructureResult = { lines: StructuredLine[]; rewritten: string };
