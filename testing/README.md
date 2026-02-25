# ReAct Testing Agent

A sophisticated AI-powered testing agent that uses the ReAct (Reasoning + Acting) paradigm to automatically generate and run unit tests for React Native components.

## Features

- 🤖 **AI-Powered Analysis**: Automatically analyzes component structure, dependencies, and complexity
- 🧪 **Smart Test Generation**: Generates appropriate test cases based on component analysis
- 📊 **Coverage Reporting**: Provides detailed test coverage reports
- 🎯 **Multiple Test Types**: Supports render, interaction, API, navigation, and edge case tests
- 📈 **Quality Assessment**: Evaluates test quality and provides improvement suggestions
- 🚀 **Easy Integration**: Simple CLI interface for running tests

## Quick Start

### 1. Setup
```bash
npm run setup
```

### 2. Test a Single Component
```bash
npm run test:component ../screens/HomeScreen.js
```

### 3. Test All Components
```bash
npm run test:all
```

### 4. Analyze Components
```bash
npm run analyze
```

## CLI Commands

```bash
# Test a single component
node testing/index.js test <component-path>

# Test all components in a directory
node testing/index.js test-all [directory]

# Analyze components without running tests
node testing/index.js analyze [directory]

# Display existing report
node testing/index.js report <report-path>

# Show help
node testing/index.js help
```

## How It Works

The ReAct Testing Agent follows a three-step process:

### 1. REASON
- Analyzes component structure and dependencies
- Identifies props, state, effects, and event handlers
- Assesses complexity and testability
- Determines appropriate test strategies

### 2. ACT
- Generates test cases based on analysis
- Creates appropriate mocks and setup
- Writes test files with proper structure
- Configures test environment

### 3. OBSERVE
- Runs tests and collects results
- Generates coverage reports
- Validates test quality
- Provides improvement suggestions

## Test Types Generated

- **Render Tests**: Verify components render without crashing
- **Interaction Tests**: Test user interactions and event handlers
- **State Tests**: Verify state management and updates
- **API Tests**: Mock and test API calls
- **Navigation Tests**: Test navigation behavior
- **Edge Case Tests**: Test error handling and edge cases

## Configuration

The agent can be configured through options:

```javascript
const options = {
  includeApiTests: true,
  includeNavigationTests: true,
  includeEdgeCases: true,
  customTestCases: ['custom-test-1', 'custom-test-2']
};

const result = await agent.testComponent(componentPath, options);
```

## Examples

### Basic Usage
```javascript
import ReactTestingAgent from './testing/ReactAgent.js';

const agent = new ReactTestingAgent();
const result = await agent.testComponent('./screens/HomeScreen.js');
console.log('Coverage:', result.coverage.coverage);
```

### Custom Test Generation
```javascript
import { TestRunner } from './testing/TestRunner.js';

const runner = new TestRunner();
const results = await runner.runAllTests('./components');
const report = runner.generateReport(results);
await runner.saveReport(report);
```

## File Structure

```
testing/
├── ReactAgent.js          # Core ReAct agent implementation
├── TestRunner.js          # Test execution and reporting
├── setup.js              # Jest setup and mocks
├── index.js              # CLI entry point
├── demo.js               # Example usage and demos
├── package.json          # Testing dependencies
├── generated/            # Generated test files
├── reports/              # Test reports
└── examples/            # Example test files
```

## Troubleshooting

### Common Issues

1. **Module not found errors**: Ensure all dependencies are installed
2. **Mock failures**: Check that mocks are properly configured in setup.js
3. **Coverage issues**: Verify Jest configuration and file patterns

### Debug Mode

Run tests with verbose output:
```bash
npm run test:coverage -- --verbose
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
