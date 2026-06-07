---
name: dhr-e2e-api-tests
description: 'Write end-to-end API tests BEFORE implementation - contract-first development'
phase: 4
agent: yojana
output: _dhurandhar-output/phase-4-implementation-planning/e2e-tests.md
---

# E2E API Tests

## Purpose

Like knowing the exact outcome of each cavalry charge before battle - we define success criteria as executable tests BEFORE Bhima writes a single line of implementation code.

**Contract-First Development:** Tests define the contract. Implementation fulfills it.

**What you'll create:** Executable test suite that validates all API contracts and user flows.

## Before You Begin

You should have:
- ✅ API design complete (from `/api-design`)
- ✅ Epics and stories defined (from `/epics-and-stories`)
- ✅ Understanding of testing frameworks

**Nakula's approach:** Write tests that will FAIL now, PASS when implementation is correct.

## Workflow

### Step 1: Read API Specification

I read:
- `_dhurandhar-output/phase-3-system-design/api-design.md`
- `_dhurandhar-output/phase-4-implementation-planning/epics-and-stories.md`

I identify every API endpoint and user flow that needs testing.

### Step 2: Choose Testing Framework

**Question:** What test framework fits your stack?

**Options:**
- **Vitest** - Fast, modern (Vite-based)
- **Jest** - Mature, widely used
- **Playwright** - E2E browser testing
- **Supertest** - HTTP API testing

**Example Decision:**
```markdown
## Testing Stack

### Unit Tests: Vitest
- Fast execution
- TypeScript support
- Built-in mocking

### E2E Tests: Vitest + MSW (Mock Service Worker)
- Test API contracts
- Mock GitHub API responses
- Validate request/response shapes

### Extension E2E: VS Code Extension Test
- Test extension activation
- Validate webview communication
- Real VS Code environment
```

### Step 3: Define Test Categories

**Question:** What types of tests do we need?

**Categories:**
1. **API Contract Tests** - Validate request/response shapes
2. **Happy Path Tests** - Typical user flows work
3. **Error Case Tests** - Failures handled correctly
4. **Edge Case Tests** - Boundary conditions
5. **Integration Tests** - Components work together

**Example:**
```markdown
## Test Categories

### 1. API Contract Tests (20 tests)
- Request validation
- Response schema validation
- Error response formats
- HTTP status codes

### 2. Happy Path Tests (15 tests)
- User searches and gets results
- User filters by language
- User views search history
- User adds GitHub token

### 3. Error Cases (12 tests)
- Invalid query handling
- Rate limit exceeded
- GitHub API down
- Network timeout

### 4. Edge Cases (8 tests)
- Empty query
- Query too long
- No results found
- Malformed GitHub response

### 5. Integration Tests (10 tests)
- Search → Cache → Database flow
- Authentication → API call flow
- Full user journey end-to-end
```

### Step 4: Write API Contract Tests

**Question:** Does the API honor its contracts?

Test every endpoint's request/response shape.

**Example:**
```typescript
// e2e-tests/api-contracts/search.test.ts

import { describe, it, expect, beforeAll } from 'vitest';
import { setupMockGitHubAPI } from '../mocks/github';

describe('POST /api/search - Contract Tests', () => {
  beforeAll(() => {
    setupMockGitHubAPI();
  });

  it('should accept valid search request', async () => {
    const request = {
      query: 'modal component',
      language: 'typescript',
      limit: 20
    };

    const response = await searchAPI.post('/api/search', request);

    expect(response.status).toBe(200);
  });

  it('should return valid search response structure', async () => {
    const response = await searchAPI.post('/api/search', {
      query: 'modal component'
    });

    expect(response.body).toMatchObject({
      query_id: expect.any(String),
      total_count: expect.any(Number),
      results: expect.any(Array),
      cached: expect.any(Boolean),
      executed_at: expect.stringMatching(ISO8601_REGEX)
    });
  });

  it('should validate each result structure', async () => {
    const response = await searchAPI.post('/api/search', {
      query: 'modal component'
    });

    const result = response.body.results[0];
    
    expect(result).toMatchObject({
      id: expect.any(String),
      repository: {
        id: expect.any(Number),
        name: expect.any(String),
        full_name: expect.any(String),
        stars: expect.any(Number),
        url: expect.stringMatching(/^https:\/\/github\.com/)
      },
      file: {
        path: expect.any(String),
        url: expect.stringMatching(/^https:\/\/github\.com/)
      },
      snippet: {
        code: expect.any(String),
        line_number: expect.any(Number),
        language: expect.stringMatching(/^(typescript|javascript)$/)
      },
      relevance_score: expect.any(Number)
    });
  });

  it('should reject invalid request (missing query)', async () => {
    const response = await searchAPI.post('/api/search', {
      language: 'typescript'
      // query is missing
    });

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe('INVALID_QUERY');
  });

  it('should reject invalid request (query too long)', async () => {
    const response = await searchAPI.post('/api/search', {
      query: 'a'.repeat(201)  // > 200 chars
    });

    expect(response.status).toBe(400);
  });
});
```

### Step 5: Write Happy Path Tests

**Question:** Do typical user flows work end-to-end?

Test complete user journeys.

**Example:**
```typescript
// e2e-tests/user-flows/search-flow.test.ts

describe('User Flow: Search for React Components', () => {
  it('should complete full search journey', async () => {
    // Given: User opens extension
    const extension = await activateExtension();
    
    // When: User enters search query
    await extension.searchBox.type('modal component');
    await extension.searchButton.click();
    
    // Then: Results appear within 3 seconds
    const results = await extension.waitForResults({ timeout: 3000 });
    expect(results).toHaveLength.greaterThan(0);
    
    // And: Results show correct structure
    const firstResult = results[0];
    expect(firstResult.repository.name).toBeTruthy();
    expect(firstResult.snippet.code).toContain('modal');
    
    // And: User can copy code
    await firstResult.copyButton.click();
    const clipboard = await extension.getClipboard();
    expect(clipboard).toBe(firstResult.snippet.code);
    
    // And: Search is saved to history
    const history = await extension.getSearchHistory();
    expect(history[0].query_text).toBe('modal component');
  });

  it('should handle language filtering', async () => {
    const extension = await activateExtension();
    
    // When: User searches with TypeScript filter
    await extension.searchBox.type('useState hook');
    await extension.languageFilter.select('typescript');
    await extension.searchButton.click();
    
    // Then: Only TypeScript results returned
    const results = await extension.waitForResults();
    results.forEach(result => {
      expect(result.snippet.language).toBe('typescript');
    });
  });
});
```

### Step 6: Write Error Case Tests

**Question:** Do error scenarios fail gracefully?

Test every error code from API design.

**Example:**
```typescript
// e2e-tests/error-cases/rate-limiting.test.ts

describe('Error Handling: Rate Limits', () => {
  it('should handle GitHub rate limit gracefully', async () => {
    // Given: GitHub API will return rate limit error
    mockGitHub.setRateLimitExceeded({
      resetAt: Date.now() + 15 * 60 * 1000  // 15 min
    });
    
    // When: User searches
    const response = await searchAPI.post('/api/search', {
      query: 'modal'
    });
    
    // Then: Returns 429 with helpful error
    expect(response.status).toBe(429);
    expect(response.body.error).toMatchObject({
      code: 'RATE_LIMIT_EXCEEDED',
      message: expect.stringContaining('Try again in'),
      details: {
        reset_at: expect.any(String)
      }
    });
  });

  it('should suggest adding GitHub token on rate limit', async () => {
    mockGitHub.setRateLimitExceeded();
    
    const extension = await activateExtension();
    await extension.search('modal');
    
    // Should show error message with action
    const errorMessage = await extension.getErrorMessage();
    expect(errorMessage).toContain('Add GitHub token');
    expect(errorMessage).toContain('settings');
  });

  it('should handle GitHub API downtime', async () => {
    mockGitHub.setOffline();
    
    const response = await searchAPI.post('/api/search', {
      query: 'modal'
    });
    
    expect(response.status).toBe(503);
    expect(response.body.error.code).toBe('GITHUB_API_ERROR');
  });
});
```

### Step 7: Write Performance Tests

**Question:** Does the system meet performance requirements?

Test non-functional requirements from PRD.

**Example:**
```typescript
// e2e-tests/performance/search-speed.test.ts

describe('Performance: Search Speed', () => {
  it('should return results within 3 seconds (NFR-1.1)', async () => {
    const startTime = Date.now();
    
    await searchAPI.post('/api/search', {
      query: 'react hooks'
    });
    
    const duration = Date.now() - startTime;
    expect(duration).toBeLessThan(3000);
  });

  it('should handle 100 concurrent searches', async () => {
    const searches = Array.from({ length: 100 }, (_, i) => 
      searchAPI.post('/api/search', { query: `query-${i}` })
    );
    
    const results = await Promise.all(searches);
    
    // All should succeed
    results.forEach(r => expect(r.status).toBe(200));
    
    // 90% under 3 seconds (NFR-1.1)
    const under3s = results.filter(r => r.duration < 3000);
    expect(under3s.length / results.length).toBeGreaterThan(0.9);
  });
});
```

### Step 8: Create Test Data Fixtures

**Question:** What mock data do tests need?

Create reusable test fixtures.

**Example:**
```typescript
// e2e-tests/fixtures/github-responses.ts

export const mockSearchResponse = {
  total_count: 156,
  items: [
    {
      name: 'Modal.tsx',
      path: 'src/components/Modal.tsx',
      repository: {
        id: 12345,
        full_name: 'user/awesome-app',
        stargazers_count: 234
      },
      // ... full mock response
    }
  ]
};

export const mockRateLimitResponse = {
  message: 'API rate limit exceeded',
  documentation_url: 'https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting'
};
```

## Output

This skill creates:
- `_dhurandhar-output/phase-4-implementation-planning/e2e-tests.md` - Test documentation
- `_dhurandhar-output/phase-4-implementation-planning/test-suites/` - Actual test files

**Directory Structure:**
```
test-suites/
├── api-contracts/
│   ├── search.test.ts
│   ├── history.test.ts
│   └── auth.test.ts
├── user-flows/
│   ├── search-flow.test.ts
│   └── authentication-flow.test.ts
├── error-cases/
│   ├── rate-limiting.test.ts
│   └── validation-errors.test.ts
├── performance/
│   └── search-speed.test.ts
├── fixtures/
│   └── github-responses.ts
└── mocks/
    └── github-api.ts
```

## What Happens Next

After E2E tests are written:
- Tests currently FAIL (no implementation yet)
- Hand off to Bhima (`/implement`)
- Bhima writes code until all tests PASS
- Tests define "done"

## Nakula's Wisdom

"Before each cavalry charge, I knew:
- The target (API endpoint)
- The path (user flow)
- Success criteria (tests pass)

I did not charge blindly. I charged with precision.

Your E2E tests are the same. They define success BEFORE the battle begins.

Bhima will write code until your tests turn green. The tests are his target. They are his guide. They are his measure of victory.

Write tests that capture the essence of correctness. Make them beautiful. Make them clear. Make them unmistakable."

---

**Test first, implement second. This is the way of dharma.**
