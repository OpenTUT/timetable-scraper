import { describe, expect, test } from 'vitest';
import { scraper } from '../src/scraper.js';
import { loadHTML } from './utils.js';
import test0Expected from './test0.expected.js';
import { getDreamCampusTimetable } from '../src/dreamCampus/index.js';

describe('getSubject', () => {
  test('getTimetable returns correct object', () => {
    loadHTML('./test0.html');
    expect(scraper(getDreamCampusTimetable())).toStrictEqual(test0Expected);
  });
});
