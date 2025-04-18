import { evalite } from 'evalite'
import { Battle } from 'autoevals'
import { ai } from 'functions.do'
import { models } from '@/models'

import medicalRecords from '@/datasets/medical-records/medical-records.json'

const battleScorer = Battle as any

evalite('Medical Record Analysis Benchmark', {
  data: () => medicalRecords.flatMap((record) => 
    models.map((model) => ({
      input: { record, model },
      expected: {/* optional baseline */},
    }))
  ),
  task: async ({ record, model }) => {
    const result = await ai.analyzeMedicalRecord(
      { document: JSON.stringify(record.content), documentType: record.recordType },
      ['diagnoses', 'medications', 'treatmentPlan', 'followUpRecommendations', 'riskFactors'],
      { model }
    )
    return result
  },
  scorers: [battleScorer],
  experimental_customColumns: async (data) => [
    { label: 'Record ID', value: data.input.record.id },
    { label: 'Record Type', value: data.input.record.recordType },
    { label: 'Patient ID', value: data.input.record.patientId },
    { label: 'Model', value: data.input.model },
    { label: 'Output', value: data.output }
  ],
})
