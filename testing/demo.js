/**
 * Example Usage and Demo Scripts for ReAct Testing Agent
 */

import ReactTestingAgent from './ReactAgent.js';
import { TestRunner } from './TestRunner.js';
import path from 'path';

class TestingAgentDemo {
    constructor() {
        this.agent = new ReactTestingAgent();
        this.runner = new TestRunner();
    }

    /**
     * Demo: Test a single component
     */
    async demoTestSingleComponent() {
        console.log('🎯 Demo: Testing Single Component');
        console.log('='.repeat(50));
        
        const componentPath = '../screens/HomeScreen.js';
        
        try {
            const result = await this.runner.runComponentTests(componentPath);
            
            console.log('\n📊 Results:');
            console.log(`Component: ${path.basename(result.component)}`);
            console.log(`Test File: ${result.testFile}`);
            console.log(`Success: ${result.results.success}`);
            console.log(`Coverage: ${result.coverage.coverage}%`);
            
            console.log('\n🤖 Agent Reasoning:');
            result.agent.reasoning.forEach((step, index) => {
                console.log(`${index + 1}. ${step.step}`);
            });
            
            console.log('\n⚡ Agent Actions:');
            result.agent.actions.forEach((action, index) => {
                console.log(`${index + 1}. ${action.action}`);
            });
            
            console.log('\n👁️ Agent Observations:');
            result.agent.observations.forEach((obs, index) => {
                console.log(`${index + 1}. ${obs.observation}`);
            });
            
        } catch (error) {
            console.error('❌ Demo failed:', error.message);
        }
    }

    /**
     * Demo: Analyze components without testing
     */
    async demoAnalyzeComponents() {
        console.log('🔍 Demo: Component Analysis');
        console.log('='.repeat(50));
        
        const components = [
            '../screens/HomeScreen.js',
            '../components/FilterModal.js',
            '../components/Sidebar.js'
        ];
        
        for (const componentPath of components) {
            try {
                console.log(`\n📁 Analyzing: ${path.basename(componentPath)}`);
                const analysis = await this.agent.reasonAboutComponent(componentPath);
                
                console.log(`   Type: ${analysis.type}`);
                console.log(`   Complexity: ${analysis.complexity}`);
                console.log(`   Testability: ${analysis.testability}`);
                console.log(`   Dependencies: ${analysis.dependencies.length}`);
                console.log(`   Props: ${analysis.props.length}`);
                console.log(`   State Variables: ${analysis.state.length}`);
                console.log(`   Event Handlers: ${analysis.handlers.length}`);
                console.log(`   API Calls: ${analysis.apiCalls.length}`);
                console.log(`   Navigation Usage: ${analysis.navigation.length}`);
                
            } catch (error) {
                console.error(`❌ Failed to analyze ${componentPath}:`, error.message);
            }
        }
    }

    /**
     * Demo: Generate tests for multiple components
     */
    async demoGenerateTests() {
        console.log('🧪 Demo: Test Generation');
        console.log('='.repeat(50));
        
        const components = [
            '../screens/HomeScreen.js',
            '../components/FilterModal.js'
        ];
        
        for (const componentPath of components) {
            try {
                console.log(`\n🎯 Generating tests for: ${path.basename(componentPath)}`);
                
                const result = await this.agent.testComponent(componentPath);
                
                console.log(`   Generated ${result.tests.testCases.length} test cases:`);
                result.tests.testCases.forEach((testCase, index) => {
                    console.log(`   ${index + 1}. ${testCase.name} (${testCase.type})`);
                });
                
                console.log(`   Test Coverage: ${result.tests.validation.coverage}%`);
                console.log(`   Quality Score: ${result.tests.validation.quality}/10`);
                
                if (result.tests.validation.suggestions.length > 0) {
                    console.log('   💡 Suggestions:');
                    result.tests.validation.suggestions.forEach(suggestion => {
                        console.log(`      - ${suggestion}`);
                    });
                }
                
            } catch (error) {
                console.error(`❌ Failed to generate tests for ${componentPath}:`, error.message);
            }
        }
    }

    /**
     * Demo: Run full test suite
     */
    async demoRunTestSuite() {
        console.log('🚀 Demo: Full Test Suite');
        console.log('='.repeat(50));
        
        try {
            const results = await this.runner.runAllTests('../screens');
            const report = this.runner.generateReport(results);
            
            console.log('\n📊 Test Suite Summary:');
            console.log(`Total Components: ${report.summary.total}`);
            console.log(`Passed: ${report.summary.passed}`);
            console.log(`Failed: ${report.summary.failed}`);
            console.log(`Average Coverage: ${report.summary.coverage}%`);
            
            console.log('\n📁 Component Results:');
            report.components.forEach(comp => {
                const status = comp.success ? '✅' : '❌';
                console.log(`${status} ${comp.name}: ${comp.coverage}% coverage, ${comp.testCount} tests`);
            });
            
            if (report.recommendations.length > 0) {
                console.log('\n💡 Recommendations:');
                report.recommendations.forEach(rec => {
                    console.log(`⚠️  ${rec.message}`);
                    if (rec.components) {
                        console.log(`   Components: ${rec.components.join(', ')}`);
                    }
                });
            }
            
        } catch (error) {
            console.error('❌ Test suite failed:', error.message);
        }
    }

    /**
     * Run all demos
     */
    async runAllDemos() {
        console.log('🤖 ReAct Testing Agent - Demo Suite');
        console.log('='.repeat(60));
        
        await this.demoAnalyzeComponents();
        console.log('\n' + '='.repeat(60));
        
        await this.demoGenerateTests();
        console.log('\n' + '='.repeat(60));
        
        await this.demoTestSingleComponent();
        console.log('\n' + '='.repeat(60));
        
        await this.demoRunTestSuite();
        
        console.log('\n🎉 Demo suite completed!');
    }
}

/**
 * Example usage patterns
 */
export const exampleUsage = {
    // Test a single component
    testSingle: async (componentPath) => {
        const runner = new TestRunner();
        return await runner.runComponentTests(componentPath);
    },

    // Test all components in a directory
    testAll: async (directoryPath) => {
        const runner = new TestRunner();
        return await runner.runAllTests(directoryPath);
    },

    // Analyze component without running tests
    analyze: async (componentPath) => {
        const agent = new ReactTestingAgent();
        return await agent.reasonAboutComponent(componentPath);
    },

    // Generate tests without running them
    generateTests: async (componentPath) => {
        const agent = new ReactTestingAgent();
        return await agent.testComponent(componentPath);
    },

    // Custom test configuration
    customTest: async (componentPath, options) => {
        const agent = new ReactTestingAgent();
        const runner = new TestRunner();
        
        // Custom analysis
        const analysis = await agent.reasonAboutComponent(componentPath);
        
        // Custom test generation with options
        const tests = await agent.actOnAnalysis(analysis, {
            includeApiTests: true,
            includeNavigationTests: true,
            includeEdgeCases: true,
            customTestCases: options.customTestCases || []
        });
        
        // Save and run tests
        const testPath = await agent.saveTestFile(tests, './testing/generated');
        const results = await runner.executeTests(testPath);
        
        return { analysis, tests, results };
    }
};

// Run demo if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    const demo = new TestingAgentDemo();
    demo.runAllDemos().catch(console.error);
}

export default TestingAgentDemo;
