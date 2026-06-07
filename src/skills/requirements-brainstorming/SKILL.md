---
name: dhr-requirements-brainstorming
description: 'Explore different ways to capture and specify requirements'
phase: 2
agent: sankalpa
output: _dhurandhar-output/phase-2-requirements/requirements-brainstorming.md
---

# Requirements Brainstorming

## Purpose

Before locking into a specific requirements format, explore different ways to think about and capture what you need to build.

**What you'll create:** Alternative approaches to defining requirements and potential gaps to address.

## Before You Begin

You should have:
- ✅ Core idea and product brief from Phase 1
- ✅ Understanding of your users
- ✅ Openness to different requirement formats

## Workflow

### Step 1: Requirement Capture Approaches

**Question:** What are different ways to capture these requirements?

Explore alternatives:

1. **Traditional PRD** (what we'll likely use)
   - Structured document with functional/non-functional requirements
   - Good for: Complete specification, stakeholder alignment
   - Risk: Can become too rigid or detailed

2. **User Story Mapping**
   - Visual map of user journey with stories
   - Good for: User-centric thinking, prioritization
   - Risk: Can miss system-level requirements

3. **BDD Scenarios**
   - Given-When-Then scenarios
   - Good for: Testable specifications, clarity
   - Risk: Time-consuming to write comprehensively

4. **Jobs-to-be-Done**
   - Focus on what users are trying to accomplish
   - Good for: Understanding true needs
   - Risk: Can be abstract

5. **API-First Specification**
   - Define the API contract as the requirement
   - Good for: Clear interfaces, contract-driven
   - Risk: May miss UX/business requirements

**For each approach, consider:**
- What would we capture that we might miss otherwise?
- What's the effort vs. value?
- Could we combine approaches?

### Step 2: Requirement Dimensions to Explore

**Question:** What types of requirements might we be forgetting?

**Functional Requirements:**
- What must the system DO?
- What operations, workflows, business rules?

**Non-Functional Requirements:**
- Performance: How fast? How many users?
- Security: What data needs protection?
- Reliability: What uptime is needed?
- Scalability: How will it grow?

**User Requirements:**
- Who are ALL the user types? (not just primary)
- What are their goals, constraints, environments?
- Accessibility needs?

**Integration Requirements:**
- What systems must this integrate with?
- What data formats? What protocols?
- What happens when external systems fail?

**Operational Requirements:**
- How will this be deployed?
- Monitored? Updated? Backed up?
- Support and maintenance?

**Compliance & Constraints:**
- Legal requirements (GDPR, accessibility, etc.)
- Technical constraints (must use X technology)
- Budget/timeline constraints
- Organizational policies

### Step 3: Perspectives to Consider

**Question:** Who else should we ask? What perspectives are we missing?

Explore different viewpoints:

**End Users:**
- What do they actually need vs. what they say they want?
- What's their current workflow we're disrupting?
- What will make them reject this solution?

**Operations Team:**
- How will they deploy and maintain this?
- What monitoring/alerting do they need?
- What runbooks are required?

**Support Team:**
- What will users call about?
- What troubleshooting info is needed?
- How can we reduce support load?

**Security/Compliance:**
- What data is sensitive?
- What audit trails are needed?
- What access controls?

**Business Stakeholders:**
- What metrics define success?
- What's the ROI expectation?
- What's the competitive landscape?

### Step 4: Requirement Formats to Explore

**Question:** How should we structure the PRD?

Compare formats:

**Option A: Use Case Driven**
- Organize by user scenarios
- Each use case with: actors, preconditions, flow, postconditions
- Good for: Understanding user workflows

**Option B: Feature Driven**
- Organize by features/capabilities
- Each feature with: description, requirements, acceptance criteria
- Good for: Building incrementally

**Option C: System Component Driven**
- Organize by major subsystems
- Each component with: responsibilities, interfaces, requirements
- Good for: Technical teams

**Option D: Hybrid**
- Mix of approaches
- User stories + technical specifications + acceptance criteria

### Step 5: Risk Identification

**Question:** What could go wrong with our requirements?

**Common Requirement Risks:**

- **Scope Creep:** Are we specifying too much?
- **Ambiguity:** Are requirements clear and testable?
- **Missing Edge Cases:** What scenarios did we forget?
- **Over-Specification:** Are we constraining the solution too much?
- **Under-Specification:** Are we leaving too much undefined?
- **Changing Requirements:** How do we handle changes?
- **Stakeholder Disagreement:** Do stakeholders align on priorities?

## Output Format

Save your brainstorming to: `_dhurandhar-output/phase-2-requirements/requirements-brainstorming.md`

Include:
1. Alternative requirement approaches considered
2. Requirement dimensions explored
3. Perspectives you need to gather
4. Format chosen and why
5. Identified risks and mitigation strategies

## Next Steps

After brainstorming:
1. Choose your approach
2. Write the full PRD using `/dhr-prd`
3. Review with stakeholders
4. Refine based on feedback

## Remember

**Requirements are a contract between stakeholders.**

The goal is shared understanding, not perfect documentation.

Be complete enough to build correctly, but flexible enough to adapt.
