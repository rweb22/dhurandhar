# Hellow - Architecture Overview

## What is Hellow?

Hellow is an **installable agentic framework** that brings AI agents and workflows into AI IDEs as slash commands. It follows the BMAD-Method pattern for structured, repeatable AI behavior.

## Core Concepts

### 1. Installable Framework

Unlike standalone applications, Hellow **installs into your project**:

```bash
npx hellow install
```

This creates a `_hellow/` directory with:
- Skills (workflow definitions)
- Agent personas
- Configuration files
- Domain-specific data

And copies skills to your IDE's skills directory (`.agents/skills/`, `.claude/skills/`, etc.) where they become slash commands.

### 2. Skills

**Skills** are markdown-based workflow definitions that guide AI through specific tasks.

Each skill:
- Lives in a directory with `SKILL.md` + optional step files
- Is invoked by name (e.g., `/my-workflow`)
- Follows a structured, repeatable workflow
- Uses **micro-file architecture** for disciplined execution

Example skill structure:
```
my-workflow/
├── SKILL.md                    # Main skill definition
├── customize.toml              # Configuration (optional)
└── steps/                      # Workflow steps (optional)
    ├── step-01-gather.md       # Collect inputs
    ├── step-02-process.md      # Process data
    └── step-03-deliver.md      # Present results
```

### 3. Agent Personas

**Agents** are expert personas defined in markdown files.

Each agent:
- Has specific domain expertise
- Adapts communication to user experience level
- Guides users to appropriate skills
- Maintains character throughout conversation

Example: `expert-consultant.md` defines a domain expert persona that users can interact with via `/agent-expert-consultant`.

### 4. Data Registry

Projects can maintain domain-specific data in YAML or JSON format.

`data/` directory can contain:
- Resource registries
- Reference data
- API endpoints
- Lookup tables
- Templates

### 5. Configuration System

Three-tier configuration allows customization:

1. **Base**: Defaults in skill files
2. **Team**: Shared overrides in `_hellow/custom/`
3. **User**: Personal overrides in `_hellow/custom/*.user.toml`

Python script `resolve_customization.py` merges these layers.

## Architecture Layers

### Layer 1: Source Files (src/)

Developer defines:
```
src/
├── agents/          # Agent persona markdown files
├── skills/          # Skill directories with SKILL.md
├── data/            # Domain data (YAML/JSON)
└── scripts/         # Utility scripts
```

### Layer 2: Installation (npx hellow install)

Installer:
1. Detects IDE
2. Creates `_hellow/` directory
3. Copies skills to IDE directory (`.agents/skills/`, etc.)
4. Generates agent launcher skills
5. Sets up configuration

### Layer 3: Runtime (IDE)

IDE:
1. Discovers skills in its directory
2. Shows them in autocomplete (`/`)
3. Loads skill when user types command
4. AI follows workflow defined in SKILL.md

## BMAD-Method Pattern

Hellow implements the BMAD-Method:

### Blueprint
Skills are **blueprints** written in markdown:
- Define workflow steps
- Specify data sources
- Set execution rules
- Configure behavior

### Model
AI **model** interprets blueprints:
- Reads SKILL.md
- Understands instructions
- Follows step-by-step workflow
- Adapts to context

### Action
AI takes **actions** based on blueprints:
- Asks user questions
- Processes inputs
- Queries data sources
- Generates outputs

### Data
Skills reference **data** as needed:
- Configuration files
- Domain data
- User preferences
- External sources

## Directory Structure

After installation:
```
your-project/
├── .agents/skills/              # IDE-specific skills directory
│   ├── agent-expert/            # Agent launcher
│   │   └── SKILL.md
│   └── my-workflow/             # Workflow skill
│       ├── SKILL.md
│       ├── customize.toml
│       └── steps/
└── _hellow/                     # Framework data
    ├── config/
    │   └── config.yaml          # User configuration
    ├── custom/                  # Config overrides
    ├── agents/                  # Agent definitions
    ├── data/                    # Domain data
    └── scripts/
        └── resolve_customization.py
```

## How It Works

### 1. Developer Creates Content

Developer writes agents and skills in `src/`:

**src/agents/expert.md:**
```markdown
# Expert Consultant

## Role
You are an expert in [domain].

## Communication Style
Be clear, helpful, and professional.
```

**src/skills/my-workflow/SKILL.md:**
```markdown
---
name: my-workflow
description: 'Guide users through a task'
---

# My Workflow

Ask user for inputs, process, deliver results.
```

### 2. User Installs Framework

User runs:
```bash
npx hellow install --ide universal
```

Installer creates:
- `_hellow/` with data and config
- `.agents/skills/agent-expert/` with launcher
- `.agents/skills/my-workflow/` with workflow

### 3. User Invokes in IDE

User opens IDE and types:
- `/agent-expert` → Loads expert persona
- `/my-workflow` → Runs workflow

AI reads SKILL.md and executes the defined workflow.

## Key Benefits

### 1. IDE Integration
Skills appear as native slash commands in 25+ AI IDEs

### 2. Portability
Write once, works across Claude Code, Cursor, Codex, Gemini, etc.

### 3. Version Control
All content is markdown/YAML - commit, branch, diff, merge

### 4. Customization
Three-tier config allows project, team, and personal customization

### 5. Simplicity
No backend, no database, no deployment - just markdown files

## Technical Decisions

### Why Markdown?
- Human-readable and writable
- Git-friendly (diff, merge, review)
- AI models understand it natively
- No special tooling required

### Why No Database?
- Skills run in user's environment
- Data should be portable
- YAML/JSON files are versioned
- Simpler architecture

### Why Python Script?
- TOML parsing easier in Python
- Small utility, not full app
- Available in most dev environments

## Extensibility

Projects can extend Hellow by:
- Adding more agents
- Creating domain-specific skills
- Defining custom data structures
- Writing helper scripts
- Customizing configuration

Just add files to `src/` and run `npx hellow install` again.

## Summary

Hellow provides a lightweight way to create domain-specific AI assistants that work as slash commands in AI IDEs. It uses markdown files for content, supports 25+ IDEs, and follows the BMAD-Method for structured AI behavior.
