# 🏹 Dhurandhar (धुरंधर)

> **"The Burden-Bearer"** - A systems design framework powered by the five Pandava brothers from the Mahabharata

**Build better software faster** with structured workflows from idea to deployment.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Stars](https://img.shields.io/github/stars/rweb22/dhurandhar?style=social)](https://github.com/rweb22/dhurandhar)

**Installation:** Clone from GitHub | **Status:** ✅ Production Ready

---

## ✨ What is Dhurandhar?

Dhurandhar is a **lightweight development framework** for startup founders and indie hackers who want the structure of enterprise methodologies without the bloat.

**BMAD-Method** is for enterprise teams that need stakeholder alignment and extensive documentation.
**Dhurandhar** is for builders who trust their instincts and need to ship fast.

### The Problem

Enterprise frameworks like BMAD ask *"What value will this provide?"* for every decision. Great for big companies. Exhausting for startups.

### The Solution

Dhurandhar follows the **systems design interview pattern** engineers already know:

```
Core Idea → PRD → Entities → APIs → Architecture → Tests → Code → Ship
```

Plus one killer innovation: **Write E2E API tests BEFORE implementation.**

## 🚀 Quick Start

### 1. Install Dhurandhar

```bash
# Step 1: Clone the repository
git clone https://github.com/rweb22/dhurandhar.git

# Step 2: Enter directory and install dependencies
cd dhurandhar
npm install

# Step 3: Run the installer
npm run install:local
```

The installer will prompt you for:
- **Target directory** - Where to install (default: current directory)
- **AI IDE** - Which IDE you're using (Augment, Gemini, Cursor, etc.)
- **Experience level** - Beginner, intermediate, or expert

**For specific IDEs:**
```bash
npm run install:local -- -i augment   # For Augment Code
npm run install:local -- -i gemini    # For Gemini Code Assist
npm run install:local -- -i cursor    # For Cursor
npm run install:local -- -i universal # For most other IDEs (default)
```

**What gets installed:**
- `_dhurandhar/` - Framework files and agent personas
- `.augment/skills/` or `.gemini/skills/` - Skills for your IDE
- Install 5 Pandava agents as slash commands
- Install 12 workflow skills
- Set up `_dhurandhar-output/` for artifacts

**Troubleshooting:** If skills don't appear in your IDE, see [FAQ.md](FAQ.md#ide-specific-questions)

### 2. Start Building

In your AI IDE (in the directory where you installed), follow the phases:

**Phase 1: Ideation (Beej - बीज)**
- `/dhr-beej` - Load the agent (The Seed)
- `/dhr-core-idea` - Capture problem/solution
- `/dhr-brainstorming` - Explore alternatives
- `/dhr-product-brief` - 2-page vision doc

**Phase 2: Requirements (Sankalpa - संकल्प)**
- `/dhr-sankalpa` - Load the agent (The Resolve)
- `/dhr-prd` - Product requirements

**Phase 3: System Design (Rachana - रचना)** ⭐
- `/dhr-rachana` - Load the agent (The Architect)
- `/dhr-core-entities` - Design data model
- `/dhr-api-design` - Define API contracts
- `/dhr-hld` - High-level architecture
- `/dhr-lld` - Component design

**Phase 4: Implementation Planning (Yojana - योजना)** ⭐
- `/dhr-yojana` - Load the agent (The Planner)
- `/dhr-epics-and-stories` - Break into work units
- `/dhr-e2e-api-tests` - Write tests FIRST

**Phase 5: Ship (Nirmaan - निर्माण)**
- `/dhr-nirmaan` - Load the agent (The Builder)
- `/dhr-implement` - Make tests pass
- `/dhr-deploy` - Ship to production

## 🎯 Why Dhurandhar?

### For Startup Developers

✅ **Systems design pattern** - Entities → APIs → HLD → LLD (not a monolithic architecture doc)
✅ **Test-driven at API level** - Write contract tests before code
✅ **No enterprise bloat** - Skip stakeholder docs and validation theater
✅ **Fast iteration** - Structure without bureaucracy
✅ **Trust your instincts** - Build what you know needs building

### Not For You If

❌ You need extensive stakeholder alignment
❌ You require ROI justification for every decision
❌ You work in compliance-heavy enterprise environments

## 📦 What Gets Installed

After running `npx dhurandhar install`, your project will have:

```
your-project/
├── _dhurandhar/              # Framework files
│   ├── agents/               # 5 engineering-focused agents
│   ├── data/                 # Reference data
│   ├── scripts/              # Utilities
│   └── config/               # Configuration
│
├── _dhurandhar-output/       # Your design artifacts
│   ├── phase-1-ideation/     # Core idea, brainstorming, brief
│   ├── phase-2-requirements/ # PRD
│   ├── phase-3-system-design/# Entities, APIs, HLD, LLD
│   ├── phase-4-planning/     # Epics, stories
│   └── decision-log.md       # All architectural decisions
│
└── .agents/skills/           # 12 workflow commands
    ├── /core-idea, /brainstorming, /product-brief
    ├── /prd
    ├── /core-entities, /api-design, /hld, /lld
    ├── /epics-and-stories, /e2e-api-tests
    └── /implement, /deploy
```

## 👥 The Five Pandavas

Dhurandhar features the five Pandava brothers from the Mahabharata as agents:

- **`/yudhishthira`** (युधिष्ठिर) - The wise emperor who decides what to build
- **`/sahadeva`** (सहदेव) - The foresighted one who defines requirements
- **`/arjuna`** (अर्जुन) - The master craftsman who designs systems
- **`/nakula`** (नकुल) - The beautiful organizer who plans implementation
- **`/bhima`** (भीम) - The powerful builder who ships

Each agent speaks in character, references events from the epic, and guides you through their phase with cultural depth and wisdom.

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

## 🎨 The Dhurandhar Difference

| BMAD-Method | Dhurandhar |
|-------------|------------|
| Single `architecture.md` | Entities → APIs → HLD → LLD |
| Tests after code | **Tests before code** |
| 34+ workflows | 12 focused skills |
| Enterprise focus | Startup focus |
| Stakeholder docs | Just build it |

## 💡 Example: E-commerce SaaS

```bash
# Phase 1: Ideation
/core-idea           # "Build a multi-tenant e-commerce platform"
/product-brief       # 2-page vision

# Phase 2: Requirements
/prd                 # What features?

# Phase 3: System Design
/core-entities       # User, Product, Order, Cart...
/api-design          # REST endpoints + payloads
/hld                 # Microservices architecture
/lld                 # Service components

# Phase 4: Plan + Test
/epics-and-stories   # Break into 30 stories
/e2e-api-tests       # Write 100 API tests (all RED)

# Phase 5: Ship
/implement           # Make tests GREEN
/deploy              # Ship to production
```

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

## 📖 Architecture

Dhurandhar follows the **BMAD pattern** (Blueprint-Model-Action-Data):
- **Blueprint**: Skills define workflows in markdown
- **Model**: AI interprets and executes the workflows
- **Action**: Step-by-step guidance for users
- **Data**: Reference data and configuration

Built on top of the **hellow** framework for IDE integration.

## 🤝 Contributing

Dhurandhar is currently **GitHub-only** (not published to npm).

**To use it:**
```bash
# One-line install
bash <(curl -fsSL https://raw.githubusercontent.com/rweb22/dhurandhar/main/install.sh)

# Or clone
git clone https://github.com/rweb22/dhurandhar.git
cd dhurandhar
npm install
npm run install:local
```

**To contribute:**
1. Fork the repository
2. Create your feature branch
3. Test your changes with `npm run install:local`
4. Submit a pull request

**To customize:**
- Fork and adapt to your needs
- Modify agents and skills
- Share what you build!

## 📄 License

MIT

## 📚 Documentation

- [Project Vision](./docs/PROJECT.md) - Complete design philosophy
- [Architecture Overview](./docs/architecture/OVERVIEW.md)
- [Installation Guide](./docs/getting-started/INSTALLATION.md)
- [Development Status](./docs/development/STATUS.md)

## 🔗 Links

- [GitHub](https://github.com/rweb22/dhurandhar)
- [Agent Skills Specification](https://agentskills.io)
- [.agents Protocol](https://dotagentsprotocol.com)

---

**Built with ❤️ for the AI IDE community**
