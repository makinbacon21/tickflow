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
            <form noValidate action={create}>
                <Stack className='p-12' spacing={2}>
                    <TextField
                        required
                        id="user_emails"
                        type="text"
                        name="user_emails"
                        label="Required"
                        defaultValue="User Emails (comma-separated)"
                    />
                    <TextField
                        id="agent_emails"
                        type="text"
                        name="agent_emails"
                        label="Optional"
                        defaultValue="Requested Agents (comma-separated)"
                    />
                    <TextField
                        required
                        type="text"
                        id="body"
                        name="body"
                        label="Required"
                        defaultValue="Body"
                        multiline
                        maxRows={4}
                    />
                    <Button
                        type="submit"
                        key='enter'
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        Continue
                    </Button>
                </Stack>
            </form>
        </Box>
    )
}
