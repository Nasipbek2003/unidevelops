"use client";

import { MotionConfig } from "motion/react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { WorkType } from "@/content";

interface ContactState {
  /** Тип работы, предвыбранный кликом по услуге */
  presetType: { value: WorkType; nonce: number } | null;
  presetWorkType: (value: WorkType) => void;
}

const ContactContext = createContext<ContactState>({
  presetType: null,
  presetWorkType: () => {},
});

export function useContactPreset() {
  return useContext(ContactContext);
}

export function AppProviders({ children }: { children: ReactNode }) {
  const [presetType, setPresetType] = useState<ContactState["presetType"]>(null);

  const presetWorkType = useCallback((value: WorkType) => {
    setPresetType((prev) => ({ value, nonce: (prev?.nonce ?? 0) + 1 }));
  }, []);

  const ctx = useMemo(() => ({ presetType, presetWorkType }), [presetType, presetWorkType]);

  return (
    <MotionConfig reducedMotion="user">
      <ContactContext.Provider value={ctx}>{children}</ContactContext.Provider>
    </MotionConfig>
  );
}
