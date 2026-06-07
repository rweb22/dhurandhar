# Dhurandhar - Architecture Overview

## What is Dhurandhar?

Dhurandhar is a **systems design framework** for startup developers that guides you from idea to deployment following the classic systems design pattern. It installs into your project and provides AI-powered workflows as slash commands in your IDE.

## Core Concepts

### 1. Installable Framework

Unlike standalone applications, Dhurandhar **installs into your project**:

```bash
npx dhurandhar install
```

This creates two directories:

**`_dhurandhar/`** - Framework files (committed to git):
- Agent persona definitions
- Reference data
- Configuration
- Customizations

**`_dhurandhar-output/`** - Generated artifacts (committed to git):
- Design documents (PRD, architecture, etc.)
- Epic and story files
- Decision logs
- Planning artifacts

**`.agents/skills/`** - IDE skills directory:
- Skills copied here become slash commands in your IDE
- Works with 25+ AI IDEs (Claude Code, Cursor, Augment, etc.)

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
├── _dhurandhar/                 # Framework files (committed)
│   ├── agents/                  # Agent persona definitions
│   │   ├── architect.md
│   │   ├── api-designer.md
│   │   ├── data-modeler.md
│   │   ├── builder.md
│   │   └── reviewer.md
│   ├── data/                    # Reference data
│   ├── scripts/                 # Utility scripts
│   │   └── resolve_customization.py
│   ├── config/
│   │   └── config.yaml          # User configuration
│   └── custom/                  # Config overrides
│       └── *.user.toml          # User-specific (gitignored)
│
├── _dhurandhar-output/          # Generated artifacts (committed)
│   ├── phase-1-ideation/
│   │   ├── core-idea.md
│   │   ├── brainstorming-report.md
│   │   └── product-brief.md
│   ├── phase-2-requirements/
│   │   └── prd.md
│   ├── phase-3-system-design/
│   │   ├── core-entities.md
│   │   ├── api-design.md
│   │   ├── hld.md
│   │   ├── lld.md
│   │   └── schemas/
│   ├── phase-4-planning/
│   │   ├── epics/
│   │   ├── stories/
│   │   └── implementation-plan.md
│   └── decision-log.md
│
├── .agents/skills/              # IDE skills directory
│   ├── core-idea/
│   ├── brainstorming/
│   ├── product-brief/
│   ├── prd/
│   ├── core-entities/
│   ├── api-design/
│   ├── hld/
│   ├── lld/
│   ├── epics-and-stories/
│   ├── e2e-api-tests/
│   ├── implement/
│   └── deploy/
│
├── tests/api/                   # E2E API tests (from Phase 4)
│   ├── auth/
│   ├── products/
│   └── orders/
│
└── src/                         # Your implementation
    └── ...
```

## How It Works

### 1. Installation

User runs:
```bash
npx dhurandhar install
```

Installer:
1. Detects IDE (or asks user)
2. Creates `_dhurandhar/` directory with framework files
3. Creates `_dhurandhar-output/` for generated artifacts
4. Copies skills to `.agents/skills/` (or IDE-specific directory)
5. Sets up configuration

### 2. User Follows the Flow

User opens IDE and follows the phases:

**Phase 1: Ideation**
```bash
/core-idea           # Creates _dhurandhar-output/phase-1-ideation/core-idea.md
/brainstorming       # Creates brainstorming-report.md
/product-brief       # Creates product-brief.md
```

**Phase 2: Requirements**
```bash
/prd                 # Creates _dhurandhar-output/phase-2-requirements/prd.md
```

**Phase 3: System Design**
```bash
/core-entities       # Creates _dhurandhar-output/phase-3-system-design/core-entities.md + schemas/
/api-design          # Creates api-design.md
/hld                 # Creates hld.md
/lld                 # Creates lld.md
```

**Phase 4: Planning**
```bash
/epics-and-stories   # Creates _dhurandhar-output/phase-4-planning/epics/ and stories/
/e2e-api-tests       # Creates tests/api/ with RED tests
```

**Phase 5: Implementation**
```bash
/implement           # Make tests GREEN
/deploy              # Ship to production
```

### 3. AI Executes Workflows

AI reads SKILL.md for each command and:
- Guides user through structured steps
- Asks questions to gather information
- Generates artifacts in `_dhurandhar-output/`
- Updates decision log
- Validates outputs

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
