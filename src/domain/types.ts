export type AxisKey = "AP" | "LT" | "RI" | "DC";
export type TypeCode =
  | "ALRD"
  | "ALRC"
  | "ALID"
  | "ALIC"
  | "ATRD"
  | "ATRC"
  | "ATID"
  | "ATIC"
  | "PLRD"
  | "PLRC"
  | "PLID"
  | "PLIC"
  | "PTRD"
  | "PTRC"
  | "PTID"
  | "PTIC";

export type AxisLetter = "A" | "P" | "L" | "T" | "R" | "I" | "D" | "C";

export type AxisDefinition = {
  key: AxisKey;
  title: string;
  left: {
    code: AxisLetter;
    label: string;
    shortLabel: string;
    description: string;
  };
  right: {
    code: AxisLetter;
    label: string;
    shortLabel: string;
    description: string;
  };
};

export type QuestionOption = {
  value: 0 | 1;
  code: AxisLetter;
  label: string;
};

export type Question = {
  id: string;
  axis: AxisKey;
  prompt: string;
  helper: string;
  options: [QuestionOption, QuestionOption];
};

export type AnswerState = Record<string, 0 | 1 | undefined>;

export type AxisScore = {
  key: AxisKey;
  selectedCode: AxisLetter;
  leftCode: AxisLetter;
  rightCode: AxisLetter;
  leftScore?: number;
  rightScore?: number;
  title: string;
  selectedLabel: string;
  summary: string;
};

export type TypeProfile = {
  code: TypeCode;
  name: string;
  headline: string;
  description: string;
  strengths: [string, string, string];
  habits: [string, string, string];
  cautions: [string, string];
  shareText: string;
};

export type ResultSummary = {
  code: TypeCode;
  profile: TypeProfile;
  axisResults: AxisScore[];
  shareUrl: string;
  mode: "answers" | "shared";
};

export type ResultShareTheme = {
  backgroundClassName: string;
  accentClassName: string;
  surfaceClassName: string;
  borderClassName: string;
  textClassName: string;
  mutedTextClassName: string;
};
