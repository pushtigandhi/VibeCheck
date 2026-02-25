#!/usr/bin/env node

/**
 * Demo Script for ReAct Testing Agent
 * This script demonstrates the agent's capabilities
 */

import ReactTestingAgent from './ReactAgent.js';
import { TestRunner } from './TestRunner.js';
import path from 'path';

async function runDemo() {
    console.log('🤖 ReAct Testing Agent - Demo');
    console.log('='.repeat(50));
    
    const agent = new ReactTestingAgent();
    const runner = new TestRunner();
    
    // Demo 1: Analyze a component
    console.log('\n🔍 Demo 1: Component Analysis');
    console.log('-'.repeat(30));
    
    try {
        const analysis = await agent.reasonAboutComponent('../screens/HomeScreen.js');
        console.log(`✅ Analyzed: ${analysis.name}`);
        console.log(`   Type: ${analysis.type}`);
        console.log(`   Complexity: ${analysis.complexity}`);
        console.log(`   Testability: ${analysis.testability}`);
        console.log(`   Dependencies: ${analysis.dependencies.length}`);
        console.log(`   Props: ${analysis.props.length}`);
        console.log(`   State: ${analysis.state.length}`);
        console.log(`   API Calls: ${analysis.apiCalls.length}`);
    } catch (error) {
        console.log(`❌ Analysis failed: ${error.message}`);
    }
    
    // Demo 2: Generate tests
    console.log('\n🧪 Demo 2: Test Generation');
    console.log('-'.repeat(30));
    
    try {
        const result = await agent.testComponent('../screens/HomeScreen.js');
        console.log(`✅ Generated tests for: ${result.tests.componentName}`);
        console.log(`   Test cases: ${result.tests.testCases.length}`);
        console.log(`   Coverage: ${result.tests.validation.coverage}%`);
        console.log(`   Quality: ${result.tests.validation.quality}/10`);
        
        console.log('\n   Generated test cases:');
        result.tests.testCases.forEach((testCase, index) => {
            console.log(`   ${index + 1}. ${testCase.name} (${testCase.type})`);
        });
        
        if (result.tests.validation.suggestions.length > 0) {
            console.log('\n   💡 Suggestions:');
            result.tests.validation.suggestions.forEach(suggestion => {
                console.log(`      - ${suggestion}`);
            });
        }
    } catch (error) {
        console.log(`❌ Test generation failed: ${error.message}`);
    }
    
    // Demo 3: Run test suite
    console.log('\n🚀 Demo 3: Test Execution');
    console.log('-'.repeat(30));
    
    try {
        const results = await runner.runAllTests('../screens');
        const report = runner.generateReport(results);
        
        console.log(`✅ Test suite completed`);
        console.log(`   Total: ${report.summary.total}`);
        console.log(`   Passed: ${report.summary.passed}`);
        console.log(`   Failed: ${report.summary.failed}`);
        console.log(`   Coverage: ${report.summary.coverage}%`);
        
        console.log('\n   Component results:');
        report.components.forEach(comp => {
            const status = comp.success ? '✅' : '❌';
            console.log(`   ${status} ${comp.name}: ${comp.coverage}% coverage`);
        });
        
        if (report.recommendations.length > 0) {
            console.log('\n   💡 Recommendations:');
            report.recommendations.forEach(rec => {
                console.log(`      ⚠️  ${rec.message}`);
            });
        }
        
    } catch (error) {
        console.log(`❌ Test execution failed: ${error.message}`);
    }
    
    console.log('\n🎉 Demo completed!');
    console.log('\nNext steps:');
    console.log('1. Run: npm run setup:testing');
    console.log('2. Test a component: npm run test:component ../screens/HomeScreen.js');
    console.log('3. Run all tests: npm run test:all');
    console.log('4. Analyze components: npm run analyze');
}

// Run demo
runDemo().catch(console.error);
