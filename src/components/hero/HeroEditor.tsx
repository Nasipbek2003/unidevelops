import { hero } from "@/content";
import { highlight } from "@/lib/highlight";

/** Окно редактора: Hero.tsx и терминал с code.hero. Декор, aria-hidden задаёт родитель. */
export function HeroEditor() {
  return (
    <div className="editor">
      <div className="editor-in">
        <div className="editor-tabs">
          <span className="editor-tab">{hero.editorFile}</span>
          <span className="editor-dots">
            <i className="bg-orange-500" />
            <i className="bg-orange-300" />
            <i className="bg-mist" />
          </span>
        </div>
        <div className="editor-body">
          {hero.editorCode.map((line, i) => (
            <div key={line} className="code-line">
              <span className="code-ln">{i + 1}</span>
              <span>{highlight(line)}</span>
            </div>
          ))}
        </div>
        <div className="editor-term">
          {hero.terminal.map((line) => (
            <div key={line} className="code-line">
              <span>{highlight(line)}</span>
            </div>
          ))}
          <div className="code-line">
            <i className="caret caret-code" />
          </div>
        </div>
      </div>
    </div>
  );
}
