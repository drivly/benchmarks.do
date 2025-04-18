export interface DatasetGenerator<T> {
  generateDataset(options: GeneratorOptions): Promise<Dataset<T>>;
}

export interface GeneratorOptions {
  variations: Record<string, any[]>;
  baseTemplate: any;
  count?: number;
  seed?: number;
}

export interface Dataset<T> {
  items: DatasetItem<T>[];
  metadata: DatasetMetadata;
}

export interface DatasetItem<T> {
  input: any;
  expected: T;
  variations: Record<string, any>;
}

export interface DatasetMetadata {
  name: string;
  task: string;
  version: string;
  createdAt: Date;
}
