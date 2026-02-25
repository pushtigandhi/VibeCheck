#!/usr/bin/env node

/**
 * Setup script for ReAct Testing Agent
 * Installs dependencies and configures Jest
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

class SetupScript {
    constructor() {
        this.projectRoot = process.cwd();
        this.testingDir = path.join(this.projectRoot, 'testing');
    }

    async setup() {
        console.log('🚀 Setting up ReAct Testing Agent...');
        
        try {
            await this.installDependencies();
            await this.createDirectories();
            await this.updateMainPackageJson();
            await this.createJestConfig();
            await this.createGitIgnore();
            await this.createReadme();
            
            console.log('✅ Setup completed successfully!');
            console.log('\n📖 Next steps:');
            console.log('1. Run: npm run test:agent help');
            console.log('2. Test a component: npm run test:component ../screens/HomeScreen.js');
            console.log('3. Run all tests: npm run test:all');
            console.log('4. Analyze components: npm run analyze');
            
        } catch (error) {
            console.error('❌ Setup failed:', error.message);
            process.exit(1);
        }
    }

    async installDependencies() {
        console.log('📦 Installing testing dependencies...');
        
        const dependencies = [
            '@babel/core',
            '@babel/preset-env',
            '@babel/preset-react',
            '@babel/preset-typescript',
            '@babel/traverse',
            '@babel/generator',
            '@babel/parser',
            '@testing-library/react-native',
            'jest',
            'jest-environment-node',
            'react-test-renderer@18.3.1',
            'metro-react-native-babel-preset'
        ];

        const installCommand = `npm install --save-dev ${dependencies.join(' ')} --legacy-peer-deps`;
        
        try {
            execSync(installCommand, { 
                cwd: this.projectRoot,
                stdio: 'inherit' 
            });
            console.log('✅ Dependencies installed');
        } catch (error) {
            console.error('❌ Failed to install dependencies:', error.message);
            throw error;
        }
    }

    async createDirectories() {
        console.log('📁 Creating directory structure...');
        
        const directories = [
            'testing/generated',
            'testing/reports',
            'testing/examples',
            'coverage'
        ];

        directories.forEach(dir => {
            const fullPath = path.join(this.projectRoot, dir);
            if (!fs.existsSync(fullPath)) {
                fs.mkdirSync(fullPath, { recursive: true });
                console.log(`   Created: ${dir}`);
            }
        });
    }

    async updateMainPackageJson() {
        console.log('📝 Updating main package.json...');
        
        const packageJsonPath = path.join(this.projectRoot, 'package.json');
        
        if (!fs.existsSync(packageJsonPath)) {
            console.log('⚠️  package.json not found, skipping update');
            return;
        }

        try {
            const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
            
            // Add test scripts
            packageJson.scripts = {
                ...packageJson.scripts,
                'test': 'jest',
                'test:watch': 'jest --watch',
                'test:coverage': 'jest --coverage',
                'test:agent': 'node testing/index.js',
                'test:component': 'node testing/index.js test',
                'test:all': 'node testing/index.js test-all',
                'analyze': 'node testing/index.js analyze'
            };

            // Add Jest configuration
            packageJson.jest = {
                preset: 'react-native',
                setupFilesAfterEnv: ['<rootDir>/testing/setup.js'],
                testMatch: [
                    '**/testing/**/*.test.js',
                    '**/testing/generated/**/*.test.js'
                ],
                collectCoverageFrom: [
                    'screens/**/*.{js,jsx}',
                    'components/**/*.{js,jsx}',
                    'utils/**/*.{js,jsx}',
                    '!**/node_modules/**',
                    '!**/testing/**'
                ],
                coverageDirectory: 'coverage',
                coverageReporters: ['text', 'lcov', 'html', 'json'],
                transform: {
                    '^.+\\.(js|jsx)$': 'babel-jest'
                },
                transformIgnorePatterns: [
                    'node_modules/(?!(react-native|@react-native|@react-navigation|expo|@expo|react-native-calendars|react-native-dropdown-picker|react-native-element-dropdown|react-native-phone-input|react-native-switch-selector|react-native-tab-view|react-native-worklets)/)'
                ],
                moduleNameMapping: {
                    '^@/(.*)$': '<rootDir>/$1',
                    '^@components/(.*)$': '<rootDir>/components/$1',
                    '^@screens/(.*)$': '<rootDir>/screens/$1',
                    '^@utils/(.*)$': '<rootDir>/utils/$1',
                    '^@constants/(.*)$': '<rootDir>/constants/$1'
                },
                testEnvironment: 'node',
                verbose: true,
                clearMocks: true,
                resetMocks: true,
                restoreMocks: true
            };

            fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
            console.log('✅ Updated package.json');
            
        } catch (error) {
            console.error('❌ Failed to update package.json:', error.message);
            throw error;
        }
    }

    async createJestConfig() {
        console.log('⚙️  Creating Jest configuration...');
        
        const jestConfigPath = path.join(this.projectRoot, 'jest.config.js');
        
        const jestConfig = `module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/testing/setup.js'],
  testMatch: [
    '**/testing/**/*.test.js',
    '**/testing/generated/**/*.test.js'
  ],
  collectCoverageFrom: [
    'screens/**/*.{js,jsx}',
    'components/**/*.{js,jsx}',
    'utils/**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/testing/**'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html', 'json'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|expo|@expo|react-native-calendars|react-native-dropdown-picker|react-native-element-dropdown|react-native-phone-input|react-native-switch-selector|react-native-tab-view|react-native-worklets)/)'
  ],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@components/(.*)$': '<rootDir>/components/$1',
    '^@screens/(.*)$': '<rootDir>/screens/$1',
    '^@utils/(.*)$': '<rootDir>/utils/$1',
    '^@constants/(.*)$': '<rootDir>/constants/$1'
  },
  testEnvironment: 'node',
  verbose: true,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true
};`;

        fs.writeFileSync(jestConfigPath, jestConfig);
        console.log('✅ Created jest.config.js');
    }

    async createGitIgnore() {
        console.log('📝 Creating .gitignore entries...');
        
        const gitIgnorePath = path.join(this.projectRoot, '.gitignore');
        const gitIgnoreEntries = [
            '',
            '# Testing',
            'coverage/',
            'testing/generated/',
            'testing/reports/',
            '*.test.js',
            '*.test.jsx',
            '*.test.ts',
            '*.test.tsx'
        ];

        if (fs.existsSync(gitIgnorePath)) {
            const existingContent = fs.readFileSync(gitIgnorePath, 'utf8');
            if (!existingContent.includes('# Testing')) {
                fs.appendFileSync(gitIgnorePath, gitIgnoreEntries.join('\n'));
                console.log('✅ Updated .gitignore');
            } else {
                console.log('✅ .gitignore already contains testing entries');
            }
        } else {
            fs.writeFileSync(gitIgnorePath, gitIgnoreEntries.join('\n'));
            console.log('✅ Created .gitignore');
        }
    }

    async createReadme() {
        console.log('📖 Creating README...');
        
        const readmePath = path.join(this.testingDir, 'README.md');
        
        const readme = `# ReAct Testing Agent

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
\`\`\`bash
npm run setup
\`\`\`

### 2. Test a Single Component
\`\`\`bash
npm run test:component ../screens/HomeScreen.js
\`\`\`

### 3. Test All Components
\`\`\`bash
npm run test:all
\`\`\`

### 4. Analyze Components
\`\`\`bash
npm run analyze
\`\`\`

## CLI Commands

\`\`\`bash
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
\`\`\`

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

\`\`\`javascript
const options = {
  includeApiTests: true,
  includeNavigationTests: true,
  includeEdgeCases: true,
  customTestCases: ['custom-test-1', 'custom-test-2']
};

const result = await agent.testComponent(componentPath, options);
\`\`\`

## Examples

### Basic Usage
\`\`\`javascript
import ReactTestingAgent from './testing/ReactAgent.js';

const agent = new ReactTestingAgent();
const result = await agent.testComponent('./screens/HomeScreen.js');
console.log('Coverage:', result.coverage.coverage);
\`\`\`

### Custom Test Generation
\`\`\`javascript
import { TestRunner } from './testing/TestRunner.js';

const runner = new TestRunner();
const results = await runner.runAllTests('./components');
const report = runner.generateReport(results);
await runner.saveReport(report);
\`\`\`

## File Structure

\`\`\`
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
\`\`\`

## Troubleshooting

### Common Issues

1. **Module not found errors**: Ensure all dependencies are installed
2. **Mock failures**: Check that mocks are properly configured in setup.js
3. **Coverage issues**: Verify Jest configuration and file patterns

### Debug Mode

Run tests with verbose output:
\`\`\`bash
npm run test:coverage -- --verbose
\`\`\`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
`;

        fs.writeFileSync(readmePath, readme);
        console.log('✅ Created README.md');
    }
}

// Run setup if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    const setup = new SetupScript();
    setup.setup().catch(console.error);
}

export default SetupScript;
