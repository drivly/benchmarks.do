import { evalite } from 'evalite'
import { Battle } from 'autoevals'
import { ai } from 'functions.do'
import { models } from '../models'
import financialReports from '../datasets/financial-reports/financial-reports.json'

const battleScorer = Battle as any

evalite('Financial Report Analysis Benchmark', {
  data: () => financialReports.flatMap(report => 
    models.map(model => ({
      input: { report, model },
      expected: {/* optional baseline */},
    }))
  ),
  task: async ({ report, model }) => {
    const result = await ai.analyzeFinancialReport(
      { document: JSON.stringify(report.content), documentType: report.type },
      ['key_metrics', 'growth_trends', 'profitability_analysis', 'segment_performance', 'risk_factors'],
      { model }
    )
    return result
  },
  scorers: [battleScorer],
  experimental_customColumns: async (data) => [
    { label: 'Report ID', value: data.input.report.id },
    { label: 'Report Type', value: data.input.report.type },
    { label: 'Company', value: data.input.report.company },
    { label: 'Model', value: data.input.model },
    { label: 'Output', value: data.output }
  ],
})
