---
name: api-design
description: 'Define API contracts - endpoints, payloads, protocols'
phase: 3
agent: arjuna
output: _dhurandhar-output/phase-3-system-design/api-design.md
---

# API Design

## Purpose

Like agreeing on the rules of engagement before the Kurukshetra battle, we establish how services communicate. Clear contracts prevent chaos.

**What you'll create:** Complete API specification with endpoints, request/response formats, and error handling.

## Before You Begin

You should have:
- ✅ Core entities defined (from `/core-entities`)
- ✅ PRD complete (from `/prd`)

**Arjuna's focus:** We see ONLY the contract. Not the implementation. Not the database queries. Just the interface.

## Workflow

### Step 1: Read Previous Context

I read:
- `_dhurandhar-output/phase-3-system-design/core-entities.md`
- `_dhurandhar-output/phase-2-requirements/prd.md`

I map requirements to API operations.

### Step 2: Choose API Style

**Question:** What API pattern fits your system?

**Options:**
- **REST** - Resource-based, HTTP verbs, stateless
- **GraphQL** - Query language, client-specified responses
- **gRPC** - Binary protocol, strong typing, streaming
- **WebSocket** - Real-time, bidirectional
- **Internal Only** - Function calls, no HTTP

**Example Decision:**
```markdown
## API Style: REST + WebSocket

**REST for CRUD operations:**
- Search queries
- User preferences
- Repository metadata

**WebSocket for real-time:**
- Live search results streaming
- Progress updates

**Rationale:**
- REST is simple, well-understood
- WebSocket for better UX (progressive results)
- No need for GraphQL complexity (limited query patterns)
```

### Step 3: Define Endpoints

**Question:** What are all the API operations?

Group by resource. Define each endpoint precisely.

**Format:**
```markdown
## Endpoints

### Search Operations

#### POST /api/search
**Purpose:** Execute a GitHub code search

**Request:**
```json
{
  "query": "modal component",
  "language": "typescript",
  "framework": "react",
  "limit": 20
}
```

**Response (200 OK):**
```json
{
  "query_id": "uuid-here",
  "total_count": 156,
  "results": [
    {
      "id": "result-uuid",
      "repository": {
        "id": 12345,
        "name": "awesome-app",
        "full_name": "user/awesome-app",
        "stars": 234,
        "url": "https://github.com/user/awesome-app"
      },
      "file": {
        "path": "src/components/Modal.tsx",
        "url": "https://github.com/user/awesome-app/blob/main/src/components/Modal.tsx"
      },
      "snippet": {
        "code": "const Modal = ({ children, onClose }) => {...}",
        "line_number": 42,
        "language": "typescript"
      },
      "relevance_score": 0.95
    }
  ],
  "cached": false,
  "executed_at": "2026-06-06T10:30:00Z"
}
```

**Errors:**
- `400 Bad Request` - Invalid query parameters
- `401 Unauthorized` - Invalid GitHub token
- `429 Too Many Requests` - Rate limit exceeded
- `503 Service Unavailable` - GitHub API down

#### GET /api/search/:id
**Purpose:** Retrieve a previous search by ID

**Response (200 OK):**
```json
{
  "query_id": "uuid-here",
  "query_text": "modal component",
  "results_count": 156,
  "executed_at": "2026-06-06T10:30:00Z",
  "results": [...]
}
```

#### GET /api/search/history
**Purpose:** Get user's search history

**Query Parameters:**
- `limit` (default: 20, max: 100)
- `offset` (default: 0)

**Response (200 OK):**
```json
{
  "searches": [
    {
      "id": "uuid",
      "query_text": "modal component",
      "results_count": 156,
      "executed_at": "2026-06-06T10:30:00Z"
    }
  ],
  "total": 45,
  "limit": 20,
  "offset": 0
}
```
```

### Step 4: Define Data Models

**Question:** What's the exact structure of each entity in API responses?

**TypeScript interfaces** (for documentation):

```typescript
interface SearchRequest {
  query: string;           // required, max 200 chars
  language?: 'typescript' | 'javascript';  // optional
  framework?: 'react' | 'vue' | 'angular'; // optional
  limit?: number;          // default 20, max 100
}

interface SearchResponse {
  query_id: string;        // UUID
  total_count: number;
  results: SearchResult[];
  cached: boolean;
  executed_at: string;     // ISO 8601 timestamp
}

interface SearchResult {
  id: string;
  repository: Repository;
  file: FileInfo;
  snippet: CodeSnippet;
  relevance_score: number; // 0.0 to 1.0
}

interface Repository {
  id: number;
  name: string;
  full_name: string;
  stars: number;
  url: string;
}
```

### Step 5: Error Handling

**Question:** What errors can occur? How do we communicate them?

**Standard Error Response:**
```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "GitHub API rate limit exceeded. Try again in 15 minutes.",
    "details": {
      "limit": 5000,
      "remaining": 0,
      "reset_at": "2026-06-06T11:00:00Z"
    },
    "request_id": "uuid-for-debugging"
  }
}
```

**Error Codes:**
```markdown
| Code | HTTP | Description | User Action |
|------|------|-------------|-------------|
| INVALID_QUERY | 400 | Query string is empty or invalid | Provide valid search query |
| RATE_LIMIT_EXCEEDED | 429 | GitHub API limit hit | Wait or add GitHub token |
| UNAUTHORIZED | 401 | Invalid GitHub token | Check token in settings |
| GITHUB_API_ERROR | 503 | GitHub API is down | Try again later |
| INTERNAL_ERROR | 500 | Unexpected server error | Report bug with request_id |
```

### Step 6: Authentication & Authorization

**Question:** How do clients authenticate?

**Example:**
```markdown
## Authentication

### Optional GitHub Token

**Header:**
```
Authorization: Bearer ghp_xxxxxxxxxxxx
```

**Behavior:**
- Without token: 5000 requests/hour (GitHub unauthenticated limit)
- With token: 30000 requests/hour
- Token stored securely in VS Code SecretStorage
- Token validation on first use

### Request Signing (if needed)
[Define if you need request signatures]
```

### Step 7: Rate Limiting

**Question:** How do you prevent abuse?

```markdown
## Rate Limiting

### Limits
- **Unauthenticated**: 60 requests/hour per IP
- **Authenticated**: 5000 requests/hour per user

### Headers
Response includes:
```
X-RateLimit-Limit: 5000
X-RateLimit-Remaining: 4999
X-RateLimit-Reset: 1654531200
```

### Exceeded Behavior
- Return 429 status
- Include retry-after header
- Show user-friendly message in UI
```

### Step 8: API Versioning

**Question:** How will you handle breaking changes?

```markdown
## Versioning

### Strategy: URL Path Versioning

**Current:** `/api/v1/search`
**Future:** `/api/v2/search`

### Deprecation Policy
- New version released: v1 supported for 6 months
- v1 deprecated: Warning headers added
- v1 sunset: Returns 410 Gone

### Breaking Changes
- Removing endpoints
- Changing required fields
- Changing response structure

### Non-Breaking Changes (no version bump)
- Adding optional fields
- Adding new endpoints
- Adding response fields
```

## Output

This skill creates:
- `_dhurandhar-output/phase-3-system-design/api-design.md` - Complete API spec
- `_dhurandhar-output/phase-3-system-design/api-types.ts` - TypeScript interfaces (optional)

**Structure:**
```markdown
# API Design

## Overview
[API style choice and rationale]

## Base Configuration
[Base URL, versioning, authentication]

## Endpoints
[Complete list of all endpoints with request/response]

## Data Models
[TypeScript interfaces or JSON schemas]

## Error Handling
[Error codes, formats, recovery]

## Authentication
[How clients auth]

## Rate Limiting
[Limits and headers]

## Versioning Strategy
[How breaking changes are handled]
```

## What Happens Next

After API design:
- Run `/hld` to design system architecture
- Nakula will later use this to write API tests

## Arjuna's Wisdom

"Before each arrow, I knew exactly:
- What I was aiming at (target)
- What trajectory to use (path)
- What would happen on impact (result)

Your API is the same. Each endpoint must define:
- What it accepts (request)
- How it processes (behavior)
- What it returns (response)

No ambiguity. No guessing. Pure contract."

---

**The contract defines the interface. Honor it precisely.**
