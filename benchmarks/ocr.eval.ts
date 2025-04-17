import { createOpenAI } from '@ai-sdk/openai'
import { generateObject } from 'ai'
import { JSONDiff } from 'autoevals'
import { evalite } from 'evalite'
import { traceAISDKModel } from 'evalite/ai-sdk'
import { models } from '../models'
import { z } from 'zod'


const router = createOpenAI({
  // custom settings, e.g.
  compatibility: 'strict', // strict mode, enable when using the OpenAI API
  apiKey: process.env.AI_GATEWAY_TOKEN,
  baseURL: process.env.AI_GATEWAY_URL,
  headers: {
    "HTTP-Referer": "https://workflows.do", // Optional. Site URL for rankings on openrouter.ai.
    "X-Title": "Workflows.do Business-as-Code", // Optional. Site title for rankings on openrouter.ai.
  }
})

const expected = JSON.stringify({
  employeeFirstName: 'Brian',
  employeeLastName: 'Johnson',
  employeeAddress: '77650 CALIFORNIA DR',
  employeeCity: 'Palm Desert',
  employeeState: 'CA',
  employeeZip: '92211',
  employeeSSN: '582-17-1334',
  wagesBox1: 49177.22,
  taxWithheldBox2: 8536.11,
  ssWagesBox3: 51121.45,
  ssWithheldBox4: 3169.53,
  medicareWagesBox5: 51121.45,
  medicareWithheldBox6: 741.26,
  employerEIN: '67-1964948',
  employerName: 'PALM DESERT AUTOMOTIVE',
  employerAddress: '74817 JONI DR',
  employerCity: 'Palm Desert',
  employerState: 'CA',
  employerZip: '92260',
  taxYear: '2024',
})

// const messages = [
//   {
//     role: 'user',
//     content: [
//       { type: 'text', text: 'Describe the image in detail.' },
//       { type: 'image', image: 'https://github.com/vercel/ai/blob/main/examples/ai-core/data/comic-cat.png?raw=true' },
//     ],
//   },
// ]

const images = [1,2,3,4,5]
const blur = [0,1,2,3]
const resolution = [512, 768, 1536, 2000, 3072]

for (const model of models) {
  evalite('W2 OCR - ' + model, {
    data: async () => {
      // Generate all permutations of image numbers, blur values, and resolutions
      const permutations = [];
      for (const img of images) {
        for (const b of blur) {
          for (const res of resolution) {
            permutations.push({
              input: { 
                image: `https://github.com/drivly/benchmarks.do/blob/main/datasets/data-extraction/w2/w2_img${img}_blur_${b}_res${res}.jpg?raw=true`,
                imageNumber: img,
                blurLevel: b,
                resolution: res
              },
              expected,
            });
          }
        }
      }
      return permutations;
    },
    task: async (input) => {
      const result = await generateObject({
        model: traceAISDKModel(router(model, { structuredOutputs: true })),
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: 'Extract the data from the image.' },
              { type: 'image', image: input.image },
            ],
          },
        ],
        mode: 'json',
        schemaName: 'W2',
        schema: z.object({
          employeeFirstName: z.string(),
          employeeLastName: z.string(),
          employeeAddress: z.string(),
          employeeCity: z.string(),
          employeeState: z.string(),
          employeeZip: z.string(),
          employeeSSN: z.string(),
          wagesBox1: z.number(),
          taxWithheldBox2: z.number(),
          ssWagesBox3: z.number(),
          ssWithheldBox4: z.number(),
          medicareWagesBox5: z.number(),
          medicareWithheldBox6: z.number(),
          employerEIN: z.string(),
          employerName: z.string(),
          employerAddress: z.string(),
          employerCity: z.string(),
          employerState: z.string(),
          employerZip: z.string(),
          taxYear: z.string(),
        }),
      })
  
      return result.object
    },
    scorers: [JSONDiff],
  })
}


