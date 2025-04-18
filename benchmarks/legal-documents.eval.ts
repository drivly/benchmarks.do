import { evalite } from 'evalite'
import { Battle } from 'autoevals'
import { ai } from 'functions.do'
import { models } from '../models'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const battleScorer = Battle as any

const readLegalDocument = (filename: string) => {
  const filePath = join(__dirname, '../datasets/legal-documents', filename)
  return readFileSync(filePath, 'utf8')
}

const legalDocuments = [
  { id: 'LEGAL-001', content: readLegalDocument('employment-agreement.txt'), type: 'Employment Agreement' },
  { id: 'LEGAL-002', content: readLegalDocument('license-agreement.txt'), type: 'License Agreement' },
  { id: 'LEGAL-003', content: readLegalDocument('privacy-policy.txt'), type: 'Privacy Policy' }
]

evalite('Legal Document Analysis Benchmark', {
  data: () => legalDocuments.flatMap((document) => 
    models.map((model) => ({
      input: { document, model },
      expected: {/* optional baseline */},
    }))
  ),
  task: async ({ document, model }) => {
    const result = await ai.analyzeLegalDocument(
      { document: document.content, documentType: document.type },
      ['keyParties', 'legalProvisions', 'obligations', 'jurisdiction', 'governingLaw'],
      { model }
    )
    return result
  },
  scorers: [battleScorer],
  experimental_customColumns: async (data) => [
    { label: 'Document ID', value: data.input.document.id },
    { label: 'Document Type', value: data.input.document.type },
    { label: 'Model', value: data.input.model },
    { label: 'Output', value: data.output }
  ],
})
