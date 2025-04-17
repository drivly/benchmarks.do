import { InvoiceExtractorDatasetGenerator, invoiceSchema } from './invoice';

/**
 * Example script demonstrating how to use the synthetic dataset generator
 */
async function main() {
  const generator = new InvoiceExtractorDatasetGenerator();
  
  const standardDataset = await generator.createStandardDataset(100, 42);
  console.log(`Generated standard dataset with ${standardDataset.items.length} items`);
  
  const customDataset = await generator.generateDataset({
    variations: {
      blurLevels: [0, 2], // Only use no blur and medium blur
      resolutions: [768, 1536], // Only use medium and high resolution
      documentStyles: ['simple', 'international'], // Only use simple and international styles
      languages: ['en', 'fr'], // Only use English and French
    },
    baseTemplate: {
      vendorName: 'Custom Vendor Inc.',
      customerName: 'Custom Customer LLC',
    },
    count: 50, // Generate fewer items
    seed: 123, // Use a different seed
  });
  console.log(`Generated custom dataset with ${customDataset.items.length} items`);
  
  console.log('\nSample from standard dataset:');
  console.log(JSON.stringify(standardDataset.items[0], null, 2));
  
  console.log('\nSample from custom dataset:');
  console.log(JSON.stringify(customDataset.items[0], null, 2));
}

export { main as runDatasetGeneratorExample };

export default main;
