const path = require('node:path');
const fs = require('node:fs');
const prompts = require('../prompts');

const command = 'install';
const description = 'Install Hellow framework into your project';

const options = [
  ['-d, --directory <path>', 'Target directory (default: current directory)'],
  ['-i, --ide <ide>', 'AI IDE (universal, augment, claude, cursor, windsurf, gemini, codex, vscode, other)'],
  ['-y, --yes', 'Skip interactive prompts and use defaults'],
];

async function action(opts) {
  try {
    await prompts.intro('👋 Hellow Framework Installation');

    // Determine target directory
    const targetDir = opts.directory
      ? path.resolve(opts.directory)
      : process.cwd();

    // Interactive mode
    if (!opts.yes) {
      await installInteractive(targetDir, opts);
    } else {
      await installNonInteractive(targetDir, opts);
    }

    await prompts.outro('✨ Installation complete!');
  } catch (error) {
    console.error('Installation failed:', error.message);
    process.exit(1);
  }
}

async function installInteractive(targetDir, opts) {
  // Confirm directory
  const dirConfirm = await prompts.confirm({
    message: `Install Hellow framework in ${targetDir}?`,
    initialValue: true,
  });

  if (prompts.isCancel(dirConfirm) || !dirConfirm) {
    prompts.cancel('Installation cancelled');
  }

  // Ask which IDE they're using
  const ide = await prompts.select({
    message: 'Which AI IDE are you using?',
    options: [
      { value: 'universal', label: 'Universal (.agents/skills) - Recommended for multi-IDE compatibility' },
      { value: 'augment', label: 'Augment Code' },
      { value: 'claude', label: 'Claude Code' },
      { value: 'cursor', label: 'Cursor' },
      { value: 'windsurf', label: 'Windsurf' },
      { value: 'gemini', label: 'Gemini Code Assist' },
      { value: 'codex', label: 'OpenAI Codex' },
      { value: 'vscode', label: 'VS Code / GitHub Copilot' },
      { value: 'other', label: 'Other / Manual setup' },
    ],
    initialValue: 'universal',
  });

  if (prompts.isCancel(ide)) {
    prompts.cancel('Installation cancelled');
  }

  // Ask for user experience level (optional customization)
  const experienceLevel = await prompts.select({
    message: 'What is your experience level with this domain?',
    options: [
      { value: 'beginner', label: 'Beginner - New to this field' },
      { value: 'intermediate', label: 'Intermediate - Some experience' },
      { value: 'expert', label: 'Expert - Extensive knowledge' },
    ],
    initialValue: 'intermediate',
  });

  if (prompts.isCancel(experienceLevel)) {
    prompts.cancel('Installation cancelled');
  }

  // Note: We install ALL available agents and skills, not just selected ones
  // This matches BMAD-Method behavior where all skills are available after installation

  // Perform installation
  const spinner = prompts.spinner();
  spinner.start('Installing Hellow framework...');

  await performInstallation(targetDir, {
    ide,
    experienceLevel,
  });

  spinner.stop('Installation completed');
}

async function installNonInteractive(targetDir, opts) {
  const config = {
    ide: opts.ide || 'universal',
    experienceLevel: 'beginner',
  };

  console.log('Installing with defaults...');
  await performInstallation(targetDir, config);
}

async function performInstallation(targetDir, config) {
  // Get IDE-specific skills directory
  // NOTE: .agents/skills is the universal standard supported by 25+ AI IDEs
  // Including: Claude Code, Cursor, Codex, Gemini, VS Code, and many more
  const ideSkillsDirs = {
    'universal': '.agents/skills',      // Universal standard (recommended)
    'augment': '.augment/skills',       // Augment Code
    'claude': '.claude/skills',         // Claude Code (also supports .agents/skills)
    'cursor': '.cursor/skills',         // Cursor (also supports .agents/skills)
    'windsurf': '.windsurf/skills',     // Windsurf (also supports .agents/skills)
    'gemini': '.gemini/skills',         // Gemini Code Assist (also supports .agents/skills)
    'codex': '.codex/skills',           // OpenAI Codex (also supports .agents/skills)
    'vscode': '.vscode/skills',         // VS Code / GitHub Copilot (also supports .agents/skills)
    'other': '_hellow/skills',          // Fallback for manual setup
  };

  const skillsRelativePath = ideSkillsDirs[config.ide] || ideSkillsDirs['universal'];
  const ideSkillsDir = path.join(targetDir, skillsRelativePath);

  // Create _hellow directory structure
  const dataDir = path.join(targetDir, '_hellow');
  const dirs = [
    dataDir,
    path.join(dataDir, 'config'),
    path.join(dataDir, 'custom'),
    path.join(dataDir, 'scripts'),
    path.join(dataDir, 'data'),
    path.join(dataDir, 'agents'),
    ideSkillsDir, // IDE-specific skills directory
  ];

  for (const dir of dirs) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  // Create config.yaml
  const configContent = `# Hellow Framework Configuration
user_name: "User"
experience_level: "${config.experienceLevel}"
communication_language: "en"
document_output_language: "en"
planning_artifacts: "_hellow/artifacts"
ide: "${config.ide}"
skills_directory: "${skillsRelativePath}"
`;

  fs.writeFileSync(path.join(dataDir, 'config', 'config.yaml'), configContent);

  // Discover and install ALL agents
  const srcAgentsDir = path.join(__dirname, '../../../src/agents');
  const agentFiles = fs.existsSync(srcAgentsDir)
    ? fs.readdirSync(srcAgentsDir).filter((file) => file.endsWith('.md'))
    : [];

  const installedAgents = [];
  for (const agentFile of agentFiles) {
    const agentName = path.basename(agentFile, '.md');
    const skillName = `agent-${agentName}`;
    const agentSkillDir = path.join(ideSkillsDir, skillName);

    // Create agent launcher skill
    createAgentLauncherSkill(agentSkillDir, agentName, dataDir);
    installedAgents.push(skillName);
  }

  // Copy agents to _hellow for reference
  const targetAgentsDir = path.join(dataDir, 'agents');
  if (fs.existsSync(srcAgentsDir)) {
    copyDirectory(srcAgentsDir, targetAgentsDir);
  }

  // Discover and install ALL workflow skills
  const srcSkillsDir = path.join(__dirname, '../../../src/skills');
  const skillDirs = fs.existsSync(srcSkillsDir)
    ? fs.readdirSync(srcSkillsDir).filter((file) => {
        const fullPath = path.join(srcSkillsDir, file);
        return fs.statSync(fullPath).isDirectory();
      })
    : [];

  const installedSkills = [];
  for (const skillDir of skillDirs) {
    const skillSrcDir = path.join(srcSkillsDir, skillDir);
    const skillName = skillDir; // Use directory name as-is (no prefix)
    const skillTargetDir = path.join(ideSkillsDir, skillName);

    if (fs.existsSync(skillSrcDir)) {
      copyDirectory(skillSrcDir, skillTargetDir);
      installedSkills.push(skillName);
    }
  }

  // Copy scripts
  const srcScriptsDir = path.join(__dirname, '../../../src/scripts');
  const targetScriptsDir = path.join(dataDir, 'scripts');

  if (fs.existsSync(srcScriptsDir)) {
    copyDirectory(srcScriptsDir, targetScriptsDir);
  }

  // Copy data directory
  const srcDataDir = path.join(__dirname, '../../../src/data');
  const targetDataDir = path.join(dataDir, 'data');

  if (fs.existsSync(srcDataDir)) {
    copyDirectory(srcDataDir, targetDataDir);
  }

  console.log(`\nInstalled to: ${dataDir}`);
  console.log(`Skills directory: ${ideSkillsDir}`);
  console.log(`\n✅ Agents installed (${installedAgents.length}):`);
  installedAgents.forEach((agent) => {
    console.log(`  /${agent}`);
  });
  console.log(`\n✅ Skills installed (${installedSkills.length}):`);
  installedSkills.forEach((skill) => {
    console.log(`  /${skill}`);
  });
}

function createAgentLauncherSkill(skillDir, agentName, dataDir) {
  // Create skill directory
  if (!fs.existsSync(skillDir)) {
    fs.mkdirSync(skillDir, { recursive: true });
  }

  // Get relative path from project root to agent file
  const agentFileName = `${agentName}.md`;
  const agentPath = `_hellow/agents/${agentFileName}`;

  // Create SKILL.md that loads the agent persona
  const skillContent = `---
name: agent-${agentName}
description: 'Load the ${agentName.replace(/-/g, ' ')} agent persona. Use when the user asks to talk to the ${agentName.replace(/-/g, ' ')} or requests this agent.'
---

# ${agentName.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())} Agent

**You are now operating as the ${agentName.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())} agent.**

## Activation

Load and fully embody the agent persona from: \`{project-root}/${agentPath}\`

Read the entire file and:
1. Adopt the persona, role, and communication style defined
2. Understand your expertise and available skills
3. Stay in character for the entire conversation
4. Use the communication style appropriate to the user's experience level

## Configuration

Load the user configuration from \`{project-root}/_hellow/config/config.yaml\` to understand:
- User's name (\`user_name\`)
- Experience level (\`experience_level\`)
- Communication language (\`communication_language\`)

## Your Responsibilities

As this agent:
- Greet the user by name
- Explain your role and what you can help with
- Present available skills you can guide them through
- Stay in character and maintain the persona
- Adapt your communication to their experience level

## Available Skills

After loading your persona, check what skills are available for your domain and present them to the user.

## Execution

1. Load \`{project-root}/${agentPath}\`
2. Load \`{project-root}/_hellow/config/config.yaml\`
3. Greet the user as this agent
4. Present your capabilities
5. Wait for user input
`;

  fs.writeFileSync(path.join(skillDir, 'SKILL.md'), skillContent);
}

function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

module.exports = {
  command,
  description,
  options,
  action,
};
