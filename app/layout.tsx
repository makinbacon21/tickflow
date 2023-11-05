import type { Metadata } from 'next'
import { Raleway } from 'next/font/google'
import SCCSNavBar from '@/components/SCCSNavBar'
import ThemeRegistry from './ThemeRegistry';
import './globals.css'

const raleway = Raleway({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Tickflow',
    description: 'SCCS Ticket Manager Service',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={raleway.className}>
                <ThemeRegistry options={{ key: 'mui' }}>
                    <SCCSNavBar />
                    {children}
                </ThemeRegistry>
            </body>
        </html>
    )
}
