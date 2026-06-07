---
name: deploy
description: 'Ship to production - build, package, deploy, monitor'
phase: 5
agent: bhima
output: Production deployment + monitoring
---

# Deploy

## Purpose

Implementation is complete. Tests are green. Now we SHIP.

Like when I crushed Duryodhana's thigh - the vow was kept, the victory was final. No retreat. No doubt. **DONE.**

**What you'll create:** Production deployment, monitoring, and launch.

## Before You Begin

You must have:
- ✅ All E2E tests passing (100%)
- ✅ Code reviewed (or self-reviewed with checklist)
- ✅ Documentation complete
- ✅ Build succeeds with no errors
- ✅ No known critical bugs

**Bhima's rule:** Do NOT deploy if tests fail. Do NOT deploy if build fails. Fix first, then deploy.

## Workflow

### Step 1: Pre-Deployment Checklist

**Question:** Is the code truly ready?

**Mandatory Checks:**
```markdown
## Pre-Deployment Checklist

### Testing
- ✅ All unit tests pass (100%)
- ✅ All integration tests pass (100%)
- ✅ All E2E tests pass (100%)
- ✅ Manual smoke test completed
- ✅ Test coverage > 80%

### Code Quality
- ✅ No ESLint errors
- ✅ No TypeScript errors
- ✅ Code formatted (Prettier)
- ✅ No console.log or debugger statements
- ✅ No TODO comments in critical paths

### Security
- ✅ Dependencies audited (npm audit / yarn audit)
- ✅ No secrets in code
- ✅ Environment variables documented
- ✅ API keys secured

### Documentation
- ✅ README.md updated
- ✅ CHANGELOG.md updated
- ✅ API documentation complete
- ✅ User guide written
- ✅ Installation instructions tested

### Build
- ✅ Production build succeeds
- ✅ Build artifacts generated
- ✅ Bundle size acceptable
- ✅ No build warnings
```

**Bhima says:** If checklist has ONE unchecked box, DO NOT DEPLOY. Fix it.

### Step 2: Version Bumping

**Question:** What version number is this release?

**Semantic Versioning (semver):**
- **MAJOR.MINOR.PATCH** (e.g., 1.2.3)

**When to bump:**
- **MAJOR** (1.0.0 → 2.0.0): Breaking changes
- **MINOR** (1.0.0 → 1.1.0): New features, backward compatible
- **PATCH** (1.0.0 → 1.0.1): Bug fixes only

**Example:**
```bash
# For first release
npm version 1.0.0

# For feature release
npm version minor  # 1.0.0 → 1.1.0

# For bug fix
npm version patch  # 1.1.0 → 1.1.1

# This updates package.json and creates git tag
```

### Step 3: Build for Production

**Question:** How do you create production artifacts?

**Build Steps:**
```bash
# Clean previous builds
rm -rf dist/

# Install production dependencies only
npm ci --production

# Run production build
npm run build

# Verify build output
ls -lh dist/
# Should see:
# - extension.js (minified)
# - webview.js (minified)
# - package.json
# - README.md
# - LICENSE

# Check bundle sizes
du -sh dist/*
# Verify sizes are reasonable (< 5MB total for extension)
```

**Build Optimization:**
```markdown
## Production Build Settings

### Minification
- Code minified (uglify/terser)
- Remove comments
- Remove source maps (or separate file)

### Tree Shaking
- Remove unused code
- Dead code elimination

### Code Splitting
- Lazy load components
- Separate vendor bundles

### Verification
- Run extension from dist/ folder
- Test core flows manually
- Verify performance (startup time < 500ms)
```

### Step 4: Package for Distribution

**Question:** How do you create distributable package?

**For VS Code Extension:**
```bash
# Install vsce (VS Code extension packager)
npm install -g @vscode/vsce

# Package extension
vsce package

# Creates: extension-name-1.0.0.vsix

# Test the .vsix locally
code --install-extension extension-name-1.0.0.vsix

# Verify installation worked
code --list-extensions | grep extension-name
```

**For Web App:**
```bash
# Build Docker image
docker build -t myapp:1.0.0 .

# Test image locally
docker run -p 3000:3000 myapp:1.0.0

# Verify app works
curl http://localhost:3000/health
```

### Step 5: Deploy to Production

**Question:** How do you ship to users?

**VS Code Extension - Marketplace:**
```bash
# Create publisher account (one-time)
# https://marketplace.visualstudio.com/manage

# Login
vsce login <publisher-name>

# Publish
vsce publish

# Extension is now live at:
# https://marketplace.visualstudio.com/items?itemName=<publisher>.<name>
```

**Web App - Cloud Platform:**
```bash
# Heroku
git push heroku main

# Vercel
vercel --prod

# AWS
aws deploy push
aws deploy create-deployment

# DigitalOcean
doctl apps create-deployment <app-id>
```

**Bhima's approach:** One command deploys. No manual steps. Automate everything.

### Step 6: Verify Deployment

**Question:** Did deployment succeed?

**Post-Deployment Checks:**
```markdown
## Deployment Verification

### VS Code Extension
- ✅ Extension appears on marketplace
- ✅ Install count updates
- ✅ README displays correctly
- ✅ Version number correct
- ✅ Fresh install works (test on clean VS Code)

### Web App
- ✅ Health check endpoint responds (200 OK)
- ✅ Homepage loads
- ✅ API endpoints work
- ✅ Database migrations applied
- ✅ Environment variables set
- ✅ SSL certificate valid

### Smoke Test
- ✅ Core user flow works end-to-end
- ✅ No console errors
- ✅ Performance acceptable
```

**If ANY check fails:** ROLLBACK immediately.

### Step 7: Set Up Monitoring

**Question:** How do you know if production is healthy?

**Monitoring Setup:**
```markdown
## Production Monitoring

### Error Tracking
- Tool: Sentry / Rollbar / Bugsnag
- Track: Unhandled exceptions, API errors
- Alerts: Email/Slack when error rate > 1%

### Performance Monitoring
- Tool: DataDog / New Relic / Application Insights
- Track: API latency, memory usage, crash rate
- Alerts: Latency > 3 seconds, memory > 80%

### Usage Analytics (Optional)
- Tool: VS Code telemetry / Google Analytics
- Track: DAU, feature usage, search volume
- Privacy: Anonymous only, respect user preferences

### Logging
- Tool: CloudWatch / Papertrail / Loggly
- Levels: ERROR, WARN, INFO
- Retention: 30 days minimum
```

**Example - Sentry Setup:**
```typescript
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: 'production',
  release: `extension@${version}`,
  tracesSampleRate: 0.1,  // 10% of transactions
});

// Automatically catches errors
```

### Step 8: Announce Launch

**Question:** How do people know it's shipped?

**Launch Checklist:**
```markdown
## Launch Announcement

### Documentation
- ✅ Update project README with install link
- ✅ Write blog post / launch post
- ✅ Create demo video / GIF

### Distribution
- ✅ Post on Twitter / LinkedIn
- ✅ Share on Reddit (r/webdev, r/reactjs, etc.)
- ✅ Post on Hacker News (Show HN)
- ✅ Share in relevant Discord/Slack communities
- ✅ Email interested users (if you have list)

### Developer Platforms
- ✅ Tag on GitHub (create release notes)
- ✅ Update marketplace description
- ✅ Add to awesome-lists (if applicable)

### Support Channels
- ✅ Set up GitHub issues
- ✅ Create Discord / community
- ✅ Add support email
```

### Step 9: Monitor First 24 Hours

**Question:** Is production stable after launch?

**Post-Launch Monitoring (First 24h):**
```markdown
## Day 1 Monitoring

### Every 2 Hours:
- Check error rates (should be < 1%)
- Review user feedback (GitHub issues, reviews)
- Monitor install count
- Check server load / API usage

### Red Flags:
- 🚨 Error rate > 5% → Investigate immediately
- 🚨 Negative reviews → Respond and fix
- 🚨 Performance degradation → Scale or optimize
- 🚨 Critical bug reported → Hotfix ASAP

### Green Flags:
- ✅ Installs increasing steadily
- ✅ Positive reviews
- ✅ No critical errors
- ✅ Performance stable
```

**Bhima says:** Stay vigilant first day. Like after defeating Duryodhana, guard the victory.

### Step 10: Plan Iteration

**Question:** What comes next?

**Post-Launch Planning:**
```markdown
## Post-Launch Roadmap

### Week 1: Stabilize
- Fix critical bugs
- Respond to user feedback
- Monitor metrics
- Release v1.0.1 (patch) if needed

### Week 2-4: Iterate
- Implement quick wins from feedback
- Improve documentation
- Release v1.1.0 (minor) with improvements

### Month 2-3: Grow
- Build requested features (from PRD v2.0)
- Marketing and distribution
- Community building
```

## Output

This skill produces:
- ✅ **Production deployment** - Live and accessible
- ✅ **Monitoring** - Errors and performance tracked
- ✅ **Documentation** - Users know how to use it
- ✅ **Support** - Users can report issues
- ✅ **Success metrics** - Track adoption and usage

## What Happens Next

After deployment:
- **Monitor** - Watch for errors and feedback
- **Iterate** - Fix bugs, add features
- **Market** - Grow user base
- **Maintain** - Keep it running

The cycle continues: New ideas → New PRDs → New implementations → New deployments.

## Bhima's Wisdom

"After I killed Duryodhana, the war was not over. We still had to:
- Protect the victory (monitoring)
- Heal the wounded (bug fixes)
- Rebuild the kingdom (iteration)
- Govern wisely (maintenance)

Your deployment is the same. Shipping is not the end. It is the beginning.

But remember: I DID kill Duryodhana. I DID keep my vow. The victory WAS won.

Your deployment is real. Your users are real. Your victory is real.

Now SHIP IT. Then protect it. Then improve it.

The war is won by those who FINISH. Not those who plan forever.

You planned with Yudhishthira. You defined with Sahadeva. You designed with Arjuna. You organized with Nakula.

Now you SHIP with Bhima.

DEPLOY. NOW."

---

**Deployment is victory. Ship it.**
