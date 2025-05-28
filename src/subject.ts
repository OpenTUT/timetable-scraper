import type { DreamCampusSubject, Subject } from './schemas/index.js';

export function getSubject(
  dreamCampusSubject: DreamCampusSubject,
): Subject | null {
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
}
