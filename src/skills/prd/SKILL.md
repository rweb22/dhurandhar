---
name: dhr-prd
description: 'Define precise, measurable requirements with foresight'
phase: 2
agent: sankalpa
output: _dhurandhar-output/phase-2-requirements/prd.md
---

# Product Requirements Document (PRD)

## Purpose

Like Sahadeva's astronomical charts that predicted eclipses with precision, the PRD predicts exactly what your product will do. Not vague wishes, but specific, measurable, testable requirements.

Yudhishthira decided the vision. Now we define **what must be built** with the precision of planetary movements.

**What you'll create:** A complete requirements document that leaves no ambiguity.

## Before You Begin

You should have:
- ✅ Product brief (from `/product-brief`) - or at minimum
- ✅ Clear idea of what you're building (from `/core-idea`)

**Sahadeva's warning:** If your vision is unclear, return to Yudhishthira. Requirements built on unclear vision are like predicting eclipses with wrong star positions.

## Workflow

### Step 1: Read Previous Context

First, I will read:
- `_dhurandhar-output/phase-1-ideation/product-brief.md` (if it exists)
- `_dhurandhar-output/phase-1-ideation/core-idea.md` (if it exists)

This ensures requirements align with the vision Yudhishthira established.

**If files not found:** I will ask you to describe your product vision before proceeding.

### Step 2: Functional Requirements

**Question:** What must the system DO?

List every feature, function, and capability. Be exhaustive, be specific.

**Format:** Use "The system shall..." or "Users must be able to..."

**Categories to cover:**

**Core Features:**
```markdown
## Functional Requirements

### Search Functionality (FR-1.x)
FR-1.1: The system shall search GitHub public repositories via GitHub API
FR-1.2: The system shall filter search results to JavaScript/TypeScript files only
FR-1.3: The system shall display search results in VS Code sidebar
FR-1.4: The system shall show code snippets with 10 lines of context (5 before, 5 after)
FR-1.5: The system shall provide "Copy to clipboard" for each result
FR-1.6: The system shall link to full file on GitHub

### Authentication (FR-2.x)
FR-2.1: The system shall optionally accept GitHub personal access token
FR-2.2: The system shall work without authentication (lower rate limits)
FR-2.3: The system shall store tokens securely in VS Code secret storage

### Results Display (FR-3.x)
FR-3.1: The system shall show repository name, stars, and last update date
FR-3.2: The system shall syntax-highlight code snippets
FR-3.3: The system shall indicate if result is TypeScript or JavaScript
FR-3.4: The system shall show loading indicator during search
```

**For each requirement:**
- Unique ID (FR-1.1, FR-1.2, etc.)
- Clear action verb (shall, must, will)
- Specific and testable
- No ambiguity

**Sahadeva asks:** Can someone implement this requirement without asking questions? Is it measurable?

### Step 3: Non-Functional Requirements

**Question:** HOW WELL must it perform?

Performance, security, scalability, reliability, usability.

**Categories:**

```markdown
## Non-Functional Requirements

### Performance (NFR-1.x)
NFR-1.1: Search results shall appear within 3 seconds for 90% of queries
NFR-1.2: UI shall remain responsive during search (non-blocking)
NFR-1.3: Extension activation time shall be under 500ms

### Security (NFR-2.x)
NFR-2.1: GitHub tokens shall be stored in VS Code SecretStorage API
NFR-2.2: No user data shall be sent to third-party servers
NFR-2.3: All GitHub API calls shall use HTTPS

### Scalability (NFR-3.x)
NFR-3.1: System shall handle up to 5000 API requests/hour (GitHub rate limit)
NFR-3.2: System shall cache results for repeated queries (5 minute TTL)
NFR-3.3: System shall gracefully degrade when rate limits hit

### Usability (NFR-4.x)
NFR-4.1: Users shall be able to perform basic search with zero configuration
NFR-4.2: Error messages shall be clear and actionable
NFR-4.3: Extension shall work in light and dark VS Code themes

### Reliability (NFR-5.x)
NFR-5.1: System shall handle GitHub API failures gracefully
NFR-5.2: Extension shall not crash VS Code
NFR-5.3: Incomplete searches shall be abortable by user
```

**Sahadeva asks:** How do you measure "fast"? How do you test "secure"? Be precise.

### Step 4: Technical Constraints

**Question:** What limits your implementation?

Platform requirements, technology choices, dependencies.

```markdown
## Technical Constraints

### Platform (TC-1.x)
TC-1.1: Must run as VS Code extension (Webview + Extension API)
TC-1.2: Must support VS Code 1.75.0 and above
TC-1.3: Must work on Windows, macOS, and Linux

### Dependencies (TC-2.x)
TC-2.1: Depends on GitHub Search API (v3)
TC-2.2: Requires Node.js 18+ for development
TC-2.3: Uses VS Code Extension API for UI

### Technology Stack (TC-3.x)
TC-3.1: Extension code: TypeScript
TC-3.2: Webview UI: React + TypeScript
TC-3.3: Build tool: esbuild
TC-3.4: Testing: Vitest

### Integration Requirements (TC-4.x)
TC-4.1: Must respect GitHub API rate limits (5000/hour unauthenticated, 30000/hour authenticated)
TC-4.2: Must handle GitHub API pagination
TC-4.3: Must comply with GitHub Terms of Service
```

### Step 5: User Stories (Representative)

**Question:** What are the key user journeys?

Not all stories (that's Nakula's job in Phase 4), but representative scenarios showing how requirements come together.

**Format:** As a [user], I want to [action], so that [benefit]

```markdown
## Representative User Stories

### US-1: Basic Search
As a React developer
I want to search for "modal component" examples
So that I can see how others implement modals in real projects

**Acceptance Criteria:**
- Given I have the extension installed
- When I enter "modal component" in search box
- Then I see relevant React component examples within 3 seconds
- And each result shows repository context and code snippet

### US-2: Copy Code  
As a developer
I want to copy code from search results
So that I can quickly use patterns in my project

**Acceptance Criteria:**
- Given search results are displayed
- When I click "Copy" on a result
- Then the code is copied to clipboard
- And I see confirmation message

### US-3: Handle Rate Limits
As a heavy user
I want to add my GitHub token
So that I can search more frequently without hitting rate limits

**Acceptance Criteria:**
- Given I reach unauthenticated rate limit
- When I add my GitHub personal access token in settings
- Then my rate limit increases to 30000/hour
- And my token is stored securely
```

### Step 6: Acceptance Criteria (System-Level)

**Question:** How do we know the system is complete and working?

High-level criteria that define "done".

```markdown
## System Acceptance Criteria

### Must Have (v1.0)
- ✅ All FR-1.x (Search) requirements met
- ✅ All FR-2.x (Authentication) requirements met
- ✅ All NFR-1.x (Performance) requirements met
- ✅ 90% of searches return results under 3 seconds
- ✅ Extension rated 4.0+ stars on marketplace (after 20+ reviews)

### Quality Gates
- ✅ Zero critical bugs
- ✅ Test coverage > 80%
- ✅ Works on Windows, macOS, Linux
- ✅ Documentation complete

### Out of Scope (v1.0)
- ❌ Support for Vue, Angular, Svelte (React only)
- ❌ Private repository search
- ❌ AI code generation
- ❌ Offline mode
```

### Step 7: Future Considerations

**Question:** What comes after v1?

Sahadeva sees three timelines. Define them.

```markdown
## Future Considerations

### v1.1 (Polish - 1 month after launch)
- Keyboard shortcuts for common actions
- Search history
- Favorite/bookmark results
- Better error messages

### v2.0 (Expansion - 3-6 months)
- Support for Vue, Angular frameworks
- GitLab repository search
- Private repository search (OAuth)
- Advanced filters (stars, recent, language)

### v3.0 (Vision - 1 year+)
- AI-powered relevance ranking
- Code explanation alongside snippets
- Cross-IDE support (JetBrains, Vim)
- Team sharing of saved searches
```

## Output

This skill creates: `_dhurandhar-output/phase-2-requirements/prd.md`

**Structure:**
```markdown
# [Product Name] - Product Requirements Document

## Overview
[Brief summary from product brief]

## Functional Requirements
[Detailed feature requirements with IDs]

## Non-Functional Requirements
[Performance, security, scalability, etc.]

## Technical Constraints
[Platform, dependencies, technology choices]

## Representative User Stories
[Key user journeys with acceptance criteria]

## System Acceptance Criteria
[Definition of done for v1.0]

## Future Considerations
[v1.1, v2.0, v3.0 roadmap]

## Glossary
[Define any ambiguous terms]

---
**Document Version**: 1.0  
**Last Updated**: [Date]  
**Status**: Draft | Review | Approved
```

## What Happens Next

After PRD is complete:
- Run `/arjuna` to begin system design
- Or refine PRD if requirements are unclear
- Share with stakeholders for validation

Arjuna will read this PRD to understand what to design.

## Sahadeva's Wisdom

"I knew the Kurukshetra war would last 18 days. I knew who would survive. But I remained silent when not asked.

Your PRD should not be silent. It should speak clearly:
- What MUST be built (requirements)
- What SHOULD perform (non-functional)
- What COULD come later (future)

Precision saves lives in war. Precision saves time in development."

---

**The future is written in the requirements. Write them with foresight.**
