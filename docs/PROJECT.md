# Dhurandhar - Project Vision & Design

## What is Dhurandhar?

Dhurandhar is a **systems design framework for startup developers** who want the structure of established methodologies without the enterprise bloat.

### Target Audience

- **Startup founders** who code
- **Indie hackers** building SaaS products
- **Solo developers** and small teams
- **Engineers** who trust their instincts and move fast

### Not For

- Enterprise teams needing stakeholder alignment
- Organizations requiring extensive documentation and justification
- Teams that need "what value does this provide?" analysis for every decision

## Core Philosophy

**BMAD-Method** asks: *"What value will this provide? What's the ROI? Who are the stakeholders?"*

**Dhurandhar** asks: *"What are you building? What's the core problem? Let's ship it."*

We follow the **classic systems design interview pattern** because engineers already think this way.

## The Dhurandhar Flow

### Phase 1: Ideation & Discovery
```
/core-idea          - Capture the 1-sentence problem/solution
/brainstorming      - Explore alternatives, edge cases, constraints
/product-brief      - 2-page strategic vision document
```

**Philosophy**: Skip market research and PRFAQ validation theater. Trust your instincts. Move fast.

### Phase 2: Requirements
```
/prd               - Product Requirements Document
```

**Philosophy**: Streamlined PRD focused on what to build, not why it provides value to stakeholders.

### Phase 3: System Design
```
/core-entities     - Data model (entities, relationships, schemas)
/api-design        - API contracts (endpoints, payloads, protocols)
/hld               - High-Level Design (system components, data flow)
/lld               - Low-Level Design (class diagrams, algorithms)
```

**Philosophy**: This is our **killer differentiator**. BMAD has a single `architecture.md`. We follow the **systems design interview pattern**:
1. Design data model first
2. Define API contracts
3. Sketch system architecture
4. Detail component design

Engineers already think this way. We formalize it.

### Phase 4: Implementation Planning
```
/epics-and-stories - Break system design into implementable work units
/e2e-api-tests     - Write API contract tests BEFORE implementation
```

**Philosophy**: **Test-Driven Development at the API level**. Write tests that define success, then make them pass. This is our second major innovation:
- Traditional: Code → Test → Hope
- Dhurandhar: Test → Code → Pass

### Phase 5: Implementation
```
/dev-setup         - Initialize project structure
/implement         - Build feature by feature (make tests green)
/deploy            - Ship to production
```

**Philosophy**: Implementation becomes "make the tests pass." Clear definition of done.

## Key Differentiators vs BMAD-Method

| Aspect | BMAD-Method | Dhurandhar |
|--------|-------------|------------|
| **Target User** | Enterprise teams | Startup developers |
| **Decision Style** | Analytical, justified | Instinctive, rapid |
| **System Design** | Single architecture.md | Entities → APIs → HLD → LLD |
| **Testing** | Tests after code | **E2E tests BEFORE code** |
| **Story Breakdown** | Yes (agile ceremonies) | Yes (minimal overhead) |
| **Stakeholder Docs** | PRFAQs, validation reports | Skip the theater |
| **Overhead** | High (34+ workflows) | Minimal (12 core skills) |
| **Process** | Plan → Build | Design → Test → Build |

## Architecture Pattern

Dhurandhar follows the **Blueprint-Model-Action-Data (BMAD)** pattern from hellow:

- **Blueprint**: Skills define workflows in markdown
- **Model**: AI interprets and executes the workflows
- **Action**: Step-by-step guidance for users
- **Data**: Reference data and configuration

## Agent Personas: The Five Pandavas

Dhurandhar uses the five Pandava brothers from the Mahabharata as agents, each embodying a phase:

```
/yudhishthira (युधिष्ठिर)  - Phase 1: The Emperor who decides what to build
/sahadeva (सहदेव)          - Phase 2: The Foresighted One who defines requirements
/arjuna (अर्जुन)           - Phase 3: The Master Craftsman who designs systems
/nakula (नकुल)             - Phase 4: The Beautiful Organizer who plans implementation
/bhima (भीम)               - Phase 5: The Powerful Builder who ships
```

Each agent speaks in character, referencing events from the Mahabharata. They guide you through their phase with personality, wisdom, and cultural depth.

**No generic "Product Manager" or "Architect".** Instead, you work with Yudhishthira the wise emperor, Arjuna the focused craftsman, and Bhima the unstoppable builder.

## Success Metrics

A successful Dhurandhar project means:

1. ✅ Clear system design (entities, APIs, architecture)
2. ✅ Comprehensive API test coverage written FIRST
3. ✅ Implementation guided by failing tests → passing tests
4. ✅ Shipped product with confidence
5. ✅ Minimal time spent on documentation theater

## Installation

```bash
npx dhurandhar install
```

Installs skills to `.agents/skills/` (or IDE-specific directory) and creates `_dhurandhar/` with configuration.

## Positioning Statement

**"BMAD-Method for enterprise teams. Dhurandhar for startup builders."**

Dhurandhar is for developers who:
- ✅ Trust their technical instincts
- ✅ Want structure without bureaucracy
- ✅ Follow systems design patterns
- ✅ Believe in test-driven development
- ✅ Need to ship fast

## Technical Implementation

### Directory Structure

When installed, Dhurandhar creates two directories:

```
your-project/
├── _dhurandhar/              # Framework files (committed to git)
│   ├── agents/               # Agent persona definitions
│   ├── data/                 # Reference data
│   ├── scripts/              # Utility scripts
│   ├── config/               # Framework configuration
│   └── custom/               # Team/user customizations
│
├── _dhurandhar-output/       # Generated artifacts (gitignored)
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
│   │   └── lld.md
│   ├── phase-4-planning/
│   │   ├── epics/
│   │   ├── stories/
│   │   └── implementation-plan.md
│   └── decision-log.md       # Track all major decisions
│
└── .agents/skills/           # IDE-specific skills directory
    ├── core-idea/
    ├── brainstorming/
    ├── product-brief/
    ├── prd/
    ├── core-entities/
    ├── api-design/
    ├── hld/
    ├── lld/
    ├── epics-and-stories/
    ├── e2e-api-tests/
    ├── implement/
    └── deploy/
```

### Skill Structure

Each skill follows the micro-file architecture:

```
src/skills/core-entities/
├── SKILL.md              # Main workflow definition
├── customize.toml        # Configuration options (optional)
└── steps/                # Detailed step files (optional)
    ├── 01-identify-entities.md
    ├── 02-define-attributes.md
    ├── 03-model-relationships.md
    ├── 04-choose-storage.md
    └── 05-schema-design.md
```

### Output Artifacts

Each phase produces concrete artifacts in `_dhurandhar-output/`:

**Phase 1: Ideation & Discovery**
```
_dhurandhar-output/phase-1-ideation/
├── core-idea.md              # Problem/solution statement
├── brainstorming-report.md   # Exploration findings
└── product-brief.md          # Strategic vision (2 pages max)
```

**Phase 2: Requirements**
```
_dhurandhar-output/phase-2-requirements/
└── prd.md                    # Product requirements document
```

**Phase 3: System Design**
```
_dhurandhar-output/phase-3-system-design/
├── core-entities.md          # Data model documentation
├── api-design.md             # API contracts
├── hld.md                    # High-level design
├── lld.md                    # Low-level design
└── schemas/                  # Actual database schemas
    ├── users.sql
    ├── products.sql
    └── orders.sql
```

**Phase 4: Implementation Planning**
```
_dhurandhar-output/phase-4-planning/
├── epics/
│   ├── epic-01-authentication.md
│   ├── epic-02-catalog.md
│   └── epic-03-orders.md
├── stories/
│   ├── story-1.1-user-registration.md
│   ├── story-1.2-user-login.md
│   └── ...
└── implementation-plan.md    # Prioritized roadmap
```

**Phase 5: Implementation**
```
tests/api/                    # E2E API tests (from Phase 4)
├── auth/
│   ├── registration.test.js
│   └── login.test.js
├── products/
└── orders/

src/                          # Actual implementation
└── ...                       # (Your code structure)
```

**Continuous: Decision Log**
```
_dhurandhar-output/decision-log.md   # All architectural decisions
```

### IDE Integration

Supports 25+ AI IDEs through universal `.agents/skills/` standard:
- Claude Code, Cursor, Augment, Gemini, Codex, VS Code, and more

### Configuration System

Three-tier configuration:
1. **Base**: Defaults in skill files
2. **Team**: Shared overrides in `_dhurandhar/custom/`
3. **User**: Personal overrides in `_dhurandhar/custom/*.user.toml`

### Git Integration

**Commit to version control:**
- ✅ `_dhurandhar/` - Framework files
- ✅ `_dhurandhar-output/` - Design artifacts (PRD, architecture, etc.)
- ✅ `.agents/skills/` - Installed skills
- ✅ `tests/api/` - API test suite
- ✅ `src/` - Implementation code

**Add to `.gitignore`:**
- ❌ `_dhurandhar/custom/*.user.toml` - User-specific overrides
- ❌ `node_modules/`, `__pycache__/`, etc. - Standard ignores

## Implementation Status

See [STATUS.md](development/STATUS.md) for current development progress.

## Next Steps

1. Create all core skill files (12 skills across 5 phases)
2. Design agent persona definitions (5 agents)
3. Build complete example walkthrough
4. Enhance installer to support Dhurandhar workflow
5. Write comprehensive documentation

## Contributing

Fork this project and customize for your domain. Share what you build!

---

**Built for developers who build.**
