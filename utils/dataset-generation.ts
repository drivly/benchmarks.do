import * as fs from 'fs'
import * as path from 'path'
import { z } from 'zod'

export const ClassifiedDocumentSchema = z.object({
  content: z.string(),
  category: z.enum(['invoice', 'contract', 'form', 'letter']),
  confidence_score: z.number().min(0).max(1),
  key_features: z.array(z.string())
})

export type ClassifiedDocument = z.infer<typeof ClassifiedDocumentSchema>

export async function generateSyntheticDatasets({
  categories = ['invoice', 'contract', 'form', 'letter'],
  samplesPerCategory = 50,
  variationFactors = ['formatting', 'vocabulary', 'structure'],
  outputPath = path.join(process.cwd(), 'datasets', 'text-classification')
}: {
  categories?: string[]
  samplesPerCategory?: number
  variationFactors?: string[]
  outputPath?: string
} = {}): Promise<ClassifiedDocument[]> {
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true })
  }
  
  const outputFile = path.join(outputPath, 'documents.json')
  
  if (fs.existsSync(outputFile)) {
    console.log('Using existing dataset from', outputFile)
    return JSON.parse(fs.readFileSync(outputFile, 'utf8'))
  }
  
  const allSamples: ClassifiedDocument[] = []
  
  for (const category of categories) {
    console.log(`Generating ${samplesPerCategory} samples for category: ${category}`)
    
    
    for (let i = 0; i < samplesPerCategory; i++) {
      const sampleId = `${category}-${i + 1}`
      const content = `This is a synthetic ${category} document #${i + 1} with varied ${
        variationFactors[i % variationFactors.length]
      }`
      
      allSamples.push({
        content,
        category: category as any,
        confidence_score: 1.0, // Perfect confidence since we're generating the data
        key_features: [
          `Feature 1 for ${category}`,
          `Feature 2 for ${category}`,
          `Variation: ${variationFactors[i % variationFactors.length]}`
        ]
      })
    }
  }
  
  fs.writeFileSync(outputFile, JSON.stringify(allSamples, null, 2))
  console.log(`Generated ${allSamples.length} samples and saved to ${outputFile}`)
  
  return allSamples
}
