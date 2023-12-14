import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'TickFlow',
    short_name: 'TickFlow',
    description: 'The ticketing system for the Swarthmore College Computer Society',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#31425f',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/logo/icon.png',
        sizes: 'any',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/logo-maskable/icon.png',
        sizes: 'any',
        type: 'image/png',
        purpose: 'maskable'
      },
    ],
  }
}
