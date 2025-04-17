# benchmarks.do

Large Language Model Benchmarks & Eval Suite for Business Use Cases, using functions.do, llm.do, models.do, and evals.do

## Overview

This repository houses benchmarks for AI functions focused on business use cases. It leverages evals.do and functions.do SDKs to create both deterministic benchmarks (for data extraction, contract review) and non-deterministic benchmarks (for content generation) using autoevals.

## Business Domains

- **Backoffice**: Invoice processing, receipt data extraction, tax document analysis
- **Contracts**: Contract review, clause analysis, legal document processing
- **Customer Service**: Support ticket handling, inquiry response generation
- **Content**: Marketing copy, ad text, and blog post generation

## Document Benchmark Datasets

This section outlines the document datasets planned for use in our benchmark suite. We aim to expand our benchmarks to include PDF documents and other formats to create a more comprehensive evaluation of AI functions across different document types.

| Category | Document Type | Format | Source Type | Source | Status |
|----------|--------------|--------|-------------|--------|--------|
| Backoffice | W2 Tax Forms | JPG | Synthetic | Internal | Implemented |
| Backoffice | Invoices | PDF | Public | [TBD] | Planned |
| Backoffice | Receipts | PDF | Synthetic | [TBD] | Planned |
| Contracts | NDAs | Text | Synthetic | Internal | Implemented |
| Contracts | Service Agreements | PDF | Public | [TBD] | Planned |
| Content | Marketing Copy | MD | Public | [TBD] | Planned |

## Usage

```typescript
// Import specific benchmarks
import './benchmarks/backoffice.benchmark'
```

## License

MIT
