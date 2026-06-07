# Dhurandhar Quick Reference

## Installation

```bash
npx dhurandhar install
```

## Directory Structure

```
your-project/
├── _dhurandhar/              # Framework (committed to git)
├── _dhurandhar-output/       # Your artifacts (committed to git)
├── .agents/skills/           # IDE commands
└── tests/api/                # E2E tests (from Phase 4)
```

## The Five Phases

### Phase 1: Ideation & Discovery

```bash
/core-idea           # Capture problem/solution (1 sentence)
/brainstorming       # Explore alternatives, constraints
/product-brief       # Strategic vision (2 pages max)
```

**Outputs:**
- `_dhurandhar-output/phase-1-ideation/core-idea.md`
- `_dhurandhar-output/phase-1-ideation/brainstorming-report.md`
- `_dhurandhar-output/phase-1-ideation/product-brief.md`

---

### Phase 2: Requirements

```bash
/prd                 # Product Requirements Document
```

**Outputs:**
- `_dhurandhar-output/phase-2-requirements/prd.md`

---

### Phase 3: System Design ⭐

```bash
/core-entities       # Data model (entities, relationships, schemas)
/api-design          # API contracts (endpoints, payloads)
/hld                 # High-Level Design (system architecture)
/lld                 # Low-Level Design (component details)
```

**Outputs:**
- `_dhurandhar-output/phase-3-system-design/core-entities.md`
- `_dhurandhar-output/phase-3-system-design/schemas/`
- `_dhurandhar-output/phase-3-system-design/api-design.md`
- `_dhurandhar-output/phase-3-system-design/hld.md`
- `_dhurandhar-output/phase-3-system-design/lld.md`

---

### Phase 4: Implementation Planning ⭐

```bash
/epics-and-stories   # Break work into implementable units
/e2e-api-tests       # Write API contract tests BEFORE code
```

**Outputs:**
- `_dhurandhar-output/phase-4-planning/epics/`
- `_dhurandhar-output/phase-4-planning/stories/`
- `_dhurandhar-output/phase-4-planning/implementation-plan.md`
- `tests/api/` (all tests RED - expected!)

---

### Phase 5: Implementation

```bash
/implement           # Build features (make tests GREEN)
/deploy              # Ship to production
```

**Outputs:**
- Working code in `src/`
- GREEN test suite
- Deployed application

---

## Available Agents

Load an agent to get specialized guidance:

```bash
/agent-architect      # Systems design expert (HLD/LLD)
/agent-api-designer   # Contract-first API specialist
/agent-data-modeler   # Database schema expert
/agent-builder        # Implementation specialist
/agent-reviewer       # Code review and quality
```

## Decision Log

All architectural decisions are tracked in:

```
_dhurandhar-output/decision-log.md
```

Update this as you make design choices throughout the process.

## Configuration

**Framework config:**
- `_dhurandhar/config/config.yaml` - Project settings

**Customization:**
- `_dhurandhar/custom/` - Team overrides
- `_dhurandhar/custom/*.user.toml` - Personal overrides (gitignored)

## Common Workflows

### Starting a New Project

```bash
# 1. Install Dhurandhar
npx dhurandhar install

# 2. Define the idea
/core-idea

# 3. Create PRD
/prd

# 4. Design system
/core-entities
/api-design
/hld
/lld

# 5. Plan implementation
/epics-and-stories
/e2e-api-tests

# 6. Build
/implement

# 7. Ship
/deploy
```

### Updating an Existing Project

```bash
# Update Dhurandhar framework
npx dhurandhar update

# Refresh skills in IDE
# (automatic during update)
```

## Tips

✅ **DO commit to git:**
- `_dhurandhar/` - Framework files
- `_dhurandhar-output/` - Design artifacts
- `.agents/skills/` - Installed skills
- `tests/api/` - API tests

❌ **DON'T commit:**
- `_dhurandhar/custom/*.user.toml` - Personal overrides
- `node_modules/`, `__pycache__/`, etc. - Standard build artifacts

⭐ **Key Insight:**
- Write tests BEFORE implementation
- Implementation = making tests pass
- Clear definition of "done"

## Getting Help

- `/dhurandhar-help` - Context-aware guidance
- [Documentation](./PROJECT.md) - Full design philosophy
- [GitHub Issues](https://github.com/rweb22/dhurandhar/issues) - Bug reports

---

**Built for developers who build.**
