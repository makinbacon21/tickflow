'use client'

import { Button, Stack, TextField } from '@mui/material'
import { useState } from 'react';
import { useFormStatus } from 'react-dom'

export function FormStack() {
    const [userValue, setUserValue] = useState("");
    const [agentValue, setAgentValue] = useState("");
    const [onSubmit, setOnSubmit] = useState(false);

    return (
        <Stack className='p-12' spacing={2}>
        <TextField
            required
            error={!userValue && onSubmit}
            value={userValue}
            onChange={(e) => setUserValue(e.target.value)}
            id="user_emails"
            type="text"
            name="user_emails"
            label="User Emails (comma-separated)"
        />
        <TextField
            id="agent_emails"
            type="text"
            name="agent_emails"
            label="Requested Agents (comma-separated)"
        />
        <TextField
            required
            error={!agentValue && onSubmit}
            value={agentValue}
            onChange={(e) => setAgentValue(e.target.value)}
            type="text"
            id="body"
            name="body"
            label="Body"
            multiline
            maxRows={4}
        />
        <Button
            type="submit"
            key='enter'
            sx={{ my: 2, color: 'white', display: 'block' }}
            onClick={() => setOnSubmit(true)}
        >
            Continue
        </Button>
    </Stack>
    )
}
