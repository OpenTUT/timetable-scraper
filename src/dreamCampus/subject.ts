import type { DreamCampusSubject } from '../schemas/index.js';
import { getTextOrNull } from './getTextOrNull.js';

export function getDreamCampusSubject(element: Element): DreamCampusSubject {
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
