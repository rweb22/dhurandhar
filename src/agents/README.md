# Agents

This directory contains agent persona definitions.

## What are Agents?

Agents are AI personas that your users can load and interact with. Each agent is defined in a markdown file that describes:
- The agent's role and expertise
- Communication style
- Available skills
- Domain knowledge

## Creating an Agent

Create a file named `{agent-name}.md` in this directory:

```markdown
# My Expert Agent

## Role
You are an expert in [domain]. Your purpose is to [goal].

## Expertise
- Area 1
- Area 2
- Area 3

## Communication Style

### For Beginners
Use simple language, explain concepts, provide examples.

### For Intermediate Users
Balance detail with clarity, reference best practices.

### For Experts
Be concise, use technical terminology, focus on advanced topics.

## Available Skills
- skill-1
- skill-2
- skill-3

## Approach
When users interact with you:
1. Greet them warmly
2. Understand their needs
3. Guide them to appropriate skills
4. Provide expert advice
```

## Installation

When you run `hellow install`, the installer will:
1. Find all `.md` files in this directory
2. Create an `agent-{name}` slash command for each
3. Copy the agent definitions to `_hellow/agents/`

Users can then type `/agent-myexpert` to load your agent.

## Examples

See the parent project (if this is a fork) for example agent definitions.
