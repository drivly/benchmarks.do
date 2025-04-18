import { evalite } from 'evalite'
import { Battle } from 'autoevals'
import { ai } from 'functions.do'
import { models } from '@/models'

import marketingPrompts from '../datasets/content/marketing_prompts.json'

const battleScorer = Battle as any

evalite('Marketing Content Generation Benchmark', {
  data: () =>
    marketingPrompts.flatMap((prompt) =>
      models.map((model) => ({
        input: { prompt, model },
        expected: {
          /* optional baseline */
        },
      })),
    ),
  task: async ({ prompt, model }) => {
    const result = await ai.generateMarketingContent(
      {
        contentType: prompt.type,
        productInfo: prompt.type === 'Product Description' ? prompt.product : undefined,
        campaignInfo: prompt.type === 'Social Media Ad' ? prompt.campaign : undefined,
        blogInfo: prompt.type === 'Blog Post' ? prompt.topic : undefined,
        requirements: prompt.promptRequirements,
      },
      ['engaging_content', 'follows_brand_guidelines', 'meets_requirements'],
      { model },
    )
    return result
  },
  scorers: [battleScorer],
  experimental_customColumns: async (data) => [
    { label: 'Content Type', value: data.input.prompt.type },
    { label: 'ID', value: data.input.prompt.id },
    { label: 'Model', value: data.input.model },
    { label: 'Output', value: data.output },
  ],
})
