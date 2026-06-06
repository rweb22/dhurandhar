# Skills

This directory contains workflow skills that guide users through tasks.

## What are Skills?

Skills are step-by-step workflows defined in markdown. They help users accomplish specific tasks in a structured way, following the BMAD-Method pattern.

## Skill Structure

Each skill is a directory containing:

```
my-skill/
├── SKILL.md              # Main skill definition
├── customize.toml        # Configuration (optional)
└── steps/                # Workflow steps (optional)
    ├── step-01-gather.md
    ├── step-02-process.md
    └── step-03-deliver.md
```

## Creating a Skill

### 1. Create the Directory

```bash
mkdir src/skills/my-skill
```

### 2. Create SKILL.md

```markdown
---
name: my-skill
description: 'A brief description of what this skill does'
---

# My Skill Name

## Purpose
This skill helps users accomplish [goal].

## Workflow

### Step 1: Gather Information
Ask the user for:
- Input 1
- Input 2
- Input 3

### Step 2: Process
Do something with the inputs.

### Step 3: Deliver
Provide the result to the user.

## Usage
This skill is activated when the user types `/my-skill`.
```

### 3. Add Steps (Optional)

For complex workflows, break into separate step files:

**steps/step-01-gather.md:**
```markdown
# Step 1: Gather Information

Ask the user for the following information:
- Name
- Email
- Requirements

Store their responses and proceed to step 2.
```

### 4. Add Configuration (Optional)

**customize.toml:**
```toml
[base]
skill_name = "my-skill"
version = "1.0.0"

[options]
auto_proceed = false
verbose_output = true
```

## Installation

When you run `hellow install`, the installer will:
1. Find all directories in `src/skills/`
2. Copy each to the IDE skills directory
3. Make them available as slash commands

Users can then type `/my-skill` to activate the workflow.

## Examples

See the parent project (if this is a fork) for example skill implementations.
