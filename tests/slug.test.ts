import { slugify, transliterate } from '../src';

describe('slugify', () => {
  test('handles UUID-based filenames', () => {
    expect(slugify('A07A4E79-A268-4F59-9AB9-8A4CE7EDCCD9_1_105_c.png'))
      .toBe('a07a4e79-a268-4f59-9ab9-8a4ce7edccd9-1-105-c');
  });

  test('handles iPhone screenshot names', () => {
    expect(slugify('IMG_1234.jpg')).toBe('img-1234');
  });

  test('handles macOS screenshot names', () => {
    expect(slugify('Screenshot 2024-01-15 at 10.30.45.png'))
      .toBe('screenshot-2024-01-15-at-10_30_45');
  });

  test('handles regular document names', () => {
    expect(slugify('My Document.pdf')).toBe('my-document');
  });

  test('handles filenames with spaces', () => {
    expect(slugify('Project Report Final Version.docx'))
      .toBe('project-report-final-version');
  });

  test('handles filenames with special characters', () => {
    expect(slugify('report_v2.1-FINAL!.txt')).toBe('report-v2_1-final');
  });

  test('handles hash symbols by replacing with "sharp"', () => {
    expect(slugify('C# Tutorial.pdf')).toBe('csharp-tutorial');
  });

  test('handles Cyrillic text', () => {
    expect(slugify('тестовий файл.txt')).toBe('testovyi-fail');
  });

  test('handles Ukrainian text', () => {
    expect(slugify('Привіт світ.doc')).toBe('pryvit-svit');
  });

  test('handles emoji in filenames', () => {
    expect(slugify('📁 My Documents.zip')).toBe('my-documents');
  });

  test('handles empty input', () => {
    expect(slugify('')).toBe('');
  });

  test('handles filenames without extensions', () => {
    expect(slugify('README')).toBe('readme');
  });

  test('handles multiple dots in filename', () => {
    expect(slugify('archive.tar.gz')).toBe('archive_tar');
  });

  test('handles hidden files', () => {
    expect(slugify('.gitignore')).toBe('gitignore');
  });

  test('handles complex UUID patterns from iOS', () => {
    expect(slugify('7E4C9E6B-8F3D-4A2C-B1D5-9A8C7F6E5D4B_1_201_a.jpeg'))
      .toBe('7e4c9e6b-8f3d-4a2c-b1d5-9a8c7f6e5d4b-1-201-a');
  });

  test('keeps letters and numbers together', () => {
    expect(slugify('form-A4B2-submission.pdf')).toBe('form-a4b2-submission');
  });

  test('handles version numbers (dots become underscores)', () => {
    expect(slugify('app-v1.2.3-beta.zip')).toBe('app-v1_2_3-beta');
  });

  test('preserves version structure with underscores', () => {
    expect(slugify('v1.2.3')).toBe('v1_2_3');
    expect(slugify('release-2.0.0')).toBe('release-2_0_0');
  });

  test('handles underscores and hyphens', () => {
    expect(slugify('my_file-name_test.txt')).toBe('my-file-name-test');
  });

  test('handles numbers at start of filename', () => {
    expect(slugify('2024-annual-report.pdf')).toBe('2024-annual-report');
  });

  test('handles podcast episode codes', () => {
    expect(slugify('S2E6 Чому ми кажемо "так", коли всередині все кричить «ні»?'))
      .toBe('s2e6-chomu-my-kazhemo-tak-koly-vseredyni-vse-krychyt-ni');
  });

  test('handles S1E1 style episode codes', () => {
    expect(slugify('S1E1 Що таке саморефлексія?'))
      .toBe('s1e1-shcho-take-samorefleksiia');
  });

  test('handles HTML5 and similar acronyms', () => {
    expect(slugify('HTML5 Tutorial')).toBe('html5-tutorial');
    expect(slugify('MP3 Player')).toBe('mp3-player');
    expect(slugify('3D Printing Guide')).toBe('3d-printing-guide');
  });

  test('handles Nordic characters', () => {
    expect(slugify('Brøndby IF')).toBe('brondby-if');
    expect(slugify('Ærø')).toBe('aero');
    expect(slugify('Þórshöfn')).toBe('thorshofn');
    expect(slugify('Łódź')).toBe('lodz');
    expect(slugify('Fußball')).toBe('fussball');
    expect(slugify('cœur')).toBe('coeur');
    expect(slugify('Malmö FF')).toBe('malmo-ff');
  });

  test('index files return empty string', () => {
    expect(slugify('index.md')).toBe('');
    expect(slugify('index.markdown')).toBe('');
    expect(slugify('INDEX.md')).toBe('');
    expect(slugify('Index.MD')).toBe('');
  });

  test('index without extension returns empty string', () => {
    expect(slugify('index')).toBe('');
    expect(slugify('INDEX')).toBe('');
  });

  test('index-like names that are not index files work normally', () => {
    expect(slugify('index-page.md')).toBe('index-page');
    expect(slugify('my-index.md')).toBe('my-index');
    expect(slugify('indexer.ts')).toBe('indexer');
  });

  describe('separateNumbers option', () => {
    test('inserts dashes between letters and numbers', () => {
      expect(slugify('hello2world', { separateNumbers: true })).toBe('hello-2-world');
      expect(slugify('hello2world', { separateNumbers: false })).toBe('hello2world');
      expect(slugify('hello2world')).toBe('hello2world');
    });
  });

  describe('preserveExtension option', () => {
    test('keeps file extension when enabled', () => {
      expect(slugify('My Document.pdf', { preserveExtension: true })).toBe('my-document.pdf');
      expect(slugify('IMG_1234.jpg', { preserveExtension: true })).toBe('img-1234.jpg');
      expect(slugify('report_v2.1-FINAL!.txt', { preserveExtension: true })).toBe('report-v2_1-final.txt');
    });

    test('strips extension by default', () => {
      expect(slugify('My Document.pdf')).toBe('my-document');
      expect(slugify('My Document.pdf', { preserveExtension: false })).toBe('my-document');
    });

    test('handles files without extensions', () => {
      expect(slugify('README', { preserveExtension: true })).toBe('readme');
    });

    test('handles Cyrillic filenames with extension', () => {
      expect(slugify('Привіт світ.doc', { preserveExtension: true })).toBe('pryvit-svit.doc');
    });

    test('handles UUID filenames with extension', () => {
      expect(slugify('A07A4E79-A268-4F59-9AB9-8A4CE7EDCCD9_1_105_c.png', { preserveExtension: true }))
        .toBe('a07a4e79-a268-4f59-9ab9-8a4ce7edccd9-1-105-c.png');
    });

    test('index files still return empty string', () => {
      expect(slugify('index.md', { preserveExtension: true })).toBe('');
    });
  });
});

describe('transliterate', () => {
  test('handles Ukrainian text', () => {
    expect(transliterate('Привіт')).toBe('Pryvit');
  });

  test('handles Nordic characters', () => {
    expect(transliterate('ø')).toBe('o');
    expect(transliterate('æ')).toBe('ae');
    expect(transliterate('ð')).toBe('d');
    expect(transliterate('þ')).toBe('th');
    expect(transliterate('ł')).toBe('l');
    expect(transliterate('ß')).toBe('ss');
    expect(transliterate('œ')).toBe('oe');
  });

  test('handles empty input', () => {
    expect(transliterate('')).toBe('');
  });
});
