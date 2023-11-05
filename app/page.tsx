import TickGrid from '@/components/TickGrid'
import { GET } from '@/app/api/get_tickets/route'
import { Button } from '@mui/material'
import Link from 'next/link'

export default async function Home() {
    const dynamicData = await GET()

    return (
        <main className="min-h-screen flex-col items-center justify-between p-24">
            <Link href="/create">
                <Button
                    key="create"
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    Create Ticket
                </Button>
            </Link>
            <TickGrid rows={Object.values(await dynamicData.json())} />
        </main>
    )
}
