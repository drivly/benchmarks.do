# benchmarks.do

Large Language Model Benchmarks & Eval Suite for Business Use Cases, using functions.do, llm.do, models.do, and evals.do

## Overview

This repository houses benchmarks for AI functions focused on business use cases. It leverages evals.do and functions.do SDKs to create both deterministic benchmarks (for data extraction, contract review) and non-deterministic benchmarks (for content generation) using autoevals.

## Business Domains

- **Backoffice**: Invoice processing, receipt data extraction, tax document analysis
- **Contracts**: Contract review, clause analysis, legal document processing
- **Customer Service**: Support ticket handling, inquiry response generation
- **Content**: Marketing copy, ad text, and blog post generation

## Usage

```typescript
// Import specific benchmarks
import './benchmarks/backoffice.benchmark'
```

## License

MIT
