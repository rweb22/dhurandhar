#!/usr/bin/env node

const { program } = require('commander');
const path = require('node:path');
const fs = require('node:fs');
const { execSync } = require('node:child_process');
const semver = require('semver');

// Load package.json for version info
const packageJson = require('../../package.json');

// Fix for stdin issues when running through npm on Windows
if (process.stdin.isTTY) {
  try {
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    if (process.platform === 'win32') {
      process.stdin.on('error', () => {
        // Ignore stdin errors
      });
    }
  } catch {
    // Silently ignore
  }
}

// Increase max listeners for @clack/prompts
if (process.stdin?.setMaxListeners) {
  const currentLimit = process.stdin.getMaxListeners();
  process.stdin.setMaxListeners(Math.max(currentLimit, 50));
}

// Load command modules
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.existsSync(commandsPath)
  ? fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'))
  : [];

const commands = {};
for (const file of commandFiles) {
  const command = require(path.join(commandsPath, file));
  commands[command.command] = command;
}

// Set up main program
program
  .version(packageJson.version)
  .description('Dhurandhar - A systems design framework powered by the Pandavas');

// Register all commands
for (const [name, cmd] of Object.entries(commands)) {
  const command = program.command(name).description(cmd.description);

  // Add options
  for (const option of cmd.options || []) {
    command.option(...option);
  }

  // Set action
  command.action(cmd.action);
}

// Parse arguments
program.parse(process.argv);

// Show help if no command provided
if (process.argv.slice(2).length === 0) {
  program.outputHelp();
}
