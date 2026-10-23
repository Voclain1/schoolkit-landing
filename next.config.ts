import type { NextConfig } from "next";

// The self-hosted image (Dockerfile) builds with NEXT_OUTPUT=standalone: a
// minimal server it can run on the School Kit VPS. Unset on Vercel, so its
// builds are unchanged.
const nextConfig: NextConfig =
  process.env.NEXT_OUTPUT === "standalone" ? { output: "standalone" } : {};

export default nextConfig;
