import type { ReactNode } from "react";

const TOKEN =
  /(\/\/.*$)|("[^"]*")|\b(export|function|const|return|await|new)\b|([{}()[\];,.:<>=/])|([^{}()[\];,.:<>="/\s]+|\s+)/g;

/** Минимальная подсветка JS/TSX-строки для декоративных окон кода. */
export function highlight(line: string): ReactNode[] {
  const out: ReactNode[] = [];
  let m: RegExpExecArray | null;
  let i = 0;
  TOKEN.lastIndex = 0;
  while ((m = TOKEN.exec(line)) !== null) {
    const cls = m[1] ? "tk-c" : m[2] ? "tk-s" : m[3] ? "tk-k" : m[4] ? "tk-p" : "tk-n";
    out.push(
      <span key={i++} className={cls}>
        {m[0]}
      </span>,
    );
  }
  return out;
}
