export const dynamic = 'force-dynamic'

import TickGrid from '@/components/TickGrid'
import prisma from '../lib/db'
import { getServerSession } from "next-auth/next"
import { redirect } from 'next/navigation'

async function getData() {
	const data = await prisma.ticket.findMany()
    let out: any[] = []
    data.forEach((ticket) => {
        out.push({
            id: ticket.id,
            user_emails: ticket.user_emails.join(','),
            agent_emails: ticket.agent_emails.join(','),
            date_created: ticket.date_created,
            date_modified: ticket.date_modified,
            completed: ticket.completed,
            subject: ticket.subject
        })
    })
    return out
}

export default async function Home() {
    const session = await getServerSession()
    if(!session) {
        redirect("/create")
    } else {
        const dynamicData = await getData()

        return (
            <TickGrid rows={dynamicData} />
        )
    }
}
