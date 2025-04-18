import { evalite } from 'evalite'
import { Battle } from 'autoevals'
import { ai } from 'functions.do'
import { models } from '@/models'

import invoiceProcessing from '@/datasets/agentic/invoice-processing.json'
import customerOnboarding from '@/datasets/agentic/customer-onboarding.json'
import dataValidation from '@/datasets/agentic/data-validation.json'
import customerService from '@/datasets/agentic/customer-service.json'
import researchReporting from '@/datasets/agentic/research-reporting.json'

interface WorkflowStep {
  tool: string;
  expected_parameters?: Record<string, any>;
  conditional_branch?: Array<{
    condition: string;
    tools: Array<{
      tool: string;
      expected_parameters: Record<string, any>;
    }>;
  }>;
}

interface Workflow {
  id: string;
  scenario: string;
  context: string;
  expected_tools: string[];
  documents: Record<string, any>;
  expected_steps: WorkflowStep[];
  success_criteria: {
    correct_tool_selection: boolean;
    parameter_accuracy: number;
    completion_success: boolean;
    decision_quality?: number;
  };
  complexity: 'Sequential' | 'Conditional';
}

interface ToolUsage {
  tool: string;
  params: Record<string, any>;
}

const agenticWorkflows: Workflow[] = [
  ...(invoiceProcessing as unknown as Workflow[]),
  ...(customerOnboarding as unknown as Workflow[]),
  ...(dataValidation as unknown as Workflow[]),
  ...(customerService as unknown as Workflow[]),
  ...(researchReporting as unknown as Workflow[])
]

const battleScorer = Battle as any

evalite('Agentic Tool Use Benchmark', {
  data: () => agenticWorkflows.flatMap((workflow) => 
    models.map((model) => ({
      input: { workflow, model },
      expected: workflow.expected_steps.map((step: WorkflowStep) => step.tool),
    }))
  ),
  task: async ({ workflow, model }: { workflow: Workflow; model: string }) => {
    const context = {
      scenario: workflow.scenario,
      context: workflow.context,
      documents: workflow.documents
    }
    
    const toolUsage: ToolUsage[] = []
    
    const trackToolUsage = (tool: string, params: Record<string, any>): ToolUsage => {
      toolUsage.push({ tool, params })
      return { tool, params }
    }
    
    const result = await ai.executeAgentWorkflow(
      context,
      workflow.expected_tools,
      { 
        model,
        trackToolUsage
      }
    )
    
    const metrics = calculateAgentMetrics(toolUsage, workflow.expected_steps, workflow.success_criteria)
    
    return {
      toolUsage,
      metrics,
      success: metrics.overall_success
    }
  },
  scorers: [battleScorer],
  experimental_customColumns: async (data) => [
    { label: 'Scenario', value: data.input.workflow.scenario },
    { label: 'ID', value: data.input.workflow.id },
    { label: 'Model', value: data.input.model },
    { label: 'Complexity', value: data.input.workflow.complexity },
    { label: 'Tool Selection', value: data.output?.metrics?.correct_tool_selection || 0 },
    { label: 'Parameter Accuracy', value: data.output?.metrics?.parameter_accuracy || 0 },
    { label: 'Completion Success', value: data.output?.metrics?.completion_success || 0 },
    { label: 'Overall Success', value: data.output?.metrics?.overall_success || 0 }
  ],
})

/**
 * Calculate metrics for agent performance
 */
function calculateAgentMetrics(
  toolUsage: ToolUsage[], 
  expectedSteps: WorkflowStep[], 
  successCriteria: Workflow['success_criteria']
): {
  correct_tool_selection: number;
  parameter_accuracy: number;
  completion_success: number;
  decision_quality: number;
  overall_success: number;
} {
  const usedTools = toolUsage.map((usage: ToolUsage) => usage.tool)
  const expectedTools = expectedSteps
    .filter((step: WorkflowStep) => !step.conditional_branch) // Filter out conditional branches for direct comparison
    .map((step: WorkflowStep) => step.tool)
  
  const correctToolSelections = expectedTools.filter((tool: string) => usedTools.includes(tool)).length
  const toolSelectionAccuracy = expectedTools.length > 0 ? correctToolSelections / expectedTools.length : 0
  
  let totalParams = 0
  let correctParams = 0
  
  toolUsage.forEach((usage: ToolUsage) => {
    const matchingStep = expectedSteps.find((step: WorkflowStep) => step.tool === usage.tool)
    if (matchingStep && matchingStep.expected_parameters) {
      const expectedParams = matchingStep.expected_parameters
      const actualParams = usage.params
      
      const paramKeys = Object.keys(expectedParams)
      totalParams += paramKeys.length
      
      paramKeys.forEach((key: string) => {
        if (actualParams[key] === expectedParams[key] || 
            (expectedParams[key] === 'generated_during_execution' && actualParams[key])) {
          correctParams++
        }
      })
    }
  })
  
  const parameterAccuracy = totalParams > 0 ? correctParams / totalParams : 0
  
  const completionSuccess = expectedTools.length > 0 && 
    expectedTools.every((tool: string) => usedTools.includes(tool)) ? 1 : 0
  
  let decisionQuality = 1 // Default to perfect if no decisions needed
  
  const conditionalSteps = expectedSteps.filter((step: WorkflowStep) => step.conditional_branch)
  if (conditionalSteps.length > 0) {
    decisionQuality = successCriteria.decision_quality || 1
  }
  
  const overallSuccess = (
    (toolSelectionAccuracy >= (successCriteria.correct_tool_selection ? 1 : 0) ? 1 : 0) +
    (parameterAccuracy >= (successCriteria.parameter_accuracy || 0) ? 1 : 0) +
    (completionSuccess >= (successCriteria.completion_success ? 1 : 0) ? 1 : 0) +
    (decisionQuality >= (successCriteria.decision_quality || 0) ? 1 : 0)
  ) / (
    (successCriteria.correct_tool_selection ? 1 : 0) +
    (successCriteria.parameter_accuracy ? 1 : 0) +
    (successCriteria.completion_success ? 1 : 0) +
    (successCriteria.decision_quality ? 1 : 0) || 1
  )
  
  return {
    correct_tool_selection: toolSelectionAccuracy,
    parameter_accuracy: parameterAccuracy,
    completion_success: completionSuccess,
    decision_quality: decisionQuality,
    overall_success: overallSuccess
  }
}
