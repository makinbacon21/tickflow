export const dynamic = 'force-dynamic'
import prisma from '../../../lib/db'

export async function POST(request: Request) {
    const json = await request.json()
    let date_modified = new Date()

    console.log(json['subject'])
    
    const preexisting = await prisma.ticket.findMany({
        where: {
            subject: json['subject'],
            user_emails: {
                hasSome: json.user_emails,
            },
            completed: false,
        }
    })

    console.log(preexisting)

    if (preexisting && preexisting.length > 0) {
        console.log("exists")
        console.log(preexisting)
        const ticket = await prisma.ticket.update({
            where: {
                id: preexisting[0].id
            },
            data: {
                body: (json['body'] + "\n\n============================================\
                    \n\n" + preexisting[0].body),
                date_modified: date_modified
            },
            select: {
                id: true,
                date_created: true
            }
        }).catch(async (e: any) => {
            console.log("edit failed")
        })

        console.log("updated")


        if(ticket) {
            return Response.json(
                {
                    message: "Success",
                    id: ticket.id.toString(),
                    date_created: ticket.date_created.toString(),
                    date_modified: date_modified.toString()
                }
            )
        }
        else {
            return Response.json(
                {
                    message: "Failure"
                }
            )
        }

    } else {
        let id = -1
        let date_created = new Date()
        const ticket = await prisma.ticket.create({
            data: {
              user_emails: json['user_emails'],
              agent_emails: json['agent_emails'] ? json['agent_emails'] : [],
              body: json['body'],
              date_created: date_created,
              date_modified: date_modified,
              subject: json['subject']
            },
            select: {
                id: true
            },
        })
    
        return Response.json(
            {
                message: "Success",
                id: ticket.id.toString(),
                date_created: date_created.toString(),
                date_modified: date_modified.toString()
            }
        )
    }

}
