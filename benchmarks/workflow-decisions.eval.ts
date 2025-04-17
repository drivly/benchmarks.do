import { evalite } from 'evalite'
import { Battle } from 'autoevals'
import { ai } from 'functions.do'
import { models } from '../models'

import workflowScenarios from '../datasets/workflow-decisions/index'

const battleScorer = Battle as any

evalite('Context-Aware Workflow Decisions Benchmark', {
  data: () => workflowScenarios.flatMap(scenario => 
    models.map(model => ({
      input: { scenario, model },
      expected: {/* using scenario.expectedNextStep for evaluation */},
    }))
  ),
  task: async ({ scenario, model }) => {
    const contextData = {
      userType: scenario.context.userType,
      interactionHistory: scenario.context.interactionHistory,
      currentRequest: scenario.context.currentRequest,
      accountStatus: scenario.context.accountStatus,
      domain: scenario.context.domain,
      ...scenario.context.additionalContext
    }
    
    const result = await ai.determineWorkflowNextStep(
      {
        context: contextData,
        availableRoutes: ['sales', 'customer_success', 'support', 'technical_escalation', 
                         'refunds_department', 'account_executive', 'content_writer',
                         'research_team', 'digital_marketing', 'sales_development'],
        priorityLevels: ['low', 'medium', 'high', 'urgent'],
        responseTypes: ['informative', 'technical', 'empathetic', 'value_based', 
                       'consultative', 'educational', 'analytical', 'creative']
      },
      ['route_relevance', 'priority_appropriateness', 'response_type_fit'],
      { model }
    )
    
    return result
  },
  scorers: [battleScorer],
  experimental_customColumns: async (data) => [
    { label: 'ID', value: data.input.scenario.id },
    { label: 'Domain', value: data.input.scenario.context.domain },
    { label: 'Complexity', value: data.input.scenario.complexity },
    { label: 'Request', value: data.input.scenario.context.currentRequest },
    { label: 'User Type', value: data.input.scenario.context.userType },
    { label: 'Model', value: data.input.model },
    { label: 'Expected Route', value: data.input.scenario.expectedNextStep.route },
    { label: 'Output', value: data.output }
  ],
})
