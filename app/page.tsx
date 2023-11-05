import TickGrid from '@/components/TickGrid'
import { GET } from '@/app/api/get_tickets/route'

export default async function Home() {
    const dynamicData = await GET()

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <TickGrid rows={Object.values(await dynamicData.json())} />
        </main>
    )
}
