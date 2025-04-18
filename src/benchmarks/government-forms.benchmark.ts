import { evalite } from 'evalite'
import { Battle } from 'autoevals'
import { ai } from 'functions.do'
import { models } from '../models'
import governmentForms from '../datasets/government-forms/government-forms.json'

const battleScorer = Battle as any

evalite('Government Form Analysis Benchmark', {
  data: () => governmentForms.flatMap(form => 
    models.map(model => ({
      input: { form, model },
      expected: {/* optional baseline */},
    }))
  ),
  task: async ({ form, model }) => {
    const result = await ai.analyzeGovernmentForm(
      { document: JSON.stringify(form.content), documentType: form.type },
      ['requiredFields', 'submissionDeadlines', 'eligibilityCriteria', 'complianceRequirements', 'penaltiesForMisrepresentation'],
      { model }
    )
    return result
  },
  scorers: [battleScorer],
  experimental_customColumns: async (data) => [
    { label: 'Form ID', value: data.input.form.id },
    { label: 'Form Type', value: data.input.form.type },
    { label: 'Form Number', value: data.input.form.formNumber },
    { label: 'Agency', value: data.input.form.agency },
    { label: 'Model', value: data.input.model },
    { label: 'Output', value: data.output }
  ],
})
