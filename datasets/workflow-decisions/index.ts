/**
 * Context-Aware Workflow Decision Dataset
 * ENG-629: Benchmarks for next-step decision classification
 */

interface InteractionHistoryItem {
  timestamp: string;
  action: string;
  details: string;
}

interface WorkflowContext {
  userType: string;
  interactionHistory: InteractionHistoryItem[];
  currentRequest: string;
  accountStatus: string;
  domain: string;
  additionalContext?: Record<string, any>;
}

interface ExpectedNextStep {
  route: string;
  priority: string;
  responseType: string;
  additionalActions?: string[];
}

export interface WorkflowScenario {
  id: string;
  context: WorkflowContext;
  expectedNextStep: ExpectedNextStep;
  complexity: 'Simple' | 'Medium' | 'Complex';
  description?: string;
}

/**
 * Generate customer service workflow scenarios
 */
const customerServiceScenarios: WorkflowScenario[] = [
  {
    id: 'WF-CS-001',
    context: {
      userType: 'premium',
      interactionHistory: [
        {
          timestamp: '2023-04-15T10:30:00Z',
          action: 'purchased_subscription',
          details: 'Premium annual plan ($199/year)'
        },
        {
          timestamp: '2023-04-20T14:45:00Z',
          action: 'support_contact',
          details: 'Asked about feature access'
        }
      ],
      currentRequest: 'refund_request',
      accountStatus: 'active',
      domain: 'customer_service',
      additionalContext: {
        subscriptionAge: '10_days',
        refundEligibility: 'full_refund',
        refundReason: 'not_satisfied'
      }
    },
    expectedNextStep: {
      route: 'refunds_department',
      priority: 'high',
      responseType: 'empathetic',
      additionalActions: ['verify_account', 'check_usage', 'offer_alternatives']
    },
    complexity: 'Medium',
    description: 'Premium customer requesting refund shortly after purchase'
  },
  {
    id: 'WF-CS-002',
    context: {
      userType: 'free',
      interactionHistory: [
        {
          timestamp: '2023-02-10T09:15:00Z',
          action: 'account_creation',
          details: 'Free tier signup'
        },
        {
          timestamp: '2023-04-25T11:20:00Z',
          action: 'feature_usage',
          details: 'Reached free tier limits'
        }
      ],
      currentRequest: 'pricing_inquiry',
      accountStatus: 'active',
      domain: 'customer_service',
      additionalContext: {
        usageLevel: 'high',
        featureInterest: 'analytics'
      }
    },
    expectedNextStep: {
      route: 'sales',
      priority: 'medium',
      responseType: 'informative',
      additionalActions: ['highlight_benefits', 'offer_trial']
    },
    complexity: 'Simple',
    description: 'Free user inquiring about pricing after reaching limits'
  },
  {
    id: 'WF-CS-003',
    context: {
      userType: 'enterprise',
      interactionHistory: [
        {
          timestamp: '2022-11-05T14:30:00Z',
          action: 'contract_signed',
          details: 'Enterprise plan ($50,000/year)'
        },
        {
          timestamp: '2023-01-15T10:00:00Z',
          action: 'technical_issue',
          details: 'API integration failure'
        },
        {
          timestamp: '2023-02-20T16:45:00Z',
          action: 'escalation',
          details: 'Persistent connectivity issues'
        }
      ],
      currentRequest: 'service_disruption',
      accountStatus: 'active',
      domain: 'customer_service',
      additionalContext: {
        severity: 'critical',
        affectedUsers: '500+',
        impactedSystems: ['payments', 'reporting']
      }
    },
    expectedNextStep: {
      route: 'technical_escalation',
      priority: 'urgent',
      responseType: 'technical',
      additionalActions: ['assign_dedicated_engineer', 'setup_war_room', 'notify_leadership']
    },
    complexity: 'Complex',
    description: 'Enterprise customer reporting critical service disruption'
  }
];

/**
 * Generate sales workflow scenarios
 */
const salesScenarios: WorkflowScenario[] = [
  {
    id: 'WF-SL-001',
    context: {
      userType: 'prospect',
      interactionHistory: [
        {
          timestamp: '2023-04-10T09:30:00Z',
          action: 'website_visit',
          details: 'Product comparison page'
        },
        {
          timestamp: '2023-04-12T14:15:00Z',
          action: 'downloaded_whitepaper',
          details: 'Industry solutions whitepaper'
        }
      ],
      currentRequest: 'demo_request',
      accountStatus: 'lead',
      domain: 'sales',
      additionalContext: {
        companySize: 'mid_market',
        industry: 'healthcare',
        budget: 'unknown'
      }
    },
    expectedNextStep: {
      route: 'sales_development',
      priority: 'high',
      responseType: 'educational',
      additionalActions: ['qualify_lead', 'schedule_discovery_call']
    },
    complexity: 'Medium',
    description: 'New prospect requesting product demonstration'
  },
  {
    id: 'WF-SL-002',
    context: {
      userType: 'qualified_opportunity',
      interactionHistory: [
        {
          timestamp: '2023-03-05T10:00:00Z',
          action: 'discovery_call',
          details: 'Initial requirements gathering'
        },
        {
          timestamp: '2023-03-15T13:30:00Z',
          action: 'product_demo',
          details: 'Completed technical demonstration'
        },
        {
          timestamp: '2023-03-25T11:00:00Z',
          action: 'pricing_discussion',
          details: 'Shared initial quote'
        }
      ],
      currentRequest: 'pricing_objection',
      accountStatus: 'opportunity',
      domain: 'sales',
      additionalContext: {
        dealSize: '$75,000',
        competitorMention: 'mentioned_competitor',
        decisionTimeline: '1_month'
      }
    },
    expectedNextStep: {
      route: 'account_executive',
      priority: 'high',
      responseType: 'value_based',
      additionalActions: ['prepare_competitive_analysis', 'involve_solutions_engineer', 'consider_discount']
    },
    complexity: 'Complex',
    description: 'Qualified opportunity raising pricing objections after demo'
  },
  {
    id: 'WF-SL-003',
    context: {
      userType: 'customer',
      interactionHistory: [
        {
          timestamp: '2022-01-10T14:00:00Z',
          action: 'initial_purchase',
          details: 'Team plan ($10,000/year)'
        },
        {
          timestamp: '2022-12-15T09:45:00Z',
          action: 'renewal_notification',
          details: 'Upcoming renewal in 45 days'
        }
      ],
      currentRequest: 'expansion_interest',
      accountStatus: 'active',
      domain: 'sales',
      additionalContext: {
        currentSeats: '25',
        usageMetrics: 'high',
        additionalUnits: '15',
        departmentExpansion: 'marketing'
      }
    },
    expectedNextStep: {
      route: 'customer_success',
      priority: 'medium',
      responseType: 'consultative',
      additionalActions: ['prepare_growth_proposal', 'schedule_expansion_demo', 'offer_volume_discount']
    },
    complexity: 'Medium',
    description: 'Existing customer interested in expanding their subscription'
  }
];

/**
 * Generate content marketing workflow scenarios
 */
const contentMarketingScenarios: WorkflowScenario[] = [
  {
    id: 'WF-CM-001',
    context: {
      userType: 'marketing_team',
      interactionHistory: [
        {
          timestamp: '2023-04-01T09:00:00Z',
          action: 'campaign_planning',
          details: 'Q2 product launch'
        }
      ],
      currentRequest: 'blog_post_creation',
      accountStatus: 'internal',
      domain: 'content_marketing',
      additionalContext: {
        targetAudience: 'technical_decision_makers',
        contentGoal: 'product_awareness',
        keyFeatures: ['automated_workflows', 'integration_capabilities']
      }
    },
    expectedNextStep: {
      route: 'content_writer',
      priority: 'medium',
      responseType: 'technical',
      additionalActions: ['research_audience', 'outline_article', 'identify_keywords']
    },
    complexity: 'Medium',
    description: 'Marketing team requesting technical blog post for product launch'
  },
  {
    id: 'WF-CM-002',
    context: {
      userType: 'executive',
      interactionHistory: [
        {
          timestamp: '2023-03-15T11:30:00Z',
          action: 'executive_request',
          details: 'CEO asked for thought leadership content'
        }
      ],
      currentRequest: 'whitepaper_creation',
      accountStatus: 'internal',
      domain: 'content_marketing',
      additionalContext: {
        industry: 'fintech',
        contentTheme: 'future_trends',
        publicationTarget: 'industry_journal'
      }
    },
    expectedNextStep: {
      route: 'research_team',
      priority: 'high',
      responseType: 'analytical',
      additionalActions: ['conduct_market_research', 'interview_experts', 'develop_outline']
    },
    complexity: 'Complex',
    description: 'Executive request for industry thought leadership whitepaper'
  },
  {
    id: 'WF-CM-003',
    context: {
      userType: 'social_media_manager',
      interactionHistory: [
        {
          timestamp: '2023-04-05T13:00:00Z',
          action: 'performance_review',
          details: 'Low engagement on recent posts'
        }
      ],
      currentRequest: 'social_content_strategy',
      accountStatus: 'internal',
      domain: 'content_marketing',
      additionalContext: {
        platforms: ['linkedin', 'twitter'],
        contentPerformance: 'declining',
        businessObjective: 'lead_generation'
      }
    },
    expectedNextStep: {
      route: 'digital_marketing',
      priority: 'medium',
      responseType: 'creative',
      additionalActions: ['analyze_top_performers', 'create_content_calendar', 'develop_engagement_tactics']
    },
    complexity: 'Simple',
    description: 'Social media manager seeking strategy for improving engagement'
  }
];

export const workflowScenarios: WorkflowScenario[] = [
  ...customerServiceScenarios,
  ...salesScenarios,
  ...contentMarketingScenarios,
];

export default workflowScenarios;
