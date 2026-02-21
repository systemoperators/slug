# @systemoperator/slug

URL-safe slug generator with support for Cyrillic transliteration, emoji, filenames, version numbers, and Unicode.

## Install

```
npm install @systemoperator/slug
```

## Usage

```typescript
import { slugify, transliterate } from '@systemoperator/slug';

slugify('My Document.pdf')        // 'my-document'
slugify('S2E6 Episode Title')     // 's2e6-episode-title'
slugify('Привіт світ.doc')        // 'pryvit-svit'
slugify('IMG_1234.jpg')           // 'img-1234'
slugify('Brøndby IF')             // 'brondby-if'
slugify('📁 My Documents.zip')    // 'my-documents'

// preserve file extension
slugify('report.pdf', { preserveExtension: true })  // 'report.pdf'

// separate numbers from letters
slugify('hello2world', { separateNumbers: true })    // 'hello-2-world'

transliterate('Привіт')           // 'Pryvit'
```

## Features

- strips file extensions by default (optional preserveExtension)
- Ukrainian Cyrillic transliteration (official standard)
- Nordic/European characters (ø, æ, ð, þ, ł, ß, œ)
- emoji removal
- UUID filename handling (iOS/macOS photo names)
- version number preservation (v1.2.3 -> v1_2_3)
- keeps letters and numbers together by default (S2E6, HTML5)
- index file detection (returns empty string)

## API

- `slugify(text: string, options?: SlugOptions): string` - generate URL-safe slug from text or filename
- `transliterate(text: string): string` - Ukrainian/Nordic/European character mapping
- `SlugOptions` - `{ preserveExtension?: boolean, separateNumbers?: boolean }`

## License

MIT - [system operator](https://systemoperator.com)
