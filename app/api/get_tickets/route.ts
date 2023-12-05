export const dynamic = 'force-dynamic'
import prisma from '../../../lib/db'

export async function GET() {
    const tickets = await prisma.ticket.findMany()

    return Response.json(tickets)
}
