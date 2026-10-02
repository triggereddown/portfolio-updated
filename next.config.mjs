/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ESLint is run separately; skip during `next build` to avoid
    // the FlatCompat parser-serialization error in Next.js 15.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
