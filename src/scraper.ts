import type { DreamCampusSubject } from './schemas/DreamCampusSubject.js';
import type { DreamCampusTimetable } from './schemas/DreamCampusTimetable.js';
import type { Subject } from './schemas/Subject.js';
import type { Timetable } from './schemas/Timetable.js';

export function scraper(
  dreamCampusTimetable: DreamCampusTimetable,
): Timetable | null {
  let year: string | null = null;

  const getFirstOrNull = <T>(arr: T[]) => (arr.length > 0 ? arr[0] : null);

  const getSubject = (
    dreamCampusSubject: DreamCampusSubject,
  ): Subject | null => {
    const subject = dreamCampusSubject.url;
    if (!subject) {
      return null;
    }

    // TODO: キャンセル済み科目を除外

    // 抽選中科目を置換, 当選科目以外を除外
    const duringLot = dreamCampusSubject.adjustName;
    if (duringLot === '抽選対象') {
      return {
        id: 'during_lot',
        url: '',
        name: '抽選中',
        required: null,
        term: null,
        units: null,
        staff: null,
      };
    }
    const lotResult = dreamCampusSubject.lotResultName;
    if (lotResult && lotResult !== '当選') {
      return null;
    }

    const id = dreamCampusSubject.lctCd;
    const url = new URL(subject);
    const name = dreamCampusSubject.sbjName;
    const required = dreamCampusSubject.sbjDivName;
    const term = dreamCampusSubject.termName;
    const units = dreamCampusSubject.credit;
    const staff = dreamCampusSubject.staffName;

    if (!year) {
      year = url.searchParams.get('lct_year');
    }

    if (!id || !name) {
      throw new Error('failed');
    }

    return {
      id,
      url: url.toString(),
      name,
      required,
      term,
      units,
      staff,
    };
  };

  try {
    const belong = dreamCampusTimetable.belong;

    const semester = dreamCampusTimetable.term === '1' ? 'spring' : 'fall';

    const normal = dreamCampusTimetable.lecture
      .slice(0, 6)
      .map((row) =>
        row
          .slice(0, 5)
          .map((col) => col.flatMap((elm) => getSubject(elm) ?? [])),
      );

    const firstHalf = normal.map((row) =>
      row.map((col) =>
        getFirstOrNull(
          col.filter((subject) => {
            switch (semester) {
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
              default:
                return true;
            }
          }),
        ),
      ),
    );

    const secondHalf = normal.map((row) =>
      row.map((col) =>
        getFirstOrNull(
          col.filter((subject) => {
            switch (semester) {
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
              default:
                return true;
            }
          }),
        ),
      ),
    );

    const intensive = dreamCampusTimetable.others.map((row) =>
      row.map((col) => {
        const elm = getFirstOrNull(col);
        return elm ? getSubject(elm) : null;
      }),
    );

    if (!year || !belong) {
      throw new Error('failed');
    }

    return {
      year,
      belong,
      semester,
      firstHalf,
      secondHalf,
      intensive,
    };
  } catch {
    return null;
  }
}
