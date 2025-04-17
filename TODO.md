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

#### Business Use Cases for Information Extraction
- [x] Invoice Data Extraction Benchmark
- [ ] Resume Parsing Benchmark
  - **Industry Variations**:
    - All verticals (hiring pipeline for any company)
    - Tech/IT: Focus on technical skills, certifications, and project experience
    - Financial Services: Emphasis on compliance certifications, regulatory experience
    - Manufacturing/Automotive: Focus on specialized technical skills and safety certifications
    - Insurance: Emphasis on customer service experience, claims handling, and compliance knowledge
  - **Data Format**: JSON and PDF/image formats of resumes with varying layouts (chronological, functional, hybrid)
  - **Ground Truth**: Manually annotated fields including contact information, education, work experience, skills, certifications
  - **Evaluation Metrics**: Field extraction accuracy, field completeness, handling of ambiguous information
  - **Complexity Levels**:
    - Low: Well-structured resumes with clear section headings
    - Medium: Mixed format resumes with some non-standard sections
    - High: Creative resumes with unusual layouts, multiple languages, or specialized terminology
  - **Implementation Approach**: Generate synthetic resumes using templates and industry-specific terminology databases

- [ ] Contract Clause Extraction Benchmark
  - **Industry Variations**:
    - Financial Services: Loan agreements, credit terms, investment contracts
    - Insurance: Policy documents, coverage terms, exclusion clauses
    - Manufacturing: Supplier contracts, warranty terms, service level agreements
    - Automotive: Dealer agreements, warranty documents, financing terms
  - **Data Format**: Plain text and PDF formats with varying complexity and formatting
  - **Ground Truth**: Expert-annotated clauses with categorization and importance rating
  - **Evaluation Metrics**: Clause identification accuracy, relevance scoring, completeness of extraction
  - **Complexity Levels**:
    - Low: Standard contracts with clear section headings
    - Medium: Contracts with nested clauses and references
    - High: Complex legal documents with industry-specific terminology and cross-references
  - **Implementation Approach**: Adapt from existing contract review benchmark with expanded clause types and industry variations

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

#### Business Use Cases for Context-Aware Next-Step Decision Classification
- [ ] Insurance Claim Processing Benchmark
  - **Industry Variations**:
    - Insurance: Auto/home claim triage (damage assessment, coverage verification, fraud detection)
    - Automotive: Warranty claims (part failure analysis, coverage determination, repair authorization)
    - Financial Services: Credit card insurance claims (purchase protection, travel insurance, extended warranty)
  - **Data Format**: JSON with claim details, policy information, and supporting documentation references
  - **Ground Truth**: Expert-determined next steps, approval/denial decisions with rationale
  - **Evaluation Metrics**: Decision accuracy, policy compliance, explanation quality
  - **Complexity Levels**:
    - Low: Standard claims with clear documentation and policy coverage
    - Medium: Claims requiring additional documentation or clarification
    - High: Edge cases with ambiguous policy coverage or potential fraud indicators
  - **Implementation Approach**: Generate synthetic claims using policy templates and common claim scenarios

- [ ] Loan Application Decision Benchmark
  - **Industry Variations**:
    - Financial Services: Personal loan/mortgage underwriting (credit assessment, income verification, risk analysis)
    - Insurance: Policy approval (risk assessment, premium calculation, coverage determination)
    - Retail Auto: Auto loan financing (credit worthiness, vehicle valuation, term determination)
  - **Data Format**: JSON with applicant information, financial data, and supporting documentation references
  - **Ground Truth**: Expert-determined approval/denial decisions with conditions and rationale
  - **Evaluation Metrics**: Decision accuracy, risk assessment quality, explanation clarity
  - **Complexity Levels**:
    - Low: Clear approve/deny cases based on standard criteria
    - Medium: Cases requiring additional conditions or modifications
    - High: Edge cases with compensating factors or special considerations
  - **Implementation Approach**: Generate synthetic applications using financial profiles and industry-specific criteria

- [ ] Order Fulfillment Next-Step Benchmark
  - **Industry Variations**:
    - Retail: Online order shipment (inventory check, shipping method selection, special handling)
    - Manufacturing: Production order scheduling (material availability, capacity planning, priority determination)
    - Automotive: Spare parts order handling (part identification, availability check, delivery scheduling)
  - **Data Format**: JSON with order details, inventory status, customer information, and fulfillment constraints
  - **Ground Truth**: Expert-determined next actions, prioritization decisions, and handling instructions
  - **Evaluation Metrics**: Decision appropriateness, efficiency optimization, constraint satisfaction
  - **Complexity Levels**:
    - Low: Standard orders with available inventory and no special requirements
    - Medium: Orders with partial availability or special handling needs
    - High: Complex orders with multiple constraints, substitutions, or priority conflicts
  - **Implementation Approach**: Generate synthetic orders using product catalogs and common ordering patterns

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

#### Business Use Cases for Structured Text Classification
- [ ] Support Ticket Classification Benchmark
  - **Industry Variations**:
    - Tech/IT: Internal helpdesk tickets (software issues, access requests, hardware problems)
    - Retail: Customer service emails (order issues, product questions, return requests)
    - Automotive: Maintenance inquiries (service scheduling, warranty claims, part availability)
    - Insurance: IT support tickets (system access, application issues, security concerns)
  - **Data Format**: JSON with ticket text, metadata, and contextual information
  - **Ground Truth**: Expert-labeled categories, priority levels, and routing information
  - **Evaluation Metrics**: Classification accuracy, priority assignment accuracy, response time prediction
  - **Complexity Levels**:
    - Low: Clear single-issue tickets with explicit requests
    - Medium: Multi-issue tickets requiring categorization
    - High: Ambiguous tickets with implicit requests and emotional content
  - **Implementation Approach**: Generate synthetic tickets using templates and industry-specific issue patterns

- [ ] Customer Feedback Analysis Benchmark
  - **Industry Variations**:
    - Retail: Product review sentiment (quality, usability, value assessment)
    - Automotive: Service feedback (dealer experience, repair quality, customer service)
    - Insurance: Complaint analysis (claims handling, policy clarity, customer service)
    - Financial Services: Survey responses (service quality, app usability, recommendation likelihood)
  - **Data Format**: JSON with feedback text, rating scales, and contextual information
  - **Ground Truth**: Expert-labeled sentiment, key issues, actionable insights
  - **Evaluation Metrics**: Sentiment accuracy, issue identification precision, actionability of extracted insights
  - **Complexity Levels**:
    - Low: Direct feedback with clear sentiment and specific issues
    - Medium: Mixed sentiment feedback with multiple topics
    - High: Nuanced feedback with implicit issues and comparative references
  - **Implementation Approach**: Adapt from existing customer service benchmark with focus on sentiment and issue extraction

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

#### Business Use Cases for Agentic Tool Use
- [ ] Calendar/Tool Use Benchmark
  - **Industry Variations**:
    - All verticals: Meeting scheduling, data retrieval, task management
    - Finance: Financial data API calls, transaction analysis, reporting automation
    - HR: Employee data lookup, onboarding process automation, benefits management
  - **Data Format**: JSON with request details, available tools/APIs, and contextual constraints
  - **Ground Truth**: Expert-determined tool selection, parameter configuration, and execution sequence
  - **Evaluation Metrics**: Tool selection appropriateness, parameter accuracy, execution efficiency
  - **Complexity Levels**:
    - Low: Single tool use with clear parameters
    - Medium: Multi-step processes requiring sequential tool use
    - High: Complex scenarios requiring conditional logic and error handling
  - **Implementation Approach**: Create synthetic scenarios with mock API endpoints and tool documentation

## Implementation Priority

1. Resume Parsing Benchmark (Information Extraction)
2. Support Ticket Classification Benchmark (Structured Text Classification)
3. Insurance Claim Processing Benchmark (Context-Aware Next-Step Decision)
4. Calendar/Tool Use Benchmark (Agentic Tool Use)
5. Customer Feedback Analysis Benchmark (Structured Text Classification)
6. Loan Application Decision Benchmark (Context-Aware Next-Step Decision)
7. Contract Clause Extraction Benchmark (Information Extraction)
8. Order Fulfillment Next-Step Benchmark (Context-Aware Next-Step Decision)

## Key Design Decisions

1. **Data Format Standardization**: JSON as the primary format for structured data, with additional formats (PDF, images) for specific use cases requiring document processing
2. **Synthetic Data Variation**: 3-5 variations per industry vertical to ensure adequate coverage of domain-specific terminology and scenarios
3. **Complexity Gradation**: Three levels (low/medium/high) defined specifically for each use case to ensure appropriate challenge progression
4. **Ground Truth Methodology**: Expert-annotated data for deterministic tasks, consensus-based approach for subjective decision tasks
5. **Industry Terminology Sources**: Industry glossaries, professional documentation, and domain-specific corpora
6. **Synthetic Data Generation**: Combination of templated generation with randomized elements and manual review for quality assurance
