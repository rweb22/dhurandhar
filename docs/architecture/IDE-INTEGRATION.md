# IDE Integration - How Skills Work

## The Key Insight

Skills in Hellow are **NOT just markdown files in a generic directory**. They must be placed in **IDE-specific directories** that the AI IDE recognizes and indexes for slash command autocomplete.

## IDE-Specific Directories

Each AI IDE has its own skills directory where it looks for available slash commands.

### Universal Standard (Recommended)

The **`.agents/skills/`** directory is an emerging cross-IDE standard that works with 25+ AI IDEs:

| Standard | Works With |
|----------|------------|
| **`.agents/skills/`** | Claude Code, Cursor, Codex, Gemini, VS Code, Windsurf, Amp, Roo Code, Goose, and 20+ more |

**Recommendation:** Use `.agents/skills/` for maximum compatibility across different AI IDEs.

### IDE-Specific Paths

Some IDEs also support their own native directories:

| IDE | Native Path | Universal Path |
|-----|-------------|----------------|
| **Augment Code** | `.augment/skills/` | Not supported yet |
| **Claude Code** | `.claude/skills/` | `.agents/skills/` ✅ |
| **Cursor** | `.cursor/skills/` | `.agents/skills/` ✅ |
| **Windsurf** | `.windsurf/skills/` | `.agents/skills/` ✅ |
| **Gemini Code Assist** | `.gemini/skills/` | `.agents/skills/` ✅ |
| **OpenAI Codex** | `.codex/skills/` | `.agents/skills/` ✅ |
| **VS Code / GitHub Copilot** | `.vscode/skills/` | `.agents/skills/` ✅ |

## How It Works

### 1. Installation

When you run:
```bash
npx hellow install --ide universal
```

The installer:
1. Asks which IDE you're using (or uses `--ide` flag)
2. Creates the IDE-specific directory (e.g., `.agents/skills/`)
3. Copies each skill to its own subdirectory
4. Each subdirectory contains `SKILL.md` and other skill files

### 2. Directory Structure

After installation with universal IDE option:
```
project/
├── .agents/
│   └── skills/
│       ├── agent-expert/
│       │   └── SKILL.md
│       ├── my-workflow/
│       │   ├── SKILL.md
│       │   ├── customize.toml
│       │   └── steps/
│       │       ├── step-01-gather.md
│       │       └── step-02-process.md
│       └── another-skill/
└── _hellow/
    ├── config/config.yaml
    ├── data/
    ├── agents/
    └── scripts/
```

### 3. Slash Command Discovery

Once installed in the IDE-specific directory:
1. The IDE automatically discovers the skill
2. The **directory name** becomes the slash command
3. Typing `/` in chat shows autocomplete with all available skills
4. Typing `/my-workflow` loads and executes that skill

## How Hellow Works

### Before (Manual Approach)
- Skills in generic directory
- IDE didn't recognize them
- No slash commands appeared
- User had to manually tell AI to read the skill file

### After (Hellow Framework)
- Skills copied to IDE-recognized directory
- IDE auto-discovers them
- Slash commands appear in autocomplete
- User types `/skill-name` to activate

## Configuration

The installer now:
1. **Asks for IDE** during interactive installation
2. **Accepts `--ide` flag** for non-interactive installation
3. **Creates IDE-specific directory** based on selection
4. **Records IDE in config** for future reference

## Testing

To test that skills appear as slash commands:

1. Install with IDE flag:
   ```bash
   npx pnp-ai-assistant install --ide augment
   ```

2. Open your AI IDE in the project directory

3. In a chat, type `/`

4. You should see `/pnp-check-regulations` in the autocomplete

5. Select it or type it fully to activate the skill

## Compatibility

### Supported IDEs
- ✅ Augment Code
- ✅ Claude Code
- ✅ Cursor
- ✅ Windsurf

### Fallback
If you select "Other", skills install to `_pnp/skills/` for manual setup.

## Key Differences from Generic Prompts

| Generic Prompts | BMAD-Style Skills |
|-----------------|-------------------|
| Just markdown files anywhere | Must be in IDE-specific directory |
| User manually loads them | IDE auto-discovers |
| No autocomplete | Appears in `/` menu |
| One-off instructions | Structured workflows with steps |
| No customization | TOML config with overrides |

## References

- [BMAD-Method Skills Documentation](https://docs.bmad-method.org/reference/commands/)
- [Augment Skills Documentation](https://docs.augmentcode.com/using-augment/skills)
- [Agent Skills Specification](https://agentskills.io/)

## Next Steps

Now that skills are properly installed:
1. Skills appear in IDE slash command menu
2. Users can discover them via autocomplete
3. Activation is seamless
4. Workflows execute as designed

The PNP AI Assistant now works exactly like BMAD-Method - as an installable skills framework with proper IDE integration!
