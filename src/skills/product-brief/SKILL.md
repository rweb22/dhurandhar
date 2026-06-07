---
name: dhr-product-brief
description: 'Create a 2-page strategic vision document that declares your intent'
phase: 1
agent: beej
output: _dhurandhar-output/phase-1-ideation/product-brief.md
---

# Product Brief

## Purpose

Like the proclamation Yudhishthira made before the Rajsuya sacrifice - declaring his intent to become emperor - the product brief declares what you will build and why it matters.

This is NOT a requirements document. This is a **strategic vision** - 2 pages maximum that anyone can read and understand your mission.

**What you'll create:** A concise strategic document that guides all future decisions.

## Before You Begin

You should have:
- ✅ Core idea defined (from `/core-idea`)
- ✅ Brainstorming complete (from `/brainstorming`) - optional but recommended
- ✅ Clarity on your vision

**Rule:** 2 pages maximum. If you can't explain your vision in 2 pages, you don't understand it yet.

## Workflow

### Step 1: The Vision (One Paragraph)

**Question:** What's the big picture? What world are you creating?

Start with the aspirational vision. Not features - the **change** you want to see.

**Format:** 3-4 sentences maximum

**Good example:**
```markdown
## Vision

Developers spend 30% of their time searching for code examples across 
fragmented documentation, Stack Overflow, and GitHub. We envision a world 
where finding relevant, real-world code examples is instant and contextual. 
Every developer should have the collective wisdom of millions of open-source 
projects at their fingertips, without leaving their editor.
```

**Bad example:**
- Long manifesto (keep it short)
- Feature list (that's not vision)
- Buzzwords without substance ("revolutionize", "disrupt", "AI-powered")

**Yudhishthira asks:** Could you share this vision at a dinner party and have people understand it? Does it inspire?

### Step 2: The Problem (One Paragraph)

**Question:** What specific problem exists today?

Paint the picture of pain. Make it concrete and relatable.

**Format:** 3-5 sentences

**Good example:**
```markdown
## Problem

Frontend developers building React applications need to see how components 
are used in real projects, not just documentation examples. They currently 
jump between GitHub, Stack Overflow, and official docs - wasting 2-4 hours 
per week. Existing solutions show isolated snippets without project context. 
The result: cargo-culting code without understanding, or reinventing wheels 
that already exist in better form.
```

**Yudhishthira asks:** Have you experienced this problem personally? Can you name three people who have?

### Step 3: The Solution (Two Paragraphs)

**Question:** What are you building? How does it work?

First paragraph: WHAT it is  
Second paragraph: HOW it works (high-level)

**Good example:**
```markdown
## Solution

CodeExplorer is a VS Code extension that searches GitHub repositories in 
real-time for React component examples. It shows you how components are 
actually used in production applications, with full file context and 
repository links.

When you search for a component (e.g., "modal dialog"), CodeExplorer 
queries GitHub's search API, filters for TypeScript/JavaScript files, 
extracts relevant code with context, and displays results in your sidebar. 
Click any result to see the full file, copy the code, or jump to the 
repository. All within your editor, no context switching required.
```

**Yudhishthira asks:** Could a developer immediately understand what this does and how to use it?

### Step 4: Target Users (Half Page)

**Question:** Who is this for? Who is it NOT for?

Be specific about your audience.

**Structure:**

**Primary Users:**
- Who they are (job title, experience level)
- What they're trying to accomplish
- Why existing solutions don't work for them

**Secondary Users:**
- Who might also benefit
- But not the primary focus

**Explicitly NOT For:**
- Who should NOT use this
- Why it won't work for them

**Example:**
```markdown
## Target Users

### Primary: Frontend Developers (React)
- 2-7 years of experience
- Building production web applications
- Work with medium-to-large codebases
- Need to learn from real-world examples, not just docs
- Currently waste time searching GitHub manually

### Secondary: Senior Developers Onboarding to React
- Experienced in other frameworks (Vue, Angular, vanilla JS)
- Learning React patterns and best practices
- Need to see idiomatic React code in context

### NOT For:
- ❌ Beginners learning to code (need tutorials, not examples)
- ❌ Backend developers (different needs)
- ❌ Teams using other editors (VS Code only)
- ❌ Developers seeking generated code (we show examples, not AI generation)
```

### Step 5: Key Differentiators (3-5 Bullets)

**Question:** Why will people choose this over alternatives?

Not just "better" - what's fundamentally different?

**Format:** Each bullet should be:
- One specific differentiator
- Compared to an alternative
- With the benefit clear

**Example:**
```markdown
## Why This, Not That

- **Real project context** (not isolated snippets)
  - Unlike Stack Overflow, see how code fits in actual applications
  
- **In-editor search** (no context switching)
  - Unlike manual GitHub browsing, search without leaving VS Code
  
- **Production code** (not synthetic examples)
  - Unlike documentation, see battle-tested patterns from real apps
  
- **Zero setup** (instant value)
  - Unlike setting up local example projects, install and search immediately
```

### Step 6: Success Metrics (3-4 Bullets)

**Question:** How will you know this succeeded?

Specific, measurable outcomes.

**Example:**
```markdown
## Success Metrics

**3 Months:**
- 100 installs, 20 weekly active users
- 4+ star rating on VS Code marketplace

**6 Months:**
- 1,000 installs, 200 weekly active users
- Developers report saving 1+ hour per week

**1 Year:**
- 10,000 installs, 2,000 weekly active users
- Featured in developer blog posts and newsletters
- Optional: Validated revenue model (if monetizing)
```

### Step 7: Constraints & Non-Goals (3-5 Bullets)

**Question:** What are you NOT doing?

Clear boundaries prevent scope creep.

**Example:**
```markdown
## Constraints & Non-Goals

- **Browser-only** - No native app, must work in VS Code
- **Public repos only (v1)** - Private repo search requires complex OAuth
- **React-focused (v1)** - Not supporting Vue, Angular, Svelte initially
- **Search, not generation** - Not building AI code generator
- **Solo founder** - Must ship MVP in 3 months with existing skills
```

### Step 8: Risks & Mitigations (2-3 Bullets)

**Question:** What could derail this?

**Format:** Risk → Mitigation

**Example:**
```markdown
## Risks & Mitigations

**Risk:** GitHub API rate limits (5000 requests/hour)  
**Mitigation:** Cache results, implement request batching, use GitHub App auth for higher limits

**Risk:** Developers don't trust code from unknown repositories  
**Mitigation:** Show repository stars, last update, filter by popularity

**Risk:** Microsoft builds this into GitHub/VS Code natively  
**Mitigation:** Ship fast, build loyal user base, focus on features big companies won't prioritize
```

## Output

This skill creates: `_dhurandhar-output/phase-1-ideation/product-brief.md`

**Structure (2 pages max):**
```markdown
# [Product Name] - Product Brief

## Vision
[One paragraph - the world you're creating]

## Problem  
[One paragraph - specific pain being solved]

## Solution
[Two paragraphs - what and how]

## Target Users
[Half page - who it's for, who it's not for]

## Why This, Not That
[3-5 differentiators]

## Success Metrics
[3-4 measurable outcomes]

## Constraints & Non-Goals
[3-5 boundaries]

## Risks & Mitigations
[2-3 major risks with solutions]
```

## What Happens Next

After creating your product brief:
- Run `/prd` to define detailed requirements
- Share the brief with potential users for feedback
- Use it to guide all future decisions ("Does this align with the brief?")

## Yudhishthira's Wisdom

"When I declared my intent to perform the Rajsuya, the message was clear: I would become emperor. Not how I would govern, not what laws I would pass - just the clear statement of intent.

Your product brief is the same. It declares what you will build. The PRD will define how. The architecture will define implementation. But this brief is the foundation - the declaration of your dharma.

Make it clear. Make it true. Make it 2 pages."

---

**A clear declaration of intent gives power to all that follows.**
