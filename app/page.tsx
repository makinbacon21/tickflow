import TickGrid from '@/components/TickGrid'
import Image from 'next/image'

export default async function Home() {
    const dynamicData = await fetch(`http://localhost:3000/api/get_tickets`, { cache: 'no-store', method: 'GET' })

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <TickGrid rows={Object.values(await dynamicData.json())} />
        </main>
    )
}
