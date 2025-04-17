# TODO: LLM Benchmarking for Business Use Cases

## Project Structure
- [ ] Set up GitHub Actions for on-demand benchmarks
- [ ] Structure repository for benchmark categories:
  - Information Extraction
  - Context-Aware Next-Step Decision Classification
  - Structured Text Classification
  - Agentic Tool Use

## Tasks by Category

### Information Extraction
- [ ] Synthetic dataset creation
  - [ ] Create sample documents with embedded information (invoices, receipts, reports)
  - [ ] Establish ground truth annotations for extraction targets
  - [ ] Implement data augmentation for variations
- [ ] Benchmark implementation
  - [ ] Define extraction tasks (e.g., extract key fields from invoices/documents)
  - [ ] Implement benchmark using evalite pattern
  - [ ] Configure AI function calls for extraction
- [ ] Evaluation metrics
  - [ ] Field accuracy metrics
  - [ ] Field completeness metrics
  - [ ] Format compliance metrics
- [ ] Reporting mechanisms
  - [ ] Generate extraction accuracy reports
  - [ ] Visualize extraction performance across models

### Context-Aware Next-Step Decision Classification
- [ ] Synthetic dataset creation
  - [ ] Generate sequences of business events
  - [ ] Create decision points with context
  - [ ] Establish expected next steps based on context
- [ ] Benchmark implementation
  - [ ] Define decision classification tasks
  - [ ] Implement benchmark using evalite pattern
  - [ ] Configure AI function calls for decision making
- [ ] Evaluation metrics
  - [ ] Decision accuracy metrics
  - [ ] Context utilization metrics
  - [ ] Confidence score evaluation
- [ ] Reporting mechanisms
  - [ ] Generate decision quality reports
  - [ ] Compare model decision patterns

### Structured Text Classification
- [ ] Synthetic dataset creation
  - [ ] Generate business documents with varying structures
  - [ ] Create classification schemas
  - [ ] Establish ground truth classifications
- [ ] Benchmark implementation
  - [ ] Define text classification tasks
  - [ ] Implement benchmark using evalite pattern
  - [ ] Configure AI function calls for classification
- [ ] Evaluation metrics
  - [ ] Classification accuracy metrics
  - [ ] Multi-label classification metrics
  - [ ] Confidence score evaluation
- [ ] Reporting mechanisms
  - [ ] Generate classification reports
  - [ ] Visualize classification performance across models

### Agentic Tool Use
- [ ] Synthetic dataset creation
  - [ ] Define tool interfaces and capabilities
  - [ ] Create scenarios requiring tool use
  - [ ] Establish expected tool usage patterns
- [ ] Benchmark implementation
  - [ ] Define agentic tasks requiring tool use
  - [ ] Implement benchmark using evalite pattern
  - [ ] Configure AI function calls with tool access
- [ ] Evaluation metrics
  - [ ] Tool selection accuracy
  - [ ] Tool usage efficiency
  - [ ] Task completion metrics
- [ ] Reporting mechanisms
  - [ ] Generate tool usage reports
  - [ ] Analyze tool selection patterns
