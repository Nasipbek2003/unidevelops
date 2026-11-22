import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { LOGO_COLORS, LOGO_PATHS } from "@/components/brand/LogoMark";
import { og } from "@/content";

/** OG-картинка 1200x630 по design.md 4.15. Генерируется при сборке (статически). */
export const alt = og.alt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const NAVY = "#1B3650";
const NAVY_900 = "#0F2438";
const NAVY_950 = "#0A1A2B";
const PAPER = "#F4EEE2";
const SHEET = "#FBF8F0";
const ORANGE_300 = "#F9AE8F";
const ORANGE_500 = "#F0764F";
const ORANGE_700 = "#AF421D";
const MIST = "#A9B8C8";
const CODE_STR = "#9ED8B6";

const FONT_DIR = join(process.cwd(), "src/app/og/fonts");

type FontSpec = { name: string; file: string; weight: 400 | 500 | 700; style: "normal" | "italic" };
const FONT_FILES: FontSpec[] = [
  { name: "Cormorant", file: "Cormorant-Bold.ttf", weight: 700, style: "normal" },
  { name: "Cormorant", file: "Cormorant-BoldItalic.ttf", weight: 700, style: "italic" },
  { name: "JetBrains Mono", file: "JetBrainsMono-Regular.ttf", weight: 400, style: "normal" },
  { name: "JetBrains Mono", file: "JetBrainsMono-Medium.ttf", weight: 500, style: "normal" },
  { name: "JetBrains Mono", file: "JetBrainsMono-Bold.ttf", weight: 700, style: "normal" },
];

/** Шрифты читаются с диска; если файл не найден, он пропускается и Satori берёт запасной шрифт. */
async function loadFonts() {
  const loaded = await Promise.all(
    FONT_FILES.map(async ({ file, ...rest }) => {
      try {
        const buf = await readFile(join(FONT_DIR, file));
        const data = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
        return { ...rest, data };
      } catch {
        return null;
      }
    }),
  );
  return loaded.filter((f): f is NonNullable<typeof f> => f !== null);
}

const SERIF = "Cormorant, serif";
const MONO = "'JetBrains Mono', monospace";

function Logo() {
  const p = LOGO_PATHS;
  return (
    <svg width="64" height="48" viewBox="0 0 124 92" fill="none">
      <path d={p.u.d} stroke={NAVY} strokeWidth={p.u.width} />
      <path d={p.topArc.d} stroke={NAVY} strokeWidth={p.topArc.width} />
      <path d={p.outerArc.d} stroke={LOGO_COLORS.orange} strokeWidth={p.outerArc.width} />
      <path d={p.innerArc.d} stroke={LOGO_COLORS.orange} strokeWidth={p.innerArc.width} />
      <polygon points={p.arrowHead} fill={LOGO_COLORS.orange} />
      <path d={p.arrowTail.d} stroke={LOGO_COLORS.orange} strokeWidth={p.arrowTail.width} />
    </svg>
  );
}

const bar = (width: number, height: number, marginTop: number, background: string) => (
  <div style={{ display: "flex", width, height, marginTop, background }} />
);

export default async function Image() {
  const fonts = await loadFonts();

  return new ImageResponse(
    (
      <div style={{ position: "relative", display: "flex", width: 1200, height: 630, background: PAPER }}>
        {/* двойная рамка */}
        <div
          style={{ position: "absolute", display: "flex", left: 28, top: 28, right: 28, bottom: 28, border: `2px solid ${NAVY}` }}
        />
        <div
          style={{ position: "absolute", display: "flex", left: 36, top: 36, right: 36, bottom: 36, border: `1px solid ${NAVY}` }}
        />

        {/* логотип и wordmark */}
        <div style={{ position: "absolute", display: "flex", alignItems: "center", left: 80, top: 72, gap: 14 }}>
          <Logo />
          <div
            style={{
              display: "flex",
              fontFamily: SERIF,
              fontWeight: 700,
              fontSize: 36,
              letterSpacing: "0.06em",
              color: NAVY,
              textTransform: "uppercase",
            }}
          >
            UNIDEVELOPS
          </div>
        </div>

        {/* колонтитул */}
        <div
          style={{
            position: "absolute",
            display: "flex",
            left: 80,
            top: 168,
            alignItems: "center",
            fontFamily: MONO,
            fontWeight: 500,
            fontSize: 20,
            letterSpacing: "0.12em",
            color: NAVY,
            textTransform: "uppercase",
          }}
        >
          <div style={{ display: "flex", color: ORANGE_500, marginRight: 12 }}>/</div>
          <div style={{ display: "flex" }}>{og.kicker}</div>
        </div>

        {/* заголовок и красная черта */}
        <div style={{ position: "absolute", display: "flex", flexDirection: "column", left: 80, top: 216, width: 600 }}>
          <div
            style={{
              display: "flex",
              fontFamily: SERIF,
              fontWeight: 700,
              fontSize: 88,
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              color: NAVY,
            }}
          >
            {og.title}
          </div>
          <div
            style={{
              display: "flex",
              width: 140,
              height: 8,
              marginTop: 24,
              background: ORANGE_500,
              transform: "rotate(-1.5deg)",
            }}
          />
        </div>

        {/* подпись */}
        <div
          style={{
            position: "absolute",
            display: "flex",
            left: 80,
            top: 500,
            fontFamily: MONO,
            fontWeight: 500,
            fontSize: 26,
            color: NAVY,
          }}
        >
          {og.sub}
        </div>

        {/* лист */}
        <div
          style={{
            position: "absolute",
            display: "flex",
            left: 770,
            top: 64,
            width: 330,
            height: 467,
            background: SHEET,
            border: `2px solid ${NAVY}`,
            transform: "rotate(-3deg)",
            boxShadow: "0 18px 22px -20px rgba(15,36,56,0.55)",
          }}
        >
          <div
            style={{ position: "absolute", display: "flex", left: 12, top: 12, right: 12, bottom: 12, border: `1px solid ${NAVY}` }}
          />
          <div
            style={{
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              left: 36,
              top: 46,
              right: 36,
              bottom: 40,
            }}
          >
            {bar(150, 8, 0, "rgba(27,54,80,0.18)")}
            {bar(110, 8, 8, "rgba(27,54,80,0.18)")}
            {bar(130, 8, 8, "rgba(27,54,80,0.18)")}
            <div
              style={{
                display: "flex",
                fontFamily: SERIF,
                fontWeight: 700,
                fontStyle: "italic",
                fontSize: 34,
                color: NAVY,
                marginTop: 50,
              }}
            >
              {og.sheetType}
            </div>
            {bar(220, 12, 34, NAVY)}
            {bar(220, 12, 12, NAVY)}
            {bar(132, 12, 12, NAVY)}
            <div style={{ display: "flex", flex: 1 }} />
            <div style={{ display: "flex", width: "100%", alignItems: "flex-end" }}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M4 22 L15 34 L36 5" stroke={ORANGE_500} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div style={{ display: "flex", flex: 1, height: 1, marginLeft: 14, marginBottom: 6, background: NAVY }} />
            </div>
          </div>
        </div>

        {/* штамп */}
        <div
          style={{
            position: "absolute",
            display: "flex",
            left: 700,
            top: 360,
            padding: "8px 16px",
            background: SHEET,
            border: `3px solid ${ORANGE_700}`,
            color: ORANGE_700,
            fontFamily: MONO,
            fontWeight: 700,
            fontSize: 20,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            transform: "rotate(-9deg)",
          }}
        >
          {og.stamp}
        </div>

        {/* окно редактора */}
        <div
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            left: 860,
            top: 430,
            width: 300,
            height: 150,
            background: NAVY_900,
            borderRadius: 6,
            border: "1px solid rgba(244,238,226,0.16)",
            overflow: "hidden",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", height: 28, background: NAVY_950 }}>
            <div style={{ display: "flex", marginLeft: 12, gap: 6 }}>
              <div style={{ display: "flex", width: 8, height: 8, borderRadius: 4, background: ORANGE_500 }} />
              <div style={{ display: "flex", width: 8, height: 8, borderRadius: 4, background: ORANGE_300 }} />
              <div style={{ display: "flex", width: 8, height: 8, borderRadius: 4, background: MIST }} />
            </div>
            <div
              style={{
                display: "flex",
                marginLeft: 16,
                height: 28,
                alignItems: "center",
                paddingLeft: 12,
                paddingRight: 12,
                borderTop: `2px solid ${ORANGE_500}`,
                fontFamily: MONO,
                fontWeight: 500,
                fontSize: 13,
                color: PAPER,
              }}
            >
              Hero.tsx
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: 16,
              fontFamily: MONO,
              fontWeight: 400,
              fontSize: 16,
              color: PAPER,
              gap: 10,
            }}
          >
            <div style={{ display: "flex" }}>
              <div style={{ display: "flex", color: ORANGE_500, marginRight: 10 }}>$</div>
              <div style={{ display: "flex", color: ORANGE_300 }}>{og.code1}</div>
            </div>
            <div style={{ display: "flex" }}>
              <div style={{ display: "flex", color: ORANGE_500, marginRight: 10 }}>$</div>
              <div style={{ display: "flex", color: CODE_STR }}>{og.code2}</div>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
