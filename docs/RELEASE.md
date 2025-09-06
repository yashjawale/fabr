# Release Process

This document describes how to release new versions of Fabr to npm.

## Prerequisites

### 1. NPM Token Setup

1. Log in to [npmjs.com](https://www.npmjs.com)
2. Go to "Access Tokens" in your profile settings
3. Generate a new token with "Automation" type
4. Add the token as a repository secret named `NPM_TOKEN`:
   - Go to your GitHub repository settings
   - Navigate to "Secrets and variables" → "Actions"
   - Click "New repository secret"
   - Name: `NPM_TOKEN`
   - Value: Your npm token

### 2. Repository Permissions

Ensure the repository has the following permissions enabled:

- Contents: Write (for creating releases)
- Actions: Write (for workflow execution)

## Release Methods

### Method 1: Tag-based Release (Recommended)

1. **Create and push a version tag:**

   ```bash
   # For a new version (e.g., 1.0.0)
   git tag v1.0.0
   git push origin v1.0.0
   ```

2. **The workflow will automatically:**
   - Run quality checks (lint, format, typecheck, build)
   - Test CLI functionality
   - Publish to npm
   - Create a GitHub release with changelog

### Method 2: Manual Release

1. **Go to GitHub Actions tab**
2. **Select "Release" workflow**
3. **Click "Run workflow"**
4. **Fill in the parameters:**
   - Version: `1.0.0` (without 'v' prefix)
   - Dry run: Check this to test without actually publishing

## Version Naming Convention

Follow [Semantic Versioning](https://semver.org/):

- **Major** (`X.0.0`): Breaking changes
- **Minor** (`1.X.0`): New features (backward compatible)
- **Patch** (`1.0.X`): Bug fixes (backward compatible)

### Pre-release Versions

- **Alpha**: `1.0.0-alpha.1`
- **Beta**: `1.0.0-beta.1`
- **Release Candidate**: `1.0.0-rc.1`

Pre-release versions are automatically marked as "prerelease" on GitHub.

## Release Workflow Steps

### 1. Validation Job

- ✅ Code linting
- ✅ Format checking
- ✅ TypeScript type checking
- ✅ Project build
- ✅ CLI functionality test

### 2. Release Job

- 📦 Build the project
- 🏷️ Extract version information
- 📝 Generate changelog from git commits
- 📋 Prepare package for publishing
- 🚀 Publish to npm with provenance
- 🎉 Create GitHub release
- 📌 Update repository with version tag (manual workflow only)

### 3. Notification Job

- ✅ Confirm release success/failure

## Package Publishing Details

### Files Included in npm Package

- `index.js` (main entry point)
- `commands/` (CLI command implementations)
- `lib/` (utility functions)
- `types/` (TypeScript type definitions)
- `templates.json` (template configurations)
- `README.md`
- `LICENSE`

### CLI Binary

The package is published with a `fabr` binary that users can install globally:

```bash
npm install -g fabr
fabr --help
```

## Troubleshooting

### Common Issues

1. **NPM_TOKEN not found**
   - Ensure the secret is properly configured in repository settings
   - Verify the token has "Automation" permissions

2. **Build failures**
   - Check that all code passes linting and type checking
   - Ensure the build succeeds locally with `npm run build`

3. **Version conflicts**
   - Make sure the version doesn't already exist on npm
   - Use `npm view fabr versions --json` to check existing versions

4. **Permission errors**
   - Verify repository permissions are correctly set
   - Check that the npm token has publish permissions for the package

### Testing Before Release

Always test the release process using the dry run option:

1. Go to GitHub Actions
2. Run the "Release" workflow manually
3. Check "Dry run" option
4. Review the output to ensure everything works correctly

## Post-Release Checklist

- [ ] Verify package is available on [npmjs.com](https://www.npmjs.com/package/fabr)
- [ ] Test installation: `npm install -g fabr@latest`
- [ ] Verify CLI works: `fabr --help`
- [ ] Check GitHub release is created
- [ ] Update documentation if needed
- [ ] Announce the release (if significant)

## Emergency Procedures

### Unpublishing a Version (Last Resort)

```bash
# Only possible within 72 hours and if no dependencies
npm unpublish fabr@version --force
```

**Note**: Unpublishing is highly discouraged. Instead, publish a patch version with fixes.

### Deprecating a Version

```bash
npm deprecate fabr@version "Reason for deprecation"
```
