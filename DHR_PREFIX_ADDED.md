# Added `dhr-` Prefix to All Skills and Agents

## Summary of Changes

All Dhurandhar agents and skills now have a `dhr-` prefix for better namespacing and to avoid conflicts with other skills.

---

## What Changed

### Agents (5 total)
Previously: `/yudhishthira`, `/sahadeva`, `/arjuna`, `/nakula`, `/bhima`

Now:
- `/dhr-yudhishthira` - Phase 1: Ideation
- `/dhr-sahadeva` - Phase 2: Requirements
- `/dhr-arjuna` - Phase 3: System Design
- `/dhr-nakula` - Phase 4: Implementation Planning
- `/dhr-bhima` - Phase 5: Implementation & Deployment

### Skills (12 total)
Previously: `/core-idea`, `/brainstorming`, `/product-brief`, etc.

Now:
- `/dhr-core-idea`
- `/dhr-brainstorming`
- `/dhr-product-brief`
- `/dhr-prd`
- `/dhr-core-entities`
- `/dhr-api-design`
- `/dhr-hld`
- `/dhr-lld`
- `/dhr-epics-and-stories`
- `/dhr-e2e-api-tests`
- `/dhr-implement`
- `/dhr-deploy`

---

## Files Modified

### 1. Installer (`tools/installer/commands/install.js`)
- Added `dhr-` prefix when creating agent skill directories
- Added `dhr-` prefix when copying workflow skill directories
- Updated `createAgentLauncherSkill` function to use prefixed names in YAML frontmatter

### 2. All Skill Source Files (12 files)
Updated YAML frontmatter in all `src/skills/*/SKILL.md` files:
- `src/skills/api-design/SKILL.md`
- `src/skills/brainstorming/SKILL.md`
- `src/skills/core-entities/SKILL.md`
- `src/skills/core-idea/SKILL.md`
- `src/skills/deploy/SKILL.md`
- `src/skills/e2e-api-tests/SKILL.md`
- `src/skills/epics-and-stories/SKILL.md`
- `src/skills/hld/SKILL.md`
- `src/skills/implement/SKILL.md`
- `src/skills/lld/SKILL.md`
- `src/skills/prd/SKILL.md`
- `src/skills/product-brief/SKILL.md`

### 3. Documentation
Updated `README.md` to reflect new prefixed command names.

---

## Why This Change?

### Benefits

1. **Namespace Clarity** - Immediately identifies Dhurandhar skills
2. **Avoid Conflicts** - Won't clash with other frameworks' skills
3. **Professional Convention** - Common practice in skill/plugin systems
4. **Easier Discovery** - Type `/dhr-` to see all Dhurandhar skills

### Examples in Other Systems

- GitHub Actions: `actions/checkout@v3`
- NPM packages: `@scope/package-name`
- VS Code extensions: `publisher.extension-name`
- Terraform modules: `namespace/module-name`

---

## Installation Test

Verified working installation:
```bash
npm run install:local -- -d /tmp/test-gemini -i gemini -y
```

Result:
```
✅ Agents installed (5):
  /dhr-arjuna
  /dhr-bhima
  /dhr-nakula
  /dhr-sahadeva
  /dhr-yudhishthira

✅ Skills installed (12):
  /dhr-api-design
  /dhr-brainstorming
  /dhr-core-entities
  /dhr-core-idea
  /dhr-deploy
  /dhr-e2e-api-tests
  /dhr-epics-and-stories
  /dhr-hld
  /dhr-implement
  /dhr-lld
  /dhr-prd
  /dhr-product-brief
```

Directory structure verified:
```
.gemini/skills/
├── dhr-arjuna/
├── dhr-bhima/
├── dhr-nakula/
├── dhr-sahadeva/
├── dhr-yudhishthira/
├── dhr-api-design/
├── dhr-brainstorming/
├── dhr-core-entities/
├── dhr-core-idea/
├── dhr-deploy/
├── dhr-e2e-api-tests/
├── dhr-epics-and-stories/
├── dhr-hld/
├── dhr-implement/
├── dhr-lld/
├── dhr-prd/
└── dhr-product-brief/
```

---

## User Impact

**Breaking Change:** Users who previously installed Dhurandhar will need to reinstall to get the new prefixed names.

**Migration:** Simply run the installer again in your project directory:
```bash
cd dhurandhar
git pull
npm install
npm run install:local -- -i <your-ide>
```

The old unprefixed skills will remain in your project but won't be updated. You can manually delete them if desired.

---

## Status

✅ All files updated  
✅ Installer modified  
✅ Installation tested  
✅ Documentation updated  
✅ Ready to commit and push
