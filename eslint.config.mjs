import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // useReducedMotion даёт расхождение разметки при гидратации (React #418).
      // Reduced-motion обрабатывается через CSS и <MotionConfig reducedMotion="user">.
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "motion/react",
              importNames: ["useReducedMotion"],
              message:
                "Не используйте useReducedMotion: ветвление разметки по нему ломает гидратацию. Применяйте CSS prefers-reduced-motion.",
            },
            {
              name: "motion/react-client",
              importNames: ["useReducedMotion"],
              message: "Не используйте useReducedMotion, см. motion/react.",
            },
          ],
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Клиент Prisma, генерируется `prisma generate`.
    "src/generated/**",
  ]),
]);

export default eslintConfig;
