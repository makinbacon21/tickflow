import TickGrid from '@/components/TickGrid'
import { GET } from '@/app/api/get_tickets/route'

export default async function Home() {
    const dynamicData = await GET()

    return (
        <TickGrid rows={Object.values(await dynamicData.json())} />
    )
}
