export const DECISION_DATE = "April 30, 2026";
export const COHORT_CAP = 16;
export const PROGRAM_ADDRESS_LINE_1 = "2341 Michigan Ave";
export const PROGRAM_ADDRESS_LINE_2 = "Santa Monica, CA 90404";
export const PROGRAM_ADDRESS_FULL = `${PROGRAM_ADDRESS_LINE_1}, ${PROGRAM_ADDRESS_LINE_2}`;
export const FORMSPREE_FOUNDING_COHORT_ACTION = "https://formspree.io/f/mjgelnqn";
export const FORMSPREE_ENROLLMENT_FORM_ACTION =
  process.env.NEXT_PUBLIC_FORMSPREE_ENROLLMENT_FORM_ACTION ?? FORMSPREE_FOUNDING_COHORT_ACTION;

export const COHORT_A_DATES = "June 8-26";
export const COHORT_B_DATES = "July 6-24";
export const COHORT_DATES = `${COHORT_A_DATES} • ${COHORT_B_DATES}`;
export const APPLY_COHORT_OPTIONS = [
  { value: "june", label: "June 8–26" },
  { value: "july", label: COHORT_B_DATES },
  { value: "either", label: "Either" },
];

export const FOUNDING_COHORT_CTA_MICROCOPY_LINES = [
  "Two 3-week founding cohorts (June & July)",
  `Capped at ${COHORT_CAP} students per cohort`,
  "Enrollment is by invitation following review of the Founding Cohort Interest Form.",
];

export const FOUNDING_COHORT_NOTE_LINES = [
  "Two 3-week founding cohorts (June & July)",
  `Capped at ${COHORT_CAP} students per cohort`,
  "Every student builds, tests, and improves their own robot.",
];

export const WHO_ITS_FOR_LINES = [
  "Beginners who are ready for a serious introduction to robotics engineering.",
  "Students already in robotics who want stronger skills in CAD (3D design software), wiring, and programming.",
  "Students motivated by making, troubleshooting, and improving real robot systems.",
  "Students who want to become stronger contributors on robotics teams.",
];

export const NOT_A_FIT_LINES = [
  "Students looking for a casual, low-commitment summer camp format.",
  "Students not interested in building and troubleshooting real robot systems.",
  "Students seeking mainly game-based coding or Lego-style robotics activities.",
];

export const SESSION_REFUND_FAQ_ANSWER =
  "If Camp Asimov does not move forward with a session, all paid deposits will be fully refunded within 5 business days.";
