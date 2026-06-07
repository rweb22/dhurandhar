# Dhurandhar Skills

This directory contains the **12 core skills** that power the Dhurandhar framework, mapped to the five Pandava agents.

## The Five Phases

Each phase is handled by one Pandava agent with multiple skills:

### Phase 1: Ideation & Discovery (युधिष्ठिर Yudhishthira)
**Agent:** `/yudhishthira` - The Dharmaraja who decides what ought to be done
**Skills:**
- `/core-idea` - Capture the one-sentence vision
- `/brainstorming` - Explore alternatives and edge cases
- `/product-brief` - Create 2-page strategic vision

### Phase 2: Requirements (सहदेव Sahadeva)
**Agent:** `/sahadeva` - The foresighted one who defines with precision
**Skills:**
- `/prd` - Product Requirements Document with measurable requirements

### Phase 3: System Design (अर्जुन Arjuna)
**Agent:** `/arjuna` - The master craftsman who designs with focus
**Skills:**
- `/core-entities` - Data model, entities, relationships, schemas
- `/api-design` - API contracts, endpoints, protocols
- `/hld` - High-level design, system architecture
- `/lld` - Low-level design, classes, modules, algorithms

### Phase 4: Implementation Planning (नकुल Nakula)
**Agent:** `/nakula` - The beautiful organizer who creates elegant plans
**Skills:**
- `/epics-and-stories` - Break design into implementation tasks
- `/e2e-api-tests` - Write tests BEFORE implementation (contract-first)

### Phase 5: Implementation & Deployment (भीम Bhima)
**Agent:** `/bhima` - The powerful builder who ships with strength
**Skills:**
- `/implement` - Write code, make tests pass, build the system
- `/deploy` - Ship to production, monitor, launch

## Complete Workflow

```
Yudhishthira decides → /core-idea → /brainstorming → /product-brief
    ↓
Sahadeva foresees → /prd (requirements)
    ↓
Arjuna designs → /core-entities → /api-design → /hld → /lld
    ↓
Nakula plans → /epics-and-stories → /e2e-api-tests
    ↓
Bhima builds → /implement → /deploy → SHIPPED
```

## Skill Structure

Each skill directory contains a single `SKILL.md` file with:
- **Frontmatter metadata** (name, description, phase, agent, output)
- **Purpose** and context
- **Before you begin** checklist
- **Step-by-step workflow**
- **Output specification**
- **Agent wisdom** (Mahabharata-themed guidance)

Example:
```
src/skills/
├── core-idea/
│   └── SKILL.md
├── brainstorming/
│   └── SKILL.md
├── product-brief/
│   └── SKILL.md
...
```

## Output Locations

All skills write to `_dhurandhar-output/` in the project:

```
_dhurandhar-output/
├── phase-1-ideation/
│   ├── core-idea.md
│   ├── brainstorming-report.md
│   └── product-brief.md
├── phase-2-requirements/
│   └── prd.md
├── phase-3-system-design/
│   ├── core-entities.md
│   ├── api-design.md
│   ├── hld.md
│   ├── lld.md
│   └── schemas/
├── phase-4-implementation-planning/
│   ├── epics-and-stories.md
│   ├── e2e-tests.md
│   └── test-suites/
└── phase-5-implementation/
    └── [your actual code]
```

## Key Principles

1. **Sequential Phases** - Complete each phase before moving to the next
2. **Contract-First** - Write tests (Phase 4) before implementation (Phase 5)
3. **Document-Driven** - Each skill produces a specific artifact
4. **Heavy Character Voice** - Agents speak as Pandavas, reference Mahabharata events
5. **Startup Speed** - Focused on rapid iteration, not enterprise bureaucracy

## Installation

When you run `dhurandhar install`, the installer will:
1. Create `~/.augment/skills/` directory structure
2. Copy all skill definitions
3. Register skills with Augment/Cursor/Claude IDE
4. Make them available as slash commands

## Usage

1. Start with Phase 1: `/yudhishthira` then `/core-idea`
2. Progress through phases sequentially
3. Each skill reads outputs from previous skills
4. Complete all phases to ship production software
