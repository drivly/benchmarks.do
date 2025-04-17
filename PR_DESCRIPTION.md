# ENG-623: Set up benchmarks.do repository

This PR creates a new repository for benchmarks.do that will house benchmarks for common business use cases using AI functions.

## Changes

- Set up package.json with dependencies (evals.do, functions.do, autoevals)
- Set up tsconfig.json with proper configuration
- Created directory structure for different business use cases
- Added sample synthetic datasets for each business domain:
  - Backoffice: Invoice data
  - Contracts: NDA sample
  - Customer Service: Support inquiries
  - Content: Marketing prompts
- Created benchmark definition stubs following the pattern from drivly/ai/evals
- Added models.ts with list of models to test against

## Testing

The repository structure has been set up with all required files and dependencies installed.

Link to Devin run: https://app.devin.ai/sessions/d1991f5d4f0a47d994adb358b084d182
Requested by: Nathan Clevenger (nateclev@gmail.com)
