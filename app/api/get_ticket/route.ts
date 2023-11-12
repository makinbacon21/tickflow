import prisma from '../../../lib/db'

export async function GET(id: number) {

    const ticket = await prisma.ticket.findUnique({
        where: {
          id: id,
        },
      })

    return ticket
    
}
