import { describe, expect, test } from 'vitest';
import { getDreamCampusTimetable } from '../src/dreamCampus/index.js';
import { DreamCampusTimetable, getTimetable } from '../src/index.js';
import { loadHTML } from './loadHTML.js';
import test0Expected from './test0.expected.js';

describe('getSubject', () => {
  test('getTimetable returns correct object', () => {
    loadHTML('./test0.html');

    const dreamCampusTimetable = getDreamCampusTimetable();
    const dreamCampusTimetableParsed =
      DreamCampusTimetable.parse(dreamCampusTimetable);
    const timetable = getTimetable(dreamCampusTimetableParsed);

    expect(timetable).toStrictEqual(test0Expected);
  });
});
