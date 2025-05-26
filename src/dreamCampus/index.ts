import type { DreamCampusSubject } from './subject.js';
import type { DreamCampusTimetable } from './timetable.js';

export function getDreamCampusTimetable(): DreamCampusTimetable {
  return {
    belong: getTextOrNull(document.querySelector('#ctl00_bhHeader_lblBelong')),
    term:
      document.querySelector<HTMLSelectElement>('#ctl00_phContents_ddlTerm')
        ?.value ?? null,
    lecture: [...document.querySelectorAll('#tblLecture > tbody > tr')]
      .slice(2)
      .map((row) =>
        [...row.querySelectorAll(':scope > td')]
          .slice(1)
          .map((col) =>
            [
              ...col.querySelectorAll(':scope > div > div[id$="_divDetail"]'),
            ].flatMap((elm) => getDreamCampusSubject(elm) ?? []),
          ),
      ),
    others: [...document.querySelectorAll('#tblOhters > tbody > tr')].map(
      (row) =>
        [...row.querySelectorAll(':scope > td')]
          .slice(1)
          .map((col) =>
            [
              ...col.querySelectorAll(':scope > div > div[id$="_divDetail"]'),
            ].flatMap((elm) => getDreamCampusSubject(elm) ?? []),
          ),
    ),
  };
}

function getDreamCampusSubject(elm: Element): DreamCampusSubject {
  return {
    lctCd: getTextOrNull(elm.querySelector('span[id$="_lblLctCd"]')),
    reqName: getTextOrNull(elm.querySelector('span[id$="_lblReqName"]')),
    credit: getTextOrNull(elm.querySelector('span[id$="_lblCredit"]')),
    termName: getTextOrNull(elm.querySelector('span[id$="_lblTermName"]')),
    sbjDivName: getTextOrNull(elm.querySelector('span[id$="_lblSbjDivName"]')),
    sbjName: getTextOrNull(elm.querySelector('span[id$="_lblSbjName"]')),
    url:
      elm.querySelector<HTMLAnchorElement>('span[id$="_lblSbjName"] > a')
        ?.href ?? null,
    cancelName: getTextOrNull(elm.querySelector('span[id$="_lblCancelName"]')),
    staffName: getTextOrNull(elm.querySelector('span[id$="_lblStaffName"]')),
    adjustName: getTextOrNull(
      elm.querySelector('span[id$="_lblLotAdjustName"]'),
    ),
    lotResultName: getTextOrNull(
      elm.querySelector('span[id$="_lblLotResultName"]'),
    ),
  };
}

function getTextOrNull(element: Element | null) {
  const text = element?.textContent?.trim();
  return text ? text : null;
}
