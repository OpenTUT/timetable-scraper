import type {
  DreamCampusTimetable,
  Subject,
  Timetable,
} from './schemas/index.js';
import { getSubject } from './subject.js';

export function getTimetable(
  dreamCampusTimetable: DreamCampusTimetable,
): Timetable | null {
  try {
    const belong = dreamCampusTimetable.belong;
    const year = getFirstOrNull(
      dreamCampusTimetable.lecture
        .flat(3)
        .flatMap((subject) =>
          subject.url == null
            ? []
            : (new URL(subject.url).searchParams.get('lct_year') ?? []),
        ),
    );
    const term = dreamCampusTimetable.term;

    if (belong == null || year == null || term == null) {
      throw new Error('failed');
    }

    const normal = dreamCampusTimetable.lecture
      .slice(0, 6)
      .map((row) =>
        row
          .slice(0, 5)
          .map((col) => col.flatMap((subject) => getSubject(subject) ?? [])),
      );

    const firstHalf = normal.map((row) =>
      row.map((col) =>
        getFirstOrNull(
          sortEnrolled(
            col.filter((subject) => {
              switch (term) {
                case 'spring':
                  return (
                    !subject.term?.includes('前期２') &&
                    !subject.term?.includes('前２')
                  );
                case 'fall':
                  return (
                    !subject.term?.includes('後期２') &&
                    !subject.term?.includes('後２')
                  );
              }
            }),
          ),
        ),
      ),
    );

    const secondHalf = normal.map((row) =>
      row.map((col) =>
        getFirstOrNull(
          sortEnrolled(
            col.filter((subject) => {
              switch (term) {
                case 'spring':
                  return (
                    !subject.term?.includes('前期１') &&
                    !subject.term?.includes('前１')
                  );
                case 'fall':
                  return (
                    !subject.term?.includes('後期１') &&
                    !subject.term?.includes('後１')
                  );
              }
            }),
          ),
        ),
      ),
    );

    const intensive = dreamCampusTimetable.others.map((row) =>
      row.map((col) => {
        const subjects = col.flatMap((subject) => getSubject(subject) ?? []);
        const subject = getFirstOrNull(sortEnrolled(subjects));
        return subject ? subject : null;
      }),
    );

    return {
      belong,
      year,
      term,
      firstHalf,
      secondHalf,
      intensive,
    };
  } catch {
    return null;
  }
}

function getFirstOrNull<T>(arr: T[]): T | null {
  return arr.length > 0 ? arr[0] : null;
}

function sortEnrolled(arr: Subject[]): Subject[] {
  return [...arr].sort((subject) => (subject.status === 'enrolled' ? -1 : 0));
}
