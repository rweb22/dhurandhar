---
name: dhr-implementation-brainstorming
description: 'Explore technical approaches and implementation alternatives'
phase: 5
agent: nirmaan
output: _dhurandhar-output/phase-5-implementation/implementation-brainstorming.md
---

# Implementation Brainstorming

## Purpose

When facing a tricky implementation problem, explore different technical approaches before committing to code.

**What you'll create:** Evaluated technical alternatives with a clear implementation path.

## Before You Begin

You should have:
- ✅ E2E tests written (from Phase 4)
- ✅ A specific implementation challenge or feature
- ✅ Willingness to explore before coding

## When to Use This

Use this brainstorming when:
- Stuck on how to implement something
- Multiple technical approaches seem viable
- Dealing with complex business logic
- Performance or scaling concerns
- Integrating with tricky third-party systems
- Refactoring existing code

## Workflow

### Step 1: Define the Implementation Problem

**Question:** What exactly are we trying to build?

Be specific:
- What's the input?
- What's the expected output/behavior?
- What are the constraints?
- What tests must pass?

**Example:**
```
Problem: Implement real-time collaborative editing

Inputs: Multiple users editing same document
Outputs: All users see changes instantly, no conflicts
Constraints: <500ms latency, handle offline/online transitions
Tests: E2E tests for concurrent edits, conflict resolution
```

### Step 2: Technical Approach Alternatives

**Question:** What are completely different ways to implement this?

**Brainstorm 3-5 approaches:**

**Example for Real-time Editing:**

**Approach A: Operational Transformation (OT)**
- Transform operations to maintain consistency
- Pros: Well-established, works for text
- Cons: Complex implementation, hard to extend
- Libraries: ShareDB, CodeMirror OT

**Approach B: CRDT (Conflict-Free Replicated Data Types)**
- Mathematically guaranteed convergence
- Pros: No central server needed, offline-first
- Cons: More data overhead, fewer libraries
- Libraries: Yjs, Automerge

**Approach C: Last-Write-Wins with Locks**
- Lock sections being edited
- Pros: Simple to implement
- Cons: Poor UX, doesn't handle offline
- Libraries: Custom implementation

**Approach D: Full Document Sync**
- Send full document on every change
- Pros: Very simple
- Cons: Doesn't scale, terrible for large docs
- Libraries: None needed

**Approach E: Use Third-Party Service**
- Firestore, PubNub, Ably
- Pros: Managed, tested, feature-rich
- Cons: Vendor lock-in, cost, less control
- Services: Firestore, Liveblocks, Pusher

**For each approach:**
- Complexity to implement?
- Performance characteristics?
- Maintenance burden?
- Team familiarity?

### Step 3: Library vs. Build Decision

**Question:** Should we use a library or build from scratch?

**Use a Library When:**
- ✅ Problem is well-solved (auth, payment, etc.)
- ✅ Library is mature and maintained
- ✅ Customization not critical
- ✅ Time to market matters

**Build Custom When:**
- ✅ Unique requirements
- ✅ Core competitive advantage
- ✅ Available libraries don't fit
- ✅ Team has expertise

**Hybrid:**
- Use library as foundation, customize on top
- Good for: Getting 80% from library, custom 20%

**For this problem, explore:**
- What libraries exist?
- How mature/maintained?
- What's the learning curve?
- Can we switch later if needed?

### Step 4: Algorithm & Data Structure Choices

**Question:** What's the most efficient way to solve this?

**Consider:**

**Time Complexity:**
- O(1) - Constant time (hash lookups)
- O(log n) - Logarithmic (binary search, trees)
- O(n) - Linear (scanning lists)
- O(n²) - Quadratic (nested loops)

**Space Complexity:**
- How much memory needed?
- Can we trade space for speed?
- What's acceptable for our scale?

**Data Structures:**
- Arrays vs. Linked Lists
- Hash Tables vs. Trees
- Sets vs. Lists
- Graphs vs. Trees

**Example:**
```
Problem: Find if user is in a group (with nested groups)

Approach A: Recursive tree traversal
- Time: O(n) where n = total groups
- Space: O(d) where d = nesting depth
- Good for: Deep nesting, infrequent checks

Approach B: Flatten to hash set on load
- Time: O(1) lookup after O(n) preprocessing
- Space: O(n) 
- Good for: Frequent checks, shallow nesting

Approach C: Database recursive query
- Time: Depends on DB, usually O(log n)
- Space: Minimal in-app
- Good for: Large datasets, infrequent changes
```

### Step 5: Error Handling & Edge Cases

**Question:** What could go wrong? How do we handle it?

**Error Categories:**

**Invalid Input:**
- Validate early
- Return clear error messages
- Example: User ID doesn't exist → 404

**Network Failures:**
- Retry with exponential backoff
- Circuit breaker pattern
- Graceful degradation

**Race Conditions:**
- Optimistic locking
- Pessimistic locking
- Idempotency

**Resource Exhaustion:**
- Rate limiting
- Timeouts
- Connection pooling

**Third-Party Failures:**
- Fallback mechanisms
- Cached responses
- Circuit breakers

**Edge Cases:**
- Empty inputs
- Very large inputs
- Duplicate requests
- Concurrent modifications
- Time zone / locale issues

### Step 6: Performance Optimization

**Question:** Will this be fast enough? How to optimize?

**Measurement First:**
- Profile before optimizing
- What's the bottleneck?
- What's "fast enough" for users?

**Common Optimizations:**

**Caching:**
- Where: In-memory, Redis, CDN
- What: Expensive computations, frequent reads
- Invalidation: Time-based, event-based

**Database:**
- Indexes on frequent queries
- Connection pooling
- Batch operations
- Read replicas

**API:**
- Pagination
- Rate limiting
- Compression (gzip)
- HTTP caching headers

**Code:**
- Avoid N+1 queries
- Lazy loading
- Background jobs
- Async processing

**Trade-offs:**
- Complexity vs. speed
- Memory vs. CPU
- Now vs. later optimization

### Step 7: Testing Strategy for Implementation

**Question:** How do we verify this works?

**Test Levels:**

**E2E Tests (Already written):**
- Verify overall behavior
- Run these first

**Integration Tests:**
- Test with real database
- Test external API calls
- Verify component interactions

**Unit Tests:**
- Test business logic
- Test edge cases
- Test error handling

**Manual Testing:**
- UX verification
- Visual QA
- Exploratory testing

**When debugging:**
1. Reproduce with test
2. Fix code
3. Test passes
4. Ship

## Output Format

Save to: `_dhurandhar-output/phase-5-implementation/implementation-brainstorming.md`

Include:
1. Problem statement
2. Technical approaches evaluated
3. Library vs. build decision
4. Algorithm/data structure choices
5. Error handling strategy
6. Performance considerations
7. Testing plan
8. Chosen approach and reasoning

## Next Steps

After brainstorming:
1. Implement the chosen approach: `/dhr-implement`
2. Make tests pass
3. Refactor if needed
4. Deploy: `/dhr-deploy`

## Remember

**Make it work. Make it right. Make it fast.**

In that order.

Solve the problem first. Optimize later (if needed).
