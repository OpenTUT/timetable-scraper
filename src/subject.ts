import type { DreamCampusSubject, Subject } from './schemas/index.js';

export function getSubject(
  dreamCampusSubject: DreamCampusSubject,
): Subject | null {
  const id = dreamCampusSubject.lctCd;
  const name = dreamCampusSubject.sbjName;
  const url = dreamCampusSubject.url;

  if (id == null || name == null || url == null) {
    return null;
  }

  const status =
    dreamCampusSubject.adjustName === '抽選対象'
      ? 'lot_pending'
      : dreamCampusSubject.lotResultName &&
          dreamCampusSubject.lotResultName !== '当選'
        ? 'lot_rejected'
        : dreamCampusSubject.cancelName === '【履修取消】'
          ? 'canceled'
          : 'enrolled';

  const required = dreamCampusSubject.sbjDivName;
  const term = dreamCampusSubject.termName;
  const units = dreamCampusSubject.credit;
  const staff = dreamCampusSubject.staffName;

  return {
    id,
    name,
    url,
    status,
    required,
    term,
    units,
    staff,
    area: null,
    faculty: null,
    grade: null,
    room: null,
  };
}
