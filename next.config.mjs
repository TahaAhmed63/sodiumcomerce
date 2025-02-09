/** @type {import('next').NextConfig} */
const nextConfig = {images: {
    domains: ['innovatechagency.tech'],
  },
  eslint: {
    // Disable ESLint during builds
    ignoreDuringBuilds: true,
    'import/no-unresolved': [2, { caseSensitive: true }],


  },
};

export default nextConfig;
