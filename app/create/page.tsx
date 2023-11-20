import { FormStack } from '@/components/FormStack'
import prisma from '@/lib/db'
import { Box, Button, Stack, TextField } from '@mui/material'
import { redirect } from 'next/navigation'

export default async function Create() {

    async function create(formData: FormData) {
        'use server'
        let user_emails = formData.get('user_emails')?.toString()
        let agent_emails = formData.get('agent_emails')?.toString()
        let body = formData.get('body')?.toString()

        await prisma.ticket.create({
            data: {
                user_emails: user_emails ? user_emails : "",
                agent_emails: agent_emails ? agent_emails : "",
                body: body ? body : "",
                date_created: new Date(),
                date_modified: new Date()
            },
        })

        redirect(`/`)
    }

    return (
        <Box sx={{
            width: '90%',
            height: 'auto',
            borderRadius: 1,
            bgcolor: 'primary.dark',
        }}>
            <form action={create}>
                <FormStack/>
            </form>
        </Box>
    )
}
