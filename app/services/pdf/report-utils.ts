import {
  DEFAULT_DISPLAY_RULE,
  DisplayRule,
} from 'app/modules/academic/marklist/subject/subject';

export const parseNonRanked = (mark: number, displayRules: DisplayRule) => {
  // console.log({ mark });
  if (mark >= parseFloat(`${displayRules.A}`)) {
    return 'A';
  } else if (mark >= parseFloat(`${displayRules.B}`)) {
    return 'B';
  } else if (mark >= parseFloat(`${displayRules.C}`)) {
    return 'C';
  } else if (mark >= parseFloat(`${displayRules.D}`)) {
    return 'D';
  } else if (mark > 0) {
    return 'D';
  }
};

export const formatMark = (
  mark,
  displayMode,
  display_rules = DEFAULT_DISPLAY_RULE
) => {
  // console.log(subject, subjectRankMap[subject]);
  if (mark === undefined) {
    return '-';
  }

  return displayMode === 'number'
    ? mark.toFixed(1).replace(/\.0+$/, '')
    : parseNonRanked(mark, display_rules);
};

export const formatNursery = (mark) => {
  if (mark === undefined) {
    return '-';
  }

  if (mark >= 90) {
    return 'A';
  } else if (mark >= 80) {
    return 'B';
  } else if (mark >= 70) {
    return 'C';
  }

  return 'N';
};
