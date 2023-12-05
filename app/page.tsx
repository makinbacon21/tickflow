export const dynamic = 'force-dynamic'

import TickGrid from '@/components/TickGrid'
import prisma from '../lib/db'

async function getData() {
	return await prisma.ticket.findMany()
}

export default async function Home() {
	const dynamicData = await getData()
    return (
        <TickGrid rows={Object.values(dynamicData)} />
    )
}
