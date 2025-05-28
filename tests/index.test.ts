import { describe, expect, test } from 'vitest';
import { getDreamCampusTimetable } from '../src/dreamCampus/index.js';
import { getTimetable } from '../src/index.js';
import { loadHTML } from './loadHTML.js';
import test0_expected from './test0.expected.js';

describe('getSubject', () => {
  test('getTimetable returns correct object', () => {
    loadHTML('./test0.html');

    const dreamCampusTimetable = getDreamCampusTimetable();
    const timetable = getTimetable(dreamCampusTimetable);

    expect(timetable).toStrictEqual(test0_expected);
  });
});
