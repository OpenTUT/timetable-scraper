import type { DreamCampusSubject } from './schemas/dreamCampusSubject.js';

export function getDreamCampusTimetable(): unknown {
  try {
    return {
      belong: getTextOrNull(
        document.querySelector('#ctl00_bhHeader_lblBelong'),
      ),
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
              ].flatMap((element) => getDreamCampusSubject(element) ?? []),
            ),
        ),
      others: [...document.querySelectorAll('#tblOhters > tbody > tr')].map(
        (row) =>
          [...row.querySelectorAll(':scope > td')]
            .slice(1)
            .map((col) =>
              [
                ...col.querySelectorAll(':scope > div > div[id$="_divDetail"]'),
              ].flatMap((element) => getDreamCampusSubject(element) ?? []),
            ),
      ),
    };
  } catch {
    return null;
  }
}

function getDreamCampusSubject(element: Element): DreamCampusSubject {
  return {
    lctCd: getTextOrNull(element.querySelector('span[id$="_lblLctCd"]')),
    reqName: getTextOrNull(element.querySelector('span[id$="_lblReqName"]')),
    credit: getTextOrNull(element.querySelector('span[id$="_lblCredit"]')),
    termName: getTextOrNull(element.querySelector('span[id$="_lblTermName"]')),
    sbjDivName: getTextOrNull(
      element.querySelector('span[id$="_lblSbjDivName"]'),
    ),
    sbjName: getTextOrNull(element.querySelector('span[id$="_lblSbjName"]')),
    url:
      element.querySelector<HTMLAnchorElement>('span[id$="_lblSbjName"] > a')
        ?.href ?? null,
    cancelName: getTextOrNull(
      element.querySelector('span[id$="_lblCancelName"]'),
    ),
    staffName: getTextOrNull(
      element.querySelector('span[id$="_lblStaffName"]'),
    ),
    adjustName: getTextOrNull(
      element.querySelector('span[id$="_lblLotAdjustName"]'),
    ),
    lotResultName: getTextOrNull(
      element.querySelector('span[id$="_lblLotResultName"]'),
    ),
  };
}

function getTextOrNull(element: Element | null) {
  const text = element?.textContent?.trim();
  return text ? text : null;
}
