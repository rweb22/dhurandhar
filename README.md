# 👋 Hellow

**A lightweight agentic framework for AI IDEs**

Install agents and skills as slash commands in 25+ AI coding assistants.

## ✨ What is Hellow?

Hellow is a framework for creating domain-specific AI assistants that work as **slash commands** in AI IDEs like Claude Code, Cursor, Codex, Gemini, and many more.

Instead of building a standalone app, you define **agents** (AI personas) and **skills** (workflows) in markdown files. Hellow installs them into your IDE where they become instantly available as `/commands`.

## 🚀 Quick Start

### 1. Install Hellow

```bash
npx hellow install
```

The installer will:
- Ask which AI IDE you're using
- Create the appropriate skills directory (`.agents/skills/`, `.claude/skills/`, etc.)
- Copy your agents and skills
- Make them available as slash commands

### 2. Use Your Agents & Skills

In your AI IDE, type `/` to see all available commands:
- `/agent-myexpert` - Load an agent persona
- `/my-skill` - Run a workflow

## 🎯 Use Cases

- **Domain Experts**: Create specialized AI consultants for your field
- **Workflow Automation**: Guide users through complex multi-step processes
- **Team Knowledge**: Encode your team's expertise as AI agents
- **Consistent Behavior**: Ensure AI follows your patterns and best practices

## 📦 What's Included

```
hellow/
├── src/
│   ├── agents/          # Agent persona definitions
│   ├── skills/          # Workflow skills
│   ├── data/            # Reference data
│   └── scripts/         # Utility scripts
└── tools/installer/     # Installation CLI
```

## 🏗️ Creating Agents

Define an agent in `src/agents/myexpert.md`:

```markdown
# My Expert Agent

## Role
You are an expert in [domain]. Help users with [tasks].

## Expertise
- Topic 1
- Topic 2
- Topic 3

## Communication Style
Be helpful, clear, and professional.
```

Run `npx hellow install` and users can load it with `/agent-myexpert`.

## ⚙️ Creating Skills

Create a skill in `src/skills/my-workflow/SKILL.md`:

```markdown
---
name: my-workflow
description: 'Guide users through a specific task'
---

# My Workflow

## Step 1: Gather Info
Ask the user for required inputs.

## Step 2: Process
Do something with the inputs.

## Step 3: Deliver
Provide the result.
```

Run `npx hellow install` and users can activate it with `/my-workflow`.

## 🌐 IDE Support

Hellow supports **25+ AI IDEs** through the universal `.agents/skills/` standard:

### Universal (Recommended)
- **`.agents/skills/`** - Works with Claude Code, Cursor, Codex, Gemini, VS Code, and 20+ more

### IDE-Specific
- **Augment Code** - `.augment/skills/`
- **Claude Code** - `.claude/skills/` (also supports `.agents/skills/`)
- **Cursor** - `.cursor/skills/` (also supports `.agents/skills/`)
- **Windsurf** - `.windsurf/skills/` (also supports `.agents/skills/`)
- **Gemini Code Assist** - `.gemini/skills/` (also supports `.agents/skills/`)
- **OpenAI Codex** - `.codex/skills/` (also supports `.agents/skills/`)
- **VS Code / GitHub Copilot** - `.vscode/skills/` (also supports `.agents/skills/`)

## 📚 Documentation

- [Installation Guide](./docs/getting-started/INSTALLATION.md)
- [Architecture Overview](./docs/architecture/OVERVIEW.md)
- [IDE Integration](./docs/architecture/IDE-INTEGRATION.md)
- [Development Status](./docs/development/STATUS.md)

## 🎨 Example Projects

This is a **template framework**. Clone or fork it to create your own domain-specific assistant:

- **Trade Assistant**: Overseas trade compliance and regulations
- **Healthcare Assistant**: Medical coding and documentation
- **Legal Assistant**: Legal research and document drafting
- **Education Assistant**: Tutoring and learning paths

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run installer locally
npm run install:local

# Format code
npm run format:fix

# Validate
npm run validate
```

## 📖 BMAD-Method

Hellow follows the **BMAD-Method** (Blueprint-Model-Action-Data) architecture pattern:
- **Blueprint**: Skills define workflows in markdown
- **Model**: AI interprets and executes the workflows
- **Action**: Step-by-step guidance for users
- **Data**: Reference data and configuration

## 🤝 Contributing

This is a template! Fork it and customize for your domain. We'd love to see what you build.

## 📄 License

MIT

## 🔗 Links

- [GitHub](https://github.com/rweb22/hellow)
- [Agent Skills Specification](https://agentskills.io)
- [.agents Protocol](https://dotagentsprotocol.com)

---

**Built with ❤️ for the AI IDE community**
