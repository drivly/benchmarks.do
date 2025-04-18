import { evalite } from 'evalite'
import { Battle } from 'autoevals'
import { ai } from 'functions.do'
import { models } from '../models'
import insuranceDocuments from '../datasets/insurance-documents/insurance-documents.json'

const battleScorer = Battle as any

evalite('Insurance Document Analysis Benchmark', {
  data: () => insuranceDocuments.flatMap(document => 
    models.map(model => ({
      input: { document, model },
      expected: {/* optional baseline */},
    }))
  ),
  task: async ({ document, model }) => {
    const result = await ai.analyzeInsuranceDocument(
      { document: JSON.stringify(document.content), documentType: document.policyType },
      ['coverageSummary', 'policyExclusions', 'claimsProcess', 'premiumCalculation', 'beneficiaryInformation'],
      { model }
    )
    return result
  },
  scorers: [battleScorer],
  experimental_customColumns: async (data) => [
    { label: 'Document ID', value: data.input.document.id },
    { label: 'Policy Type', value: data.input.document.policyType },
    { label: 'Policy Number', value: data.input.document.policyNumber },
    { label: 'Model', value: data.input.model },
    { label: 'Output', value: data.output }
  ],
})
