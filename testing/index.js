#!/usr/bin/env node

/**
 * ReAct Testing Agent CLI Entry Point
 * 
 * Usage:
 *   node index.js test <component-path>
 *   node index.js test-all [directory]
 *   node index.js analyze [directory]
 *   node index.js report <report-path>
 */

import TestingCLI from './TestRunner.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        console.log('🤖 ReAct Testing Agent');
        console.log('Usage: node index.js <command> [options]');
        console.log('Run "node index.js help" for more information');
        process.exit(1);
    }
    
    const cli = new TestingCLI();
    
    try {
        await cli.run(args);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught Exception:', error.message);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});

main();
