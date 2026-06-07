---
name: dhr-design-brainstorming
description: 'Explore architectural alternatives and design patterns'
phase: 3
agent: rachana
output: _dhurandhar-output/phase-3-system-design/design-brainstorming.md
---

# Design Brainstorming

## Purpose

Before committing to an architecture, explore different design approaches, patterns, and trade-offs.

**What you'll create:** Evaluation of architectural alternatives with clear reasoning for choices made.

## Before You Begin

You should have:
- ✅ PRD from Phase 2
- ✅ Understanding of requirements (functional & non-functional)
- ✅ Willingness to challenge your initial design instincts

## Workflow

### Step 1: Architectural Styles

**Question:** What high-level architectural style fits this problem?

**Options to consider:**

**Monolithic:**
- Everything in one deployable unit
- Good for: Simple projects, small teams, early stage
- Trade-offs: Hard to scale teams, all-or-nothing deploys

**Microservices:**
- Independent services per domain/capability
- Good for: Large teams, independent scaling, fault isolation
- Trade-offs: Complexity, distributed system challenges

**Serverless:**
- Functions as a service, event-driven
- Good for: Variable load, pay-per-use, quick iteration
- Trade-offs: Vendor lock-in, cold starts, debugging

**Layered/N-Tier:**
- Presentation → Business Logic → Data Access
- Good for: Clear separation of concerns, testability
- Trade-offs: Can become rigid, unnecessary layers

**Event-Driven:**
- Components communicate via events/messages
- Good for: Async workflows, loose coupling, scalability
- Trade-offs: Complexity, eventual consistency, debugging

**For each option:**
- How does it fit our requirements?
- What's the operational complexity?
- What's the team familiarity?

### Step 2: Data Architecture

**Question:** How should we structure and store data?

**Database Options:**

**Relational (PostgreSQL, MySQL):**
- Good for: Complex queries, ACID transactions, relationships
- Trade-offs: Harder to scale horizontally

**Document (MongoDB, DynamoDB):**
- Good for: Flexible schema, horizontal scaling, JSON data
- Trade-offs: Weaker consistency, complex queries harder

**Key-Value (Redis, DynamoDB):**
- Good for: Simple lookups, caching, high throughput
- Trade-offs: Limited query capabilities

**Graph (Neo4j):**
- Good for: Relationship-heavy data, social networks
- Trade-offs: Specialized use case, learning curve

**Time-Series (InfluxDB, TimescaleDB):**
- Good for: Metrics, logs, IoT data
- Trade-offs: Optimized for specific access patterns

**Hybrid:**
- Use multiple databases for different needs
- Good for: Optimization, right tool for each job
- Trade-offs: Operational complexity, data consistency

**Consider:**
- What's our query pattern?
- How important is consistency vs. availability?
- What's our scale requirements?

### Step 3: API Design Patterns

**Question:** How should services/components communicate?

**REST:**
- Resource-based, HTTP methods
- Good for: CRUD operations, wide compatibility, caching
- Trade-offs: Can be chatty, over-fetching/under-fetching

**GraphQL:**
- Client-specified queries, single endpoint
- Good for: Complex data fetching, mobile apps, reducing round-trips
- Trade-offs: Complexity, caching challenges

**gRPC:**
- Protocol Buffers, HTTP/2
- Good for: Service-to-service, performance, strong typing
- Trade-offs: Browser support limited, tooling needed

**WebSockets:**
- Bi-directional, real-time
- Good for: Chat, live updates, gaming
- Trade-offs: Connection management, scaling

**Message Queue (RabbitMQ, Kafka):**
- Async message passing
- Good for: Decoupling, reliability, buffering
- Trade-offs: Eventual consistency, complexity

### Step 4: Design Patterns to Apply

**Question:** What patterns solve our specific challenges?

**Common Patterns:**

**Repository Pattern:**
- Abstracts data access
- When: Need to swap data sources, testing

**CQRS (Command Query Responsibility Segregation):**
- Separate read and write models
- When: Complex reads, event sourcing, different scale patterns

**Event Sourcing:**
- Store events, not state
- When: Audit trails, temporal queries, replay capability

**Circuit Breaker:**
- Prevent cascading failures
- When: Calling external services, fault tolerance

**Saga Pattern:**
- Distributed transactions
- When: Microservices, long-running workflows

**Cache-Aside:**
- Application manages cache
- When: Read-heavy, database bottleneck

**API Gateway:**
- Single entry point for clients
- When: Microservices, auth/routing centralization

**Strangler Fig:**
- Gradually replace legacy system
- When: Modernizing existing system

### Step 5: Trade-off Analysis

**Question:** What are we optimizing for?

**The CAP Theorem Trade-off:**
- Consistency: All nodes see same data
- Availability: System always responds
- Partition Tolerance: Works despite network issues

You can only have 2 of 3. Which matters most?

**Performance vs. Complexity:**
- Simpler design → Slower but maintainable
- Complex optimization → Faster but harder to maintain

**Build vs. Buy:**
- Build custom → Full control, perfect fit, effort
- Use SaaS/library → Fast start, less control, vendor dependency

**Now vs. Later:**
- Design for current needs → Simple, ship fast, may not scale
- Design for future scale → Complex, slower start, may be over-engineering

## Output Format

Save to: `_dhurandhar-output/phase-3-system-design/design-brainstorming.md`

Include:
1. Architectural alternatives considered
2. Data architecture options evaluated
3. API patterns compared
4. Design patterns to apply
5. Trade-offs and decisions made
6. Risks identified

## Next Steps

After brainstorming:
1. Choose your approach with clear rationale
2. Create detailed designs: `/dhr-core-entities`, `/dhr-api-design`, `/dhr-hld`, `/dhr-lld`

## Remember

**All architectures are trade-offs.**

Perfect design doesn't exist. The best design is the one that fits your constraints and team.

Start simple. Add complexity only when needed.
