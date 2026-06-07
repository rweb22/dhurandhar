# Dhurandhar Quick Start Guide

A systems design framework for AI IDEs, powered by the five Pandava brothers.

---

## The Five Pandavas

Each brother handles one phase of development:

| Pandava | Sanskrit | Role | Phase | Skills |
|---------|----------|------|-------|--------|
| **Yudhishthira** | युधिष्ठिर | The Emperor | Ideation | `/core-idea` `/brainstorming` `/product-brief` |
| **Sahadeva** | सहदेव | The Foresighted | Requirements | `/prd` |
| **Arjuna** | अर्जुन | The Master | Design | `/core-entities` `/api-design` `/hld` `/lld` |
| **Nakula** | नकुल | The Organizer | Planning | `/epics-and-stories` `/e2e-api-tests` |
| **Bhima** | भीम | The Builder | Implementation | `/implement` `/deploy` |

---

## The Complete Flow

```
1. Yudhishthira decides what to build
   → /core-idea (one-sentence vision)
   → /brainstorming (alternatives & edge cases)
   → /product-brief (2-page strategy)

2. Sahadeva defines requirements
   → /prd (measurable requirements)

3. Arjuna designs the system
   → /core-entities (data model)
   → /api-design (API contracts)
   → /hld (high-level architecture)
   → /lld (low-level design)

4. Nakula creates the plan
   → /epics-and-stories (implementation roadmap)
   → /e2e-api-tests (write tests BEFORE code)

5. Bhima builds and ships
   → /implement (make tests green)
   → /deploy (ship to production)
```

---

## Quick Usage

### Installation

**Step 1: Clone**
```bash
git clone https://github.com/rweb22/dhurandhar.git
cd dhurandhar
```

**Step 2: Install Dependencies**
```bash
npm install
```

**Step 3: Run Installer**
```bash
# Interactive (recommended for first time)
npm run install:local

# Or specify your IDE
npm run install:local -- -i augment   # For Augment Code
npm run install:local -- -i gemini    # For Gemini Code Assist
```

### Start a New Project
```bash
# Open your IDE (Cursor, Claude Code, Augment)
# Navigate to your project directory

# Start with Phase 1
/yudhishthira
/core-idea

# Follow the prompts to define your vision
```

### Follow the Sequential Flow
Each skill reads outputs from previous skills, so follow the order:

**Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5**

Don't skip phases! Each builds on the previous.

---

## Key Principles

### 1. **Sequential Phases**
Complete each phase before moving to the next. Arjuna can't design without Sahadeva's requirements.

### 2. **Contract-First Development**
Nakula writes tests (Phase 4) BEFORE Bhima writes code (Phase 5). Tests define success.

### 3. **Document-Driven**
Every skill produces an artifact in `_dhurandhar-output/`. These documents guide implementation.

### 4. **Heavy Character Voice**
The Pandavas speak as themselves, referencing events from the Mahabharata. This isn't decoration—it's how the framework teaches.

---

## Output Structure

All artifacts go to `_dhurandhar-output/`:

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
│   └── lld.md
├── phase-4-implementation-planning/
│   ├── epics-and-stories.md
│   └── e2e-tests.md
└── phase-5-implementation/
    └── [your code]
```

---

## Example Session

```
You: "I want to build a VS Code extension that searches GitHub for React components"

AI: Let's start with Yudhishthira. Run /core-idea

[You run /core-idea]

Yudhishthira: "Before my brothers can act, the vision must be clear and righteous.
Tell me: What problem are you solving?"

You: "Developers waste hours searching for React component examples..."

[Yudhishthira guides you through defining core idea]

Output: _dhurandhar-output/phase-1-ideation/core-idea.md

You: [Continue with /brainstorming, /product-brief, then move to Phase 2...]
```

---

## When to Use Each Skill

### `/core-idea` - When you have a vague idea
**Input:** Problem you want to solve  
**Output:** One-sentence clear vision  
**Time:** 15-30 minutes

### `/brainstorming` - When you need to explore alternatives
**Input:** Core idea  
**Output:** Alternatives, risks, decision criteria  
**Time:** 30-60 minutes

### `/product-brief` - When you need strategic alignment
**Input:** Core idea + brainstorming  
**Output:** 2-page strategy document  
**Time:** 30-45 minutes

### `/prd` - When you need precise requirements
**Input:** Product brief  
**Output:** Complete requirements document  
**Time:** 60-90 minutes

### `/core-entities` - When you need data model
**Input:** PRD  
**Output:** Entities, relationships, database schema  
**Time:** 60-90 minutes

### `/api-design` - When you need API contracts
**Input:** Entities + PRD  
**Output:** Complete API specification  
**Time:** 60-90 minutes

### `/hld` - When you need system architecture
**Input:** All design docs  
**Output:** High-level architecture, components, data flow  
**Time:** 90-120 minutes

### `/lld` - When you need implementation details
**Input:** HLD  
**Output:** Classes, algorithms, internal design  
**Time:** 90-120 minutes

### `/epics-and-stories` - When you need implementation plan
**Input:** All design  
**Output:** Epics, stories, tasks, estimates  
**Time:** 60-90 minutes

### `/e2e-api-tests` - When you need to define success
**Input:** API design + epics  
**Output:** Executable test suite (will fail until implemented)  
**Time:** 90-120 minutes

### `/implement` - When you're ready to code
**Input:** Tests + design  
**Output:** Working code, passing tests  
**Time:** Days to weeks (depends on scope)

### `/deploy` - When you're ready to ship
**Input:** Working code, passing tests  
**Output:** Production deployment  
**Time:** 4-8 hours

---

## Tips

1. **Don't rush** - Each phase adds value. Skipping = technical debt.
2. **Trust the tests** - Nakula's tests define done. Make them green.
3. **Read the wisdom** - Each skill ends with character wisdom. It's not fluff.
4. **Iterate** - You can refine earlier phases if you learn something new.
5. **Commit artifacts** - `_dhurandhar-output/` is valuable documentation.

---

## Getting Help

- **Documentation:** `/home/user/dhurandhar/docs/`
- **Examples:** Coming soon
- **Community:** Coming soon
- **Issues:** GitHub issues

---

**Now go forth and build. Yudhishthira awaits your vision.**
