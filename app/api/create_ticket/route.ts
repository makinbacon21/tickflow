import prisma from '../../../lib/db'

export async function POST(request: Request) {
    const json = await request.json()
    await prisma.ticket.create({
        data: {
          user_emails: json['user_emails'],
          agent_emails: json['agent_emails'] ? json['agent_emails'] : "",
          body: json['body'],
          date_created: new Date(),
          date_modified: new Date()
        },
      }).catch(async (e) => {
        return Response.json({message: "Failure"})
      })

      return Response.json({message: "Success"})
}
