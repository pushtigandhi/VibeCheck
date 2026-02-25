/**
 * ReAct-Style Agent for Unit Testing React Native Components
 * 
 * This agent follows the ReAct (Reasoning + Acting) paradigm:
 * 1. REASON: Analyze code structure, dependencies, and testing requirements
 * 2. ACT: Generate appropriate unit tests based on analysis
 * 3. OBSERVE: Validate test quality and coverage
 */

import fs from 'fs';
import path from 'path';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';

class ReactTestingAgent {
    constructor() {
        this.reasoningSteps = [];
        this.actions = [];
        this.observations = [];
        this.testTemplates = this.initializeTestTemplates();
        this.componentAnalysis = new Map();
    }

    /**
     * Main ReAct loop for testing a component
     */
    async testComponent(componentPath, options = {}) {
        console.log(`🤖 ReAct Agent: Starting analysis of ${componentPath}`);
        
        // REASON: Analyze the component
        const analysis = await this.reasonAboutComponent(componentPath);
        
        // ACT: Generate tests based on analysis
        const tests = await this.actOnAnalysis(analysis, options);
        
        // OBSERVE: Validate and refine tests
        const validatedTests = await this.observeAndValidate(tests, analysis);
        
        return {
            analysis,
            tests: validatedTests,
            reasoningSteps: this.reasoningSteps,
            actions: this.actions,
            observations: this.observations
        };
    }

    /**
     * REASON: Analyze component structure, dependencies, and testing needs
     */
    async reasonAboutComponent(componentPath) {
        this.addReasoningStep(`Analyzing component: ${componentPath}`);
        
        try {
            const code = fs.readFileSync(componentPath, 'utf8');
            const ast = parse(code, {
                sourceType: 'module',
                plugins: ['jsx', 'typescript', 'decorators-legacy']
            });

            const analysis = {
                path: componentPath,
                name: this.extractComponentName(code),
                type: this.determineComponentType(code),
                dependencies: this.extractDependencies(ast),
                props: this.extractProps(ast),
                state: this.extractState(ast),
                effects: this.extractEffects(ast),
                handlers: this.extractEventHandlers(ast),
                navigation: this.extractNavigationUsage(ast),
                apiCalls: this.extractApiCalls(ast),
                styling: this.extractStylingInfo(ast),
                complexity: this.calculateComplexity(ast),
                testability: this.assessTestability(ast)
            };

            this.addReasoningStep(`Component analysis complete: ${analysis.name} (${analysis.type})`);
            this.addReasoningStep(`Found ${analysis.dependencies.length} dependencies, ${analysis.props.length} props, ${analysis.state.length} state variables`);
            
            return analysis;
        } catch (error) {
            this.addReasoningStep(`Error analyzing component: ${error.message}`);
            throw error;
        }
    }

    /**
     * ACT: Generate appropriate tests based on component analysis
     */
    async actOnAnalysis(analysis, options) {
        this.addAction(`Generating tests for ${analysis.name}`);
        
        const testSuite = {
            componentName: analysis.name,
            testFile: this.generateTestFileName(analysis.path),
            imports: this.generateImports(analysis),
            testCases: []
        };

        // Generate different types of tests based on component analysis
        if (analysis.type === 'screen') {
            testSuite.testCases.push(...this.generateScreenTests(analysis));
        } else if (analysis.type === 'component') {
            testSuite.testCases.push(...this.generateComponentTests(analysis));
        } else if (analysis.type === 'utility') {
            testSuite.testCases.push(...this.generateUtilityTests(analysis));
        }

        // Add API-related tests if applicable
        if (analysis.apiCalls.length > 0) {
            testSuite.testCases.push(...this.generateApiTests(analysis));
        }

        // Add navigation tests if applicable
        if (analysis.navigation.length > 0) {
            testSuite.testCases.push(...this.generateNavigationTests(analysis));
        }

        this.addAction(`Generated ${testSuite.testCases.length} test cases`);
        return testSuite;
    }

    /**
     * OBSERVE: Validate test quality and completeness
     */
    async observeAndValidate(testSuite, analysis) {
        this.addObservation(`Validating test suite for ${analysis.name}`);
        
        const validation = {
            coverage: this.calculateTestCoverage(testSuite, analysis),
            quality: this.assessTestQuality(testSuite),
            completeness: this.checkTestCompleteness(testSuite, analysis),
            suggestions: this.generateImprovementSuggestions(testSuite, analysis)
        };

        this.addObservation(`Test coverage: ${validation.coverage}%, Quality score: ${validation.quality}/10`);
        
        return {
            ...testSuite,
            validation
        };
    }

    // Helper methods for component analysis
    extractComponentName(code) {
        const exportMatch = code.match(/export\s+(?:default\s+)?(?:function|const)\s+(\w+)/);
        if (exportMatch) return exportMatch[1];
        
        const functionMatch = code.match(/function\s+(\w+)/);
        if (functionMatch) return functionMatch[1];
        
        return 'UnknownComponent';
    }

    determineComponentType(code) {
        if (code.includes('navigation') || code.includes('Stack.Screen')) return 'screen';
        if (code.includes('export') && code.includes('function')) return 'component';
        if (code.includes('export') && !code.includes('React')) return 'utility';
        return 'component';
    }

    extractDependencies(ast) {
        const dependencies = [];
        traverse(ast, {
            ImportDeclaration(path) {
                dependencies.push({
                    source: path.node.source.value,
                    specifiers: path.node.specifiers.map(spec => ({
                        type: spec.type,
                        imported: spec.imported?.name,
                        local: spec.local?.name
                    }))
                });
            }
        });
        return dependencies;
    }

    extractProps(ast) {
        const props = [];
        traverse(ast, {
            FunctionDeclaration(path) {
                if (path.node.params.length > 0) {
                    const param = path.node.params[0];
                    if (param.type === 'ObjectPattern') {
                        param.properties.forEach(prop => {
                            props.push({
                                name: prop.key.name,
                                required: !prop.optional,
                                type: 'unknown'
                            });
                        });
                    }
                }
            },
            ArrowFunctionExpression(path) {
                if (path.node.params.length > 0) {
                    const param = path.node.params[0];
                    if (param.type === 'ObjectPattern') {
                        param.properties.forEach(prop => {
                            props.push({
                                name: prop.key.name,
                                required: !prop.optional,
                                type: 'unknown'
                            });
                        });
                    }
                }
            }
        });
        return props;
    }

    extractState(ast) {
        const stateVars = [];
        traverse(ast, {
            CallExpression(path) {
                if (path.node.callee.name === 'useState') {
                    const stateName = path.node.arguments[0]?.value || 'unknown';
                    stateVars.push({
                        name: stateName,
                        type: 'state'
                    });
                }
            }
        });
        return stateVars;
    }

    extractEffects(ast) {
        const effects = [];
        traverse(ast, {
            CallExpression(path) {
                if (path.node.callee.name === 'useEffect') {
                    effects.push({
                        dependencies: path.node.arguments[1]?.elements?.map(el => el.name) || [],
                        hasCleanup: false
                    });
                }
            }
        });
        return effects;
    }

    extractEventHandlers(ast) {
        const handlers = [];
        traverse(ast, {
            CallExpression(path) {
                if (path.node.callee.property?.name === 'onPress' || 
                    path.node.callee.property?.name === 'onChangeText') {
                    handlers.push({
                        event: path.node.callee.property.name,
                        handler: 'function'
                    });
                }
            }
        });
        return handlers;
    }

    extractNavigationUsage(ast) {
        const navigation = [];
        traverse(ast, {
            MemberExpression(path) {
                if (path.node.object.name === 'navigation') {
                    navigation.push({
                        method: path.node.property.name,
                        type: 'navigation'
                    });
                }
            }
        });
        return navigation;
    }

    extractApiCalls(ast) {
        const apiCalls = [];
        traverse(ast, {
            CallExpression(path) {
                const callee = path.node.callee;
                if (callee.type === 'Identifier' && 
                    (callee.name.startsWith('GET') || callee.name.startsWith('POST') || 
                     callee.name.startsWith('PATCH') || callee.name.startsWith('DELETE'))) {
                    apiCalls.push({
                        method: callee.name,
                        type: 'api'
                    });
                }
            }
        });
        return apiCalls;
    }

    extractStylingInfo(ast) {
        const styles = [];
        traverse(ast, {
            MemberExpression(path) {
                if (path.node.object.name === 'styles') {
                    styles.push({
                        property: path.node.property.name,
                        type: 'style'
                    });
                }
            }
        });
        return styles;
    }

    calculateComplexity(ast) {
        let complexity = 0;
        traverse(ast, {
            IfStatement: () => complexity++,
            ForStatement: () => complexity++,
            WhileStatement: () => complexity++,
            SwitchStatement: () => complexity++,
            ConditionalExpression: () => complexity++
        });
        return complexity;
    }

    assessTestability(ast) {
        const complexity = this.calculateComplexity(ast);
        const dependencies = this.extractDependencies(ast).length;
        
        if (complexity < 3 && dependencies < 5) return 'high';
        if (complexity < 6 && dependencies < 10) return 'medium';
        return 'low';
    }

    // Test generation methods
    generateTestFileName(componentPath) {
        const baseName = path.basename(componentPath, path.extname(componentPath));
        return `${baseName}.test.js`;
    }

    generateImports(analysis) {
        const imports = [
            "import React from 'react';",
            "import { render, fireEvent, waitFor } from '@testing-library/react-native';",
            "import { NavigationContainer } from '@react-navigation/native';"
        ];

        // Add component import
        const relativePath = path.relative('/Users/pushtigandhi/Documents/VibeCheck/testing', analysis.path);
        imports.push(`import ${analysis.name} from '${relativePath}';`);

        // Add mock imports for dependencies
        analysis.dependencies.forEach(dep => {
            if (dep.source.includes('@react-navigation')) {
                imports.push(`jest.mock('${dep.source}');`);
            }
            if (dep.source.includes('API')) {
                imports.push(`jest.mock('${dep.source}');`);
            }
        });

        return imports;
    }

    generateScreenTests(analysis) {
        return [
            {
                name: 'renders without crashing',
                type: 'render',
                code: this.generateRenderTest(analysis)
            },
            {
                name: 'displays main UI elements',
                type: 'ui',
                code: this.generateUITest(analysis)
            },
            {
                name: 'handles navigation correctly',
                type: 'navigation',
                code: this.generateNavigationTest(analysis)
            }
        ];
    }

    generateComponentTests(analysis) {
        return [
            {
                name: 'renders with default props',
                type: 'render',
                code: this.generateRenderTest(analysis)
            },
            {
                name: 'handles user interactions',
                type: 'interaction',
                code: this.generateInteractionTest(analysis)
            },
            {
                name: 'updates state correctly',
                type: 'state',
                code: this.generateStateTest(analysis)
            }
        ];
    }

    generateUtilityTests(analysis) {
        return [
            {
                name: 'returns expected output',
                type: 'function',
                code: this.generateFunctionTest(analysis)
            },
            {
                name: 'handles edge cases',
                type: 'edge',
                code: this.generateEdgeCaseTest(analysis)
            }
        ];
    }

    generateApiTests(analysis) {
        return analysis.apiCalls.map(apiCall => ({
            name: `handles ${apiCall.method} API call`,
            type: 'api',
            code: this.generateApiTest(apiCall)
        }));
    }

    generateNavigationTests(analysis) {
        return analysis.navigation.map(nav => ({
            name: `handles ${nav.method} navigation`,
            type: 'navigation',
            code: this.generateNavigationTest(analysis, nav.method)
        }));
    }

    // Test template generators
    generateRenderTest(analysis) {
        return `
test('renders without crashing', () => {
  const mockNavigation = {
    navigate: jest.fn(),
    goBack: jest.fn(),
  };

  const { getByTestId } = render(
    <NavigationContainer>
      <${analysis.name} navigation={mockNavigation} />
    </NavigationContainer>
  );

  expect(getByTestId('${analysis.name.toLowerCase()}-container')).toBeTruthy();
});`;
    }

    generateUITest(analysis) {
        return `
test('displays main UI elements', () => {
  const mockNavigation = {
    navigate: jest.fn(),
    goBack: jest.fn(),
  };

  const { getByText } = render(
    <NavigationContainer>
      <${analysis.name} navigation={mockNavigation} />
    </NavigationContainer>
  );

  // Add specific UI element assertions based on component
  expect(getByText('Expected Text')).toBeTruthy();
});`;
    }

    generateInteractionTest(analysis) {
        return `
test('handles user interactions', () => {
  const mockNavigation = {
    navigate: jest.fn(),
    goBack: jest.fn(),
  };

  const { getByTestId } = render(
    <NavigationContainer>
      <${analysis.name} navigation={mockNavigation} />
    </NavigationContainer>
  );

  const button = getByTestId('interactive-button');
  fireEvent.press(button);

  // Add assertions for expected behavior
  expect(mockNavigation.navigate).toHaveBeenCalledWith('ExpectedScreen');
});`;
    }

    generateStateTest(analysis) {
        return `
test('updates state correctly', async () => {
  const mockNavigation = {
    navigate: jest.fn(),
    goBack: jest.fn(),
  };

  const { getByTestId } = render(
    <NavigationContainer>
      <${analysis.name} navigation={mockNavigation} />
    </NavigationContainer>
  );

  const input = getByTestId('text-input');
  fireEvent.changeText(input, 'test value');

  await waitFor(() => {
    expect(getByTestId('updated-element')).toBeTruthy();
  });
});`;
    }

    generateApiTest(apiCall) {
        return `
test('handles ${apiCall.method} API call', async () => {
  const mockApiResponse = { data: 'test' };
  jest.spyOn(require('../API'), '${apiCall.method}').mockResolvedValue(mockApiResponse);

  const mockNavigation = {
    navigate: jest.fn(),
    goBack: jest.fn(),
  };

  const { getByTestId } = render(
    <NavigationContainer>
      <${analysis.name} navigation={mockNavigation} />
    </NavigationContainer>
  );

  const triggerButton = getByTestId('api-trigger');
  fireEvent.press(triggerButton);

  await waitFor(() => {
    expect(require('../API').${apiCall.method}).toHaveBeenCalled();
  });
});`;
    }

    generateNavigationTest(analysis, method = 'navigate') {
        return `
test('handles ${method} navigation', () => {
  const mockNavigation = {
    navigate: jest.fn(),
    goBack: jest.fn(),
  };

  const { getByTestId } = render(
    <NavigationContainer>
      <${analysis.name} navigation={mockNavigation} />
    </NavigationContainer>
  );

  const navButton = getByTestId('navigation-button');
  fireEvent.press(navButton);

  expect(mockNavigation.${method}).toHaveBeenCalledWith('ExpectedDestination');
});`;
    }

    generateFunctionTest(analysis) {
        return `
test('returns expected output', () => {
  const result = ${analysis.name}(testInput);
  expect(result).toEqual(expectedOutput);
});`;
    }

    generateEdgeCaseTest(analysis) {
        return `
test('handles edge cases', () => {
  expect(() => ${analysis.name}(null)).not.toThrow();
  expect(() => ${analysis.name}(undefined)).not.toThrow();
  expect(() => ${analysis.name}('')).not.toThrow();
});`;
    }

    // Validation methods
    calculateTestCoverage(testSuite, analysis) {
        const totalFeatures = analysis.props.length + analysis.state.length + analysis.handlers.length;
        const testedFeatures = testSuite.testCases.length;
        return Math.round((testedFeatures / Math.max(totalFeatures, 1)) * 100);
    }

    assessTestQuality(testSuite) {
        let quality = 5; // Base score
        
        // Check for different test types
        const testTypes = testSuite.testCases.map(test => test.type);
        if (testTypes.includes('render')) quality += 1;
        if (testTypes.includes('interaction')) quality += 1;
        if (testTypes.includes('api')) quality += 1;
        if (testTypes.includes('navigation')) quality += 1;
        if (testTypes.includes('edge')) quality += 1;
        
        return Math.min(quality, 10);
    }

    checkTestCompleteness(testSuite, analysis) {
        const missing = [];
        
        if (analysis.props.length > 0 && !testSuite.testCases.some(test => test.type === 'props')) {
            missing.push('Props testing');
        }
        
        if (analysis.state.length > 0 && !testSuite.testCases.some(test => test.type === 'state')) {
            missing.push('State testing');
        }
        
        if (analysis.apiCalls.length > 0 && !testSuite.testCases.some(test => test.type === 'api')) {
            missing.push('API testing');
        }
        
        return {
            isComplete: missing.length === 0,
            missing
        };
    }

    generateImprovementSuggestions(testSuite, analysis) {
        const suggestions = [];
        
        if (analysis.complexity > 5) {
            suggestions.push('Consider breaking down complex component into smaller parts');
        }
        
        if (analysis.dependencies.length > 10) {
            suggestions.push('High dependency count - consider dependency injection for better testability');
        }
        
        if (testSuite.testCases.length < 3) {
            suggestions.push('Add more comprehensive test cases');
        }
        
        return suggestions;
    }

    // Utility methods
    addReasoningStep(step) {
        this.reasoningSteps.push({
            timestamp: new Date().toISOString(),
            step: step
        });
    }

    addAction(action) {
        this.actions.push({
            timestamp: new Date().toISOString(),
            action: action
        });
    }

    addObservation(observation) {
        this.observations.push({
            timestamp: new Date().toISOString(),
            observation: observation
        });
    }

    initializeTestTemplates() {
        return {
            render: 'renders without crashing',
            interaction: 'handles user interactions',
            state: 'manages state correctly',
            api: 'handles API calls',
            navigation: 'handles navigation',
            edge: 'handles edge cases'
        };
    }

    /**
     * Generate complete test file content
     */
    generateTestFileContent(testSuite) {
        const imports = testSuite.imports.join('\n');
        const testCases = testSuite.testCases.map(test => test.code).join('\n\n');
        
        return `${imports}

describe('${testSuite.componentName}', () => {
${testCases}
});`;
    }

    /**
     * Save test file to disk
     */
    async saveTestFile(testSuite, outputPath) {
        const content = this.generateTestFileContent(testSuite);
        const fullPath = path.join(outputPath, testSuite.testFile);
        
        // Ensure directory exists
        const dir = path.dirname(fullPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        
        fs.writeFileSync(fullPath, content);
        this.addAction(`Saved test file: ${fullPath}`);
        
        return fullPath;
    }
}

export default ReactTestingAgent;
