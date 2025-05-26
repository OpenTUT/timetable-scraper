import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, test } from 'vitest';
import { getDreamCampusTimetable, scraper } from '../src/index.js';
import test0Expected from './test0.expected.js';

describe('getSubject', () => {
  test('getTimetable returns correct object', () => {
    loadHTML('./test0.html');
    expect(scraper(getDreamCampusTimetable())).toStrictEqual(test0Expected);
  });
});

function loadHTML(relativePath: string) {
  const html = readFileSync(join(import.meta.dirname, relativePath), 'utf-8');
  document.body.innerHTML = html;
}
