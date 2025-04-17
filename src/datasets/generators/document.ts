import { DatasetGenerator, GeneratorOptions, Dataset, DatasetItem, DatasetMetadata } from './index';

/**
 * Generator for document extraction datasets
 * Creates permutations of templates with variations for benchmarking extraction tasks
 */
export class DocumentExtractorDatasetGenerator<T> implements DatasetGenerator<T> {
  constructor(
    private schema: any,
    private templates: any[],
  ) {}

  /**
   * Generates a dataset by combining templates with variations
   * @param options Configuration options for dataset generation
   * @returns Promise resolving to a generated dataset
   */
  async generateDataset(options: GeneratorOptions): Promise<Dataset<T>> {
    const {
      variations,
      baseTemplate,
      count = 100,
      seed = 42,
    } = options;

    const random = this.createSeededRandom(seed);
    
    const permutations = this.generatePermutations(variations);
    
    const selectedPermutations = this.selectPermutations(permutations, count, random);
    
    const items = await this.generateItems(selectedPermutations, baseTemplate, random);

    return {
      items,
      metadata: {
        name: `document-extraction-dataset-${seed}`,
        task: 'document-extraction',
        version: '1.0.0',
        createdAt: new Date(),
      }
    };
  }

  /**
   * Creates a seeded random number generator for deterministic results
   * @param seed Seed value for random generation
   * @returns Function that returns deterministic random values
   */
  private createSeededRandom(seed: number): () => number {
    let value = seed;
    return () => {
      value = (value * 9301 + 49297) % 233280;
      return value / 233280;
    };
  }

  /**
   * Generates all possible permutations of the provided variations
   * @param variations Record of variation keys and their possible values
   * @returns Array of all possible variation combinations
   */
  private generatePermutations(variations: Record<string, any[]>): Record<string, any>[] {
    const keys = Object.keys(variations);
    if (keys.length === 0) return [{}];

    let result: Record<string, any>[] = variations[keys[0]].map(value => ({ [keys[0]]: value }));
    
    for (let i = 1; i < keys.length; i++) {
      const key = keys[i];
      const values = variations[key];
      
      result = result.flatMap(existingVariation => 
        values.map(value => ({
          ...existingVariation,
          [key]: value
        }))
      );
    }
    
    return result;
  }

  /**
   * Selects a subset of permutations based on count and random generator
   * @param permutations All possible permutations
   * @param count Number of permutations to select
   * @param random Seeded random function
   * @returns Selected permutations
   */
  private selectPermutations(
    permutations: Record<string, any>[],
    count: number,
    random: () => number
  ): Record<string, any>[] {
    if (permutations.length <= count) {
      return permutations;
    }
    
    const shuffled = [...permutations];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled.slice(0, count);
  }

  /**
   * Generates dataset items by applying variations to templates
   * @param variations Variation permutations to apply
   * @param baseTemplate Base template to apply variations to
   * @param random Seeded random function
   * @returns Array of dataset items
   */
  private async generateItems(
    variations: Record<string, any>[],
    baseTemplate: any,
    random: () => number
  ): Promise<DatasetItem<T>[]> {
    const items: DatasetItem<T>[] = [];
    
    const templates = this.templates.length > 0 ? this.templates : [baseTemplate];
    
    for (const variation of variations) {
      const templateIndex = Math.floor(random() * templates.length);
      const template = templates[templateIndex];
      
      const mergedTemplate = { ...baseTemplate, ...template };
      const input = this.applyVariations(mergedTemplate, variation);
      
      const expected = await this.generateExpectedOutput(input);
      
      items.push({
        input,
        expected,
        variations: variation,
      });
    }
    
    return items;
  }

  /**
   * Applies variations to a template
   * @param template Base template object
   * @param variations Variations to apply
   * @returns Template with variations applied
   */
  private applyVariations(template: any, variations: Record<string, any>): any {
    const result = { ...template };
    
    for (const [key, value] of Object.entries(variations)) {
      if (key === 'blurLevels') {
        result.blur = value;
      } else if (key === 'resolutions') {
        result.resolution = value;
      } else if (key === 'documentStyles') {
        result.style = value;
      } else {
        result[key] = value;
      }
    }
    
    return result;
  }

  /**
   * Generates expected output based on input and schema
   * This would typically involve extracting data according to the schema
   * @param input Input document with variations applied
   * @returns Expected extraction output
   */
  private async generateExpectedOutput(input: any): Promise<T> {
    
    if (!this.schema) {
      return input as unknown as T;
    }
    
    const output: Record<string, any> = {};
    
    if (typeof this.schema === 'object') {
      for (const key of Object.keys(this.schema)) {
        if (input[key] !== undefined) {
          output[key] = input[key];
        }
      }
    }
    
    return output as unknown as T;
  }
}
