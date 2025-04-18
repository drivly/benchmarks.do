import { evalite } from 'evalite'
import { Battle } from 'autoevals'
import { ai } from 'functions.do'
import { models } from '@/models'

import technicalDocumentation from '../datasets/technical-documentation/technical-documentation.json'

const battleScorer = Battle as any

evalite('Technical Documentation Analysis Benchmark', {
  data: () => technicalDocumentation.flatMap((document) => 
    models.map((model) => ({
      input: { document, model },
      expected: {/* optional baseline */},
    }))
  ),
  task: async ({ document, model }) => {
    const result = await ai.analyzeTechnicalDocumentation(
      { document: JSON.stringify(document.content), documentType: document.type },
      ['keyComponents', 'architectureOverview', 'implementationSteps', 'apiEndpoints', 'configurationOptions'],
      { model }
    )
    return result
  },
  scorers: [battleScorer],
  experimental_customColumns: async (data) => [
    { label: 'Document ID', value: data.input.document.id },
    { label: 'Document Type', value: data.input.document.type },
    { label: 'Title', value: data.input.document.title },
    { label: 'Model', value: data.input.model },
    { label: 'Output', value: data.output }
  ],
})
