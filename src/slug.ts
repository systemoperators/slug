import slug from 'limax';
import { transliterate } from './transliterate';

export interface SlugOptions {
	/** Insert dashes between letters and numbers (default: false) */
	separateNumbers?: boolean;
}

/**
 * Generate short slug from text (filename or title)
 * Handles UUID patterns, emoji, special characters, and Cyrillic text
 *
 * By default, keeps letters and numbers together (S2E6 -> s2e6, not s-2-e-6)
 *
 * @param text - Text to convert to slug
 * @param options - Optional settings
 * @returns URL-safe slug
 */
export function generateShortSlug(text: string, options: SlugOptions = {}): string {
	try {
		if (!text) return '';

		const { separateNumbers = false } = options;

		// Special replacements
		let input = text.replace(/#/g, 'sharp');

		// Remove file extension for slug (only if it looks like an extension: 2-4 chars, alphanumeric)
		// Also handle 'markdown' extension explicitly
		const lastDot = input.lastIndexOf('.');
		if (lastDot > 0) {
			const ext = input.substring(lastDot + 1).toLowerCase();
			if (/^[a-zA-Z0-9]{2,4}$/.test(ext) || ext === 'markdown') {
				input = input.substring(0, lastDot);
			}
		}

		// Index files get empty slug - they represent the folder itself
		if (input.toLowerCase() === 'index') {
			return '';
		}

		// Replace underscores with dashes before slugification (word separators)
		input = input.replace(/_/g, '-');

		// Transliterate Cyrillic characters
		const transliteratedInput = transliterate(input);

		// Use limax for all slugification - it handles Unicode well
		// and by default keeps letters/numbers together (separateNumbers: false)
		// Convert dots to underscores (preserves version number structure like v1.2.3 -> v1_2_3)
		let result = slug(transliteratedInput, {
			separateNumbers,
			custom: { '.': '_' }
		}) || 'untitled';

		// Clean up ugly sequences: _- or -_ become single dash
		result = result.replace(/[_-]{2,}/g, '-');

		// Strip leading/trailing underscores and dashes
		result = result.replace(/^[-_]+|[-_]+$/g, '');

		return result.trim() || 'untitled';
	} catch (error) {
		console.error('Error generating slug:', error);
		return 'untitled';
	}
}

/**
 * Simple slug generation (alternative for basic use cases)
 * @param text - Text to convert to slug
 * @returns URL-safe slug
 */
export function generateSlug(text: string): string {
	if (!text) return '';

	// Transliterate Cyrillic and Nordic characters
	const transliterated = transliterate(text);

	// Convert to lowercase, normalize accents, and replace non-alphanumeric with dashes
	return transliterated
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '') // Remove combining diacritical marks
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
}

/**
 * Build full slug path from parent slug and short slug
 * @param parentSlug - Parent folder slug (e.g., '/documents')
 * @param shortSlug - Short slug for this item (e.g., 'report', or '' for index files)
 * @returns Full slug path (e.g., '/documents/report', or '/documents/' for index files)
 */
export function buildFullSlug(parentSlug: string | null, shortSlug: string): string {
	// For index files (empty short slug), return parent path with trailing slash
	if (shortSlug === '') {
		if (!parentSlug || parentSlug === '/') {
			return '/';
		}
		return `${parentSlug}/`;
	}

	if (!parentSlug || parentSlug === '/') {
		return `/${shortSlug}`;
	}
	return `${parentSlug}/${shortSlug}`;
}
