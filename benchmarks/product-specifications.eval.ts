import { evalite } from 'evalite'
import { Battle } from 'autoevals'
import { ai } from 'functions.do'
import { models } from '@/models'

import productSpecifications from '../datasets/product-specifications/product-specifications.json'

const battleScorer = Battle as any

evalite('Product Specification Analysis Benchmark', {
  data: () => productSpecifications.flatMap((product) => 
    models.map((model) => ({
      input: { product, model },
      expected: {/* optional baseline */},
    }))
  ),
  task: async ({ product, model }) => {
    const result = await ai.analyzeProductSpecification(
      { document: JSON.stringify(product.content), documentType: product.type },
      ['technicalFeatures', 'performanceMetrics', 'compatibilityRequirements', 'userBenefits', 'comparisonWithCompetitors'],
      { model }
    )
    return result
  },
  scorers: [battleScorer],
  experimental_customColumns: async (data) => [
    { label: 'Product ID', value: data.input.product.id },
    { label: 'Product Type', value: data.input.product.type },
    { label: 'Product Name', value: data.input.product.productName },
    { label: 'Manufacturer', value: data.input.product.manufacturer },
    { label: 'Model', value: data.input.model },
    { label: 'Output', value: data.output }
  ],
})
