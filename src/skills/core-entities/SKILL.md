---
name: dhr-core-entities
description: 'Design the data model - entities, relationships, schemas'
phase: 3
agent: rachana
output: _dhurandhar-output/phase-3-system-design/core-entities.md
---

# Core Entities

## Purpose

Like identifying which warriors stand where on the Kurukshetra battlefield, we map out every piece of data in your system and how they relate.

**This is the foundation.** Get this wrong, everything else fails.

**What you'll create:** Complete data model with entities, relationships, and database schemas.

## Before You Begin

You should have:
- ✅ PRD complete (from `/prd`)
- ✅ 60-90 minutes of focused time

**Arjuna's focus:** We see ONLY the data. Not the UI. Not the API. Not the business logic. Just the data.

## Workflow

### Step 1: Read the PRD

First, I read: `_dhurandhar-output/phase-2-requirements/prd.md`

I identify every **noun** in the requirements. These are candidate entities.

**Example from PRD:**
- "Users search repositories" → User, Repository
- "Results display code snippets" → SearchResult, CodeSnippet
- "System stores tokens" → AuthToken
- "Shows repository stars" → RepositoryStat

### Step 2: Identify Core Entities

**Question:** What are the essential "things" in your system?

Not all nouns are entities. Filter for:
- Things you **store** in a database
- Things that have **unique identity**
- Things that **change over time**

**Example:**
```markdown
## Core Entities

### User
- Represents: A developer using the extension
- Unique by: VS Code installation ID
- Lifecycle: Created on first use, persists across sessions

### SearchQuery
- Represents: A search performed by a user  
- Unique by: Auto-generated ID
- Lifecycle: Created on search, stored for history

### SearchResult
- Represents: A code snippet from GitHub
- Unique by: Repository URL + file path + line number
- Lifecycle: Created from API response, cached temporarily

### Repository
- Represents: A GitHub repository
- Unique by: GitHub repository ID
- Lifecycle: Created when first seen, updated when accessed

### UserPreferences
- Represents: User settings and configuration
- Unique by: User ID (one per user)
- Lifecycle: Created with default values, updated by user
```

**Arjuna asks:** Can you point to each entity and say "this is one specific thing"? If not, it's not an entity.

### Step 3: Define Attributes

**Question:** For each entity, what data do we store?

Be precise about types and constraints.

**Format:**
```markdown
## Entity: User

### Attributes
| Attribute | Type | Constraints | Description |
|-----------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| vscode_id | String | UNIQUE, NOT NULL | VS Code installation ID |
| github_token | String (encrypted) | NULL | Optional GitHub token |
| created_at | Timestamp | NOT NULL | When user first used extension |
| last_active_at | Timestamp | NOT NULL | Last time user performed action |
| preferences_id | UUID | FOREIGN KEY → UserPreferences | Link to preferences |

### Business Rules
- One user per VS Code installation
- GitHub token must be encrypted at rest
- last_active_at updated on every search
```

**Repeat for each entity.**

**Arjuna asks:** For each attribute - what's its type? Can it be null? What are valid values? Be specific.

### Step 4: Model Relationships

**Question:** How do entities relate to each other?

Use standard relationship types:
- **1:1** (One-to-One)
- **1:N** (One-to-Many)
- **N:M** (Many-to-Many)

**Example:**
```markdown
## Relationships

### User ←1:N→ SearchQuery
- One user performs many searches
- Each search belongs to one user
- Implementation: SearchQuery.user_id → User.id

### SearchQuery ←1:N→ SearchResult
- One search produces many results
- Each result belongs to one search
- Implementation: SearchResult.query_id → SearchQuery.id

### SearchResult ←N:1→ Repository
- Many results come from one repository
- Each repository has many results
- Implementation: SearchResult.repository_id → Repository.id

### User ←1:1→ UserPreferences
- One user has one preferences object
- Each preferences belongs to one user
- Implementation: User.preferences_id → UserPreferences.id
```

**Draw it:**
```
User (1) ----< (N) SearchQuery (1) ----< (N) SearchResult (N) >---- (1) Repository
  |
  | (1:1)
  |
UserPreferences
```

### Step 5: Choose Storage

**Question:** What database technology for each entity?

Consider access patterns and data characteristics.

**Options:**
- **Relational** (PostgreSQL, SQLite) - structured, transactional
- **Document** (MongoDB, JSON files) - flexible, denormalized
- **Key-Value** (Redis, LocalStorage) - simple, fast
- **In-Memory** (cache) - temporary, fast

**Example:**
```markdown
## Storage Decisions

### SQLite (Local Database)
**Entities**: User, SearchQuery, UserPreferences
**Rationale**: 
- VS Code extension needs local storage
- Relational structure fits well
- No server required
- Transactions for data integrity

### In-Memory Cache
**Entities**: SearchResult (temporary)
**Rationale**:
- Results are ephemeral (5 minute TTL)
- No need to persist long-term
- Fast access
- Cleared on extension reload

### External (GitHub API)
**Entity**: Repository
**Rationale**:
- Source of truth is GitHub
- We cache metadata locally
- Always fetch fresh on demand
```

### Step 6: Write Database Schema

**Question:** What's the actual CREATE TABLE statement?

Generate executable schema for chosen database.

**Example (SQLite):**
```sql
-- users table
CREATE TABLE users (
    id TEXT PRIMARY KEY,
    vscode_id TEXT UNIQUE NOT NULL,
    github_token TEXT,  -- encrypted
    created_at INTEGER NOT NULL,
    last_active_at INTEGER NOT NULL
);

-- search_queries table  
CREATE TABLE search_queries (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    query_text TEXT NOT NULL,
    results_count INTEGER DEFAULT 0,
    executed_at INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_queries_user ON search_queries(user_id);
CREATE INDEX idx_queries_executed ON search_queries(executed_at DESC);

-- user_preferences table
CREATE TABLE user_preferences (
    id TEXT PRIMARY KEY,
    user_id TEXT UNIQUE NOT NULL,
    theme TEXT DEFAULT 'auto',
    results_per_page INTEGER DEFAULT 20,
    enable_cache BOOLEAN DEFAULT 1,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- repository_cache table (metadata cache)
CREATE TABLE repository_cache (
    repo_id INTEGER PRIMARY KEY,
    full_name TEXT UNIQUE NOT NULL,
    stars INTEGER DEFAULT 0,
    last_updated INTEGER NOT NULL,
    cached_at INTEGER NOT NULL
);
```

Save to: `_dhurandhar-output/phase-3-system-design/schemas/schema.sql`

### Step 7: Document the Model

**Question:** How do we explain this to others?

Create comprehensive documentation.

**Output Structure:**
```markdown
# Core Entities - Data Model

## Overview
[Summary of data model approach]

## Entity Catalog
[List of all entities with brief descriptions]

## Detailed Entity Definitions
[For each entity: attributes, constraints, business rules]

## Relationship Diagram
[ASCII or Mermaid ERD]

## Storage Decisions
[What database for what entities and why]

## Database Schema
[Link to schema files]

## Data Access Patterns
[How data will be queried - informs indexing]

## Migration Strategy
[How schema changes will be handled]
```

## Output

This skill creates:
- `_dhurandhar-output/phase-3-system-design/core-entities.md` - Documentation
- `_dhurandhar-output/phase-3-system-design/schemas/schema.sql` - Executable schema

## What Happens Next

After core entities are defined:
- Run `/api-design` to define how services communicate
- Arjuna stays with you through all of Phase 3

## Arjuna's Wisdom

"When Dronacharya asked what I saw in the bird, I said 'only the eye.' Not the tree, not the bird - the eye I must strike.

When designing your data model, see ONLY the data:
- Not 'how will users see this' (that's UI)
- Not 'what API returns this' (that's API design)
- Not 'how do we fetch this' (that's implementation)

Just: What data exists? How does it relate? Where is it stored?

Focus. Precision. Excellence."

---

**The data model is the target. Hit it precisely.**
