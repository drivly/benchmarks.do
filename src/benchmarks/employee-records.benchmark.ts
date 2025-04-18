import { evalite } from 'evalite'
import { Battle } from 'autoevals'
import { ai } from 'functions.do'
import { models } from '../models'
import employeeRecords from '../datasets/employee-records/employee-records.json'

const battleScorer = Battle as any

evalite('Employee Record Analysis Benchmark', {
  data: () => employeeRecords.flatMap(record => 
    models.map(model => ({
      input: { record, model },
      expected: {/* optional baseline */},
    }))
  ),
  task: async ({ record, model }) => {
    const result = await ai.analyzeEmployeeRecord(
      { document: JSON.stringify(record.content), documentType: record.recordType },
      ['performanceEvaluation', 'careerDevelopment', 'complianceIssues', 'compensationAnalysis', 'employmentStatus'],
      { model }
    )
    return result
  },
  scorers: [battleScorer],
  experimental_customColumns: async (data) => [
    { label: 'Record ID', value: data.input.record.id },
    { label: 'Record Type', value: data.input.record.recordType },
    { label: 'Employee ID', value: data.input.record.employeeId },
    { label: 'Department', value: data.input.record.department },
    { label: 'Model', value: data.input.model },
    { label: 'Output', value: data.output }
  ],
})
