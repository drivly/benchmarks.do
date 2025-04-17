import 'dotenv/config'
import { createOpenAI } from '@ai-sdk/openai'
import { generateObject } from 'ai'
import { JSONDiff } from 'autoevals'
import { evalite } from 'evalite'
import { traceAISDKModel } from 'evalite/ai-sdk'
import { models } from '../models'
import { z } from 'zod'
import { createOpenAICompatible } from '@ai-sdk/openai-compatible'

// console.log(process.env.AI_GATEWAY_URL)

const router = createOpenAI({
  // custom settings, e.g.
  // compatibility: 'strict', // strict mode, enable when using the OpenAI API
  // compatibility: 'compatible',

// const router = createOpenAICompatible({
//   name: 'OpenRouter',
  apiKey: process.env.AI_GATEWAY_TOKEN!,
  baseURL: process.env.AI_GATEWAY_URL!,
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


const images = [1,2,3,4,5,6]
// const images = [3,4,5]
// const blurs = [0,1,2,3]
const blurs = [0,1]
const resolution = [512, 768, 1536, 2000, 3072]
  
for (const model of models) {
  evalite('W2 OCR - ' + model, {
    data: async () => {
      const permutations = [];
      for (const img of images) {
        for (const blur of blurs) {
          for (const res of resolution) {
            permutations.push({
              input: { 
                image: `https://github.com/drivly/benchmarks.do/blob/main/datasets/data-extraction/w2/w2_img${img}_blur${blur}_res${res}.jpg?raw=true`,
                imageNumber: img,
                blurLevel: blur,
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
        // model: traceAISDKModel(router(model, { structuredOutputs: true })),
        model: router(model, { structuredOutputs: true }),
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: 'Extract the data from the image. Use 0 or "" for missing values. Do not redact PII/SSN or make up anything you do not see.' },
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
        providerOptions: {
          provider: {
            require_parameters: true,
          },
        }
      }).catch(console.error)
  
      console.log(model, input.image, result?.object)

      return result?.object
    },
    scorers: [JSONDiff],
  })
}


