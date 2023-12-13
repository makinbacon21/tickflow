export const dynamic = 'force-dynamic'
import prisma from '../../../lib/db'

export async function POST(request: Request) {
    const json = await request.json()
    
    const preexisting = await prisma.ticket.findMany({
        where: {
            subject: json['subject'],
            user_emails: {
                hasSome: json.user_emails,
            },
            completed: false,
        }
    })

    if (preexisting) {
        return Response.json({message: "Ticket already exists"})
    }
    
    let id = -1
    let date_created = new Date()
    let date_modified = new Date()
    const ticket = await prisma.ticket.create({
        data: {
          user_emails: json['user_emails'],
          agent_emails: json['agent_emails'] ? json['agent_emails'] : "",
          body: json['body'],
          date_created: date_created,
          date_modified: date_modified,
          subject: "SCCS Ticket #" + id + " Created"
        },
        select: {
            id: true
        },
      })
      return Response.json({message: "Success", id: ticket.id,
                  date_created: date_created, date_modified: date_modified})
}
