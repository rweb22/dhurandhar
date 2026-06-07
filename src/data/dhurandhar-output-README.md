# Dhurandhar Output Directory

This directory contains all the design artifacts generated during your Dhurandhar development process.

**✅ Commit this directory to git** - Your team needs these documents!

## Directory Structure

```
_dhurandhar-output/
├── phase-1-ideation/          # Core idea and strategic thinking
│   ├── core-idea.md           # Your 1-sentence problem/solution
│   ├── brainstorming-report.md # Exploration and alternatives
│   └── product-brief.md       # Strategic vision (2 pages)
│
├── phase-2-requirements/      # What to build
│   └── prd.md                 # Product Requirements Document
│
├── phase-3-system-design/     # How to build it
│   ├── core-entities.md       # Data model
│   ├── schemas/               # Database schemas
│   ├── api-design.md          # API contracts
│   ├── hld.md                 # High-Level Design
│   └── lld.md                 # Low-Level Design
│
├── phase-4-planning/          # Breaking down the work
│   ├── epics/                 # Epic documents
│   ├── stories/               # Story files
│   └── implementation-plan.md # Prioritized roadmap
│
└── decision-log.md            # All architectural decisions
```

## What Goes Here

### Phase 1: Ideation
**When:** Start of project, before writing code  
**Created by:** `/core-idea`, `/brainstorming`, `/product-brief` skills  
**Purpose:** Capture the vision and validate the idea

### Phase 2: Requirements
**When:** After ideation, before system design  
**Created by:** `/prd` skill  
**Purpose:** Define functional and non-functional requirements

### Phase 3: System Design
**When:** After PRD, before implementation  
**Created by:** `/core-entities`, `/api-design`, `/hld`, `/lld` skills  
**Purpose:** Design the technical architecture

**This is the most important phase** - these documents guide all implementation.

### Phase 4: Planning
**When:** After system design, before coding  
**Created by:** `/epics-and-stories`, `/e2e-api-tests` skills  
**Purpose:** Break work into implementable units and define success criteria

### Decision Log
**When:** Throughout the entire process  
**Updated by:** You, manually  
**Purpose:** Track all major architectural and design decisions

## The Dhurandhar Flow

```
1. Run /core-idea → core-idea.md
2. Run /brainstorming → brainstorming-report.md
3. Run /product-brief → product-brief.md
4. Run /prd → prd.md
5. Run /core-entities → core-entities.md + schemas/
6. Run /api-design → api-design.md
7. Run /hld → hld.md
8. Run /lld → lld.md
9. Run /epics-and-stories → epics/ + stories/ + implementation-plan.md
10. Run /e2e-api-tests → ../tests/api/ (outside this directory)
11. Run /implement → ../src/ (your code)
12. Run /deploy → ship to production
```

## Git Integration

**Do commit:**
- ✅ All files in this directory
- ✅ The directory structure (even if some files are empty)
- ✅ The decision log

**Don't commit:**
- ❌ Nothing - everything here should be versioned!

## Decision Log

The `decision-log.md` file is special. Update it whenever you make a significant decision:

**Examples of decisions to log:**
- Choosing a database (PostgreSQL vs MongoDB)
- Selecting an authentication approach (JWT vs sessions)
- Deciding on architecture pattern (monolith vs microservices)
- Picking a frontend framework (React vs Vue)
- Major API design choices (REST vs GraphQL)

**Format:**
```markdown
### [2026-06-06] - Use PostgreSQL for Primary Database

**Context:**
Need to store structured relational data with ACID guarantees.

**Decision:**
Use PostgreSQL as primary database.

**Rationale:**
- Complex relationships between entities
- Strong consistency requirements
- Team has PostgreSQL expertise
- JSON support for flexible fields

**Alternatives Considered:**
- MongoDB (rejected - need strong relationships)
- MySQL (rejected - PostgreSQL has better JSON support)

**Consequences:**
- Requires database migrations for schema changes
- Need to set up backup/replication
- Excellent data integrity
```

## Tips

1. **Keep documents updated** - As your design evolves, update these files
2. **Reference in code** - Link back to these docs in code comments
3. **Review regularly** - During code review, check if implementation matches design
4. **Don't skip phases** - Each phase builds on the previous one
5. **Use decision log** - Future you will thank present you

## Need Help?

- Run `/dhurandhar-help` in your IDE for context-aware guidance
- Read `_dhurandhar/README.md` for framework documentation
- Visit: https://github.com/rweb22/dhurandhar

---

**Built for developers who build.**
