import { evalite } from 'evalite'
import { Battle } from 'autoevals'
import { ai } from 'functions.do'
import { models } from '../models'

import inquiries from '../datasets/customer-service/inquiries.json'

const battleScorer = Battle as any

evalite('Customer Service Response Benchmark', {
  data: () =>
    inquiries.flatMap((inquiry) =>
      models.map((model) => ({
        input: { inquiry, model },
        expected: {
          /* optional baseline */
        },
      })),
    ),
  task: async ({ inquiry, model }) => {
    const result = await ai.generateCustomerServiceResponse(
      {
        customerInquiry: inquiry.inquiry,
        customerInfo: {
          name: inquiry.customer.name,
          accountId: inquiry.customer.accountId,
        },
        category: inquiry.category,
        priority: inquiry.priority,
      },
      ['professional_response', 'addresses_all_concerns', 'follows_company_policy'],
      { model },
    )
    return result
  },
  scorers: [battleScorer],
  experimental_customColumns: async (data) => [
    { label: 'Inquiry ID', value: data.input.inquiry.id },
    { label: 'Category', value: data.input.inquiry.category },
    { label: 'Complexity', value: data.input.inquiry.complexity },
    { label: 'Model', value: data.input.model },
    { label: 'Output', value: data.output },
  ],
})
