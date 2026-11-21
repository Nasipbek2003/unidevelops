import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev с телефона по локальной сети (http://192.168.x.x:3000): иначе Next 16 отдаёт 403 на dev-ресурсы.
  allowedDevOrigins: ["192.168.*.*", "192.168.0.107"],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
