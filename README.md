# @systemoperator/slug

URL-safe slug generator with support for Cyrillic transliteration, emoji, filenames, version numbers, and Unicode.

## Install

```
npm install @systemoperator/slug
```

## Usage

```typescript
import { generateShortSlug, generateSlug, buildFullSlug, transliterate } from '@systemoperator/slug';

generateShortSlug('My Document.pdf')        // 'my-document'
generateShortSlug('S2E6 Episode Title')      // 's2e6-episode-title'
generateShortSlug('Привіт світ.doc')         // 'pryvit-svit'
generateShortSlug('IMG_1234.jpg')            // 'img-1234'
generateShortSlug('app-v1.2.3-beta.zip')     // 'app-v1_2_3-beta'
generateShortSlug('📁 My Documents.zip')     // 'my-documents'

generateSlug('Brøndby IF')                   // 'brondby-if'
generateSlug('Fußball')                      // 'fussball'

buildFullSlug('/documents', 'report')        // '/documents/report'
buildFullSlug(null, 'report')                // '/report'

transliterate('Привіт')                     // 'Pryvit'
```

## Features

- strips file extensions (.pdf, .jpg, .docx, etc.)
- Ukrainian Cyrillic transliteration (official standard)
- Nordic/European characters (ø, æ, ð, þ, ł, ß, œ)
- emoji removal
- UUID filename handling (iOS/macOS photo names)
- version number preservation (v1.2.3 -> v1_2_3)
- keeps letters and numbers together by default (S2E6, HTML5)
- index file detection (returns empty string)

## API

- `generateShortSlug(text: string, options?: SlugOptions): string` - main slug generator, handles filenames, Cyrillic, emoji, UUIDs
- `generateSlug(text: string): string` - simpler alternative for basic text
- `buildFullSlug(parentSlug: string | null, shortSlug: string): string` - compose slug paths
- `transliterate(text: string): string` - Ukrainian/Nordic/European character mapping
- `SlugOptions` - `{ separateNumbers?: boolean }` - insert dashes between letters and numbers

## License

MIT - [system operator](https://systemoperator.com)
