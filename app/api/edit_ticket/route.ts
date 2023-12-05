export const dynamic = 'force-dynamic'
import prisma from '../../../lib/db'

export async function POST(request: Request) {
    const json = await request.json()
    await prisma.ticket.update({
        where: {
            id: json.id
        },
        data: json.body,
    }).catch(async (e) => {
        return Response.json({ message: "Edit failed" })
    })

    return Response.json({ message: "Edit succeeded" })
}
