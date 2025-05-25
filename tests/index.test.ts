import { expect, test, describe } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { scraper } from '../src/browser/scraper';

describe('getSubject', () => {
  test('getTimetable returns correct object', () => {
    const html = readFileSync(
      path.join(import.meta.dirname, './test0.html'),
      'utf-8',
    );
    document.body.innerHTML = html;

    const timetable = scraper();
    expect(timetable).toEqual(
      expect.objectContaining({
        year: expect.any(String),
        belong: expect.any(String),
        semester: expect.any(String),
        firstHalf: expect.any(Array),
        secondHalf: expect.any(Array),
        intensive: expect.any(Array),
      }),
    );
  });
});
