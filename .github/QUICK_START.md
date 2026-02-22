# GitHub Actions Quick Start Guide

## 🚀 5-Minute Setup

### Step 1: Add Secrets (2 minutes)

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add these secrets:

```
Name: NETLIFY_AUTH_TOKEN
Value: [Get from https://app.netlify.com/user/applications]

Name: NETLIFY_SITE_ID
Value: [Get from Netlify site settings → API ID]

Name: NEXT_PUBLIC_SITE_URL
Value: https://logonsolutions.netlify.app
```

### Step 2: Enable Branch Protection (2 minutes)

1. Go to **Settings** → **Branches**
2. Click **Add rule**
3. Branch name pattern: `main`
4. Check these boxes:
   - ✅ Require a pull request before merging
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging

### Step 3: Test It (1 minute)

```bash
# Create a test branch
git checkout -b test/workflows

# Make a change
echo "Testing workflows" >> README.md

# Commit and push
git add README.md
git commit -m "test: workflows"
git push origin test/workflows
```

Then create a PR and watch the magic happen! ✨

## 📊 What You Get

### Automatic on Every PR
- ✅ Code linting
- ✅ Type checking
- ✅ Unit tests
- ✅ Build verification
- ✅ E2E tests
- ✅ Preview deployment
- ✅ Performance check
- ✅ Auto-labeling

### Automatic on Merge to Main
- ✅ Production deployment
- ✅ Release notes
- ✅ Performance audit

### Automatic Weekly
- ✅ Security scans
- ✅ Dependency updates
- ✅ Performance monitoring

## 🎯 Common Tasks

### Create a Pull Request
```bash
git checkout -b feature/my-feature
# Make changes
git add .
git commit -m "feat: add my feature"
git push origin feature/my-feature
# Create PR on GitHub
```

### Deploy to Production
```bash
# Just merge to main!
git checkout main
git merge feature/my-feature
git push origin main
# Automatic deployment starts
```

### Create a Release
```bash
# Tag your commit
git tag v1.0.0
git push origin v1.0.0
# Automatic release created
```

### Update Dependencies
```bash
# Dependabot does this automatically!
# Just review and merge the PRs
```

## 🔍 Monitoring

### Check Workflow Status
1. Go to **Actions** tab
2. See all workflow runs
3. Click any run for details

### View Deployments
1. Check PR comments for preview URLs
2. Visit https://logonsolutions.netlify.app for production

### Review Security
1. Go to **Security** tab
2. Check Dependabot alerts
3. Review CodeQL findings

## 📚 Learn More

- **[WORKFLOWS.md](./WORKFLOWS.md)** - Detailed documentation
- **[README.md](./README.md)** - Configuration overview
- **[GITHUB_ACTIONS_SETUP.md](../GITHUB_ACTIONS_SETUP.md)** - Complete setup guide

## 🆘 Need Help?

- Check workflow logs in Actions tab
- Read the documentation
- Email: logonthepage@gmail.com

---

**That's it! You're ready to go! 🎉**
