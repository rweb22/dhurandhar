# How to Install Dhurandhar

## ⚠️ IMPORTANT: Only One Method Works

**These DO NOT work:**
- ❌ `npx dhurandhar install` - Package not published to npm
- ❌ `npx github:rweb22/dhurandhar install` - npx doesn't reliably handle GitHub packages with dependencies
- ❌ `bash <(curl ...)` - Only works after files are committed to GitHub main branch

**This DOES work:**
- ✅ Clone repository + `npm install` + `npm run install:local`

---

## ✅ Working Installation Method

This is the most reliable method:

```bash
# 1. Clone the repository
git clone https://github.com/rweb22/dhurandhar.git

# 2. Enter the directory
cd dhurandhar

# 3. Install dependencies
npm install

# 4. Run the installer
npm run install:local

# This will prompt you for:
# - Target directory (where to install)
# - AI IDE you're using
# - Your experience level
```

### Install to Specific Directory

```bash
# After cloning and npm install:
npm run install:local -- -d ~/my-project
```

### Non-Interactive Install

```bash
# After cloning and npm install:
npm run install:local -- -y
```

---

## Method 2: One-Command Install Script

**Note:** This requires the repository to be on GitHub with the install.sh file committed.

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/rweb22/dhurandhar/main/install.sh)
```

This will:
1. Download Dhurandhar to a temp directory
2. Install dependencies
3. Run the installer
4. Clean up temp files

---

## What Gets Installed

After installation, your project will have:

```
your-project/
├── _dhurandhar/              # Framework directory
│   ├── config/
│   │   └── config.yaml
│   ├── agents/               # 5 Pandava personas
│   ├── data/
│   ├── scripts/
│   └── custom/
│
└── .agents/skills/           # Skills for AI IDE
    ├── yudhishthira/         # Agent: Phase 1
    ├── sahadeva/             # Agent: Phase 2
    ├── arjuna/               # Agent: Phase 3
    ├── nakula/               # Agent: Phase 4
    ├── bhima/                # Agent: Phase 5
    ├── core-idea/            # Skill
    ├── brainstorming/        # Skill
    ├── product-brief/        # Skill
    ├── prd/                  # Skill
    ├── core-entities/        # Skill
    ├── api-design/           # Skill
    ├── hld/                  # Skill
    ├── lld/                  # Skill
    ├── epics-and-stories/    # Skill
    ├── e2e-api-tests/        # Skill
    ├── implement/            # Skill
    └── deploy/               # Skill
```

---

## Verification

After installation, verify it worked:

```bash
# Check the directories exist
ls -la _dhurandhar/
ls -la .agents/skills/

# You should see 5 agents and 12 skills
ls .agents/skills/
```

Expected output:
```
arjuna/
bhima/
nakula/
sahadeva/
yudhishthira/
api-design/
brainstorming/
core-entities/
core-idea/
deploy/
e2e-api-tests/
epics-and-stories/
hld/
implement/
lld/
prd/
product-brief/
```

---

## Troubleshooting

### Skills not appearing in AI IDE

**For Augment Code:**
Augment looks for skills in `.augment/skills/`, not `.agents/skills/`

Solution:
```bash
# Reinstall with Augment-specific directory
npm run install:local -- -i augment
```

**For Gemini Code Assist:**
Gemini looks for skills in `.gemini/skills/`

Solution:
```bash
npm run install:local -- -i gemini
```

**For Universal (works with most IDEs):**
```bash
npm run install:local -- -i universal  # This is the default
```

### No agents/skills installed

This usually means `npx github:` was used, which doesn't work properly.

Solution: Use Method 1 (Clone and Install) above.

---

## Next Steps

After successful installation:

1. **Open your AI IDE** (Augment, Gemini, Cursor, Claude Code, etc.)
2. **Navigate to your project directory**
3. **Type:** `/yudhishthira`
4. **You should see:** Yudhishthira introduce himself

If you don't see the slash command, check:
- Which AI IDE you're using
- Whether it supports `.agents/skills/` (universal)
- Or if you need to reinstall with the IDE-specific flag

---

## Summary

✅ **Use:** `git clone` + `npm install` + `npm run install:local`  
❌ **Don't use:** `npx github:rweb22/dhurandhar` (doesn't work)

For questions or issues, please open a GitHub issue.
