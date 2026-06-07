# Dhurandhar Documentation Index

## Overview Documents

### [PROJECT.md](./PROJECT.md)
**Purpose:** Complete project vision and design philosophy

**Contains:**
- What is Dhurandhar and who it's for
- Core philosophy and positioning vs BMAD-Method
- Complete 5-phase workflow
- Technical implementation details
- Key differentiators
- Success metrics

**Read this:** To understand the "why" behind Dhurandhar

---

### [DESIGN_DECISIONS.md](./DESIGN_DECISIONS.md)
**Purpose:** Design rationale and decision log

**Contains:**
- All 9 major design decisions
- Rationale for each choice
- Comparison with BMAD-Method
- Session summary from initial design

**Read this:** To understand how we arrived at the current design

---

### [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)
**Purpose:** Quick command reference for developers

**Contains:**
- Installation commands
- All 12 skills organized by phase
- Available agents
- Common workflows
- Tips and best practices

**Read this:** As a cheat sheet when using Dhurandhar

---

## Architecture Documents

### [architecture/OVERVIEW.md](./architecture/OVERVIEW.md)
**Purpose:** Technical architecture overview

**Contains:**
- How Dhurandhar works
- Directory structure after installation
- Skill structure and patterns
- BMAD pattern implementation
- Key benefits

**Read this:** To understand the technical architecture

---

### [architecture/INSTALLER.md](./architecture/INSTALLER.md)
**Purpose:** Installer behavior specification

**Contains:**
- Installation process
- Directory creation logic
- Skill installation
- Configuration setup
- Git integration
- CLI options

**Read this:** To understand or modify the installer

---

### [architecture/IDE-INTEGRATION.md](./architecture/IDE-INTEGRATION.md)
**Purpose:** IDE integration details

**Contains:**
- How skills work in different IDEs
- Universal `.agents/skills/` standard
- IDE-specific directories
- Skill format requirements

**Read this:** To understand IDE compatibility

---

## Getting Started

### [getting-started/INSTALLATION.md](./getting-started/INSTALLATION.md)
**Purpose:** Installation guide for users

**Contains:**
- Prerequisites
- Installation steps
- Verification
- Troubleshooting
- Next steps

**Read this:** When installing Dhurandhar for the first time

---

## Development

### [development/STATUS.md](./development/STATUS.md)
**Purpose:** Current development status

**Contains:**
- What's implemented
- What's in progress
- What's planned
- Known issues

**Read this:** To see current project status

---

### [development/TESTING.md](./development/TESTING.md)
**Purpose:** Testing strategy for the framework

**Contains:**
- How to test Dhurandhar itself
- Test coverage goals
- Testing workflows

**Read this:** When contributing to Dhurandhar development

---

## Source Code Organization

```
dhurandhar/
├── docs/                          # ← You are here
│   ├── PROJECT.md                 # Project vision
│   ├── DESIGN_DECISIONS.md        # Design rationale
│   ├── QUICK_REFERENCE.md         # Command reference
│   ├── DOCUMENTATION_INDEX.md     # This file
│   ├── architecture/              # Architecture docs
│   ├── getting-started/           # User guides
│   └── development/               # Developer docs
│
├── src/                           # Framework source
│   ├── agents/                    # Agent persona definitions
│   ├── skills/                    # Workflow skills
│   ├── data/                      # Reference data
│   └── scripts/                   # Utility scripts
│
└── tools/                         # Build tools
    └── installer/                 # CLI installer
```

## Reading Paths

### For Users

1. [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) - Quick start
2. [getting-started/INSTALLATION.md](./getting-started/INSTALLATION.md) - Install
3. [PROJECT.md](./PROJECT.md) - Understand the philosophy

### For Contributors

1. [PROJECT.md](./PROJECT.md) - Understand vision
2. [DESIGN_DECISIONS.md](./DESIGN_DECISIONS.md) - Understand rationale
3. [architecture/OVERVIEW.md](./architecture/OVERVIEW.md) - Understand architecture
4. [development/STATUS.md](./development/STATUS.md) - See what needs work

### For Framework Developers

1. [architecture/INSTALLER.md](./architecture/INSTALLER.md) - How installer works
2. [architecture/IDE-INTEGRATION.md](./architecture/IDE-INTEGRATION.md) - IDE compatibility
3. [development/TESTING.md](./development/TESTING.md) - Testing strategy

---

**Documentation Status:** ✅ Foundation Complete

**Next Steps:**
- Create actual skill files (12 SKILL.md files)
- Write agent persona definitions (5 agents)
- Build complete example walkthrough
- Update installer implementation
