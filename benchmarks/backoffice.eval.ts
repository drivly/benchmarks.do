import { evalite } from 'evalite'
import { Battle } from 'autoevals'
import { ai } from 'functions.do'
import { models } from '../models'

import invoices from '../datasets/backoffice/invoices.json'

const battleScorer = Battle as any

evalite('Invoice Data Extraction Benchmark', {
  data: () =>
    invoices.flatMap((invoice) =>
      models.map((model) => ({
        input: { invoice, model },
        expected: {
          /* optional baseline */
        },
      })),
    ),
  task: async ({ invoice, model }) => {
    const result = await ai.extractInvoiceData({ document: JSON.stringify(invoice) }, ['vendor', 'invoiceNumber', 'date', 'dueDate', 'total', 'lineItems'], { model })
    return result
  },
  scorers: [battleScorer],
  experimental_customColumns: async (data) => [
    { label: 'Invoice ID', value: data.input.invoice.id },
    { label: 'Model', value: data.input.model },
    { label: 'Output', value: data.output },
  ],
})
