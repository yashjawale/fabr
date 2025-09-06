#!/usr/bin/env node

/**
 * Check release status and provide next steps
 * Usage: node scripts/release-status.js
 */

import { execSync } from 'child_process'

function main() {
	console.log('📊 Fabr Release Status Check\n')

	try {
		// Get current version
		const currentVersion = JSON.parse(
			execSync(
				'npm run build > /dev/null 2>&1 && node dist/index.js --version || echo "{\\"version\\": \\"unknown\\"}"',
				{ encoding: 'utf8' },
			),
		).version
		console.log(`📦 Current Version: ${currentVersion}`)

		// Check if we're on main branch
		const currentBranch = execSync('git branch --show-current', { encoding: 'utf8' }).trim()
		console.log(`🌿 Current Branch: ${currentBranch}`)

		// Check working directory status
		const status = execSync('git status --porcelain', { encoding: 'utf8' })
		if (status.trim()) {
			console.log('⚠️  Working Directory: Has uncommitted changes')
			console.log('   Please commit or stash changes before releasing')
		} else {
			console.log('✅ Working Directory: Clean')
		}

		// Check if npm token is likely configured (can't check directly)
		console.log('\n🔑 NPM Token Status:')
		console.log('   ⚠️  Cannot verify automatically')
		console.log('   💡 Ensure NPM_TOKEN secret is configured in GitHub repository settings')

		// Get latest tag
		try {
			const latestTag = execSync('git describe --tags --abbrev=0', { encoding: 'utf8' }).trim()
			console.log(`🏷️  Latest Tag: ${latestTag}`)
		} catch {
			console.log('🏷️  Latest Tag: No tags found')
		}

		// Check if there are commits since last tag
		try {
			const commitsSinceTag = execSync(
				'git rev-list $(git describe --tags --abbrev=0)..HEAD --count',
				{ encoding: 'utf8' },
			).trim()
			if (commitsSinceTag === '0') {
				console.log('📝 Commits Since Last Tag: 0 (no new changes to release)')
			} else {
				console.log(`📝 Commits Since Last Tag: ${commitsSinceTag} (ready for release)`)
			}
		} catch {
			console.log('📝 Commits Since Last Tag: Unable to determine')
		}

		console.log('\n🚀 Next Steps:')

		if (status.trim()) {
			console.log('   1. Commit your changes: git add . && git commit -m "Your message"')
			console.log('   2. Then proceed with release')
		} else if (currentBranch !== 'main') {
			console.log('   1. Switch to main branch: git checkout main')
			console.log('   2. Then proceed with release')
		} else {
			console.log('   Release using one of these methods:')
			console.log('   • Quick release: npm run release patch|minor|major')
			console.log('   • Manual tag: git tag v1.0.0 && git push origin v1.0.0')
			console.log('   • GitHub Actions: Go to Actions tab and run Release workflow')
		}

		console.log('\n📚 Documentation:')
		console.log('   • Full release guide: docs/RELEASE.md')
		console.log('   • Monitor releases: https://github.com/yashjawale/fabr/actions')
		console.log('   • Published packages: https://www.npmjs.com/package/fabr')
	} catch (error) {
		console.error('❌ Error checking release status:', error.message)
		process.exit(1)
	}
}

main()
