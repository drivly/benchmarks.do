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

## Implementation Plan

The implementation of the `benchmarks.do` benchmark suite will proceed in five structured phases:

### Phase 1: Foundation and Infrastructure (2 weeks)
- Complete repository structure setup
  - Finalize directory structure for benchmark categories
  - Set up GitHub Actions for on-demand benchmarks
  - Standardize dataset formats across benchmark types
- Develop synthetic data generation framework
  - Create tools for generating benchmark-specific synthetic data
  - Implement data augmentation capabilities for variations
  - Establish ground truth annotation methodology
- Implement core evaluation metrics
  - Define common metrics applicable across benchmark types
  - Create benchmark-specific scoring systems
  - Set up visualization and reporting mechanisms

### Phase 2: Priority Benchmark Implementation (4 weeks)
- Resume Parsing Benchmark (Information Extraction)
  - Develop synthetic resume dataset with varying complexities
  - Implement benchmark using evalite pattern
  - Create field extraction accuracy and completeness metrics
- Support Ticket Classification Benchmark (Structured Text Classification)
  - Generate synthetic support tickets with multiple complexity levels
  - Implement classification benchmark using evalite pattern
  - Establish classification accuracy and confidence scoring
- Insurance Claim Processing Benchmark (Context-Aware Decision)
  - Create synthetic insurance claim scenarios
  - Implement decision-making benchmark using evalite pattern
  - Define decision accuracy and rationale quality metrics
- Calendar/Tool Use Benchmark (Agentic Tool Use)
  - Develop mock tool interfaces and usage scenarios
  - Implement tool use benchmark using evalite pattern
  - Create tool selection and usage efficiency metrics

### Phase 3: Secondary Benchmark Implementation (4 weeks)
- Customer Feedback Analysis Benchmark (Structured Text Classification)
- Loan Application Decision Benchmark (Context-Aware Decision)
- Contract Clause Extraction Benchmark (Information Extraction)
- Order Fulfillment Next-Step Benchmark (Context-Aware Decision)
- Implementation following established patterns from Phase 2

### Phase 4: Refinement and Documentation
- Comprehensive documentation of benchmark methodologies
- Fine-tuning of evaluation metrics based on initial results
- Performance optimization for benchmark execution
- Standardization of outputs and reporting formats

### Phase 5: Validation and Expansion
- Validation with real-world data samples
- Expansion to additional business domains
- Integration with broader AI evaluation frameworks
- Development of continuous benchmarking capabilities

## License

MIT
