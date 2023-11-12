import { GET } from '@/app/api/get_ticket/route'
import { Box } from '@mui/material'
import { redirect } from 'next/navigation'

export default async function Ticket({ params }: {params: { id: string} }) {

    const id_num = Number(params.id)
    if (!id_num) {
        // TODO Use built in next js 404
        return (
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <h1>404 - Page Not Found</h1>
            </main>
        )
    }

    const ticket = await GET(id_num)

    if (!ticket) {
        // TODO Use built in next js 404

        return (
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <h1>404 - Page Not Found</h1>
            </main>
        )
    }

    // Probably want an edit button somewhere below
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Box sx={{
                width: '90%',
                height: 'auto',
                borderRadius: 1,
                bgcolor: 'primary.dark',
            }}>
               <div>ID: {ticket.id} </div>
               <div>User Emails: {ticket.user_emails}</div>
               <div>Agent Emails: {ticket.agent_emails}</div>
               <div>Body: {ticket.body}</div>
               <div>Date Created: {ticket.date_created.toDateString()}</div>
               <div>Date Modified: {ticket.date_modified.toDateString()}</div>
            </Box>
        </main>
    )
}
