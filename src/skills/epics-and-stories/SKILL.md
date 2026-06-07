---
name: dhr-epics-and-stories
description: 'Break design into implementation tasks - epics, stories, and tickets'
phase: 4
agent: yojana
output: _dhurandhar-output/phase-4-implementation-planning/epics-and-stories.md
---

# Epics and Stories

## Purpose

Like organizing the cavalry before battle - each unit knows its position, its timing, and its objective - we create a beautiful, structured plan for implementation.

**What you'll create:** Implementation roadmap broken into epics, user stories, and concrete tasks.

## Before You Begin

You should have:
- ✅ Complete system design from Arjuna (HLD, LLD, API design, entities)
- ✅ PRD from Sahadeva
- ✅ 60-90 minutes of focused time

**Nakula's craft:** Organization. Structure. Beauty. Every task in its proper place.

## Workflow

### Step 1: Read All Previous Work

I read the complete design:
- `_dhurandhar-output/phase-3-system-design/lld.md`
- `_dhurandhar-output/phase-3-system-design/hld.md`
- `_dhurandhar-output/phase-3-system-design/api-design.md`
- `_dhurandhar-output/phase-3-system-design/core-entities.md`
- `_dhurandhar-output/phase-2-requirements/prd.md`

### Step 2: Identify Epics

**Question:** What are the major bodies of work?

An **Epic** is a large feature that takes multiple weeks and contains multiple stories.

**Format:**
```markdown
## Epic Structure

### Epic 1: Core Search Functionality
**Goal:** Enable users to search GitHub for code examples
**Value:** Primary product feature
**Duration:** 3 weeks
**Dependencies:** None (foundational)
**Stories:** 8 stories

### Epic 2: Results Display & UX
**Goal:** Beautiful, usable interface for search results
**Value:** User retention and satisfaction
**Duration:** 2 weeks
**Dependencies:** Epic 1 (needs working search)
**Stories:** 6 stories

### Epic 3: Caching & Performance
**Goal:** Fast, responsive search with intelligent caching
**Value:** Performance, reduced API costs
**Duration:** 1 week
**Dependencies:** Epic 1 (needs search to optimize)
**Stories:** 4 stories

### Epic 4: Authentication & Rate Limiting
**Goal:** Support GitHub tokens for higher limits
**Value:** Power user support
**Duration:** 1 week
**Dependencies:** Epic 1 (integrates with search)
**Stories:** 3 stories
```

**Nakula asks:** Can each epic be developed somewhat independently? Do the dependencies flow logically?

### Step 3: Break Epics into User Stories

**Question:** For each epic, what are the specific user-facing features?

A **User Story** describes one coherent piece of functionality from the user's perspective.

**Format:** "As a [user], I want to [action], so that [benefit]"

**Example - Epic 1: Core Search Functionality:**
```markdown
## Epic 1: Core Search Functionality

### Story 1.1: Basic Text Search
**As a** React developer  
**I want to** search for code examples by text query  
**So that** I can find relevant components quickly

**Acceptance Criteria:**
- Given a text query ("modal component")
- When I execute the search
- Then I see relevant React code snippets within 3 seconds
- And results include file name and repository

**Tasks:**
- Implement SearchService class
- Integrate GitHub API client
- Create query normalization logic
- Add basic error handling
- Write unit tests for search logic

**Estimate:** 5 days

---

### Story 1.2: Language Filtering
**As a** developer  
**I want to** filter results by language (TypeScript/JavaScript)  
**So that** I only see code in my preferred language

**Acceptance Criteria:**
- Given a search query
- When I select "TypeScript only" filter
- Then I see only .ts/.tsx files in results
- And JavaScript files are excluded

**Tasks:**
- Add language filter to query builder
- Update GitHub API query syntax
- Add UI dropdown for language selection
- Test filter combinations
- Update API documentation

**Estimate:** 2 days

---

### Story 1.3: Result Relevance Ranking
**As a** user  
**I want** results sorted by relevance  
**So that** the most useful code appears first

**Acceptance Criteria:**
- Results ranked by: exact match, repo stars, recency, code quality signals
- Top 3 results are demonstrably more relevant than bottom results
- Ranking is consistent for same query

**Tasks:**
- Implement ResultRanker class (from LLD)
- Define relevance scoring algorithm
- Add tests for ranking logic
- Validate with sample queries
- Document ranking factors

**Estimate:** 3 days
```

### Step 4: Define Technical Tasks

**Question:** What technical work doesn't map to user stories?

Not everything is user-facing. Track infrastructure, setup, and technical debt.

**Example:**
```markdown
## Technical Tasks (Epic 0: Foundation)

### Task 0.1: Project Setup
- Initialize TypeScript project
- Configure esbuild bundler
- Set up VS Code extension manifest
- Configure ESLint + Prettier
- Create project structure
**Estimate:** 1 day

### Task 0.2: Database Schema Implementation
- Create SQLite schema from core-entities design
- Write migration scripts
- Implement database connection manager
- Add basic CRUD operations
- Test migrations
**Estimate:** 2 days

### Task 0.3: CI/CD Pipeline
- Set up GitHub Actions
- Configure automated testing
- Add build pipeline for .vsix packaging
- Set up marketplace deployment
**Estimate:** 1 day
```

### Step 5: Estimate Each Story

**Question:** How long will each story take?

Use story points or days. Be realistic, include buffer.

**Estimation Guide:**
- **Small (1-2 days):** Single component, clear requirements
- **Medium (3-5 days):** Multiple components, some complexity
- **Large (5+ days):** Complex logic, many dependencies

**Add 20% buffer** for unknowns.

**Example:**
```markdown
## Estimation Summary

### Epic 1: Core Search (17 days)
- Story 1.1: Basic Search - 5 days
- Story 1.2: Language Filter - 2 days
- Story 1.3: Relevance Ranking - 3 days
- Story 1.4: Error Handling - 2 days
- Story 1.5: Search History - 3 days
- Story 1.6: Query Validation - 2 days
**Total:** 17 days + 3 days buffer = 20 days

### Epic 2: Results Display (12 days)
...

**Project Total:** 65 days (13 weeks for solo dev)
```

### Step 6: Define Dependencies

**Question:** What must happen before what?

Create a dependency graph.

**Example:**
```markdown
## Dependency Graph

```
Epic 0 (Setup)
    ↓
Epic 1 (Search) ← Must complete first
    ↓
    ├─→ Epic 2 (Display) ← Needs search results to display
    ├─→ Epic 3 (Caching) ← Needs search to optimize
    └─→ Epic 4 (Auth) ← Integrates with search
```

**Critical Path:**
Epic 0 → Epic 1 → Epic 2 → Release

**Parallel Work (after Epic 1):**
- Epic 3 (Caching) can be developed alongside Epic 2
- Epic 4 (Auth) can be developed alongside Epic 2
```

### Step 7: Create Sprint Plan

**Question:** How do we sequence the work?

Group stories into 2-week sprints.

**Example:**
```markdown
## Sprint Plan (2-week sprints)

### Sprint 0: Foundation (Week 1-2)
- Epic 0: All technical setup tasks
- Deliverable: Empty extension runs in VS Code

### Sprint 1: Core Search MVP (Week 3-4)
- Story 1.1: Basic Search
- Story 1.2: Language Filter
- Story 1.6: Query Validation
- Deliverable: Can search and see raw results

### Sprint 2: Search Refinement (Week 5-6)
- Story 1.3: Relevance Ranking
- Story 1.4: Error Handling
- Story 1.5: Search History
- Deliverable: Production-ready search

### Sprint 3: UI/UX (Week 7-8)
- Epic 2: All display stories
- Deliverable: Beautiful results display

### Sprint 4: Performance & Auth (Week 9-10)
- Epic 3: Caching
- Epic 4: Authentication
- Deliverable: Fast, scalable search

### Sprint 5: Polish & Launch (Week 11-12)
- Bug fixes
- Documentation
- Marketplace submission
- Deliverable: v1.0 released
```

### Step 8: Acceptance Criteria Per Story

**Question:** How do we know a story is done?

Clear, testable criteria.

**Example:**
```markdown
## Story 1.1: Basic Text Search

### Acceptance Criteria
✅ **Functional:**
- User can enter text query in search box
- System sends query to GitHub API
- Results appear within 3 seconds
- Results show: filename, repo name, code snippet

✅ **Technical:**
- SearchService passes all unit tests (>80% coverage)
- Integration test with GitHub API succeeds
- No memory leaks (tested over 100 searches)
- Error cases handled gracefully

✅ **Quality:**
- Code reviewed by peer (or self-review with checklist)
- Documentation updated
- No console errors in browser/extension host
```

### Step 9: Track Progress

**Question:** How do we monitor completion?

Define done states and tracking mechanism.

**States:**
- 🆕 **Not Started** - Not begun
- 🏗️ **In Progress** - Currently being worked on
- 🧪 **In Review** - Code complete, needs review
- ✅ **Done** - Accepted, merged, deployed

**Example:**
```markdown
## Progress Tracker

| Epic | Story | Status | Assignee | Est. | Actual |
|------|-------|--------|----------|------|--------|
| 0 | Setup | ✅ Done | Dev | 4d | 3d |
| 1.1 | Basic Search | 🏗️ In Progress | Dev | 5d | 3d |
| 1.2 | Language Filter | 🆕 Not Started | - | 2d | - |
```

## Output

This skill creates: `_dhurandhar-output/phase-4-implementation-planning/epics-and-stories.md`

**Structure:**
```markdown
# Epics and Stories

## Overview
[Project timeline, team size, approach]

## Epic Catalog
[All epics with goals, duration, dependencies]

## Epic 1: [Name]
### Stories
[All user stories with acceptance criteria, tasks, estimates]

## Epic 2: [Name]
...

## Technical Tasks
[Foundation work not tied to user stories]

## Dependency Graph
[Visual representation]

## Sprint Plan
[2-week sprint breakdown]

## Estimation Summary
[Total time, critical path]

## Progress Tracking
[How to monitor completion]
```

## What Happens Next

After creating epics and stories:
- Run `/e2e-api-tests` to define contract tests (Nakula's other skill)
- Then hand off to Bhima (`/implement`) to start building

## Nakula's Wisdom

"I organized the cavalry before Kurukshetra. Each horseman knew:
- Their position in formation (epic)
- Their specific charge (story)
- When to advance (sprint)
- Success criteria (acceptance)

A beautiful plan is not just functional - it is organized with elegance.

Your implementation plan should be the same:
- Clear structure (epics group related work)
- Logical flow (dependencies honored)
- Achievable goals (realistic estimates)
- Visual beauty (anyone can understand it)

Organization is not overhead. Organization is the path to victory."

---

**Plan with beauty. Execute with strength.**
