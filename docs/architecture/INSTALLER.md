# Dhurandhar Installer Architecture

## Purpose

The Dhurandhar installer sets up the framework in a user's project, creating the necessary directory structure and installing skills to their IDE.

## Installation Command

```bash
npx dhurandhar install [options]
```

## Installer Behavior

### 1. Environment Detection

**Detect IDE:**
- Check for `.claude/`, `.cursor/`, `.augment/`, `.gemini/`, etc.
- If multiple found, ask user which to use
- If none found, offer "universal" (`.agents/skills/`)

**Check Existing Installation:**
- Look for `_dhurandhar/` directory
- If exists, ask: Update? Reinstall? Cancel?

### 2. Directory Creation

**Create `_dhurandhar/` structure:**
```
_dhurandhar/
├── agents/
│   ├── architect.md
│   ├── api-designer.md
│   ├── data-modeler.md
│   ├── builder.md
│   └── reviewer.md
├── data/
│   └── (reference data files)
├── scripts/
│   └── resolve_customization.py
├── config/
│   └── config.yaml
└── custom/
    └── .gitkeep
```

**Create `_dhurandhar-output/` structure:**
```
_dhurandhar-output/
├── phase-1-ideation/
│   └── .gitkeep
├── phase-2-requirements/
│   └── .gitkeep
├── phase-3-system-design/
│   ├── schemas/
│   │   └── .gitkeep
│   └── .gitkeep
├── phase-4-planning/
│   ├── epics/
│   │   └── .gitkeep
│   ├── stories/
│   │   └── .gitkeep
│   └── .gitkeep
└── decision-log.md
```

**Initialize decision-log.md:**
```markdown
# Architectural Decision Log

This file tracks all major architectural and design decisions made during the Dhurandhar development process.

---

## Decision Log Format

Each decision should be recorded as:

### [Date] - [Decision Title]

**Context:**
What was the situation that required a decision?

**Decision:**
What did we decide?

**Rationale:**
Why did we make this choice?

**Alternatives Considered:**
What other options were evaluated?

**Consequences:**
What are the implications of this decision?

---
```

### 3. Skill Installation

**Copy skills to IDE directory:**

For each skill in `src/skills/`:
1. Copy entire skill directory to IDE skills path
2. Preserve structure (SKILL.md, customize.toml, steps/)
3. Skills become available as `/skill-name` commands

**Skills installed:**
- Phase 1: `core-idea`, `brainstorming`, `product-brief`
- Phase 2: `prd`
- Phase 3: `core-entities`, `api-design`, `hld`, `lld`
- Phase 4: `epics-and-stories`, `e2e-api-tests`
- Phase 5: `implement`, `deploy`

### 4. Configuration

**Create initial config.yaml:**
```yaml
framework:
  name: dhurandhar
  version: 0.1.0
  installed_at: 2026-06-06T10:30:00Z

project:
  name: ""  # User can customize
  type: ""  # web, mobile, api, etc.

ide:
  type: "universal"  # or claude, cursor, augment, etc.
  skills_path: ".agents/skills"

output:
  framework_dir: "_dhurandhar"
  artifacts_dir: "_dhurandhar-output"
```

### 5. Git Integration

**Update or create `.gitignore`:**
- Append contents from `src/data/gitignore-template.txt`
- Skip if lines already exist
- Warn user about user-specific files to ignore

**Create initial commit (optional):**
- Ask user: "Create git commit for Dhurandhar installation?"
- If yes:
  ```bash
  git add _dhurandhar/ _dhurandhar-output/ .agents/skills/
  git commit -m "chore: install Dhurandhar framework"
  ```

### 6. Post-Install Message

```
✅ Dhurandhar installed successfully!

📁 Directories created:
   _dhurandhar/        - Framework files
   _dhurandhar-output/ - Your design artifacts
   .agents/skills/     - 12 workflow commands

🚀 Get started:
   Open your AI IDE and type /core-idea to begin

📚 Documentation:
   _dhurandhar/README.md

💡 Need help?
   - Run /dhurandhar-help for guidance
   - Visit: https://github.com/rweb22/dhurandhar
```

## CLI Options

```bash
npx dhurandhar install [options]

Options:
  --directory <path>    Install in specific directory (default: current)
  --ide <type>          IDE type: universal, claude, cursor, augment, etc.
  --yes                 Skip prompts, accept defaults
  --no-git              Skip git integration
  --force               Overwrite existing installation
  --help                Show help
  --version             Show version
```

## Non-Interactive Installation

For CI/CD and automation:

```bash
npx dhurandhar install \
  --directory /path/to/project \
  --ide universal \
  --yes \
  --no-git
```

## Update Behavior

When `_dhurandhar/` already exists:

```bash
npx dhurandhar update
```

Updates:
- ✅ Agent definitions
- ✅ Scripts
- ✅ Skills in IDE directory
- ❌ User customizations (preserved)
- ❌ Generated artifacts (preserved)

## Implementation Notes

- Installer should be idempotent (safe to run multiple times)
- Preserve user customizations during updates
- Validate directory structure before proceeding
- Provide clear error messages with recovery suggestions
- Support both interactive and non-interactive modes
