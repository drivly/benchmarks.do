import { evalite } from 'evalite'
import { Battle } from 'autoevals'
import { ai } from 'functions.do'
import { models } from '@/models'
import { generateSyntheticDatasets, ClassifiedDocumentSchema } from '@/utils/dataset-generation'



const battleScorer = Battle as any

const datasets = await generateSyntheticDatasets({
  categories: ['invoice', 'contract', 'form', 'letter'],
  samplesPerCategory: 50,
  variationFactors: ['formatting', 'vocabulary', 'structure']
})

evalite('Structured Text Classification Benchmark', {
  data: () => datasets.flatMap(sample => 
    models.map(model => ({
      input: { sample, model },
      expected: { category: sample.category }
    }))
  ),
  task: async ({ sample, model }) => {
    const result = await ai.classifyText(
      { text: sample.content },
      ['category', 'confidence_score', 'key_features'],
      { model }
    )
    return result
  },
  scorers: [battleScorer],
  experimental_customColumns: async (data) => [
    { label: 'Document ID', value: `${data.input.sample.category}-${data.input.sample.key_features[2].split(': ')[1]}` },
    { label: 'Category', value: data.input.sample.category },
    { label: 'Model', value: data.input.model },
    { label: 'Output', value: data.output }
  ],
})
