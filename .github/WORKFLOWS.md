# GitHub Actions Workflows Documentation

This document describes all GitHub Actions workflows configured for the LOG_ON project.

## 📋 Table of Contents

- [CI/CD Workflows](#cicd-workflows)
- [Testing Workflows](#testing-workflows)
- [Deployment Workflows](#deployment-workflows)
- [Maintenance Workflows](#maintenance-workflows)
- [Security Workflows](#security-workflows)
- [Setup Instructions](#setup-instructions)

---

## CI/CD Workflows

### 1. CI Pipeline (`ci.yml`)

**Triggers:** Push to `main`/`develop`, Pull Requests

**Jobs:**
- **Lint**: Runs ESLint to check code quality
- **Type Check**: Validates TypeScript types
- **Unit Tests**: Runs Vitest unit tests with coverage
- **Build**: Creates production build

**Artifacts:**
- Build artifacts (`.next` directory)
- Test coverage reports (uploaded to Codecov)

**Status:** ✅ Required for merge

---

### 2. E2E Tests (`e2e.yml`)

**Triggers:** Push to `main`/`develop`, Pull Requests, Daily at 2 AM UTC

**Jobs:**
- Installs Playwright browsers
- Builds application
- Runs end-to-end tests
- Uploads test reports and screenshots

**Artifacts:**
- Playwright test reports
- Screenshots (on failure)

**Status:** ✅ Required for merge

---

## Deployment Workflows

### 3. Production Deploy (`deploy-netlify.yml`)

**Triggers:** Push to `main`, Manual dispatch

**Jobs:**
- Builds production application
- Deploys to Netlify production
- Notifies deployment status

**Environment:** Production
**URL:** https://logonsolutions.netlify.app

**Required Secrets:**
- `NETLIFY_AUTH_TOKEN`
- `NETLIFY_SITE_ID`
- `NEXT_PUBLIC_SITE_URL`

---

### 4. Preview Deploy (`preview-deploy.yml`)

**Triggers:** Pull Requests to `main`/`develop`

**Jobs:**
- Builds preview application
- Deploys to Netlify preview environment
- Comments PR with preview URL

**Preview URL Format:** `https://pr-{number}--logonsolutions.netlify.app`

---

## Testing Workflows

### 5. Lighthouse Performance (`lighthouse.yml`)

**Triggers:** Push to `main`, Pull Requests, Weekly on Sunday at 3 AM UTC

**Jobs:**
- Runs Lighthouse CI on key pages
- Tests performance, accessibility, SEO, best practices
- Comments PR with scores
- Uploads detailed reports

**Pages Tested:**
- Homepage
- Insights page
- AI Solutions page
- Automation page

**Artifacts:**
- Lighthouse reports (`.lighthouseci`)

---

## Security Workflows

### 6. Security Checks (`security.yml`)

**Triggers:** Push to `main`/`develop`, Pull Requests, Weekly on Monday at 9 AM UTC

**Jobs:**
- **Dependency Review**: Checks for vulnerable dependencies in PRs
- **NPM Audit**: Runs security audit on npm packages
- **CodeQL Analysis**: Performs static code analysis for security issues

**Artifacts:**
- NPM audit reports
- CodeQL analysis results

---

## Maintenance Workflows

### 7. Auto Merge Dependabot (`auto-merge.yml`)

**Triggers:** Dependabot Pull Requests

**Jobs:**
- Automatically approves and merges patch/minor version updates
- Requires all CI checks to pass

**Auto-merge criteria:**
- Patch updates (`x.x.X`)
- Minor updates (`x.X.x`)
- All CI checks pass

---

### 8. Stale Issues/PRs (`stale.yml`)

**Triggers:** Daily at midnight UTC, Manual dispatch

**Jobs:**
- Marks issues stale after 60 days of inactivity
- Closes stale issues after 7 days
- Marks PRs stale after 30 days of inactivity
- Closes stale PRs after 14 days

**Exempt Labels:**
- `pinned`
- `security`
- `bug`
- `work-in-progress`

---

### 9. Auto Label PRs (`label-pr.yml`)

**Triggers:** Pull Request opened/edited/synchronized

**Jobs:**
- Labels PRs based on changed files
- Labels PRs based on size (xs, s, m, l, xl)

**Label Categories:**
- `documentation`, `components`, `pages`, `styles`
- `config`, `tests`, `ci-cd`, `dependencies`
- `content`, `api`, `utilities`, `assets`
- `size/xs`, `size/s`, `size/m`, `size/l`, `size/xl`

---

### 10. Release (`release.yml`)

**Triggers:** Git tags (`v*.*.*`), Manual dispatch

**Jobs:**
- Generates changelog from commits
- Creates GitHub release
- Deploys to production
- Notifies team

**Tag Format:** `v1.0.0` (semantic versioning)

---

## Setup Instructions

### Required Secrets

Add these secrets to your GitHub repository settings:

1. **Netlify Deployment**
   ```
   NETLIFY_AUTH_TOKEN=your_netlify_auth_token
   NETLIFY_SITE_ID=your_netlify_site_id
   ```

2. **Environment Variables**
   ```
   NEXT_PUBLIC_SITE_URL=https://logonsolutions.netlify.app
   ```

3. **Code Coverage (Optional)**
   ```
   CODECOV_TOKEN=your_codecov_token
   ```

### Getting Netlify Credentials

1. **Auth Token:**
   - Go to https://app.netlify.com/user/applications
   - Click "New access token"
   - Copy the token

2. **Site ID:**
   - Go to your site settings in Netlify
   - Copy the "API ID" under "Site information"

### Setting Up Secrets

1. Go to your GitHub repository
2. Navigate to Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Add each secret with its value

### Branch Protection Rules

Recommended branch protection for `main`:

1. Go to Settings → Branches → Add rule
2. Branch name pattern: `main`
3. Enable:
   - ✅ Require a pull request before merging
   - ✅ Require status checks to pass before merging
     - `Lint`
     - `Type Check`
     - `Unit Tests`
     - `Build`
   - ✅ Require branches to be up to date before merging
   - ✅ Require conversation resolution before merging

### Dependabot Configuration

Dependabot is configured to:
- Check for npm updates weekly (Mondays at 9 AM Lagos time)
- Check for GitHub Actions updates weekly
- Group related dependencies
- Auto-merge patch and minor updates

### Manual Workflow Triggers

Some workflows can be triggered manually:

1. Go to Actions tab
2. Select the workflow
3. Click "Run workflow"
4. Fill in required inputs (if any)

---

## Workflow Status Badges

Add these badges to your README.md:

```markdown
![CI](https://github.com/YOUR_USERNAME/YOUR_REPO/workflows/CI/badge.svg)
![E2E Tests](https://github.com/YOUR_USERNAME/YOUR_REPO/workflows/E2E%20Tests/badge.svg)
![Security](https://github.com/YOUR_USERNAME/YOUR_REPO/workflows/Security%20Checks/badge.svg)
```

---

## Troubleshooting

### Build Failures

1. Check the workflow logs in the Actions tab
2. Verify all secrets are correctly set
3. Ensure dependencies are up to date
4. Run `npm ci && npm run build` locally

### Deployment Failures

1. Verify Netlify credentials are correct
2. Check Netlify build logs
3. Ensure environment variables are set
4. Verify the build output directory is correct

### Test Failures

1. Run tests locally: `npm run test:run`
2. Check for flaky tests
3. Verify test environment setup
4. Review test logs in workflow artifacts

---

## Best Practices

1. **Always create PRs** - Don't push directly to `main`
2. **Wait for CI** - Let all checks complete before merging
3. **Review preview deploys** - Test changes in preview environment
4. **Monitor security alerts** - Address Dependabot alerts promptly
5. **Keep dependencies updated** - Review and merge Dependabot PRs regularly
6. **Use semantic versioning** - Tag releases with `v1.0.0` format
7. **Write meaningful commit messages** - They appear in changelogs

---

## Support

For issues with workflows:
1. Check workflow logs in Actions tab
2. Review this documentation
3. Contact the development team
4. Open an issue with the `ci-cd` label

---

**Last Updated:** January 2026
**Maintained by:** LOG_ON Development Team
