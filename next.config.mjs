/** @type {import('next').NextConfig} */
const nextConfig = {
  // Aquí podemos añadir configuración en el futuro.
  // Por ejemplo, para permitir imágenes de Google:
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
};

export default nextConfig;
