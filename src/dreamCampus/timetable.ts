import type { DreamCampusTimetable } from '../schemas/index.js';
import { getTextOrNull } from './getTextOrNull.js';
import { getDreamCampusSubject } from './subject.js';

export function getDreamCampusTimetable(): DreamCampusTimetable {
  const lang = document.querySelector<HTMLInputElement>(
    '#ctl00_bhHeader_slLanguage_imgBtnJpn',
  )?.disabled
    ? 'ja'
    : document.querySelector<HTMLInputElement>(
          '#ctl00_bhHeader_slLanguage_imgBtnEng',
        )?.disabled
      ? 'en'
      : null;

  const belong = getTextOrNull(
    document.querySelector('#ctl00_bhHeader_lblBelong'),
  );

  const term =
    document.querySelector<HTMLSelectElement>('#ctl00_phContents_ddlTerm')
      ?.value === '1'
      ? 'spring'
      : document.querySelector<HTMLSelectElement>('#ctl00_phContents_ddlTerm')
            ?.value === '2'
        ? 'fall'
        : null;

  const lecture = [...document.querySelectorAll('#tblLecture > tbody > tr')]
    .slice(2)
    .map((row) =>
      [...row.querySelectorAll(':scope > td')]
        .slice(1)
        .map((col) =>
          [
            ...col.querySelectorAll(':scope > div > div[id$="_divDetail"]'),
          ].flatMap((element) => getDreamCampusSubject(element) ?? []),
        ),
    );

  const others = [...document.querySelectorAll('#tblOhters > tbody > tr')].map(
    (row) =>
      [...row.querySelectorAll(':scope > td')]
        .slice(1)
        .map((col) =>
          [
            ...col.querySelectorAll(':scope > div > div[id$="_divDetail"]'),
          ].flatMap((element) => getDreamCampusSubject(element) ?? []),
        ),
  );

  return {
    lang,
    belong,
    term,
    lecture,
    others,
  };
}
