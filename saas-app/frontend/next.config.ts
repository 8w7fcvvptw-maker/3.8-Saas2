import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // @saas/shared — отдельная сборка tsc (dist/). transpilePackages для «пустого» типо-пакета
  // давал runtime TypeError: Cannot read properties of undefined (reading 'call') в webpack.
};

export default nextConfig;
