---
name: dhr-lld
description: 'Design low-level component details - classes, modules, algorithms'
phase: 3
agent: rachana
output: _dhurandhar-output/phase-3-system-design/lld.md
---

# Low-Level Design (LLD)

## Purpose

Like how I aimed at the fish's eye - not the fish, not the reflection, just the eye - we now focus on each component's internal design with absolute precision.

**What you'll create:** Detailed design of each component's internals - classes, modules, algorithms, and interfaces.

## Before You Begin

You should have:
- ✅ HLD complete (from `/hld`)
- ✅ API design (from `/api-design`)
- ✅ Core entities (from `/core-entities`)

**Arjuna's focus:** We see INSIDE each component. Not the system, just the component internals.

## Workflow

### Step 1: Read Previous Context

I read all Phase 3 outputs:
- `hld.md` - What components exist, how they interact
- `api-design.md` - External interfaces
- `core-entities.md` - Data structures

### Step 2: Select Components to Design

**Question:** Which components need detailed design?

Not everything needs LLD. Focus on:
- ✅ Complex business logic
- ✅ Non-trivial algorithms
- ✅ Reusable modules
- ✅ Security-critical code

**Skip:**
- ❌ Simple CRUD operations
- ❌ Standard library wrappers
- ❌ Trivial getters/setters

**Example:**
```markdown
## Components Requiring LLD

### High Priority
1. **Search Service** - Complex query processing, ranking algorithm
2. **Cache Service** - TTL management, eviction policy
3. **GitHub API Client** - Rate limiting, retry logic

### Medium Priority
4. **Data Access Layer** - Query builder, migrations
5. **Authentication Manager** - Token encryption, validation

### Low Priority (Standard Implementation)
6. UI Components - Standard React patterns
7. Configuration Manager - Simple key-value storage
```

### Step 3: Design Class Structure

**Question:** What classes/modules does the component contain?

Use object-oriented or functional design patterns.

**Example - Search Service:**
```typescript
## Search Service - Class Design

### SearchService (Main Orchestrator)
```typescript
class SearchService {
  constructor(
    private githubClient: GitHubAPIClient,
    private cache: CacheService,
    private ranker: ResultRanker,
    private db: Database
  ) {}

  async search(query: SearchQuery): Promise<SearchResponse> {
    // Orchestrates the search flow
  }

  async getSearchHistory(userId: string, limit: number): Promise<SearchQuery[]> {
    // Retrieves user's past searches
  }
}
```

### GitHubAPIClient (External Communication)
```typescript
class GitHubAPIClient {
  private rateLimiter: RateLimiter;
  private httpClient: HttpClient;

  async searchCode(query: string, options: SearchOptions): Promise<GitHubResponse> {
    // Handles GitHub API calls with rate limiting
  }

  async getRepository(repoId: number): Promise<Repository> {
    // Fetches repository metadata
  }
}
```

### ResultRanker (Business Logic)
```typescript
class ResultRanker {
  rank(results: RawSearchResult[]): RankedSearchResult[] {
    // Implements relevance scoring algorithm
  }

  private calculateRelevance(result: RawSearchResult, query: string): number {
    // Scoring formula
  }
}
```

### RateLimiter (Utility)
```typescript
class RateLimiter {
  async checkLimit(userId?: string): Promise<RateLimitStatus> {
    // Checks if request allowed
  }

  async waitForReset(): Promise<void> {
    // Blocks until rate limit resets
  }
}
```
```

### Step 4: Define Algorithms

**Question:** What are the non-trivial algorithms?

Document complex logic with pseudocode.

**Example - Relevance Ranking:**
```markdown
## Algorithm: Result Relevance Scoring

### Purpose
Rank search results by relevance to user's query

### Inputs
- `results`: Array of code snippets from GitHub
- `query`: User's search string

### Outputs
- Sorted array with relevance scores (0.0 to 1.0)

### Algorithm
```
function rankResults(results, query):
  scoredResults = []
  
  for each result in results:
    score = 0.0
    
    // Factor 1: Exact match in filename (30% weight)
    if result.filename contains query:
      score += 0.3
    
    // Factor 2: Repository popularity (20% weight)
    popularityScore = min(result.stars / 1000, 1.0)
    score += popularityScore * 0.2
    
    // Factor 3: Code recency (15% weight)
    ageInDays = now() - result.lastUpdated
    recencyScore = max(1.0 - (ageInDays / 365), 0)
    score += recencyScore * 0.15
    
    // Factor 4: Query terms in code (35% weight)
    matchCount = countMatches(result.code, query)
    matchScore = min(matchCount / 5, 1.0)
    score += matchScore * 0.35
    
    scoredResults.push({result, score})
  
  return sort(scoredResults, by: score, descending)
```

### Complexity
- Time: O(n * m) where n = results, m = query length
- Space: O(n)

### Edge Cases
- Empty results → return empty array
- Query too short (< 2 chars) → return error
- All scores equal → maintain GitHub API order
```

### Step 5: Design State Management

**Question:** How does the component manage state?

Define state transitions and invariants.

**Example - Cache Service:**
```markdown
## Cache Service - State Management

### State Structure
```typescript
interface CacheState {
  entries: Map<string, CacheEntry>;
  hitCount: number;
  missCount: number;
}

interface CacheEntry {
  key: string;
  value: SearchResult[];
  createdAt: number;
  expiresAt: number;
  accessCount: number;
}
```

### State Transitions
```
[Empty] 
  ↓ set(key, value)
[Cached - Fresh] (< 5 min old)
  ↓ get(key) → Cache Hit
[Cached - Fresh]
  ↓ wait > 5 min
[Cached - Stale]
  ↓ cleanup() → eviction
[Empty]
```

### Invariants
- All entries have expiresAt > createdAt
- Stale entries (> 5 min) removed on access
- Max 100 entries (LRU eviction)
- Keys are normalized (lowercase, trimmed)
```

### Step 6: Error Handling Strategy

**Question:** How does the component handle errors?

Define error types and recovery strategies.

**Example:**
```markdown
## Error Handling - Search Service

### Error Types

#### GitHubAPIError
**Cause:** GitHub API failure  
**Detection:** HTTP 5xx, network timeout  
**Recovery:** Retry with exponential backoff (3 attempts)  
**User Impact:** Show "Search unavailable, retrying..."

#### RateLimitError  
**Cause:** Too many requests  
**Detection:** HTTP 429, X-RateLimit-Remaining = 0  
**Recovery:** Wait until reset time  
**User Impact:** Show "Rate limit hit. Add token or wait N minutes"

#### InvalidQueryError
**Cause:** Query validation failed  
**Detection:** Query empty or > 200 chars  
**Recovery:** None (user error)  
**User Impact:** Show "Invalid query. Use 2-200 characters"

### Error Propagation
```typescript
class SearchService {
  async search(query: SearchQuery): Promise<SearchResponse> {
    try {
      // Validate
      if (!this.isValidQuery(query)) {
        throw new InvalidQueryError("Query must be 2-200 chars");
      }
      
      // Execute
      const results = await this.githubClient.searchCode(query);
      return results;
      
    } catch (error) {
      if (error instanceof RateLimitError) {
        // Log and suggest mitigation
        logger.warn("Rate limit hit", {userId: query.userId});
        throw new UserFacingError(
          "Rate limit exceeded",
          "Add GitHub token or wait " + error.resetIn + " minutes"
        );
      }
      
      if (error instanceof GitHubAPIError) {
        // Retry logic
        return this.retrySearch(query, 3);
      }
      
      // Unknown error
      logger.error("Unexpected error", {error, query});
      throw error;
    }
  }
}
```
```

### Step 7: Define Interfaces and Contracts

**Question:** What are the contracts between internal modules?

Explicit interfaces prevent coupling.

**Example:**
```typescript
## Internal Interfaces

### ICache (Dependency Injection)
```typescript
interface ICache {
  get(key: string): Promise<CacheEntry | null>;
  set(key: string, value: any, ttl: number): Promise<void>;
  delete(key: string): Promise<void>;
  clear(): Promise<void>;
}
```

### IGitHubClient
```typescript
interface IGitHubClient {
  searchCode(query: string, options?: SearchOptions): Promise<GitHubResponse>;
  getRateLimit(): Promise<RateLimitStatus>;
}
```

### IResultRanker
```typescript
interface IResultRanker {
  rank(results: RawSearchResult[], query: string): RankedSearchResult[];
}
```

**Benefits:**
- Easy mocking for tests
- Swap implementations (e.g., different cache backends)
- Clear contracts between modules
```

### Step 8: Document Data Structures

**Question:** What internal data structures are used?

Not database schemas (that's core-entities), but in-memory structures.

**Example:**
```markdown
## Internal Data Structures

### QueryNormalizer Output
```typescript
interface NormalizedQuery {
  original: string;
  normalized: string;      // lowercase, trimmed
  tokens: string[];        // split by whitespace
  filters: QueryFilters;
}

interface QueryFilters {
  language?: 'typescript' | 'javascript';
  framework?: 'react' | 'vue' | 'angular';
  minStars?: number;
}
```

### RankingContext (used by ResultRanker)
```typescript
interface RankingContext {
  query: NormalizedQuery;
  userHistory: string[];   // past successful queries
  recentResults: string[]; // recently clicked results
}
```
```

## Output

This skill creates: `_dhurandhar-output/phase-3-system-design/lld.md`

**Structure:**
```markdown
# Low-Level Design

## Overview
[Components being designed]

## Component: [Name]
### Class Structure
[Classes, modules, responsibilities]

### Algorithms
[Pseudocode for complex logic]

### State Management
[How state is managed]

### Error Handling
[Error types and recovery]

### Internal Interfaces
[Contracts between modules]

### Data Structures
[In-memory structures]

## Component: [Next Component]
...

## Design Patterns Used
[Observer, Factory, Singleton, etc.]

## Testing Strategy
[How to unit test each component]
```

## What Happens Next

After LLD:
- Phase 3 (Design) is complete!
- Run `/nakula` to begin Phase 4 (Planning)
- Nakula will create epics, stories, and E2E tests

## Arjuna's Wisdom

"When asked what I saw, I said 'the eye.' Not the bird, not the tree - just the eye.

Your LLD is the same. When designing SearchService:
- Not 'the system' (that's HLD)
- Not 'the user experience' (that's UX)
- Just: What classes? What methods? What algorithms?

Focus. Precision. Excellence.

The fish-eye test was not about the bird. It was about seeing ONLY what matters.

Your LLD should see ONLY the component internals. Nothing more, nothing less."

---

**Low-level design is where precision becomes code.**
