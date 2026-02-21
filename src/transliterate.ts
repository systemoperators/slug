/**
 * Character transliteration
 * - Ukrainian: based on official standard http://zakon1.rada.gov.ua/cgi-bin/laws/main.cgi?nreg=55-2010-%EF
 * - Nordic/European: ø, æ, ð, þ, ł, ß, œ and variants
 */

const mapping: Record<string, string> = {
	// Nordic/European characters (don't decompose with NFD)
	ø: 'o',
	Ø: 'O',
	æ: 'ae',
	Æ: 'Ae',
	ð: 'd',
	Ð: 'D',
	þ: 'th',
	Þ: 'Th',
	ł: 'l',
	Ł: 'L',
	ß: 'ss',
	œ: 'oe',
	Œ: 'Oe',
	// Ukrainian Cyrillic
	А: 'A',
	а: 'a',
	Б: 'B',
	б: 'b',
	В: 'V',
	в: 'v',
	Г: 'H',
	г: 'h',
	Ґ: 'G',
	ґ: 'g',
	Д: 'D',
	д: 'd',
	Е: 'E',
	е: 'e',
	Є: 'Ye',
	є: 'ie',
	Ж: 'Zh',
	ж: 'zh',
	З: 'Z',
	з: 'z',
	И: 'Y',
	и: 'y',
	І: 'I',
	і: 'i',
	Ї: 'Yi',
	ї: 'i',
	Й: 'Y',
	й: 'i',
	К: 'K',
	к: 'k',
	Л: 'L',
	л: 'l',
	М: 'M',
	м: 'm',
	Н: 'N',
	н: 'n',
	О: 'O',
	о: 'o',
	П: 'P',
	п: 'p',
	Р: 'R',
	р: 'r',
	С: 'S',
	с: 's',
	Т: 'T',
	т: 't',
	У: 'U',
	у: 'u',
	Ф: 'F',
	ф: 'f',
	Х: 'Kh',
	х: 'kh',
	Ц: 'Ts',
	ц: 'ts',
	Ч: 'Ch',
	ч: 'ch',
	Ш: 'Sh',
	ш: 'sh',
	Щ: 'Shch',
	щ: 'shch',
	Ю: 'Yu',
	ю: 'iu',
	Я: 'Ya',
	я: 'ia',
	ь: '',
	"'": '',
};

export function transliterate(word: string): string {
	if (!word) return '';

	let transliterated = '';

	// Apply зг-zgh rule
	word = word.replace(/Зг/g, 'Zgh');
	word = word.replace(/зг/g, 'zgh');

	for (let i = 0; i < word.length; i++) {
		const character = word[i];
		const latinCharacter = mapping[character];

		if (latinCharacter !== undefined) {
			transliterated += latinCharacter;
		} else {
			transliterated += character;
		}
	}

	return transliterated;
}
