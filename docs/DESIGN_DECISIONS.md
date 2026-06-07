# Dhurandhar Design Decisions

## Session Summary: 2026-06-06

This document captures the key design decisions made during the initial Dhurandhar framework design session.

## Background

**Original Concept**: "hellow" - a generic framework template for creating domain-specific AI assistants

**Evolution**: After studying BMAD-Method, we pivoted to create a focused systems design framework for startup developers

## Key Design Decisions

### 1. Target Audience

**Decision**: Focus exclusively on startup developers and indie hackers, not enterprise teams

**Rationale**: 
- BMAD-Method serves enterprise well with its extensive documentation and stakeholder alignment
- Startup founders need structure but find enterprise frameworks exhausting
- Developers trust their instincts and make fast decisions without extensive justification

### 2. Systems Design Pattern

**Decision**: Follow the classic systems design interview flow

**Flow**:
```
Core Idea → Brainstorming → Product Brief → PRD → 
Core Entities → APIs → HLD → LLD → Epics/Stories → Tests → Implementation → Deployment
```

**Rationale**:
- Engineers already think this way from interview preparation
- Clear separation of concerns (data model → contracts → architecture → implementation)
- BMAD's single `architecture.md` doesn't match how engineers mentally decompose systems

### 3. Test-Driven API Development

**Decision**: Write E2E API tests BEFORE implementation

**Innovation**: Phase 4 includes `/e2e-api-tests` skill that generates comprehensive API contract tests

**Flow**:
1. Design system (entities, APIs, architecture)
2. Break into stories
3. **Write E2E tests that define success criteria**
4. Implement code to make tests pass

**Rationale**:
- Traditional approach: Code → Test → Hope it covers everything
- Dhurandhar approach: Test → Code → Confidence
- Tests become executable specifications
- Clear definition of "done" for each story

### 4. Four-Phase System Design

**Decision**: Split BMAD's single "Solutioning" phase into four distinct phases

**Phases**:
1. **Core Entities** - Data model (entities, relationships, schemas)
2. **API Design** - Contracts first (endpoints, payloads, protocols)
3. **HLD** - High-level design (system components, data flow)
4. **LLD** - Low-level design (class diagrams, algorithms)

**Rationale**:
- Matches systems design interview structure
- Forces bottom-up thinking (data → contracts → components)
- Each phase has clear, focused output
- Better for startup devs who need technical clarity

### 5. Minimal Agile Overhead

**Decision**: Keep epics/stories but skip agile ceremony

**What we keep**:
- ✅ Epic and story breakdown (useful for organizing work)
- ✅ Implementation planning

**What we skip**:
- ❌ Sprint retrospectives
- ❌ Stakeholder alignment docs
- ❌ Value proposition analysis
- ❌ PRFAQ documents
- ❌ Validation workflows

**Rationale**: Solo developers and small teams don't need meeting-heavy processes

### 6. Five Core Agents

**Decision**: Engineering-focused agents only

**Agents**:
- `architect` - Systems design expert
- `api-designer` - Contract-first API specialist  
- `data-modeler` - Database schema expert
- `builder` - Implementation specialist
- `reviewer` - Code review and quality

**No Product Manager, No UX Designer, No Scrum Master**

**Rationale**: Startup founders wear multiple hats; they need engineering expertise, not product management facilitation

### 7. 12 Core Skills (vs BMAD's 34+)

**Decision**: Streamlined skill set across 5 phases

**Phase 1 (3 skills)**: core-idea, brainstorming, product-brief
**Phase 2 (1 skill)**: prd
**Phase 3 (4 skills)**: core-entities, api-design, hld, lld
**Phase 4 (2 skills)**: epics-and-stories, e2e-api-tests
**Phase 5 (2 skills)**: implement, deploy

**Rationale**: Each skill has a specific, focused purpose; no workflow duplication

### 8. Framework Name: Dhurandhar

**Decision**: Rename from "hellow" to "Dhurandhar"

**Rationale**:
- Reflects the focused mission (not a generic template)
- Sanskrit name meaning "one who is formidable/unstoppable" - matches startup builder mentality
- Distinct brand identity

### 9. Directory Structure: `_dhurandhar/` and `_dhurandhar-output/`

**Decision**: Follow BMAD-Method's pattern with separate framework and output directories

**Structure**:
- `_dhurandhar/` - Framework files (agents, data, scripts, config)
- `_dhurandhar-output/` - Generated artifacts organized by phase
- `.agents/skills/` - IDE-specific skills directory

**Rationale**:
- Clear separation between framework (template) and outputs (artifacts)
- `_dhurandhar-output/` organizes artifacts by development phase
- Both directories committed to git for team collaboration
- Matches BMAD's proven pattern (`_bmad/` and `_bmad-output/`)
- Underscore prefix keeps directories at top of file listings
- Easy to .gitignore user-specific files (`_dhurandhar/custom/*.user.toml`)

**Phase-based output organization**:
```
_dhurandhar-output/
├── phase-1-ideation/
├── phase-2-requirements/
├── phase-3-system-design/
├── phase-4-planning/
└── decision-log.md
```

## Comparison with BMAD-Method

| Aspect | BMAD | Dhurandhar |
|--------|------|------------|
| Target | Enterprise teams | Startup devs |
| Workflows | 34+ | 12 |
| Architecture | Single doc | 4 phases |
| Testing | After code | Before code |
| Overhead | High | Minimal |
| Agents | 12+ (PM, UX, etc.) | 5 (engineering focus) |
| Directory Structure | `_bmad/` + `_bmad-output/` | `_dhurandhar/` + `_dhurandhar-output/` |

## Next Implementation Steps

1. Create all 12 skill files with complete workflows
2. Design 5 agent persona definitions
3. Build installer for Dhurandhar-specific setup
4. Create complete example walkthrough
5. Write comprehensive documentation

## Philosophy

**"BMAD-Method for enterprise teams. Dhurandhar for startup builders."**

Dhurandhar is for developers who:
- Trust their technical instincts
- Want structure without bureaucracy  
- Follow systems design patterns
- Believe in test-driven development
- Need to ship fast

---

*Document Version: 1.0*  
*Last Updated: 2026-06-06*
