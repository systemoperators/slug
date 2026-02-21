import { generateShortSlug, generateSlug, buildFullSlug } from '../src';

describe('Slug Generation', () => {
  describe('generateShortSlug', () => {
    test('handles UUID-based filenames correctly', () => {
      const input = 'A07A4E79-A268-4F59-9AB9-8A4CE7EDCCD9_1_105_c.png';
      const expected = 'a07a4e79-a268-4f59-9ab9-8a4ce7edccd9-1-105-c';
      expect(generateShortSlug(input)).toBe(expected);
    });

    test('handles iPhone screenshot names', () => {
      const input = 'IMG_1234.jpg';
      const expected = 'img-1234';
      expect(generateShortSlug(input)).toBe(expected);
    });

    test('handles macOS screenshot names', () => {
      const input = 'Screenshot 2024-01-15 at 10.30.45.png';
      const expected = 'screenshot-2024-01-15-at-10_30_45';
      expect(generateShortSlug(input)).toBe(expected);
    });

    test('handles regular document names', () => {
      const input = 'My Document.pdf';
      const expected = 'my-document';
      expect(generateShortSlug(input)).toBe(expected);
    });

    test('handles filenames with spaces', () => {
      const input = 'Project Report Final Version.docx';
      const expected = 'project-report-final-version';
      expect(generateShortSlug(input)).toBe(expected);
    });

    test('handles filenames with special characters', () => {
      const input = 'report_v2.1-FINAL!.txt';
      const expected = 'report-v2_1-final';
      expect(generateShortSlug(input)).toBe(expected);
    });

    test('handles hash symbols by replacing with "sharp"', () => {
      const input = 'C# Tutorial.pdf';
      const expected = 'csharp-tutorial';
      expect(generateShortSlug(input)).toBe(expected);
    });

    test('handles Cyrillic text', () => {
      const input = 'тестовий файл.txt';
      const expected = 'testovyi-fail';
      expect(generateShortSlug(input)).toBe(expected);
    });

    test('handles Ukrainian text', () => {
      const input = 'Привіт світ.doc';
      const expected = 'pryvit-svit';
      expect(generateShortSlug(input)).toBe(expected);
    });

    test('handles emoji in filenames', () => {
      const input = '📁 My Documents.zip';
      const expected = 'my-documents';
      expect(generateShortSlug(input)).toBe(expected);
    });

    test('handles empty input', () => {
      expect(generateShortSlug('')).toBe('');
    });

    test('handles filenames without extensions', () => {
      const input = 'README';
      const expected = 'readme';
      expect(generateShortSlug(input)).toBe(expected);
    });

    test('handles multiple dots in filename', () => {
      const input = 'archive.tar.gz';
      const expected = 'archive_tar';
      expect(generateShortSlug(input)).toBe(expected);
    });

    test('handles hidden files', () => {
      const input = '.gitignore';
      const expected = 'gitignore';
      expect(generateShortSlug(input)).toBe(expected);
    });

    test('handles complex UUID patterns from iOS', () => {
      const input = '7E4C9E6B-8F3D-4A2C-B1D5-9A8C7F6E5D4B_1_201_a.jpeg';
      const expected = '7e4c9e6b-8f3d-4a2c-b1d5-9a8c7f6e5d4b-1-201-a';
      expect(generateShortSlug(input)).toBe(expected);
    });

    test('keeps letters and numbers together', () => {
      const input = 'form-A4B2-submission.pdf';
      const expected = 'form-a4b2-submission';
      expect(generateShortSlug(input)).toBe(expected);
    });

    test('handles version numbers correctly (dots become underscores)', () => {
      const input = 'app-v1.2.3-beta.zip';
      const expected = 'app-v1_2_3-beta';
      expect(generateShortSlug(input)).toBe(expected);
    });

    test('preserves version structure with underscores', () => {
      expect(generateShortSlug('v1.2.3')).toBe('v1_2_3');
      expect(generateShortSlug('release-2.0.0')).toBe('release-2_0_0');
    });

    test('handles underscores and hyphens', () => {
      const input = 'my_file-name_test.txt';
      const expected = 'my-file-name-test';
      expect(generateShortSlug(input)).toBe(expected);
    });

    test('handles numbers at start of filename', () => {
      const input = '2024-annual-report.pdf';
      const expected = '2024-annual-report';
      expect(generateShortSlug(input)).toBe(expected);
    });

    test('handles podcast episode codes', () => {
      const input = 'S2E6 Чому ми кажемо "так", коли всередині все кричить «ні»?';
      const expected = 's2e6-chomu-my-kazhemo-tak-koly-vseredyni-vse-krychyt-ni';
      expect(generateShortSlug(input)).toBe(expected);
    });

    test('handles S1E1 style episode codes', () => {
      const input = 'S1E1 Що таке саморефлексія?';
      const expected = 's1e1-shcho-take-samorefleksiia';
      expect(generateShortSlug(input)).toBe(expected);
    });

    test('handles HTML5 and similar acronyms', () => {
      expect(generateShortSlug('HTML5 Tutorial')).toBe('html5-tutorial');
      expect(generateShortSlug('MP3 Player')).toBe('mp3-player');
      expect(generateShortSlug('3D Printing Guide')).toBe('3d-printing-guide');
    });

    test('separateNumbers option inserts dashes between letters and numbers', () => {
      expect(generateShortSlug('hello2world', { separateNumbers: true })).toBe('hello-2-world');
      expect(generateShortSlug('hello2world', { separateNumbers: false })).toBe('hello2world');
      expect(generateShortSlug('hello2world')).toBe('hello2world'); // default is false
    });

    test('index files return empty string', () => {
      expect(generateShortSlug('index.md')).toBe('');
      expect(generateShortSlug('index.markdown')).toBe('');
      expect(generateShortSlug('INDEX.md')).toBe('');
      expect(generateShortSlug('Index.MD')).toBe('');
    });

    test('index without extension returns empty string', () => {
      expect(generateShortSlug('index')).toBe('');
      expect(generateShortSlug('INDEX')).toBe('');
    });

    test('index-like names that are not index files work normally', () => {
      expect(generateShortSlug('index-page.md')).toBe('index-page');
      expect(generateShortSlug('my-index.md')).toBe('my-index');
      expect(generateShortSlug('indexer.ts')).toBe('indexer');
    });
  });

  describe('generateSlug with Nordic characters', () => {
    test('handles Danish ø', () => {
      expect(generateSlug('Brøndby IF')).toBe('brondby-if');
    });

    test('handles Danish æ', () => {
      expect(generateSlug('Ærø')).toBe('aero');
    });

    test('handles Icelandic ð', () => {
      expect(generateSlug('Sigurður')).toBe('sigurdur');
    });

    test('handles Icelandic þ', () => {
      expect(generateSlug('Þórshöfn')).toBe('thorshofn');
    });

    test('handles Polish ł', () => {
      expect(generateSlug('Łódź')).toBe('lodz');
    });

    test('handles German ß', () => {
      expect(generateSlug('Fußball')).toBe('fussball');
    });

    test('handles French œ', () => {
      expect(generateSlug('cœur')).toBe('coeur');
    });

    test('handles Swedish ö (via NFD)', () => {
      expect(generateSlug('Malmö FF')).toBe('malmo-ff');
    });
  });

  describe('buildFullSlug', () => {
    test('builds slug with parent', () => {
      const parent = '/documents';
      const short = 'report';
      const expected = '/documents/report';
      expect(buildFullSlug(parent, short)).toBe(expected);
    });

    test('builds slug without parent', () => {
      const short = 'report';
      const expected = '/report';
      expect(buildFullSlug(null, short)).toBe(expected);
    });

    test('builds slug with root parent', () => {
      const parent = '/';
      const short = 'report';
      const expected = '/report';
      expect(buildFullSlug(parent, short)).toBe(expected);
    });

    test('builds nested slug', () => {
      const parent = '/projects/2024/january';
      const short = 'final-report';
      const expected = '/projects/2024/january/final-report';
      expect(buildFullSlug(parent, short)).toBe(expected);
    });

    test('handles empty short slug (index files) with parent', () => {
      expect(buildFullSlug('/documents', '')).toBe('/documents/');
      expect(buildFullSlug('/projects/2024', '')).toBe('/projects/2024/');
    });

    test('handles empty short slug (index files) at root', () => {
      expect(buildFullSlug(null, '')).toBe('/');
      expect(buildFullSlug('/', '')).toBe('/');
    });
  });
});
