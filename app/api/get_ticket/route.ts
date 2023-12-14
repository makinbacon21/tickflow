export const dynamic = 'force-dynamic'
import prisma from '../../../lib/db'

export async function GET(request: Request) {
	const json = await request.json()
	const ticket = await prisma.ticket.findUnique({
		where: json
	}).catch(async (e: any) => {
		return Response.json({ message: "Could not retrieve ticket" })
	})
    return Response.json(ticket)
}
