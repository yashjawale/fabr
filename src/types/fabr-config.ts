export interface Placeholder {
	/** Token to replace in template file contents, e.g. PROJECT_NAME. */
	key: string
	/** Prompt shown to the user. */
	prompt: string
	default?: string
}

export interface EnvironmentVariable {
	key: string
	prompt?: string
	default?: string
	/** Save this value to .env.local instead of .env. */
	local?: boolean
}

export interface FileRename {
	/** Existing path relative to the template root; supports {{PLACEHOLDER}} tokens. */
	from: string
	/** New path relative to the template root; supports {{PLACEHOLDER}} tokens. */
	to: string
}

export interface FabrConfig {
	preSetupCommand?: string
	postSetupCommand?: string
	placeholders?: Placeholder[]
	environmentVariables?: EnvironmentVariable[]
	renamedFiles?: FileRename[]
}

export function validateFabrConfig(config: unknown): config is FabrConfig {
	if (typeof config !== 'object' || config === null) return false
	const isRecord = (item: unknown): item is Record<string, unknown> =>
		typeof item === 'object' && item !== null && !Array.isArray(item)
	const hasOnly = (item: Record<string, unknown>, allowed: string[]) =>
		Object.keys(item).every(key => allowed.includes(key))
	const optionalString = (item: Record<string, unknown>, key: string) =>
		item[key] === undefined || typeof item[key] === 'string'
	const validKey = (key: unknown) => typeof key === 'string' && /^[A-Z_][A-Z0-9_]*$/.test(key)

	if (
		!isRecord(config) ||
		!hasOnly(config, [
			'$schema',
			'preSetupCommand',
			'postSetupCommand',
			'placeholders',
			'environmentVariables',
			'renamedFiles',
		])
	)
		return false
	if (
		!optionalString(config, '$schema') ||
		!optionalString(config, 'preSetupCommand') ||
		!optionalString(config, 'postSetupCommand')
	)
		return false
	if (config.placeholders !== undefined) {
		if (
			!Array.isArray(config.placeholders) ||
			!config.placeholders.every(item => {
				if (!isRecord(item) || !hasOnly(item, ['key', 'prompt', 'default'])) return false
				return (
					validKey(item.key) && typeof item.prompt === 'string' && optionalString(item, 'default')
				)
			})
		)
			return false
	}
	if (config.environmentVariables !== undefined) {
		if (
			!Array.isArray(config.environmentVariables) ||
			!config.environmentVariables.every(item => {
				if (!isRecord(item) || !hasOnly(item, ['key', 'prompt', 'default', 'local'])) return false
				return (
					validKey(item.key) &&
					optionalString(item, 'prompt') &&
					optionalString(item, 'default') &&
					(item.local === undefined || typeof item.local === 'boolean')
				)
			})
		)
			return false
	}
	if (config.renamedFiles !== undefined) {
		if (
			!Array.isArray(config.renamedFiles) ||
			!config.renamedFiles.every(item => {
				if (!isRecord(item) || !hasOnly(item, ['from', 'to'])) return false
				return typeof item.from === 'string' && typeof item.to === 'string'
			})
		)
			return false
	}
	return true
}
