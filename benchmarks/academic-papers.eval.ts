import { evalite } from 'evalite'
import { Battle } from 'autoevals'
import { ai } from 'functions.do'
import { models } from '@/models'

import academicPapers from '@/datasets/academic-papers/academic-papers.json'

const battleScorer = Battle as any

evalite('Academic Paper Analysis Benchmark', {
  data: () => academicPapers.flatMap((paper) => 
    models.map((model) => ({
      input: { paper, model },
      expected: {/* optional baseline */},
    }))
  ),
  task: async ({ paper, model }) => {
    const result = await ai.analyzeAcademicPaper(
      { document: JSON.stringify(paper), documentType: paper.type },
      ['keyFindings', 'researchMethodology', 'contributionToField', 'limitationsAndFutureWork', 'citationAnalysis'],
      { model }
    )
    return result
  },
  scorers: [battleScorer],
  experimental_customColumns: async (data) => [
    { label: 'Paper ID', value: data.input.paper.id },
    { label: 'Paper Type', value: data.input.paper.type },
    { label: 'Title', value: data.input.paper.title },
    { label: 'Model', value: data.input.model },
    { label: 'Output', value: data.output }
  ],
})
