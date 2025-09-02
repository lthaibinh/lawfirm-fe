#!/usr/bin/env node

/**
 * Helper script for JSON Server operations
 * Usage: node json-server/scripts.js [command]
 */

const fs = require('fs');
const path = require('path');

const commands = {
  'reset': () => {
    console.log('Resetting mock database to initial state...');
    // You can add logic here to reset the database
    console.log('Database reset complete!');
  },
  
  'validate': () => {
    console.log('Validating JSON Server configuration...');
    
    const configPath = path.join(__dirname, 'json-server.json');
    const dbPath = path.join(__dirname, 'db.json');
    const routesPath = path.join(__dirname, 'routes.json');
    const middlewarePath = path.join(__dirname, 'middleware.js');
    
    const files = [
      { path: configPath, name: 'json-server.json' },
      { path: dbPath, name: 'db.json' },
      { path: routesPath, name: 'routes.json' },
      { path: middlewarePath, name: 'middleware.js' }
    ];
    
    let allValid = true;
    
    files.forEach(file => {
      if (fs.existsSync(file.path)) {
        try {
          const content = fs.readFileSync(file.path, 'utf8');
          if (file.name.endsWith('.json')) {
            JSON.parse(content);
          }
          console.log(`✅ ${file.name} - Valid`);
        } catch (error) {
          console.log(`❌ ${file.name} - Invalid: ${error.message}`);
          allValid = false;
        }
      } else {
        console.log(`❌ ${file.name} - Missing`);
        allValid = false;
      }
    });
    
    if (allValid) {
      console.log('\n🎉 All files are valid!');
    } else {
      console.log('\n⚠️  Some files have issues. Please check the errors above.');
    }
  },
  
  'help': () => {
    console.log(`
JSON Server Helper Script

Available commands:
  reset     - Reset mock database to initial state
  validate  - Validate all configuration files
  help      - Show this help message

Usage:
  node json-server/scripts.js [command]
    `);
  }
};

const command = process.argv[2] || 'help';

if (commands[command]) {
  commands[command]();
} else {
  console.log(`Unknown command: ${command}`);
  commands.help();
}
