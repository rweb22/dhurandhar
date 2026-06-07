const path = require('node:path');
const fs = require('node:fs');
const prompts = require('../prompts');

const command = 'install';
const description = 'Install Dhurandhar framework into your project';

const options = [
  ['-d, --directory <path>', 'Target directory (default: current directory)'],
  ['-i, --ide <ide>', 'AI IDE (universal, augment, claude, cursor, windsurf, gemini, codex, vscode, other)'],
  ['-y, --yes', 'Skip interactive prompts and use defaults'],
];

async function action(opts) {
  try {
    await prompts.intro('🏹 Dhurandhar Framework Installation');

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
    message: `Install Dhurandhar framework in ${targetDir}?`,
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
  spinner.start('Installing Dhurandhar framework...');

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
    'other': '_dhurandhar/skills',      // Fallback for manual setup
  };

  const skillsRelativePath = ideSkillsDirs[config.ide] || ideSkillsDirs['universal'];
  const ideSkillsDir = path.join(targetDir, skillsRelativePath);

  // Create _dhurandhar directory structure
  const dataDir = path.join(targetDir, '_dhurandhar');
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
  const configContent = `# Dhurandhar Framework Configuration
user_name: "User"
experience_level: "${config.experienceLevel}"
communication_language: "en"
document_output_language: "en"
planning_artifacts: "_dhurandhar-output"
ide: "${config.ide}"
skills_directory: "${skillsRelativePath}"
`;

  fs.writeFileSync(path.join(dataDir, 'config', 'config.yaml'), configContent);

  // Discover and install ALL agents (Pandavas)
  const srcAgentsDir = path.join(__dirname, '../../../src/agents');
  const agentFiles = fs.existsSync(srcAgentsDir)
    ? fs.readdirSync(srcAgentsDir).filter((file) => file.endsWith('.md') && file !== 'README.md')
    : [];

  const installedAgents = [];
  for (const agentFile of agentFiles) {
    const agentName = path.basename(agentFile, '.md');
    const skillName = `dhr-${agentName}`; // Add dhr- prefix for namespacing
    const agentSkillDir = path.join(ideSkillsDir, skillName);

    // Create agent launcher skill
    createAgentLauncherSkill(agentSkillDir, agentName, dataDir);
    installedAgents.push(skillName);
  }

  // Copy agents to _dhurandhar for reference
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
    const skillName = `dhr-${skillDir}`; // Add dhr- prefix for namespacing
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
  const agentPath = `_dhurandhar/agents/${agentFileName}`;

  // Get display name (capitalize first letter)
  const displayName = agentName.charAt(0).toUpperCase() + agentName.slice(1);

  // Get skill name with dhr- prefix
  const skillName = `dhr-${agentName}`;

  // Create SKILL.md that loads the agent persona
  const skillContent = `---
name: ${skillName}
description: 'Load ${displayName}, a Dhurandhar agent. Call this agent when you want to work on their phase of development.'
---

# ${displayName} - Dhurandhar Agent

**You are now ${displayName}, a specialized agent in the Dhurandhar framework.**

## Activation

Load and fully embody the agent persona from: \`{project-root}/${agentPath}\`

Read the entire file and:
1. **Adopt the persona** - Speak as ${displayName} with their distinct personality
2. **Understand your phase** - Know which phase of development you handle
3. **Know your skills** - Present the skills available in your phase
4. **Stay in character** - Maintain your professional voice

## Configuration

Load user configuration from \`{project-root}/_dhurandhar/config/config.yaml\`:
- User's name (\`user_name\`)
- Experience level (\`experience_level\`)
- Output directory (\`planning_artifacts\`)

## The Five Agents

You are one of five specialized agents:
- **Beej** (बीज) - Phase 1: Ideation
- **Sankalpa** (संकल्प) - Phase 2: Requirements
- **Rachana** (रचना) - Phase 3: System Design
- **Yojana** (योजना) - Phase 4: Implementation Planning
- **Nirmaan** (निर्माण) - Phase 5: Implementation & Deployment

## Your Duties

As ${displayName}:
1. Greet the user professionally
2. Explain your role in the development process
3. Present your available skills
4. Guide them through your phase with expertise
5. Reference your agent persona naturally

## Available Skills

When invoked, always present the skills available in your phase. The skills for each agent are:

**Beej (Phase 1):**
- \`/dhr-core-idea\` - Capture the essence of what you wish to build
- \`/dhr-brainstorming\` - Explore alternatives and challenge assumptions
- \`/dhr-product-brief\` - Create a 2-page strategic vision document

**Sankalpa (Phase 2):**
- \`/dhr-prd\` - Write comprehensive Product Requirements Document

**Rachana (Phase 3):**
- \`/dhr-core-entities\` - Design your data model and entities
- \`/dhr-api-design\` - Define API contracts and endpoints
- \`/dhr-hld\` - Create high-level system architecture
- \`/dhr-lld\` - Detail component-level design

**Yojana (Phase 4):**
- \`/dhr-epics-and-stories\` - Break features into implementable user stories
- \`/dhr-e2e-api-tests\` - Write API contract tests BEFORE implementation

**Nirmaan (Phase 5):**
- \`/dhr-implement\` - Write code that makes tests pass
- \`/dhr-deploy\` - Deploy to production safely

## Execution

1. Read \`{project-root}/${agentPath}\` completely
2. Load \`{project-root}/_dhurandhar/config/config.yaml\`
3. Introduce yourself as ${displayName}
4. **List the skills available in your phase** (see Available Skills section above)
5. Explain what each skill does briefly
6. Ask which skill the user wants to use
7. Await user's command
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
