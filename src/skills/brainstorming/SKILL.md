---
name: dhr-brainstorming
description: 'Explore alternatives, edge cases, and different approaches to your idea'
phase: 1
agent: beej
output: _dhurandhar-output/phase-1-ideation/brainstorming-report.md
---

# Brainstorming

## Purpose

Before committing to a path, explore all paths. Just as Yudhishthira consulted with Krishna and his brothers before the Rajsuya sacrifice, we examine alternatives, identify risks, and discover opportunities you haven't considered.

**What you'll create:** A comprehensive exploration of your idea from multiple angles.

## Before You Begin

You should have:
- ✅ A core idea (from `/core-idea`)
- ✅ Openness to questioning your assumptions
- ✅ 30-60 minutes of focused time

This is not implementation planning. This is **strategic exploration**.

## Workflow

### Step 1: Alternative Solutions

**Question:** What are 3-5 completely different ways to solve this problem?

Don't just tweak your idea. Think radically different approaches.

**Example - Problem: "Developers waste time searching documentation"**

Alternative approaches:
1. **Your idea**: VS Code extension with GitHub search
2. **Alternative A**: AI chatbot trained on documentation
3. **Alternative B**: Community-curated code snippet library
4. **Alternative C**: Better official docs with interactive examples
5. **Alternative D**: Screen recording tool that captures solutions as you code

**Yudhishthira's guidance:** 
- What if you had unlimited budget? What would you build?
- What if you had 1 week instead of 3 months? What's the simplest version?
- What would a non-technical person suggest?
- What would your competitor do?

For each alternative, note:
- **Pros**: What makes this approach attractive?
- **Cons**: Why might this not work?
- **Why not chosen**: Why you're not doing this

### Step 2: Edge Cases & Challenges

**Question:** What could go wrong? What are the hard problems?

Think like Sahadeva seeing the future. What storms are coming?

**Categories to explore:**

**Technical Challenges:**
- What's the hardest technical problem?
- What if your approach doesn't scale?
- What if the APIs you depend on change?

**User Adoption:**
- Why might users not use this?
- What if they don't trust it?
- What if they don't want to change their workflow?

**Business Viability:**
- What if you can't monetize it?
- What if a competitor copies you?
- What if the market is smaller than you think?

**Example:**
```markdown
## Edge Cases

### Technical
- GitHub API rate limits (5000 requests/hour) - might hit limits with popular extensions
- Code context understanding - how do we know which examples are relevant?

### User Adoption  
- Developers already use Stack Overflow habitually
- Trust issues with AI-generated code
- "Not invented here" syndrome in some teams

### Business
- Hard to monetize developer tools (expect free)
- Microsoft could build this into GitHub natively
- Market size: ~10M developers, but only ~1M use VS Code extensions regularly
```

### Step 3: Dependencies & Prerequisites

**Question:** What must exist for this to work? What are you betting on?

Every product has assumptions. Make them explicit.

**Categories:**

**Technical Dependencies:**
- APIs, platforms, frameworks you rely on
- Example: "Depends on GitHub's search API remaining accessible"

**Market Dependencies:**
- User behaviors, trends, technologies
- Example: "Assumes developers continue using VS Code (not shift to web IDEs)"

**Resource Dependencies:**
- Skills, time, money you need
- Example: "Need React expertise - don't have it, must learn or hire"

**Regulatory/Legal:**
- Compliance, licenses, permissions
- Example: "GitHub ToS allows this use case - need to verify"

**Yudhishthira asks:** Which of these is most fragile? If it breaks, does your whole idea collapse?

### Step 4: Scope Boundaries

**Question:** What are you explicitly NOT doing?

Define boundaries. What's out of scope?

**Format:**
- ✅ **In Scope**: What you WILL build
- ❌ **Out of Scope**: What you WON'T build (at least not in v1)

**Example:**
```markdown
## Scope

### In Scope (v1)
- Search GitHub public repositories for React components
- Show code snippets in sidebar
- Copy to clipboard functionality
- Support JavaScript/TypeScript

### Out of Scope (v1)
- ❌ Private repository search (privacy concerns, complex auth)
- ❌ Support for other frameworks (Vue, Angular, Svelte)
- ❌ AI code generation (too complex, different product)
- ❌ Mobile app (desktop-only)
- ❌ Offline mode (requires internet for search)

### Maybe Later (v2+)
- GitLab support
- Private repo search with OAuth
- Framework detection
```

**Yudhishthira asks:** What features are you tempted to add? Why are you saying no to them NOW?

### Step 5: Success Scenarios

**Question:** What does success look like in 3 months? 6 months? 1 year?

Be specific. Not "many users" - actual numbers and behaviors.

**Template:**
```markdown
## Success Scenarios

### 3 Months (MVP Launch)
- 100 developers install the extension
- 10 actively use it weekly
- 5 provide feedback / bug reports
- Core search functionality works reliably

### 6 Months (Product-Market Fit)
- 1,000 installs
- 200 weekly active users
- 4.5+ star rating on VS Code marketplace
- Users request it on other IDEs

### 1 Year (Growth)
- 10,000 installs  
- 2,000 weekly active users
- Mentioned in 3+ developer blog posts
- Revenue model validated (if monetizing)
```

**Yudhishthira asks:** What's the minimum success that makes this worthwhile? What would make you quit?

### Step 6: Decision Criteria

**Question:** How will you know if this is working? What signals will you watch?

Define your metrics and decision points.

**Example:**
```markdown
## Decision Criteria

### Go / No-Go Signals

**Continue if** (after 3 months):
- At least 50 active users
- 70%+ find results useful (user survey)
- Technical approach is sound (no major blockers)

**Pivot if**:
- Fewer than 20 active users (not solving real problem)
- Users want completely different features
- GitHub API limitations make it unusable

**Stop if**:
- GitHub changes API to block this use case
- No user growth after marketing efforts
- Better solution emerges (Microsoft builds it natively)
```

## Output

This skill creates: `_dhurandhar-output/phase-1-ideation/brainstorming-report.md`

Structure:
```markdown
# Brainstorming Report

## Alternative Solutions Explored
[5 different approaches with pros/cons]

## Edge Cases & Challenges
[Technical, adoption, business risks]

## Dependencies & Assumptions
[What you're betting on]

## Scope Boundaries
[In scope, out of scope, maybe later]

## Success Scenarios
[3 months, 6 months, 1 year]

## Decision Criteria
[Go/no-go signals, pivot triggers]
```

## What Happens Next

After brainstorming:
- Run `/product-brief` to create strategic vision document
- Or refine your `/core-idea` if you discovered something important
- Or proceed to `/prd` if you're ready to define requirements

## Yudhishthira's Wisdom

"Before the Rajsuya, I consulted with Krishna. He showed me that performing the sacrifice would make me emperor, but would also anger Duryodhana and lead to war.

I proceeded anyway, knowing the consequences.

Your brainstorming should do the same - show you the consequences of your choice. Then you can decide with eyes open, not closed."

---

**Wisdom comes from examining all paths before choosing one.**
