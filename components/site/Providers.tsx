"use client";

import { MotionConfig } from "motion/react";

/** 使用者系統設定「減少動態效果」時，停用位移與縮放動畫。 */
export default function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
