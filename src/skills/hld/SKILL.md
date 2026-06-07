---
name: dhr-hld
description: 'Design high-level system architecture - components, data flow, patterns'
phase: 3
agent: rachana
output: _dhurandhar-output/phase-3-system-design/hld.md
---

# High-Level Design (HLD)

## Purpose

Like Krishna's strategy for Kurukshetra - where to place each army division, how forces flow, when to engage - we design the overall system architecture.

**What you'll create:** System-level architecture showing components, interactions, and data flow.

## Before You Begin

You should have:
- ✅ Core entities defined (from `/core-entities`)
- ✅ API design complete (from `/api-design`)
- ✅ PRD (from `/prd`)

**Arjuna's focus:** We see the WHOLE system. How components work together, not individual component internals.

## Workflow

### Step 1: Read Previous Context

I read all Phase 3 outputs:
- `core-entities.md` - What data exists
- `api-design.md` - How services communicate
- `prd.md` - What system must do

### Step 2: Identify System Components

**Question:** What are the major pieces of your system?

**Categories:**
- **Client** - User-facing applications
- **Backend** - Server-side services
- **Data** - Databases, caches
- **External** - Third-party services
- **Infrastructure** - Deployment, monitoring

**Example:**
```markdown
## System Components

### Client Layer
1. **VS Code Extension (Frontend)**
   - WebView UI (React)
   - Extension Host (TypeScript)
   - Local Storage Manager

### Application Layer  
2. **Search Service**
   - Query processor
   - GitHub API client
   - Result ranker

3. **Cache Service**
   - In-memory result cache
   - Query deduplication

### Data Layer
4. **Local Database (SQLite)**
   - User data
   - Search history
   - Preferences

### External Services
5. **GitHub API**
   - Code search
   - Repository metadata

### Infrastructure
6. **VS Code Platform**
   - Extension API
   - SecretStorage
   - WebView host
```

### Step 3: Define Component Responsibilities

**Question:** What does each component DO? What does it NOT do?

**Single Responsibility Principle**: Each component has one clear job.

**Example:**
```markdown
## Component Responsibilities

### VS Code Extension
**Responsibilities:**
- Render search UI
- Handle user input
- Display results
- Manage user settings
- Store data locally

**NOT Responsible For:**
- Searching GitHub (delegates to Search Service)
- Ranking results (delegates to Search Service)
- Caching (delegates to Cache Service)

### Search Service
**Responsibilities:**
- Parse search queries
- Call GitHub API
- Transform API responses
- Rank results by relevance
- Handle rate limits

**NOT Responsible For:**
- UI rendering
- Local data persistence
- User authentication

### Cache Service
**Responsibilities:**
- Store search results temporarily (5 min TTL)
- Deduplicate concurrent queries
- Invalidate stale data

**NOT Responsible For:**
- Long-term persistence
- Business logic
```

### Step 4: Design Data Flow

**Question:** How does data move through the system?

**Use sequence diagrams** for key flows.

**Example - Search Flow:**
```markdown
## Data Flow: User Search

```
User → Extension UI → Search Service → Cache → GitHub API
                          ↓
                    Result Ranker
                          ↓
                    Local Database (save query)
                          ↓
                    Extension UI (display)
```

**Sequence:**
1. User enters query in Extension UI
2. Extension calls Search Service
3. Search Service checks Cache
4. If cache miss:
   a. Query GitHub API
   b. Store in Cache (5 min TTL)
   c. Rank results
5. Save query to Local Database (history)
6. Return results to Extension UI
7. Extension renders results

**Alternative Flow (Rate Limit):**
1-3. Same
4. GitHub returns 429 (rate limit)
5. Search Service checks if user has token
6. If no token: Show "add token" message
7. If has token but still limited: Show retry time
```

### Step 5: Choose Architectural Pattern

**Question:** What overall pattern best fits?

**Common Patterns:**
- **Layered** - Presentation → Business → Data
- **Client-Server** - Fat client, thin server
- **Event-Driven** - Pub/sub, message queue
- **Microservices** - Independent deployable services
- **Monolith** - Single deployment unit

**Example:**
```markdown
## Architecture Pattern: Layered Client-Side

**Choice:** Layered architecture within VS Code extension

**Layers:**
1. **Presentation** - WebView UI components
2. **Business Logic** - Search, ranking, caching services
3. **Data Access** - SQLite wrapper, GitHub API client
4. **Infrastructure** - VS Code platform APIs

**Rationale:**
- No backend server needed (cost, complexity)
- All logic runs locally in extension
- Clear separation of concerns
- Testable in layers

**Trade-offs:**
- ✅ Pro: Simple deployment (just extension)
- ✅ Pro: Works offline (for cached data)
- ❌ Con: Can't share data across users
- ❌ Con: Limited by client resources
```

### Step 6: Define Inter-Component Communication

**Question:** How do components talk to each other?

**Options:**
- **Direct calls** - Function/method invocation
- **Events** - Pub/sub pattern
- **Message queue** - Async messaging
- **HTTP/gRPC** - Network calls
- **Shared memory** - In-process communication

**Example:**
```markdown
## Communication Patterns

### Extension UI ↔ Search Service
**Pattern:** Direct function calls
**Rationale:** Same process, synchronous needed

### Search Service ↔ GitHub API
**Pattern:** HTTP REST
**Rationale:** External service, standard protocol

### Components ↔ Cache Service
**Pattern:** Direct calls with in-memory Map
**Rationale:** Fast, simple, same process

### Search Service → Extension UI (progress updates)
**Pattern:** Event emitter
**Rationale:** Async updates, decoupled
```

### Step 7: Handle Cross-Cutting Concerns

**Question:** What needs apply across all components?

**Categories:**
- **Logging** - Where and what to log
- **Error Handling** - How errors propagate
- **Security** - Authentication, encryption
- **Performance** - Caching, lazy loading
- **Monitoring** - Metrics, health checks

**Example:**
```markdown
## Cross-Cutting Concerns

### Logging
- **Library:** Winston (structured logging)
- **Levels:** ERROR, WARN, INFO, DEBUG
- **Output:** VS Code output channel + file
- **PII:** Never log GitHub tokens or user emails

### Error Handling
- **Strategy:** Errors bubble up to Extension UI
- **User-facing:** Friendly messages (not stack traces)
- **Developer:** Full error in logs with request ID
- **Network errors:** Retry with exponential backoff

### Security
- **Tokens:** Stored in VS Code SecretStorage (encrypted)
- **API calls:** HTTPS only
- **Input validation:** Sanitize all user input
- **Dependencies:** Regular security audits

### Performance
- **Caching:** 5-minute TTL for search results
- **Lazy loading:** UI components load on demand
- **Debouncing:** 300ms delay on search input
- **Pagination:** Load 20 results at a time
```

### Step 8: Deployment Architecture

**Question:** How is the system deployed and operated?

**Example:**
```markdown
## Deployment Architecture

### Package Structure
```
extension/
├── dist/
│   ├── extension.js      (Extension host code)
│   └── webview.js        (UI bundle)
├── package.json
├── README.md
└── LICENSE
```

### Distribution
- **Channel:** VS Code Marketplace
- **Format:** .vsix package
- **Updates:** Auto-update via VS Code
- **Versioning:** Semantic versioning (semver)

### Installation
1. User installs from marketplace
2. VS Code downloads .vsix
3. Extension activates on first search command
4. Creates local SQLite database
5. Ready to use (zero config)

### Monitoring
- **Telemetry:** (Optional) Anonymous usage stats
- **Crash reports:** Send to VS Code diagnostic service
- **Performance:** Track search latency locally
```

### Step 9: Create Architecture Diagram

**Question:** Can you draw the system?

**Use ASCII or Mermaid:**
```markdown
## System Diagram

```
┌─────────────────────────────────────────┐
│         VS Code Extension               │
├─────────────────────────────────────────┤
│  ┌──────────┐                          │
│  │  WebView │  (React UI)              │
│  │    UI    │                          │
│  └────┬─────┘                          │
│       │                                │
│  ┌────▼──────────────────────────┐    │
│  │  Extension Host               │    │
│  │  ┌──────────┐  ┌───────────┐ │    │
│  │  │  Search  │  │   Cache   │ │    │
│  │  │ Service  │  │  Service  │ │    │
│  │  └─────┬────┘  └───────────┘ │    │
│  │        │                      │    │
│  │  ┌─────▼────────────────┐    │    │
│  │  │  Data Access Layer   │    │    │
│  │  └──────┬───────────────┘    │    │
│  └─────────┼────────────────────┘    │
│            │                          │
│     ┌──────▼──────┐                  │
│     │   SQLite    │                  │
│     │   (Local)   │                  │
│     └─────────────┘                  │
└─────────────────────────────────────────┘
              │
              ▼
     ┌────────────────┐
     │  GitHub API    │
     │  (External)    │
     └────────────────┘
```
```

## Output

This skill creates: `_dhurandhar-output/phase-3-system-design/hld.md`

**Structure:**
```markdown
# High-Level Design

## Overview
[System summary]

## System Components
[List all major components]

## Component Responsibilities
[What each does/doesn't do]

## Data Flow Diagrams
[Key user flows]

## Architecture Pattern
[Choice and rationale]

## Inter-Component Communication
[How components talk]

## Cross-Cutting Concerns
[Logging, errors, security, performance]

## Deployment Architecture
[How system is deployed]

## System Diagrams
[Visual architecture]

## Technology Stack
[Languages, frameworks, tools]
```

## What Happens Next

After HLD:
- Run `/lld` to design individual components in detail
- Review with team/stakeholders if applicable

## Arjuna's Wisdom

"Krishna placed the Pandavas on the right wing, Kauravas on the left. He positioned elephants in front, cavalry on flanks, infantry in center. This was high-level strategy.

HOW each soldier fought - that was low-level tactics.

Your HLD is the same. It shows WHERE components sit, HOW they interact, WHAT flows between them. But not HOW each component works internally - that's LLD."

---

**Strategy before tactics. See the battlefield whole.**
