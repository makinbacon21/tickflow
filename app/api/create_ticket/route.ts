export const dynamic = 'force-dynamic'
import prisma from '../../../lib/db'

export async function POST(request: Request) {
    const json = await request.json()
    let id = -1
    let date_created = new Date()
    let date_modified = new Date()
    const ticket = await prisma.ticket.create({
        data: {
          user_emails: json['user_emails'],
          agent_emails: json['agent_emails'] ? json['agent_emails'] : "",
          body: json['body'],
          date_created: date_created,
          date_modified: date_modified
        },
        select: {
            id: true
        },
      })
      return Response.json({message: "Success", id: ticket.id,
                  date_created: date_created, date_modified: date_modified})
}
