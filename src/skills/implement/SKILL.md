---
name: dhr-implement
description: 'Write code, make tests pass, build the system with raw power'
phase: 5
agent: nirmaan
output: Working software + passing tests
---

# Implement

## Purpose

Talk is finished. Planning is done. Now we BUILD.

Like when I vowed to break Dushasana's arm and drink his blood - I did not discuss, I did not plan further. **I acted.**

**What you'll create:** Working, tested, production-ready code.

## Before You Begin

You should have:
- ✅ All design documents from Arjuna
- ✅ Implementation plan from Nakula
- ✅ E2E tests from Nakula (currently FAILING)
- ✅ Development environment set up

**Bhima's way:** CODE. TEST. FIX. REPEAT. Until all tests are GREEN.

## Workflow

### Step 1: Read the Complete Plan

I read EVERYTHING before writing a single line:
- `_dhurandhar-output/phase-4-implementation-planning/epics-and-stories.md` - What to build
- `_dhurandhar-output/phase-4-implementation-planning/e2e-tests.md` - Definition of done
- `_dhurandhar-output/phase-3-system-design/lld.md` - How to build it
- `_dhurandhar-output/phase-3-system-design/hld.md` - Architecture
- `_dhurandhar-output/phase-3-system-design/api-design.md` - Contracts
- `_dhurandhar-output/phase-3-system-design/core-entities.md` - Data model

**Bhima's principle:** Know the target before you strike.

### Step 2: Set Up Development Environment

**Question:** Is everything ready to write code?

**Checklist:**
```markdown
## Environment Setup

✅ **Code:**
- Git repository initialized
- Project scaffolding created
- Dependencies installed (npm install / yarn)
- IDE configured (VS Code extensions, linters)

✅ **Testing:**
- Test framework installed (Vitest/Jest)
- E2E test files created (from Nakula)
- Tests run and FAIL (expected - no implementation yet)
- Test coverage reporting configured

✅ **Build:**
- Build scripts configured (esbuild/webpack)
- Development server works
- Hot reload enabled
- Source maps generated

✅ **Quality:**
- ESLint configured
- Prettier configured
- Pre-commit hooks (husky + lint-staged)
- TypeScript strict mode enabled
```

**Bhima says:** If environment is not ready, FIX IT NOW. Do not write code until tools work.

### Step 3: Choose Implementation Order

**Question:** What to build first?

**Strategy:** Bottom-up (foundation first) OR Top-down (user-facing first)

**Bhima's approach:** Bottom-up with quick validation

```markdown
## Implementation Order

### Phase 1: Foundation (Days 1-3)
1. Database schema and migrations
2. Core data models (TypeScript types)
3. Database access layer
4. Basic CRUD operations
**Validation:** Database tests pass

### Phase 2: Core Logic (Days 4-8)
5. GitHub API client
6. Search service (without ranking)
7. Query normalization
8. Error handling
**Validation:** API contract tests pass

### Phase 3: Business Logic (Days 9-12)
9. Result ranking algorithm
10. Caching service
11. Search history
12. Rate limiting
**Validation:** Happy path tests pass

### Phase 4: UI (Days 13-17)
13. Extension activation
14. Webview UI components
15. Search box and results display
16. Settings page
**Validation:** E2E user flow tests pass

### Phase 5: Polish (Days 18-20)
17. Error messages and UX polish
18. Performance optimization
19. Documentation
20. Final bug fixes
**Validation:** ALL tests pass, ready to ship
```

### Step 4: Test-Driven Development Loop

**Question:** How do you know what to code next?

**Red-Green-Refactor Cycle:**

```
1. RED: Run test → Fails (test expects feature that doesn't exist)
2. GREEN: Write minimal code → Test passes
3. REFACTOR: Clean up code → Test still passes
4. REPEAT
```

**Example - Implementing Search Service:**

```typescript
// STEP 1: RED - Test exists (from Nakula), currently failing

// test: "should search GitHub and return results"
it('should search GitHub and return results', async () => {
  const service = new SearchService(mockGitHub, mockCache, mockDB);
  const results = await service.search({ query: 'modal component' });
  
  expect(results).toHaveLength.greaterThan(0);
  expect(results[0].repository.name).toBeTruthy();
});

// ERROR: SearchService is not defined
// ERROR: search method does not exist

// STEP 2: GREEN - Write minimal code to pass

class SearchService {
  constructor(
    private github: GitHubClient,
    private cache: CacheService,
    private db: Database
  ) {}

  async search(query: SearchQuery): Promise<SearchResult[]> {
    // Minimal implementation
    const response = await this.github.searchCode(query.query);
    return response.items.map(item => ({
      id: item.id,
      repository: item.repository,
      file: { path: item.path, url: item.html_url },
      snippet: { code: item.content, line_number: 1, language: 'typescript' },
      relevance_score: 1.0
    }));
  }
}

// Test now PASSES

// STEP 3: REFACTOR - Clean up

class SearchService {
  async search(query: SearchQuery): Promise<SearchResult[]> {
    // Add validation
    this.validateQuery(query);
    
    // Check cache first
    const cached = await this.cache.get(query.query);
    if (cached) return cached;
    
    // Fetch from GitHub
    const response = await this.github.searchCode(query.query);
    
    // Transform and rank
    const results = this.transformResults(response.items);
    const ranked = this.rankResults(results, query.query);
    
    // Cache results
    await this.cache.set(query.query, ranked, 300); // 5 min TTL
    
    // Save to history
    await this.db.saveSearch(query);
    
    return ranked;
  }
  
  private validateQuery(query: SearchQuery): void {
    if (!query.query || query.query.length < 2) {
      throw new InvalidQueryError('Query must be at least 2 characters');
    }
  }
  
  private transformResults(items: GitHubItem[]): SearchResult[] {
    return items.map(item => ({
      id: generateId(),
      repository: this.extractRepository(item),
      file: this.extractFile(item),
      snippet: this.extractSnippet(item),
      relevance_score: 0  // will be calculated by ranker
    }));
  }
  
  private rankResults(results: SearchResult[], query: string): SearchResult[] {
    // Use ResultRanker from LLD
    return this.ranker.rank(results, query);
  }
}

// Tests still PASS, code is cleaner
```

### Step 5: Handle Blockers Aggressively

**Question:** What do you do when stuck?

**Bhima's approach:** BREAK THROUGH or GO AROUND. Never wait.

**Blocker Types:**

**1. Technical Problem (Can't figure out how)**
- Google it (5 min)
- Read docs (10 min)
- Ask AI (Claude, ChatGPT)
- Find example code
- If still stuck after 30 min: Simplify approach or defer

**2. Missing Information**
- Check design docs
- If ambiguous: Make reasonable assumption, document it, move on
- Flag for review later

**3. Dependency Not Ready**
- Mock the dependency
- Build around it
- Come back later

**4. Test is Wrong**
- If test contradicts design docs: Fix test
- If test is unclear: Clarify, then implement

**Bhima says:** Do not sit idle. If wall is too high, break it. If path is blocked, go through forest. MOVE FORWARD.

### Step 6: Commit Often, Push Regularly

**Question:** How do you save progress?

**Commit Strategy:**
```markdown
## Commit Guidelines

### Commit After:
- Each passing test
- Each completed class/module
- Each refactoring session
- End of day (even if incomplete)

### Commit Message Format:
```
[Epic-Story] Brief description

- What changed
- Why it changed
- Tests that now pass

Example:
[1.1] Implement basic GitHub search

- Created SearchService class
- Integrated GitHub API client
- Added query normalization
- Tests: api-contracts/search.test.ts now pass (5/12)
```

### Push Frequency:
- At least once per day
- After completing each story
- Before context switching

**Bhima's principle:** Code that exists only on your machine does NOT exist. Push it.
```

### Step 7: Track Progress Visibly

**Question:** How do you know you're making progress?

**Progress Indicators:**

```markdown
## Daily Progress Report

### Day 5 Progress
**Completed:**
- ✅ SearchService implementation
- ✅ GitHub API client with rate limiting
- ✅ Query normalization and validation

**Tests Passing:**
- 23/65 total tests passing (+8 today)
- api-contracts/search: 12/12 ✅
- user-flows/search: 3/8 (working)

**Blockers:**
- None

**Tomorrow:**
- Complete search flow tests
- Start caching implementation
- Target: 35/65 tests passing

**Estimated Completion:** Day 18 (on track)
```

**Bhima says:** See progress every day. Each day, more tests GREEN. This is victory.

### Step 8: When to Refactor vs Push Forward

**Question:** Do I clean up now or keep building?

**Bhima's rule:**

**Refactor NOW if:**
- Code is duplicated 3+ times (DRY violation)
- Function > 50 lines (too complex)
- Test is hard to write (design smell)
- You keep fixing same bug (root cause not addressed)

**Refactor LATER if:**
- Code works, tests pass, just "not perfect"
- Performance is acceptable
- Only you will read it (not public API)

**Never Refactor:**
- Right before release (too risky)
- When tests are failing (fix tests first)

**Bhima says:** Make it work. Make it right. Make it fast. IN THAT ORDER.

## Output

This skill produces:
- ✅ **Working code** - All features implemented
- ✅ **Passing tests** - 100% of E2E tests green
- ✅ **Clean commits** - Git history shows clear progress
- ✅ **Documentation** - README, API docs, comments
- ✅ **Ready to deploy** - Build succeeds, no blockers

## What Happens Next

After implementation complete:
- Run `/deploy` to ship to production
- All tests must be GREEN before deploying
- Bhima does both: implement AND deploy

## Bhima's Wisdom

"When I fought Bakasura, I did not plan more. I did not analyze more. I FOUGHT.

When I broke Dushasana's arm, I did not hesitate. I ACTED.

When I killed Duryodhana, I struck where I vowed to strike - the thigh. PRECISELY.

Your implementation is the same:
- Read the plan (you have it from Nakula)
- Know the target (tests define success)
- Write code until tests are GREEN
- Do not overthink. DO.

Yudhishthira decided. Sahadeva defined. Arjuna designed. Nakula planned.

Now I BUILD. And when I build, I build with POWER. With FOCUS. With RELENTLESS FORWARD MOTION.

Code until it works. Test until it's proven. Ship when ready.

This is dharma. This is war. This is implementation."

---

**Implementation is not thinking. Implementation is DOING. Now CODE.**
