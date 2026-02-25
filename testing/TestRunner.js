/**
 * Test Runner and CLI Interface for ReAct Testing Agent
 */

import ReactTestingAgent from './ReactAgent.js';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

class TestRunner {
    constructor() {
        this.agent = new ReactTestingAgent();
        this.testResults = [];
        this.coverageReport = null;
    }

    /**
     * Run tests for a specific component
     */
    async runComponentTests(componentPath, options = {}) {
        console.log(`🚀 Running tests for: ${componentPath}`);
        
        try {
            // Generate tests using ReAct agent
            const result = await this.agent.testComponent(componentPath, options);
            
            // Save test file
            const testPath = await this.agent.saveTestFile(result.tests, './testing/generated');
            
            // Run the tests
            const testResults = await this.executeTests(testPath);
            
            // Generate coverage report
            const coverage = await this.generateCoverageReport(componentPath, testPath);
            
            return {
                component: componentPath,
                testFile: testPath,
                results: testResults,
                coverage: coverage,
                analysis: result.analysis,
                agent: {
                    reasoning: result.reasoningSteps,
                    actions: result.actions,
                    observations: result.observations
                }
            };
        } catch (error) {
            console.error(`❌ Error testing component ${componentPath}:`, error.message);
            throw error;
        }
    }

    /**
     * Run tests for all components in a directory
     */
    async runAllTests(directoryPath, options = {}) {
        console.log(`🔍 Scanning directory: ${directoryPath}`);
        
        const components = this.findReactComponents(directoryPath);
        console.log(`Found ${components.length} components to test`);
        
        const results = [];
        
        for (const component of components) {
            try {
                const result = await this.runComponentTests(component, options);
                results.push(result);
                console.log(`✅ Completed testing: ${path.basename(component)}`);
            } catch (error) {
                console.error(`❌ Failed testing: ${path.basename(component)}`);
                results.push({
                    component,
                    error: error.message,
                    success: false
                });
            }
        }
        
        return results;
    }

    /**
     * Execute Jest tests
     */
    async executeTests(testPath) {
        try {
            const command = `npx jest ${testPath} --verbose --coverage`;
            const output = execSync(command, { 
                encoding: 'utf8',
                cwd: process.cwd(),
                stdio: 'pipe'
            });
            
            return {
                success: true,
                output: output,
                passed: this.extractTestResults(output).passed,
                failed: this.extractTestResults(output).failed
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                output: error.stdout || error.stderr
            };
        }
    }

    /**
     * Generate coverage report
     */
    async generateCoverageReport(componentPath, testPath) {
        try {
            const command = `npx jest ${testPath} --coverage --coverageReporters=text --coverageReporters=json`;
            const output = execSync(command, { 
                encoding: 'utf8',
                cwd: process.cwd(),
                stdio: 'pipe'
            });
            
            // Try to read coverage report
            const coveragePath = path.join(process.cwd(), 'coverage', 'coverage-final.json');
            if (fs.existsSync(coveragePath)) {
                const coverageData = JSON.parse(fs.readFileSync(coveragePath, 'utf8'));
                return this.parseCoverageData(coverageData, componentPath);
            }
            
            return { coverage: 'unknown', details: output };
        } catch (error) {
            return { coverage: 'error', error: error.message };
        }
    }

    /**
     * Find React components in directory
     */
    findReactComponents(directoryPath) {
        const components = [];
        
        const scanDirectory = (dir) => {
            const files = fs.readdirSync(dir);
            
            for (const file of files) {
                const fullPath = path.join(dir, file);
                const stat = fs.statSync(fullPath);
                
                if (stat.isDirectory()) {
                    scanDirectory(fullPath);
                } else if (this.isReactComponent(fullPath)) {
                    components.push(fullPath);
                }
            }
        };
        
        scanDirectory(directoryPath);
        return components;
    }

    /**
     * Check if file is a React component
     */
    isReactComponent(filePath) {
        const ext = path.extname(filePath);
        if (!['.js', '.jsx', '.ts', '.tsx'].includes(ext)) return false;
        
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            return content.includes('React') || 
                   content.includes('export') || 
                   content.includes('function') ||
                   content.includes('const') && content.includes('=');
        } catch {
            return false;
        }
    }

    /**
     * Extract test results from Jest output
     */
    extractTestResults(output) {
        const passedMatch = output.match(/(\d+) passing/);
        const failedMatch = output.match(/(\d+) failing/);
        
        return {
            passed: passedMatch ? parseInt(passedMatch[1]) : 0,
            failed: failedMatch ? parseInt(failedMatch[1]) : 0
        };
    }

    /**
     * Parse coverage data
     */
    parseCoverageData(coverageData, componentPath) {
        const relativePath = path.relative(process.cwd(), componentPath);
        const fileCoverage = coverageData[path.resolve(componentPath)];
        
        if (!fileCoverage) {
            return { coverage: 'not found', path: relativePath };
        }
        
        return {
            path: relativePath,
            statements: fileCoverage.s,
            branches: fileCoverage.b,
            functions: fileCoverage.f,
            lines: fileCoverage.l,
            coverage: this.calculateOverallCoverage(fileCoverage)
        };
    }

    /**
     * Calculate overall coverage percentage
     */
    calculateOverallCoverage(fileCoverage) {
        const statements = Object.values(fileCoverage.s).filter(val => val > 0).length;
        const totalStatements = Object.keys(fileCoverage.s).length;
        
        return totalStatements > 0 ? Math.round((statements / totalStatements) * 100) : 0;
    }

    /**
     * Generate test report
     */
    generateReport(results) {
        const report = {
            summary: {
                total: results.length,
                passed: results.filter(r => r.results?.success).length,
                failed: results.filter(r => !r.results?.success).length,
                coverage: this.calculateAverageCoverage(results)
            },
            components: results.map(result => ({
                name: path.basename(result.component),
                path: result.component,
                success: result.results?.success || false,
                coverage: result.coverage?.coverage || 'unknown',
                testCount: result.results?.passed + result.results?.failed || 0,
                analysis: result.analysis ? {
                    complexity: result.analysis.complexity,
                    testability: result.analysis.testability,
                    dependencies: result.analysis.dependencies.length
                } : null
            })),
            recommendations: this.generateRecommendations(results)
        };
        
        return report;
    }

    /**
     * Calculate average coverage
     */
    calculateAverageCoverage(results) {
        const validCoverage = results
            .map(r => r.coverage?.coverage)
            .filter(c => typeof c === 'number');
        
        if (validCoverage.length === 0) return 0;
        
        return Math.round(validCoverage.reduce((sum, c) => sum + c, 0) / validCoverage.length);
    }

    /**
     * Generate recommendations based on test results
     */
    generateRecommendations(results) {
        const recommendations = [];
        
        const lowCoverage = results.filter(r => r.coverage?.coverage < 70);
        if (lowCoverage.length > 0) {
            recommendations.push({
                type: 'coverage',
                message: `${lowCoverage.length} components have low test coverage (<70%)`,
                components: lowCoverage.map(r => path.basename(r.component))
            });
        }
        
        const highComplexity = results.filter(r => r.analysis?.complexity > 5);
        if (highComplexity.length > 0) {
            recommendations.push({
                type: 'complexity',
                message: `${highComplexity.length} components have high complexity (>5)`,
                components: highComplexity.map(r => path.basename(r.component))
            });
        }
        
        const lowTestability = results.filter(r => r.analysis?.testability === 'low');
        if (lowTestability.length > 0) {
            recommendations.push({
                type: 'testability',
                message: `${lowTestability.length} components have low testability`,
                components: lowTestability.map(r => path.basename(r.component))
            });
        }
        
        return recommendations;
    }

    /**
     * Save report to file
     */
    async saveReport(report, outputPath = './testing/reports') {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const reportPath = path.join(outputPath, `test-report-${timestamp}.json`);
        
        // Ensure directory exists
        if (!fs.existsSync(outputPath)) {
            fs.mkdirSync(outputPath, { recursive: true });
        }
        
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
        console.log(`📊 Report saved: ${reportPath}`);
        
        return reportPath;
    }
}

/**
 * CLI Interface
 */
class TestingCLI {
    constructor() {
        this.runner = new TestRunner();
    }

    /**
     * Main CLI entry point
     */
    async run(args) {
        const command = args[0];
        
        switch (command) {
            case 'test':
                return await this.testCommand(args.slice(1));
            case 'test-all':
                return await this.testAllCommand(args.slice(1));
            case 'analyze':
                return await this.analyzeCommand(args.slice(1));
            case 'report':
                return await this.reportCommand(args.slice(1));
            default:
                return this.showHelp();
        }
    }

    /**
     * Test a single component
     */
    async testCommand(args) {
        const componentPath = args[0];
        if (!componentPath) {
            console.error('❌ Please provide a component path');
            return;
        }
        
        try {
            const result = await this.runner.runComponentTests(componentPath);
            console.log('✅ Test completed successfully');
            console.log(`📊 Coverage: ${result.coverage.coverage}%`);
            console.log(`🧪 Tests: ${result.results.passed} passed, ${result.results.failed} failed`);
            
            return result;
        } catch (error) {
            console.error('❌ Test failed:', error.message);
            throw error;
        }
    }

    /**
     * Test all components
     */
    async testAllCommand(args) {
        const directoryPath = args[0] || './screens';
        
        try {
            const results = await this.runner.runAllTests(directoryPath);
            const report = this.runner.generateReport(results);
            
            console.log('📊 Test Summary:');
            console.log(`Total: ${report.summary.total}`);
            console.log(`Passed: ${report.summary.passed}`);
            console.log(`Failed: ${report.summary.failed}`);
            console.log(`Average Coverage: ${report.summary.coverage}%`);
            
            // Save report
            await this.runner.saveReport(report);
            
            return report;
        } catch (error) {
            console.error('❌ Test suite failed:', error.message);
            throw error;
        }
    }

    /**
     * Analyze components without running tests
     */
    async analyzeCommand(args) {
        const directoryPath = args[0] || './screens';
        
        try {
            const components = this.runner.findReactComponents(directoryPath);
            const analyses = [];
            
            for (const component of components) {
                const analysis = await this.runner.agent.reasonAboutComponent(component);
                analyses.push(analysis);
            }
            
            console.log('🔍 Component Analysis:');
            analyses.forEach(analysis => {
                console.log(`\n📁 ${path.basename(analysis.path)}:`);
                console.log(`   Type: ${analysis.type}`);
                console.log(`   Complexity: ${analysis.complexity}`);
                console.log(`   Testability: ${analysis.testability}`);
                console.log(`   Dependencies: ${analysis.dependencies.length}`);
                console.log(`   Props: ${analysis.props.length}`);
                console.log(`   State: ${analysis.state.length}`);
            });
            
            return analyses;
        } catch (error) {
            console.error('❌ Analysis failed:', error.message);
            throw error;
        }
    }

    /**
     * Generate report from existing results
     */
    async reportCommand(args) {
        const reportPath = args[0];
        if (!reportPath) {
            console.error('❌ Please provide a report path');
            return;
        }
        
        try {
            const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
            this.displayReport(report);
            return report;
        } catch (error) {
            console.error('❌ Failed to read report:', error.message);
            throw error;
        }
    }

    /**
     * Display formatted report
     */
    displayReport(report) {
        console.log('\n📊 Test Report Summary:');
        console.log('='.repeat(50));
        console.log(`Total Components: ${report.summary.total}`);
        console.log(`Passed: ${report.summary.passed}`);
        console.log(`Failed: ${report.summary.failed}`);
        console.log(`Average Coverage: ${report.summary.coverage}%`);
        
        console.log('\n📁 Component Details:');
        console.log('-'.repeat(50));
        report.components.forEach(comp => {
            const status = comp.success ? '✅' : '❌';
            console.log(`${status} ${comp.name}: ${comp.coverage}% coverage, ${comp.testCount} tests`);
        });
        
        if (report.recommendations.length > 0) {
            console.log('\n💡 Recommendations:');
            console.log('-'.repeat(50));
            report.recommendations.forEach(rec => {
                console.log(`⚠️  ${rec.message}`);
                if (rec.components) {
                    console.log(`   Components: ${rec.components.join(', ')}`);
                }
            });
        }
    }

    /**
     * Show help information
     */
    showHelp() {
        console.log(`
🤖 ReAct Testing Agent CLI

Usage: node TestingCLI.js <command> [options]

Commands:
  test <component-path>     Test a single component
  test-all [directory]     Test all components in directory (default: ./screens)
  analyze [directory]       Analyze components without running tests
  report <report-path>     Display existing report
  help                     Show this help message

Examples:
  node TestingCLI.js test ./screens/HomeScreen.js
  node TestingCLI.js test-all ./components
  node TestingCLI.js analyze ./screens
  node TestingCLI.js report ./testing/reports/test-report-2024-01-01.json

For more information, visit: https://github.com/your-repo/react-testing-agent
        `);
    }
}

export { TestRunner, TestingCLI };
export default TestingCLI;
