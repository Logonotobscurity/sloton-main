
export interface AutomateTaskDesignInput {
  workflowDescription: string;
  optimizationSuggestions?: string;
}

export interface AutomateTaskDesignOutput {
  name: string;
  description: string;
  steps: {
    step: number;
    description: string;
    details: string;
    tools: string[];
  }[];
  tools: {
    name: string;
    icon: string;
  }[];
  optimizationSuggestions: string[];
}

// A library of "AI-generated" workflow templates
const workflowTemplates: { [key: string]: AutomateTaskDesignOutput } = {
  onboarding: {
    name: "Automated User Onboarding",
    description: "A complete workflow for onboarding new users to your platform, from account creation to initial engagement.",
    steps: [
      {
        step: 1,
        description: "User Signup",
        details: "A new user creates an account using a sign-up form. Required information: Name, Email, Password.",
        tools: ["Next.js", "React Hook Form"]
      },
      {
        step: 2,
        description: "Database Record Creation",
        details: "A new user record is securely created in the database with the provided information. The password should be hashed.",
        tools: ["PostgreSQL", "Prisma"]
      },
      {
        step: 3,
        description: "Email Verification",
        details: "An automated email is sent to the user with a unique verification link to confirm their email address.",
        tools: ["Resend", "Next.js API Route"]
      },
      {
        step: 4,
        description: "Welcome & Initial Setup",
        details: "Upon successful verification, the user is redirected to a welcome page or a setup wizard to configure their profile.",
        tools: ["Next.js"]
      }
    ],
    tools: [
        { name: "Next.js", icon: "nextjs" },
        { name: "React Hook Form", icon: "react-hook-form" },
        { name: "PostgreSQL", icon: "postgresql" },
        { name: "Prisma", icon: "prisma" },
        { name: "Resend", icon: "resend" }
    ],
    optimizationSuggestions: [
      "Implement social logins (Google, GitHub) to speed up the signup process.",
      "Add a 'Welcome' series of emails to guide the user through the first few days.",
      "Use a webhook to notify a CRM system when a new user signs up."
    ]
  },
  marketing: {
    name: "Automated Marketing Campaign",
    description: "A workflow to automate the execution and tracking of a marketing campaign.",
    steps: [
        {
            step: 1,
            description: "Lead Capture",
            details: "Capture leads from a form on a landing page.",
            tools: ["Webflow", "HubSpot Forms"]
        },
        {
            step: 2,
            description: "CRM Integration",
            details: "Automatically add new leads to your CRM and segment them based on their interests.",
            tools: ["HubSpot", "Zapier"]
        },
        {
            step: 3,
            description: "Email Nurturing Sequence",
            details: "Send a series of automated emails to nurture the leads.",
            tools: ["Mailchimp", "HubSpot Workflows"]
        },
        {
            step: 4,
            description: "Performance Tracking",
            details: "Track open rates, click-through rates, and conversions for the campaign.",
            tools: ["Google Analytics", "HubSpot Reporting"]
        }
    ],
    tools: [
        { name: "Webflow", icon: "webflow" },
        { name: "HubSpot", icon: "hubspot" },
        { name: "Zapier", icon: "zapier" },
        { name: "Mailchimp", icon: "mailchimp" },
        { name: "Google Analytics", icon: "google-analytics" }
    ],
    optimizationSuggestions: [
        "A/B test different email subject lines to improve open rates.",
        "Use lead scoring to prioritize follow-up with the most engaged leads.",
        "Personalize email content based on lead properties."
    ]
  },
  support: {
      name: "Automated Customer Support",
      description: "A workflow to automate the handling of customer support tickets.",
      steps: [
          {
              step: 1,
              description: "Ticket Creation",
              details: "Create a new support ticket from an incoming email or a web form.",
              tools: ["Zendesk", "Help Scout"]
          },
          {
              step: 2,
              description: "Ticket Triage",
              details: "Automatically categorize and prioritize tickets based on keywords and sender.",
              tools: ["Zendesk Triggers", "Intercom"]
          },
          {
              step: 3,
              description: "Automated Responses",
              details: "Send automated responses for common questions using a knowledge base.",
              tools: ["Zendesk Answer Bot", "Ada"]
          },
          {
              step: 4,
              description: "Agent Assignment",
              details: "Assign complex tickets to the appropriate support agent.",
              tools: ["Zendesk Routing", "Jira Service Desk"]
          }
      ],
      tools: [
        { name: "Zendesk", icon: "zendesk" },
        { name: "Help Scout", icon: "helpscout" },
        { name: "Intercom", icon: "intercom" },
        { name: "Ada", icon: "ada" },
        { name: "Jira Service Desk", icon: "jira" }
      ],
      optimizationSuggestions: [
          "Use sentiment analysis to gauge customer satisfaction.",
          "Create a feedback loop to improve the knowledge base based on ticket resolutions.",
          "Implement a chatbot for 24/7 support."
      ]
  }
};

const defaultWorkflow: AutomateTaskDesignOutput = {
    name: "Generic Automated Workflow",
    description: "A generated workflow based on the provided description.",
    steps: [
      {
        step: 1,
        description: "Initial Trigger",
        details: "The workflow is triggered by a specified event or a manual start.",
        tools: ["Webhook"]
      },
      {
        step: 2,
        description: "Data Processing",
        details: "Data is collected and processed according to the defined logic.",
        tools: ["Serverless Function"]
      },
      {
        step: 3,
        description: "Action Execution",
        details: "An action is performed, such as sending an email, updating a database, or calling another API.",
        tools: ["API"]
      }
    ],
    tools: [
      { name: "Webhook", icon: "webhook" },
      { name: "Serverless Function", icon: "serverless" },
      { name: "API", icon: "api" }
    ],
    optimizationSuggestions: [
        "Consider adding error handling and retry logic for external API calls.",
        "Log key events and metrics for monitoring workflow performance."
    ]
};


export async function automateTaskDesign(input: AutomateTaskDesignInput): Promise<AutomateTaskDesignOutput> {
  if (!input?.workflowDescription || input.workflowDescription.trim().length < 10) {
    throw new Error("workflowDescription must be at least 10 characters.");
  }
  const workflowDescription = input.workflowDescription.trim().slice(0, 8000);
  const optimizationSuggestions = input.optimizationSuggestions?.trim().slice(0, 4000);

  await new Promise(resolve => setTimeout(resolve, 1000));

  const description = workflowDescription.toLowerCase();

  if (description.includes("onboarding")) {
    return workflowTemplates.onboarding;
  }

  if (description.includes("marketing") || description.includes("campaign")) {
    return workflowTemplates.marketing;
  }

  if (description.includes("support") || description.includes("ticket")) {
    return workflowTemplates.support;
  }

  // Fallback to a generic workflow
  const genericWorkflow = { ...defaultWorkflow };
  genericWorkflow.description = `A generated workflow based on the description: "${workflowDescription}"`;
  return genericWorkflow;
}
