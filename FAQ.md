# Dhurandhar - Frequently Asked Questions

## Installation

### Why can't I use `npx dhurandhar install`?

Dhurandhar is not published to npm. The `npx` command only works for packages published on the npm registry.

**Solution:** Clone the repository and run the installer locally.

### Why doesn't `npx github:rweb22/dhurandhar` work?

While `npx` can theoretically run packages from GitHub, it doesn't work reliably for packages with:
- Multiple dependencies (like Dhurandhar)
- Complex directory structures
- Installation scripts

When you tried it, you likely saw it hang or install incorrectly.

**Solution:** Clone the repository and run the installer locally.

### Why doesn't the curl install script work?

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/rweb22/dhurandhar/main/install.sh)
```

This method requires:
1. The `install.sh` file to be committed to the GitHub repository
2. The repository to be pushed to GitHub
3. The file to be on the `main` branch

If you're seeing this before the repository is pushed, the file doesn't exist yet on GitHub.

**Solution:** Clone the repository and run the installer locally.

---

## What's the correct way to install?

```bash
# 1. Clone
git clone https://github.com/rweb22/dhurandhar.git
cd dhurandhar

# 2. Install dependencies
npm install

# 3. Run installer
npm run install:local
```

This is the ONLY method that works reliably.

---

## IDE-Specific Questions

### I'm using Augment Code and don't see the slash commands

Augment Code looks for skills in `.augment/skills/`, not `.agents/skills/`.

**Solution:**
```bash
npm run install:local -- -i augment
```

### I'm using Gemini Code Assist and don't see the slash commands

Gemini looks for skills in `.gemini/skills/`.

**Solution:**
```bash
npm run install:local -- -i gemini
```

### I installed with `-i universal` but my IDE doesn't see the skills

Some IDEs have their own specific directories:
- Augment → `.augment/skills/`
- Gemini → `.gemini/skills/`
- Cursor → `.cursor/skills/`
- Claude → `.claude/skills/`

**Solution:** Reinstall with the correct IDE flag:
```bash
npm run install:local -- -i <your-ide>
```

### Where are the skills installed?

Depends on the IDE flag you used:

| Flag | Directory | Best For |
|------|-----------|----------|
| `universal` | `.agents/skills/` | Most IDEs, Claude Code, Windsurf |
| `augment` | `.augment/skills/` | Augment Code |
| `gemini` | `.gemini/skills/` | Gemini Code Assist |
| `cursor` | `.cursor/skills/` | Cursor |

---

## Usage Questions

### How do I start using Dhurandhar?

After installation:
1. Open your AI IDE in the project directory
2. Type `/yudhishthira`
3. The agent will introduce himself

### What if I don't see `/yudhishthira`?

Possible causes:
1. **Wrong IDE directory** - Reinstall with correct `-i` flag
2. **IDE doesn't support skills** - Check if your IDE supports the `.agents/skills/` or `.augment/skills/` standard
3. **Installation failed** - Check if the directories exist:
   ```bash
   ls -la .augment/skills/  # or .gemini/skills/
   ```

### How do I uninstall Dhurandhar?

```bash
rm -rf _dhurandhar
rm -rf .augment/skills  # Or your IDE-specific directory
rm -rf _dhurandhar-output  # Optional - this contains your artifacts
```

---

## Development Questions

### Can I customize the agents or skills?

Yes! After installation:
1. Edit `_dhurandhar/agents/*.md` to modify agent personas
2. Edit `.augment/skills/*/SKILL.md` to modify skill workflows
3. Create new skills in `_dhurandhar/custom/`

### Can I fork Dhurandhar?

Absolutely! The project is MIT licensed. Fork it, modify it, make it yours.

### How do I contribute?

1. Fork the repository
2. Make your changes
3. Test with `npm run install:local`
4. Submit a pull request

---

## Troubleshooting

### The installer says "cannot find module"

You forgot to run `npm install` after cloning.

**Solution:**
```bash
cd dhurandhar
npm install
npm run install:local
```

### I see `_hellow` instead of `_dhurandhar`

You used an old version or the wrong installation method.

**Solution:**
```bash
rm -rf _hellow
git pull  # Get latest version
npm install
npm run install:local
```

### The installer hangs or times out

This typically happens with `npx github:` method.

**Solution:** Use the clone method instead.

---

## Future Plans

### Will Dhurandhar be published to npm?

Maybe in the future. For now, GitHub-only distribution allows for:
- Rapid iteration
- Easy forking
- Full source transparency
- No version management overhead

### Will there be a one-command install?

Once the repository is stable and pushed to GitHub, this will work:

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/rweb22/dhurandhar/main/install.sh)
```

But for now, clone + install is the most reliable method.

---

## Still having issues?

1. Check [INSTALL_INSTRUCTIONS.md](INSTALL_INSTRUCTIONS.md)
2. Check [INSTALLATION.md](INSTALLATION.md)
3. Open a GitHub issue with details of your problem
