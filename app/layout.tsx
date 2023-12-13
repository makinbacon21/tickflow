import type { Metadata } from 'next'
import { Raleway } from 'next/font/google'
import SCCSNavBar from '@/components/SCCSNavBar'
import ThemeRegistry from '@/app/ThemeRegistry'
import { NextAuthProvider } from './NextAuthProvider';
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
        <NextAuthProvider>
        <html lang="en">
            <body className={raleway.className + " bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-primary via-dark-blue to-black-600"}>
                <ThemeRegistry options={{ key: 'mui' }}>
                    <main className='min-h-screen'>
                        <SCCSNavBar />
                        <div className="flex flex-col items-center justify-between xs:p-6 sm:p-12" >
                            {children}
                        </div>
                    </main>
                </ThemeRegistry>
            </body>
        </html>
        </NextAuthProvider>
    )
}
