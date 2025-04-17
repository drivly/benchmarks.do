import { DocumentExtractorDatasetGenerator } from './document';

/**
 * Invoice schema defining the structure of extracted invoice data
 */
export const invoiceSchema = {
  invoiceNumber: { type: 'string', required: true },
  date: { type: 'string', required: true },
  dueDate: { type: 'string', required: false },
  vendorName: { type: 'string', required: true },
  vendorAddress: { type: 'string', required: false },
  customerName: { type: 'string', required: true },
  customerAddress: { type: 'string', required: false },
  items: {
    type: 'array',
    items: {
      description: { type: 'string', required: true },
      quantity: { type: 'number', required: true },
      unitPrice: { type: 'number', required: true },
      amount: { type: 'number', required: true },
    },
    required: true,
  },
  subtotal: { type: 'number', required: true },
  tax: { type: 'number', required: false },
  total: { type: 'number', required: true },
  paymentTerms: { type: 'string', required: false },
  notes: { type: 'string', required: false },
};

/**
 * Sample invoice templates for dataset generation
 */
export const invoiceTemplates = [
  {
    invoiceNumber: 'INV-001',
    date: '2025-01-15',
    dueDate: '2025-02-15',
    vendorName: 'Acme Corporation',
    vendorAddress: '123 Business St, Industry City, CA 90210',
    customerName: 'Customer Inc.',
    customerAddress: '456 Client Ave, Commerce Town, NY 10001',
    items: [
      {
        description: 'Web Development Services',
        quantity: 40,
        unitPrice: 150,
        amount: 6000,
      },
      {
        description: 'Hosting (Annual)',
        quantity: 1,
        unitPrice: 1200,
        amount: 1200,
      },
    ],
    subtotal: 7200,
    tax: 576,
    total: 7776,
    paymentTerms: 'Net 30',
    notes: 'Thank you for your business!',
  },
  {
    invoiceNumber: 'INV-002',
    date: '2025-02-01',
    dueDate: '2025-03-01',
    vendorName: 'Tech Solutions Ltd.',
    vendorAddress: '789 Technology Blvd, Innovation Park, WA 98001',
    customerName: 'Enterprise Corp',
    customerAddress: '321 Corporate Plaza, Business District, TX 75001',
    items: [
      {
        description: 'Software License (Annual)',
        quantity: 5,
        unitPrice: 1999,
        amount: 9995,
      },
      {
        description: 'Implementation Services',
        quantity: 20,
        unitPrice: 200,
        amount: 4000,
      },
      {
        description: 'Training Session',
        quantity: 2,
        unitPrice: 1500,
        amount: 3000,
      },
    ],
    subtotal: 16995,
    tax: 1359.6,
    total: 18354.6,
    paymentTerms: 'Net 30',
    notes: 'Please reference invoice number on payment.',
  },
];

/**
 * Base invoice template with default values
 */
export const baseInvoiceTemplate = {
  invoiceNumber: '',
  date: '',
  dueDate: '',
  vendorName: '',
  vendorAddress: '',
  customerName: '',
  customerAddress: '',
  items: [],
  subtotal: 0,
  tax: 0,
  total: 0,
  paymentTerms: '',
  notes: '',
};

/**
 * Generator for invoice extraction datasets
 * Extends the base DocumentExtractorDatasetGenerator with invoice-specific functionality
 */
export class InvoiceExtractorDatasetGenerator extends DocumentExtractorDatasetGenerator<typeof invoiceSchema> {
  constructor() {
    super(invoiceSchema, invoiceTemplates);
  }

  /**
   * Creates a standard invoice dataset with common variations
   * @param count Number of dataset items to generate
   * @param seed Random seed for deterministic generation
   * @returns Promise resolving to the generated dataset
   */
  async createStandardDataset(count = 100, seed = 42): Promise<ReturnType<typeof this.generateDataset>> {
    return this.generateDataset({
      variations: {
        blurLevels: [0, 1, 2, 3],
        resolutions: [512, 768, 1024, 2048],
        documentStyles: ['simple', 'complex', 'international'],
        languages: ['en', 'es', 'fr', 'de'],
        currencies: ['USD', 'EUR', 'GBP', 'JPY'],
      },
      baseTemplate: baseInvoiceTemplate,
      count,
      seed,
    });
  }
}

/**
 * Example usage of the InvoiceExtractorDatasetGenerator
 */
export async function createInvoiceDataset(count = 100, seed = 42) {
  const generator = new InvoiceExtractorDatasetGenerator();
  return generator.createStandardDataset(count, seed);
}
