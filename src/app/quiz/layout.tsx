import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "질문 진행 | 개미타입",
  robots: {
    index: false,
    follow: false
  }
};

export default function QuizLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
