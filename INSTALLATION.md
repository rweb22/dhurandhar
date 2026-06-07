# Dhurandhar Installation Guide

**Current Method:** Clone from GitHub and run installer locally.

## ⚠️ Important Notes

- ❌ `npx dhurandhar install` - Does NOT work (package not on npm)
- ❌ `npx github:rweb22/dhurandhar` - Does NOT work reliably
- ❌ `bash <(curl ...)` - Requires files on GitHub main branch
- ✅ **Clone and install** - This is the ONLY reliable method currently

---

## ✅ Working Installation Method

### Step-by-Step Installation

```bash
# 1. Clone the Dhurandhar repository
git clone https://github.com/rweb22/dhurandhar.git

# 2. Navigate into the directory
cd dhurandhar

# 3. Install Node.js dependencies
npm install

# 4. Run the installer (interactive mode)
npm run install:local
```

**The installer will ask you:**
1. **Where to install?** - Target directory (default: current directory)
2. **Which IDE?** - Your AI IDE (Augment, Gemini, Cursor, etc.)
3. **Experience level?** - Beginner, intermediate, or expert

### Non-Interactive Installation

```bash
# After steps 1-3 above, run with flags:
npm run install:local -- -d /path/to/project -i augment -y
```

**Flags:**
- `-d <path>` - Target directory
- `-i <ide>` - IDE type (augment, gemini, cursor, universal)
- `-y` - Skip prompts, use defaults

---

## IDE-Specific Installation

Different AI IDEs look for skills in different directories. Use the correct flag:

### For Augment Code

```bash
npm run install:local -- -i augment
```

Installs to: `.augment/skills/`

### For Gemini Code Assist

```bash
npm run install:local -- -i gemini
```

Installs to: `.gemini/skills/`

### For Cursor

```bash
npm run install:local -- -i cursor
```

Installs to: `.cursor/skills/`

### For Claude Code, Windsurf, or Most IDEs

```bash
npm run install:local -- -i universal
```

Installs to: `.agents/skills/` (default, works with 25+ IDEs)

---

## What Gets Installed

After installation, your project will have:

### 1. Framework Directory (`_dhurandhar/`)

```
_dhurandhar/
├── config/
│   └── config.yaml          # Framework configuration
├── agents/                  # 5 Pandava agent personas
│   ├── yudhishthira.md     # Phase 1: Ideation
│   ├── sahadeva.md         # Phase 2: Requirements
│   ├── arjuna.md           # Phase 3: Design
│   ├── nakula.md           # Phase 4: Planning
│   └── bhima.md            # Phase 5: Implementation
├── data/                    # Reference data
├── scripts/                 # Utility scripts
└── custom/                  # Your customizations
```

### 2. Skills Directory (`.agents/skills/`)

The universal `.agents/skills/` directory works with 25+ AI IDEs:
- Augment Code
- Claude Code
- Cursor
- Windsurf
- Gemini Code Assist
- VS Code / GitHub Copilot
- And many more...

```
.agents/skills/
├── yudhishthira/           # Agent launcher
├── sahadeva/               # Agent launcher
├── arjuna/                 # Agent launcher
├── nakula/                 # Agent launcher
├── bhima/                  # Agent launcher
├── core-idea/              # Skill
├── brainstorming/          # Skill
├── product-brief/          # Skill
├── prd/                    # Skill
├── core-entities/          # Skill
├── api-design/             # Skill
├── hld/                    # Skill
├── lld/                    # Skill
├── epics-and-stories/      # Skill
├── e2e-api-tests/          # Skill
├── implement/              # Skill
└── deploy/                 # Skill
```

### 3. Output Directory (`_dhurandhar-output/`)

Created when you first use a skill:

```
_dhurandhar-output/
├── phase-1-ideation/
├── phase-2-requirements/
├── phase-3-system-design/
├── phase-4-implementation-planning/
└── phase-5-implementation/
```

---

## Installation Options

### Interactive Mode (Default)

```bash
# Clone first
git clone https://github.com/rweb22/dhurandhar.git
cd dhurandhar
npm install

# Run installer interactively
npm run install:local
```

Prompts you for:
1. **Installation directory** - Where to install (default: current directory)
2. **AI IDE** - Which IDE you're using (default: universal)
3. **Experience level** - Beginner, intermediate, or expert (affects agent communication)

### Non-Interactive Mode

```bash
# Using the install script
bash <(curl -fsSL https://raw.githubusercontent.com/rweb22/dhurandhar/main/install.sh)

# Or with clone
git clone https://github.com/rweb22/dhurandhar.git
cd dhurandhar
npm install
npm run install:local -- -y
```

Uses these defaults:
- Directory: Current directory
- IDE: Universal (`.agents/skills`)
- Experience: Beginner

### Specify Directory

```bash
# Using install script
bash <(curl -fsSL https://raw.githubusercontent.com/rweb22/dhurandhar/main/install.sh) ~/my-project

# Or with clone
git clone https://github.com/rweb22/dhurandhar.git
cd dhurandhar
npm install
npm run install:local -- -d ~/my-project
```

### Specify IDE

```bash
# Clone and specify IDE
git clone https://github.com/rweb22/dhurandhar.git
cd dhurandhar
npm install
npm run install:local -- -i augment    # For Augment Code
npm run install:local -- -i cursor     # For Cursor
npm run install:local -- -i universal  # Universal (default)
```

Supported IDEs:
- `universal` - .agents/skills (recommended, works everywhere)
- `augment` - .augment/skills
- `claude` - .claude/skills
- `cursor` - .cursor/skills
- `windsurf` - .windsurf/skills
- `gemini` - .gemini/skills
- `codex` - .codex/skills
- `vscode` - .vscode/skills
- `other` - _dhurandhar/skills (manual setup)

---

## Verification

After installation, verify it worked:

```bash
# Check directory structure
ls -la _dhurandhar/
ls -la .agents/skills/

# In your AI IDE, type:
/yudhishthira

# You should see Yudhishthira introduce himself
```

---

## Usage

Once installed, use the slash commands in your AI IDE:

### 1. Call an Agent

```
/yudhishthira    # Phase 1: Ideation
/sahadeva        # Phase 2: Requirements
/arjuna          # Phase 3: Design
/nakula          # Phase 4: Planning
/bhima           # Phase 5: Implementation
```

### 2. Run a Skill

```
/core-idea              # Define vision
/prd                    # Write requirements
/core-entities          # Design data model
/epics-and-stories      # Plan implementation
/implement              # Write code
```

---

## Configuration

Edit `_dhurandhar/config/config.yaml` to customize:

```yaml
user_name: "Your Name"
experience_level: "intermediate"  # beginner, intermediate, expert
communication_language: "en"
planning_artifacts: "_dhurandhar-output"
ide: "universal"
skills_directory: ".agents/skills"
```

---

## Troubleshooting

### Skills not appearing in IDE

**Solution:** Make sure your IDE supports the `.agents/skills` standard or use IDE-specific install:

```bash
npx github:rweb22/dhurandhar install -i cursor  # For Cursor
npx github:rweb22/dhurandhar install -i augment # For Augment
```

### Permission errors

**Solution:** Run with appropriate permissions or install in user directory:

```bash
npx github:rweb22/dhurandhar install -d ~/projects/my-app
```

### Agent not loading persona

**Solution:** Ensure `_dhurandhar/agents/` directory exists with all 5 agent files.

---

## Next Steps

After installation:

1. **Start with Phase 1:** Run `/yudhishthira` to begin
2. **Follow the flow:** Each agent guides you through their phase
3. **Read artifacts:** Check `_dhurandhar-output/` for generated documents
4. **Complete all phases:** Idea → Requirements → Design → Planning → Implementation

See [QUICK_START.md](QUICK_START.md) for detailed usage guide.

---

## Uninstall

To remove Dhurandhar from your project:

```bash
rm -rf _dhurandhar
rm -rf .agents/skills  # Or your IDE-specific skills directory
rm -rf _dhurandhar-output  # Optional - contains your artifacts
```
