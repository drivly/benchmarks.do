import { evalite } from 'evalite'
import { Battle } from 'autoevals'
import { ai } from 'functions.do'
import { models } from '@/models'

import realEstateDocuments from '@/datasets/real-estate-documents/real-estate-documents.json'

const battleScorer = Battle as any

evalite('Real Estate Document Analysis Benchmark', {
  data: () => realEstateDocuments.flatMap((document) => 
    models.map((model) => ({
      input: { document, model },
      expected: {/* optional baseline */},
    }))
  ),
  task: async ({ document, model }) => {
    const result = await ai.analyzeRealEstateDocument(
      { document: JSON.stringify(document.content), documentType: document.documentType },
      ['propertyDetails', 'financialTerms', 'legalObligations', 'contingencies', 'disclosures'],
      { model }
    )
    return result
  },
  scorers: [battleScorer],
  experimental_customColumns: async (data) => [
    { label: 'Document ID', value: data.input.document.id },
    { label: 'Document Type', value: data.input.document.documentType },
    { label: 'Property Address', value: data.input.document.propertyAddress },
    { label: 'Model', value: data.input.model },
    { label: 'Output', value: data.output }
  ],
})
