import type { ResultShareTheme, TypeCode } from "@/domain/types";

const orangeTheme: ResultShareTheme = {
  backgroundClassName:
    "bg-[linear-gradient(135deg,#fff4ea_0%,#ffe2c8_50%,#ffd3b0_100%)]",
  accentClassName: "bg-[#f28c38] text-white",
  surfaceClassName: "bg-white/75",
  borderClassName: "border-[#f6b987]/60",
  textClassName: "text-[#5c3312]",
  mutedTextClassName: "text-[#8a5a36]"
};

const greenTheme: ResultShareTheme = {
  backgroundClassName:
    "bg-[linear-gradient(135deg,#eefbf5_0%,#d8f4ea_50%,#c8ebdd_100%)]",
  accentClassName: "bg-[#3da97c] text-white",
  surfaceClassName: "bg-white/78",
  borderClassName: "border-[#8fd2b7]/60",
  textClassName: "text-[#164536]",
  mutedTextClassName: "text-[#3d6c5d]"
};

const blueTheme: ResultShareTheme = {
  backgroundClassName:
    "bg-[linear-gradient(135deg,#eef6ff_0%,#daeafd_50%,#c9e0fb_100%)]",
  accentClassName: "bg-[#4c86d9] text-white",
  surfaceClassName: "bg-white/78",
  borderClassName: "border-[#9fc0ef]/60",
  textClassName: "text-[#17355f]",
  mutedTextClassName: "text-[#44658f]"
};

const purpleTheme: ResultShareTheme = {
  backgroundClassName:
    "bg-[linear-gradient(135deg,#f5f0ff_0%,#eadfff_50%,#ddd0fb_100%)]",
  accentClassName: "bg-[#8560d4] text-white",
  surfaceClassName: "bg-white/78",
  borderClassName: "border-[#bca8ef]/60",
  textClassName: "text-[#3f2a70]",
  mutedTextClassName: "text-[#6b58a0]"
};

export const RESULT_SHARE_THEME_MAP: Record<TypeCode, ResultShareTheme> = {
  ALRD: orangeTheme,
  ALRC: orangeTheme,
  ALID: orangeTheme,
  ALIC: orangeTheme,
  ATRD: greenTheme,
  ATRC: greenTheme,
  ATID: greenTheme,
  ATIC: greenTheme,
  PLRD: blueTheme,
  PLRC: blueTheme,
  PLID: blueTheme,
  PLIC: blueTheme,
  PTRD: purpleTheme,
  PTRC: purpleTheme,
  PTID: purpleTheme,
  PTIC: purpleTheme
};

export function getResultShareTheme(code: TypeCode) {
  return RESULT_SHARE_THEME_MAP[code];
}
