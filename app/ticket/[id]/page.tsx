import { Box, List, ListItem, ListItemAvatar, ListItemText, Avatar, Typography } from '@mui/material'
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import { notFound } from 'next/navigation'
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { v4 as uuidv4 } from 'uuid';

import prisma from '../../../lib/db'

async function getTicket(id: number) {
	return (await prisma.ticket.findUnique({
    	where: {
        	id: id
		}
	}))
}

export default async function Ticket({ params }: { params: { id: string } }) {

    const id_num = Number(params.id)
    if (!id_num) {
        notFound()
    }

    const ticket = await getTicket(id_num)

    if (!ticket) {
        notFound()
    }

    const elementShadow = 'drop-shadow(4px 6px 10px #00000044)'

    // Probably want an edit button somewhere below
    return (
        <Grid container spacing={2} sx={{ width: '100%' }}>
            <Grid container xs={12} sm={4}>
                {/* top row */}
                <Grid container xs={12}>
                    <Grid xs={12} md={3}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            filter: elementShadow,
                            textAlign: 'center', borderRadius: 2, width: '100%', height: '100%', bgcolor: 'primary.dark'
                        }}>
                            <Typography variant={ticket.id.toString().length > 2 ? "h5" : "h3"} sx={{
                                fontWeight: 700,
                                color: 'inherit',
                                textDecoration: 'none',
                                marginBottom: '5px'
                            }}>
                                {ticket.id}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid container xs={12} md={9}>
                        <Grid sx={{ width: '100%' }}>
                            <Box sx={{ borderRadius: 2, width: '100%', bgcolor: 'primary.dark', padding: '6px', filter: elementShadow }}>
                                Created: {ticket.date_created.toDateString()}
                            </Box>
                        </Grid>
                        <Grid sx={{ width: '100%' }}>
                            <Box sx={{ borderRadius: 2, width: '100%', bgcolor: 'primary.dark', padding: '6px', filter: elementShadow }}>
                                Modified: {ticket.date_modified.toDateString()}
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid sx={{ width: '100%' }}>
                    <List sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 2, backgroundColor: 'primary.dark', filter: elementShadow }}>
                        <ListItem>
                            <Typography variant="h6" sx={{
                                fontWeight: 700,
                                color: 'inherit',
                                textDecoration: 'none'
                            }}>
                                Agents
                            </Typography>
                        </ListItem>
                        {ticket.agent_emails.split(",").map((email) => (
                            <ListItem key={uuidv4()}>
                                <ListItemAvatar sx={{
                                    filter: elementShadow
                                }}>
                                    <Avatar>
                                        <ImageIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Assigned Agent <maybe get name>" secondary={email} />
                            </ListItem>
                        ))}
                    </List>
                </Grid>
                <Grid sx={{ width: '100%' }}>
                    <List sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 2, backgroundColor: 'primary.dark', filter: elementShadow }}>
                        <ListItem>
                            <Typography variant="h6" sx={{
                                fontWeight: 700,
                                color: 'inherit',
                                textDecoration: 'none'
                            }}>
                                Users
                            </Typography>
                        </ListItem>
                        {ticket.user_emails.split(",").map((email) => (
                            <ListItem key={uuidv4()}>
                                <ListItemAvatar sx={{
                                    filter: elementShadow
                                }}>
                                    <Avatar>
                                        <ImageIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="User <maybe get name>" secondary={email} />
                            </ListItem>
                        ))}
                    </List>
                </Grid>
            </Grid>

            <Grid xs={12} sm={8}>
                <Box sx={{
                    borderRadius: 1,
                    bgcolor: 'primary.dark',
                    padding: '6px',
                    minHeight: '100%',
                    filter: elementShadow
                }}>
                    <Typography variant="h6" sx={{
                        fontWeight: 700,
                        color: 'inherit',
                        textDecoration: 'none'
                    }}>
                        Body
                    </Typography>
                    {ticket.body}
                </Box>
            </Grid>
        </Grid>
    )
}
