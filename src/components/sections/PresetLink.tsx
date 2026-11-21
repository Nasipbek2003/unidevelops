"use client";

import type { ReactNode } from "react";
import { useContactPreset } from "@/components/providers/AppProviders";
import type { WorkType } from "@/content";

/** Ссылка на форму, которая предвыбирает тип работы. */
export function PresetLink({
  type,
  className,
  children,
}: {
  type: WorkType;
  className?: string;
  children: ReactNode;
}) {
  const { presetWorkType } = useContactPreset();
  return (
    <a href="#contact" className={className} onClick={() => presetWorkType(type)}>
      {children}
    </a>
  );
}
