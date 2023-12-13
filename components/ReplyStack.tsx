'use client'

import { Button, Stack, TextField } from '@mui/material'
import { useState } from 'react';

export function ReplyStack() {
    const [agentValue, setAgentValue] = useState("");
    const [onSubmit, setOnSubmit] = useState(false);

    return (
        <Stack className='p-12' spacing={2}>
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
                maxRows={40}
            />
            <Button
                type="submit"
                key='enter'
                sx={{ my: 2, color: 'white', display: 'block' }}
                onClick={() => {
                    setOnSubmit(true)
                }}
            >
                Reply
            </Button>
        </Stack>
    )
}
