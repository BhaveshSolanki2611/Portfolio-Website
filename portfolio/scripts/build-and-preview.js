#!/usr/bin/env node

/**
 * This script builds the project and starts a preview server
 * to test the production build locally before deployment.
 */

const { execSync } = require('child_process');
const path = require('path');

// ANSI color codes for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

// Helper function to execute commands and log output
function runCommand(command, message) {
  console.log(`${colors.bright}${colors.blue}> ${message}${colors.reset}`);
  try {
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`${colors.bright}${colors.yellow}Error executing command: ${command}${colors.reset}`);
    return false;
  }
}

// Main function
async function main() {
  console.log(`\n${colors.bright}${colors.magenta}=== Building and previewing production build ===${colors.reset}\n`);
  
  // Clean previous build
  console.log(`${colors.cyan}Cleaning previous build...${colors.reset}`);
  try {
    execSync('rm -rf dist', { stdio: 'inherit' });
  } catch (error) {
    // On Windows, the command is different
    try {
      execSync('if exist dist rmdir /s /q dist', { stdio: 'inherit' });
    } catch (e) {
      console.log(`${colors.yellow}Could not clean dist folder. Continuing...${colors.reset}`);
    }
  }
  
  // Build the project
  if (!runCommand('npm run build', 'Building project for production...')) {
    console.error(`${colors.bright}${colors.yellow}Build failed. Exiting.${colors.reset}`);
    process.exit(1);
  }
  
  console.log(`\n${colors.bright}${colors.green}✓ Build completed successfully!${colors.reset}\n`);
  
  // Preview the build
  console.log(`${colors.cyan}Starting preview server...${colors.reset}`);
  console.log(`${colors.bright}${colors.green}Preview server will start at http://localhost:4173${colors.reset}\n`);
  
  runCommand('npm run preview', 'Starting preview server...');
}

// Run the main function
main().catch(error => {
  console.error(`${colors.bright}${colors.yellow}An error occurred:${colors.reset}`, error);
  process.exit(1);
}); 