#!/usr/bin/env node

/**
 * Release helper script for Fabr
 * Usage: node scripts/release.js [patch|minor|major|prerelease] [--dry-run]
 */

import { execSync } from 'child_process'

const VALID_TYPES = ['patch', 'minor', 'major', 'prerelease']

function main() {
	const args = process.argv.slice(2)
	const releaseType = args[0]
	const isDryRun = args.includes('--dry-run')

	if (!releaseType || !VALID_TYPES.includes(releaseType)) {
		console.error('❌ Please specify a valid release type: patch, minor, major, or prerelease')
		console.error('Usage: node scripts/release.js [patch|minor|major|prerelease] [--dry-run]')
		process.exit(1)
	}

	console.log(`🚀 Starting ${releaseType} release${isDryRun ? ' (dry run)' : ''}...`)

	try {
		// Check if working directory is clean
		console.log('📋 Checking working directory...')
		const status = execSync('git status --porcelain', { encoding: 'utf8' })
		if (status.trim()) {
			console.error('❌ Working directory is not clean. Please commit or stash changes.')
			process.exit(1)
		}

		// Run pre-release checks
		console.log('🔍 Running pre-release checks...')
		execSync('npm run prepare:release', { stdio: 'inherit' })

		if (isDryRun) {
			// Just show what version would be created
			const newVersion = execSync(`npm version ${releaseType} --no-git-tag-version`, {
				encoding: 'utf8',
			}).trim()
			console.log(`✅ Dry run complete. Would create version: ${newVersion}`)

			// Restore package.json
			execSync('git checkout package.json')
			return
		}

		// Create version and tag
		console.log(`📦 Creating ${releaseType} version...`)
		const newVersion = execSync(`npm version ${releaseType}`, { encoding: 'utf8' }).trim()

		console.log(`✅ Release ${newVersion} completed!`)
		console.log('📤 Version tag has been pushed to GitHub.')
		console.log('⏳ The CI/CD pipeline will now build and publish to npm.')
		console.log(`🔗 Track progress at: https://github.com/yashjawale/fabr/actions`)
	} catch (error) {
		console.error('❌ Release failed:', error.message)
		process.exit(1)
	}
}

main()
