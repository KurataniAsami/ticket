import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.jp',
      },
      // vrtbyludcvlofrmipmbx.supabase.coはsupabaseのプロジェクトid
      {
        protocol: 'https',
        hostname: 'vrtbyludcvlofrmipmbx.supabase.co',
      },
       {
        protocol: 'https',
        hostname: 'i.scdn.co',
      },
    ],
  },
};

export default nextConfig;
