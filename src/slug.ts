import limax from 'limax';
import { transliterate } from './transliterate';

export interface SlugOptions {
	/** Keep file extension in the slug, e.g. "report.pdf" instead of "report" (default: false) */
	preserveExtension?: boolean;
	/** Insert dashes between letters and numbers (default: false) */
	separateNumbers?: boolean;
}

/**
 * Generate URL-safe slug from text
 * Handles filenames, Cyrillic, emoji, UUIDs, version numbers, and Unicode
 *
 * @param text - Text to convert to slug
 * @param options - Optional settings
 * @returns URL-safe slug
 */
export function slugify(text: string, options: SlugOptions = {}): string {
	try {
		if (!text) return '';

		const { preserveExtension = false, separateNumbers = false } = options;

		// Special replacements
		let input = text.replace(/#/g, 'sharp');

		// Handle file extension
		let extension = '';
		const lastDot = input.lastIndexOf('.');
		if (lastDot > 0) {
			const ext = input.substring(lastDot + 1).toLowerCase();
			if (/^[a-zA-Z0-9]{2,4}$/.test(ext) || ext === 'markdown') {
				if (preserveExtension) {
					extension = `.${ext}`;
				}
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
		let result = limax(transliteratedInput, {
			separateNumbers,
			custom: { '.': '_' }
		}) || 'untitled';

		// Clean up ugly sequences: _- or -_ become single dash
		result = result.replace(/[_-]{2,}/g, '-');

		// Strip leading/trailing underscores and dashes
		result = result.replace(/^[-_]+|[-_]+$/g, '');

		result = result.trim() || 'untitled';

		return result + extension;
	} catch (error) {
		console.error('Error generating slug:', error);
		return 'untitled';
	}
}
