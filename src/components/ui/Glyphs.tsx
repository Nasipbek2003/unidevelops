/** Собственные служебные глифы (без сторонних иконок). */

export function ArrowGlyph({ className }: { className?: string }) {
  return (
    <svg
      className={`btn-arrow ${className ?? ""}`}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="square"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M1.5 8h12M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}

/** Метка приводки «+». */
export function RegMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="15"
      height="15"
      viewBox="0 0 15 15"
      stroke="#1B3650"
      strokeWidth="1"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M7.5 0v15M0 7.5h15" />
    </svg>
  );
}

/** Речевой пузырь с тремя строками. */
export function ChatGlyph({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      stroke="#0F2438"
      strokeWidth="2"
      strokeLinecap="square"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M3 3h20v15H11l-5 5v-5H3z" />
      <path d="M8 8h10M8 13h7" />
    </svg>
  );
}
