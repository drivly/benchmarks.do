import { evalite } from 'evalite'
import { Battle } from 'autoevals'
import { ai } from 'functions.do'
import { models } from '@/models'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const battleScorer = Battle as any

const readContractFile = (filename: string) => {
  const filePath = join(__dirname, '../datasets/contracts', filename)
  return readFileSync(filePath, 'utf8')
}

const contracts = [{ id: 'NDA-001', content: readContractFile('nda.txt'), type: 'NDA' }]

evalite('Contract Review Benchmark', {
  data: () =>
    contracts.flatMap((contract) =>
      models.map((model) => ({
        input: { contract, model },
        expected: {
          /* optional baseline */
        },
      })),
    ),
  task: async ({ contract, model }) => {
    const result = await ai.analyzeContract(
      { document: contract.content, contractType: contract.type },
      ['key_parties', 'effective_date', 'termination_conditions', 'confidentiality_scope', 'governing_law'],
      { model },
    )
    return result
  },
  scorers: [battleScorer],
  experimental_customColumns: async (data) => [
    { label: 'Contract ID', value: data.input.contract.id },
    { label: 'Contract Type', value: data.input.contract.type },
    { label: 'Model', value: data.input.model },
    { label: 'Output', value: data.output },
  ],
})
