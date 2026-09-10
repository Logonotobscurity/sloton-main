# GitHub Configuration

This directory contains all GitHub-specific configuration files for the LOG_ON project.

## 📁 Directory Structure

```
.github/
├── workflows/           # GitHub Actions workflows
│   ├── ci.yml          # Continuous Integration
│   ├── e2e.yml         # End-to-end tests
│   ├── deploy-netlify.yml    # Production deployment
│   ├── preview-deploy.yml    # Preview deployments
│   ├── security.yml    # Security checks
│   ├── lighthouse.yml  # Performance testing
│   ├── auto-merge.yml  # Dependabot auto-merge
│   ├── stale.yml       # Stale issue management
│   ├── label-pr.yml    # Auto-labeling PRs
│   └── release.yml     # Release automation
├── ISSUE_TEMPLATE/     # Issue templates
│   ├── bug_report.md   # Bug report template
│   ├── feature_request.md  # Feature request template
│   └── config.yml      # Issue template configuration
├── dependabot.yml      # Dependabot configuration
├── labeler.yml         # Auto-labeling rules
├── pull_request_template.md  # PR template
├── WORKFLOWS.md        # Workflow documentation
└── README.md           # This file
```

## 🚀 Quick Start

### For Contributors

1. **Creating Issues:**
   - Use the appropriate issue template (Bug Report or Feature Request)
   - Fill in all required fields
   - Add relevant labels

2. **Creating Pull Requests:**
   - Fork the repository
   - Create a feature branch
   - Make your changes
   - Fill in the PR template
   - Wait for CI checks to pass
   - Request review

3. **Review Process:**
   - All PRs require passing CI checks
   - At least one approval required
   - Preview deployment will be created automatically
   - Check the preview URL before merging

### For Maintainers

1. **Setting Up Secrets:**
   - See [WORKFLOWS.md](./WORKFLOWS.md#setup-instructions) for required secrets
   - Add secrets in repository settings

2. **Managing Workflows:**
   - All workflows are in the `workflows/` directory
   - Workflows can be manually triggered from the Actions tab
   - Monitor workflow runs for failures

3. **Handling Dependabot:**
   - Dependabot creates PRs weekly
   - Patch and minor updates auto-merge if CI passes
   - Major updates require manual review

## 📊 Workflow Overview

### Continuous Integration (CI)
- Runs on every push and PR
- Checks: Lint, Type Check, Tests, Build
- Required for merge

### Deployment
- **Production:** Automatic on push to `main`
- **Preview:** Automatic on PRs
- Platform: Netlify

### Testing
- **Unit Tests:** Vitest (on every push)
- **E2E Tests:** Playwright (on push + daily)
- **Performance:** Lighthouse (weekly + on PRs)

### Security
- **Dependency Review:** On PRs
- **NPM Audit:** Weekly
- **CodeQL:** Weekly

### Maintenance
- **Dependabot:** Weekly updates
- **Stale Issues:** Daily cleanup
- **Auto-labeling:** On PR creation

## 🔧 Configuration Files

### `dependabot.yml`
Configures automatic dependency updates:
- NPM packages: Weekly on Mondays
- GitHub Actions: Weekly on Mondays
- Groups related dependencies
- Auto-merges patch/minor updates

### `labeler.yml`
Defines auto-labeling rules for PRs based on:
- Changed files
- File types
- Directory structure

### Issue Templates
Standardized templates for:
- 🐛 Bug reports
- ✨ Feature requests
- 📚 Documentation
- 🔒 Security issues

### PR Template
Standardized pull request template with:
- Description
- Type of change
- Checklist
- Testing instructions
- Deployment notes

## 📚 Documentation

- **[WORKFLOWS.md](./WORKFLOWS.md)** - Detailed workflow documentation
- **[Pull Request Template](./pull_request_template.md)** - PR guidelines
- **[Issue Templates](./ISSUE_TEMPLATE/)** - Issue reporting guidelines

## 🏷️ Labels

### Type Labels
- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Documentation improvements
- `dependencies` - Dependency updates

### Status Labels
- `stale` - No recent activity
- `work-in-progress` - Currently being worked on
- `needs-review` - Awaiting review

### Size Labels
- `size/xs` - Extra small PR (< 10 lines)
- `size/s` - Small PR (< 100 lines)
- `size/m` - Medium PR (< 500 lines)
- `size/l` - Large PR (< 1000 lines)
- `size/xl` - Extra large PR (> 1000 lines)

### Component Labels
- `components` - UI components
- `pages` - Page changes
- `api` - API changes
- `tests` - Test changes
- `ci-cd` - CI/CD changes

## 🔐 Security

### Reporting Security Issues
- Use the [Security Advisory](https://github.com/YOUR_USERNAME/YOUR_REPO/security/advisories/new) feature
- Or email: logonthepage@gmail.com
- Do not create public issues for security vulnerabilities

### Security Workflows
- Dependency scanning (Dependabot)
- Code scanning (CodeQL)
- NPM audit (weekly)

## 🤝 Contributing

1. Read the [Contributing Guidelines](../CONTRIBUTING.md)
2. Check existing issues and PRs
3. Use appropriate templates
4. Follow the code style
5. Write tests
6. Update documentation

## 📞 Support

- **Documentation:** [WORKFLOWS.md](./WORKFLOWS.md)
- **Issues:** Use issue templates
- **Email:** logonthepage@gmail.com
- **Website:** https://logonai.netlify.app

## 📝 License

See the [LICENSE](../LICENSE) file in the root directory.

---

**Maintained by:** LOG_ON Development Team
**Last Updated:** January 2026
