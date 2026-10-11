import fs from 'fs'
import path from 'path'

/**
 * Recursively walks a directory and returns all file paths.
 * Traverses the directory tree while excluding common build/version control directories.
 * Skips 'node_modules', '.git', and 'dist' directories to avoid processing unnecessary files.
 *
 * @param {string} dirPath - The directory path to walk recursively
 *
 * @returns {string[]} An array of absolute file paths found in the directory tree
 */
const walkDir = (dirPath: string): string[] => {
	let fileList: string[] = []
	const files = fs.readdirSync(dirPath)
	files.forEach(file => {
		const fullPath = path.join(dirPath, file)
		if (fs.statSync(fullPath).isDirectory()) {
			if (file !== 'node_modules' && file !== '.git' && file !== 'dist') {
				fileList = [...fileList, ...walkDir(fullPath)]
			}
		} else {
			fileList.push(fullPath)
		}
	})
	return fileList
}

/**
 * Finds and replaces placeholder values in all files within a directory.
 * Recursively processes all files in the project directory, searching for placeholder
 * patterns and replacing them with their corresponding values. Only writes files back
 * if changes were made to avoid unnecessary disk operations.
 *
 * @param {string} projectPath - The root path of the project directory to process
 * @param {Record<string, string>} placeholderValues - An object mapping placeholder keys to their replacement values
 *
 * @returns {void}
 */
export const findAndReplace = (
	projectPath: string,
	placeholderValues: Record<string, string>,
): void => {
	const filesToProcess = walkDir(projectPath)

	filesToProcess.forEach(filePath => {
		let content = fs.readFileSync(filePath, 'utf8')
		let changed = false
		for (const [key, value] of Object.entries(placeholderValues)) {
			const token = new RegExp(`\\{\\{${key}\\}\\}`, 'g')
			if (token.test(content)) {
				content = content.replace(token, () => value)
				changed = true
			}
		}
		if (changed) {
			fs.writeFileSync(filePath, content, 'utf8')
		}
	})
}

/** Rename explicitly configured files. */
export const renameFiles = (
	projectPath: string,
	renamedFiles: Array<{ from: string; to: string }> | undefined,
	placeholderValues: Record<string, string>,
): void => {
	for (const rename of renamedFiles ?? []) {
		const resolve = (filePath: string) =>
			filePath.replace(/\{\{([^}]+)\}\}/g, (_, key: string) => placeholderValues[key] ?? '')
		const source = path.resolve(projectPath, resolve(rename.from))
		const destination = path.resolve(projectPath, resolve(rename.to))
		if (
			!source.startsWith(`${projectPath}${path.sep}`) ||
			!destination.startsWith(`${projectPath}${path.sep}`)
		) {
			throw new Error('Renamed file paths must stay within the project directory.')
		}
		fs.renameSync(source, destination)
	}
}
