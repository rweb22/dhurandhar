# GitHub-Only Distribution Guide

Dhurandhar is currently distributed **exclusively via GitHub** (not npm). This document explains how to use and share it.

---

## 🚀 Installation Methods

### Method 1: Direct from GitHub (Recommended)

Users can install Dhurandhar with a single command:

```bash
npx github:rweb22/dhurandhar install
```

This:
- Downloads the latest version from GitHub
- Runs the installer
- Sets up the framework in their project
- No npm package needed!

### Method 2: Clone and Install Locally

For development or customization:

```bash
# Clone the repository
git clone https://github.com/rweb22/dhurandhar.git
cd dhurandhar

# Install dependencies
npm install

# Install into a project
npm run install:local -- -d /path/to/project

# Or install interactively
npm run install:local
```

---

## 📋 Why GitHub-Only?

Benefits of GitHub-only distribution:

1. **Rapid Iteration** - Push updates without npm publishing delays
2. **Version Control** - Users always get the latest from main branch
3. **Easy Forking** - Developers can fork and customize
4. **No Package Management** - No need to manage npm versions
5. **Full Source Access** - Users see all code, can learn and modify

---

## 🔗 Sharing Dhurandhar

### For End Users

Share this installation command:

```bash
npx github:rweb22/dhurandhar install
```

Or provide the full workflow:

```bash
# Install Dhurandhar
npx github:rweb22/dhurandhar install

# Start using it
/yudhishthira     # Begin Phase 1
/core-idea        # Create vision
```

### For Developers

Share the repository:

```
https://github.com/rweb22/dhurandhar
```

Developers can:
- Clone and modify
- Create forks
- Submit pull requests
- Build custom versions

---

## 🛠️ Development Workflow

### Testing Changes

After making changes to Dhurandhar:

```bash
# Test the installer
npm run install:local -- -d /tmp/test-project

# Verify installation
ls -la /tmp/test-project/_dhurandhar
ls -la /tmp/test-project/.agents/skills
```

### Local Development

```bash
# Install dependencies
npm install

# Test locally
npm run install:local

# Run linters
npm run lint
npm run format:check

# Validate everything
npm run validate
```

---

## 📦 What Gets Distributed

When users run `npx github:rweb22/dhurandhar install`, they get:

### From `src/agents/`
- 5 Pandava agent personas (yudhishthira.md, sahadeva.md, etc.)
- Copied to `_dhurandhar/agents/` in their project

### From `src/skills/`
- 12 skill definitions (core-idea/, prd/, implement/, etc.)
- Installed to `.agents/skills/` or IDE-specific directory

### From `tools/installer/`
- Installation logic
- Configuration generation
- Directory structure setup

---

## 🔄 Updates

### For Users

To get the latest version:

```bash
# Reinstall (overwrites framework files)
npx github:rweb22/dhurandhar install

# Or manually update
cd _dhurandhar
git pull  # If they cloned it
```

### For Maintainers

To push updates:

```bash
# Make changes
git add .
git commit -m "feat: add new feature"
git push origin main

# Users automatically get it on next install
```

---

## 🎯 Future: Moving to npm

If/when ready to publish to npm:

1. **Update package.json**
   - Set version to 1.0.0
   - Verify all metadata

2. **Publish**
   ```bash
   npm publish
   ```

3. **Update Documentation**
   - Change `npx github:rweb22/dhurandhar` to `npx dhurandhar`
   - Update README, INSTALLATION.md, etc.

4. **Benefits**
   - Versioned releases
   - Faster installs
   - npm discoverability

---

## 📝 Current Status

**Distribution:** GitHub-only  
**Installation:** `npx github:rweb22/dhurandhar install`  
**Repository:** https://github.com/rweb22/dhurandhar  
**Status:** ✅ Production Ready  

---

## 🤝 Contributing

Since Dhurandhar is GitHub-only:

1. Fork the repository
2. Make your changes
3. Test with `npm run install:local`
4. Submit a pull request

All contributions welcome!

---

**Note:** This distribution model is intentional. It allows rapid iteration, easy forking, and keeps the framework accessible to developers who want to learn from or modify the source.
