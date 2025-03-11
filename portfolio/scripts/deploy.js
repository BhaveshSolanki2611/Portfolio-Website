#!/usr/bin/env node

/**
 * This script helps with manual deployment to various platforms
 * It provides a CLI interface to choose deployment options
 */

const { execSync } = require('child_process');
const readline = require('readline');
const fs = require('fs');
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
  red: '\x1b[31m',
};

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Helper function to execute commands
function runCommand(command) {
  try {
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`${colors.bright}${colors.red}Error executing command: ${command}${colors.reset}`);
    return false;
  }
}

// Helper function to ask questions
function askQuestion(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

// Main function
async function main() {
  console.log(`\n${colors.bright}${colors.magenta}=== Portfolio Deployment Tool ===${colors.reset}\n`);
  
  // Check if dist folder exists
  if (!fs.existsSync(path.join(process.cwd(), 'dist'))) {
    console.log(`${colors.yellow}No build found. Building project first...${colors.reset}`);
    if (!runCommand('npm run build')) {
      console.error(`${colors.bright}${colors.red}Build failed. Exiting.${colors.reset}`);
      process.exit(1);
    }
  }
  
  console.log(`${colors.cyan}Choose a deployment option:${colors.reset}`);
  console.log(`${colors.bright}1.${colors.reset} Deploy to GitHub Pages`);
  console.log(`${colors.bright}2.${colors.reset} Deploy to Netlify (CLI)`);
  console.log(`${colors.bright}3.${colors.reset} Deploy to Vercel (CLI)`);
  console.log(`${colors.bright}4.${colors.reset} Prepare for manual upload`);
  
  const choice = await askQuestion(`\n${colors.bright}Enter your choice (1-4):${colors.reset} `);
  
  switch (choice.trim()) {
    case '1':
      await deployToGitHubPages();
      break;
    case '2':
      await deployToNetlify();
      break;
    case '3':
      await deployToVercel();
      break;
    case '4':
      await prepareForManualUpload();
      break;
    default:
      console.log(`${colors.yellow}Invalid choice. Exiting.${colors.reset}`);
      break;
  }
  
  rl.close();
}

// Deploy to GitHub Pages
async function deployToGitHubPages() {
  console.log(`\n${colors.cyan}Deploying to GitHub Pages...${colors.reset}`);
  
  // Check if git is initialized
  if (!fs.existsSync(path.join(process.cwd(), '.git'))) {
    console.log(`${colors.yellow}Git repository not initialized. Initializing...${colors.reset}`);
    runCommand('git init');
  }
  
  const hasRemote = execSync('git remote -v').toString().includes('origin');
  
  if (!hasRemote) {
    const repoUrl = await askQuestion(`${colors.bright}Enter your GitHub repository URL:${colors.reset} `);
    runCommand(`git remote add origin ${repoUrl}`);
  }
  
  // Check if gh-pages branch exists
  const branchExists = execSync('git branch -a').toString().includes('gh-pages');
  
  if (!branchExists) {
    console.log(`${colors.yellow}Creating gh-pages branch...${colors.reset}`);
    runCommand('git checkout --orphan gh-pages');
    runCommand('git rm -rf .');
    runCommand('touch README.md');
    runCommand('git add README.md');
    runCommand('git commit -m "Initial gh-pages commit"');
    runCommand('git push origin gh-pages');
    runCommand('git checkout main || git checkout master');
  }
  
  console.log(`${colors.cyan}Deploying build to gh-pages branch...${colors.reset}`);
  runCommand('git add dist -f');
  runCommand('git commit -m "Deploy to GitHub Pages"');
  runCommand('git subtree push --prefix dist origin gh-pages');
  
  console.log(`\n${colors.bright}${colors.green}✓ Deployed to GitHub Pages successfully!${colors.reset}`);
}

// Deploy to Netlify
async function deployToNetlify() {
  console.log(`\n${colors.cyan}Deploying to Netlify...${colors.reset}`);
  
  // Check if netlify CLI is installed
  try {
    execSync('netlify --version', { stdio: 'ignore' });
  } catch (error) {
    console.log(`${colors.yellow}Netlify CLI not found. Installing...${colors.reset}`);
    runCommand('npm install -g netlify-cli');
  }
  
  // Deploy to Netlify
  console.log(`${colors.cyan}Running Netlify deploy...${colors.reset}`);
  runCommand('netlify deploy --dir=dist --prod');
  
  console.log(`\n${colors.bright}${colors.green}✓ Deployed to Netlify successfully!${colors.reset}`);
}

// Deploy to Vercel
async function deployToVercel() {
  console.log(`\n${colors.cyan}Deploying to Vercel...${colors.reset}`);
  
  // Check if vercel CLI is installed
  try {
    execSync('vercel --version', { stdio: 'ignore' });
  } catch (error) {
    console.log(`${colors.yellow}Vercel CLI not found. Installing...${colors.reset}`);
    runCommand('npm install -g vercel');
  }
  
  // Deploy to Vercel
  console.log(`${colors.cyan}Running Vercel deploy...${colors.reset}`);
  runCommand('vercel --prod');
  
  console.log(`\n${colors.bright}${colors.green}✓ Deployed to Vercel successfully!${colors.reset}`);
}

// Prepare for manual upload
async function prepareForManualUpload() {
  console.log(`\n${colors.cyan}Preparing for manual upload...${colors.reset}`);
  
  // Create a zip file of the dist folder
  const zipFileName = 'portfolio-dist.zip';
  
  console.log(`${colors.cyan}Creating zip file of the build...${colors.reset}`);
  
  // Check if zip command is available
  try {
    execSync('zip --version', { stdio: 'ignore' });
    runCommand(`zip -r ${zipFileName} dist`);
  } catch (error) {
    // Try using powershell on Windows
    try {
      runCommand(`powershell -command "Compress-Archive -Path ./dist -DestinationPath ./${zipFileName} -Force"`);
    } catch (e) {
      console.log(`${colors.yellow}Could not create zip file. Please manually zip the dist folder.${colors.reset}`);
    }
  }
  
  console.log(`\n${colors.bright}${colors.green}✓ Build is ready for manual upload!${colors.reset}`);
  console.log(`${colors.cyan}You can find the build in the ${colors.bright}dist${colors.reset}${colors.cyan} folder.${colors.reset}`);
  
  if (fs.existsSync(path.join(process.cwd(), zipFileName))) {
    console.log(`${colors.cyan}A zip file ${colors.bright}${zipFileName}${colors.reset}${colors.cyan} has also been created.${colors.reset}`);
  }
}

// Run the main function
main().catch(error => {
  console.error(`${colors.bright}${colors.red}An error occurred:${colors.reset}`, error);
  rl.close();
  process.exit(1);
}); 