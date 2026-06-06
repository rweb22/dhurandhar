# Installation Guide

## Prerequisites

- **Node.js 20+** - Required for the installer
- **AI IDE** - Augment Code, Claude Code, Cursor, or Windsurf
- **Python 3.11+** - Required for configuration resolver

## Quick Start

### 1. Install into Your Project

```bash
npx hellow install
```

This will:
- Prompt you to select your AI IDE
- Ask for your domain experience level
- Create the `_hellow/` directory structure
- Install skills to IDE-specific directory (e.g., `.agents/skills/`, `.claude/skills/`)
- Set up configuration files

### 2. Verify Installation

Check that skills were installed:

```bash
ls .agents/skills/  # or .claude/skills/, .augment/skills/ depending on your IDE
```

You should see directories for each agent and skill:
```
.agents/skills/
├── agent-[name]/
└── [skill-name]/
```

### 3. Use in Your AI IDE

Open your AI IDE in the project directory and:

1. Type `/` to see the autocomplete menu
2. You'll see all installed agents and skills
3. Select one to activate:
   - `/agent-[name]` - Load an agent persona
   - `/[skill]` - Run a workflow skill

## Installation Options

### Interactive Mode (Recommended)

```bash
npx hellow install
```

The installer will ask:
- Target directory (default: current directory)
- Which AI IDE you're using
- Your domain experience level (beginner/intermediate/expert)

### Non-Interactive Mode

```bash
npx hellow install --directory ./my-project --ide universal --yes
```

**Flags:**
- `--directory <path>` - Target directory (default: current)
- `--ide <ide>` - AI IDE: `universal` (recommended), `augment`, `claude`, `cursor`, `windsurf`, `gemini`, `codex`, `vscode`, or `other`
- `--yes` - Skip prompts, use defaults

## What Gets Installed

### Directory Structure

```
your-project/
├── .agents/skills/               ← IDE discovers skills here
│   ├── agent-*/                  ← Agent launchers
│   └── */                        ← Workflow skills
└── _hellow/
    ├── config/
    │   └── config.yaml           ← User configuration
    ├── custom/                   ← Config overrides
    ├── scripts/
    │   └── resolve_customization.py
    ├── agents/                   ← Agent persona files
    └── data/                     ← Domain-specific data
```

### Configuration File

The installer creates `_hellow/config/config.yaml`:

```yaml
# Hellow Framework Configuration
user_name: "User"
experience_level: "intermediate"  # or beginner, expert
communication_language: "en"
document_output_language: "en"
planning_artifacts: "_hellow/artifacts"
ide: "universal"
skills_directory: ".agents/skills"
```

## IDE-Specific Setup

### Universal (.agents/skills) - Recommended

Skills install to: `.agents/skills/`

**Works with 25+ AI IDEs including:**
- Claude Code, Cursor, OpenAI Codex, Gemini Code Assist
- VS Code (GitHub Copilot), Amp, Roo Code, Goose
- And many more...

This is the **recommended option** for maximum compatibility.

### Augment Code

Skills install to: `.augment/skills/`

No additional setup required. Slash commands appear automatically.

### Claude Code

Skills install to: `.claude/skills/` (or `.agents/skills/`)

Restart Claude Code if skills don't appear immediately.

### Cursor

Skills install to: `.cursor/skills/` (or `.agents/skills/`)

Skills appear in the `@` agent menu.

### Windsurf

Skills install to: `.windsurf/skills/` (or `.agents/skills/`)

Access via Windsurf's agent interface.

### Gemini Code Assist

Skills install to: `.gemini/skills/` (or `.agents/skills/`)

Available in VS Code and JetBrains IDEs with Gemini extension.

### OpenAI Codex

Skills install to: `.codex/skills/` (or `.agents/skills/`)

Works with Codex CLI, IDE extension, and Codex app.

### VS Code / GitHub Copilot

Skills install to: `.vscode/skills/` (or `.agents/skills/`)

Requires GitHub Copilot extension.

## Customization

### User Configuration

Edit `_hellow/config/config.yaml` to customize:

```yaml
user_name: "Your Name"
experience_level: "intermediate"  # beginner, intermediate, or expert
communication_language: "en"
```

### Skill Customization

Each skill can be customized at three levels:

1. **Base** (skill defaults): `{skill}/customize.toml`
2. **Team** (shared): `_hellow/custom/{skill}.toml`
3. **User** (personal): `_hellow/custom/{skill}.user.toml`

Create team or user overrides to customize behavior.

## Troubleshooting

### Skills Not Appearing

1. **Check IDE directory**: Verify skills were installed to correct directory
2. **Restart IDE**: Some IDEs need restart to discover new skills
3. **Check IDE settings**: Some IDEs require skills to be enabled
4. **Verify installation**: Run `ls .agents/skills/` (or your IDE's directory)

### Python Script Errors

The configuration resolver requires Python 3.11+:

```bash
python3 --version  # Should be 3.11 or higher
```

If using older Python, the skills will still work but may use default configs.

### Permission Errors

If installation fails with permission errors:

```bash
# Run with explicit directory
npx hellow install --directory ./my-project
```

## Uninstalling

To remove Hellow:

```bash
# Remove IDE skills directory
rm -rf .agents/skills/agent-*
rm -rf .agents/skills/*

# Remove Hellow data directory
rm -rf _hellow
```

## Next Steps

- See [Architecture Overview](../architecture/OVERVIEW.md) to understand how it works
- Check [Development Status](../development/STATUS.md) for available agents and skills
- Learn about [IDE Integration](../architecture/IDE-INTEGRATION.md) for slash commands
