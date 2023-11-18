import { GET } from '@/app/api/get_ticket/route'
import { Box, List, ListItem, ListItemAvatar, ListItemText, Avatar, Typography } from '@mui/material'
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import { notFound } from 'next/navigation'
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { v4 as uuidv4 } from 'uuid';

export default async function Ticket({ params }: { params: { id: string } }) {

    const id_num = Number(params.id)
    if (!id_num) {
        notFound()
    }

    const ticket = await GET(id_num)

    if (!ticket) {
        notFound()
    }

    // Probably want an edit button somewhere below
    return (
        <Grid container spacing={2} sx={{ marginTop: { xs: '6px', sm: '0px' }, width: '100%' }}>
            <Grid container xs={12} sm={4}>
                {/* top row */}
                <Grid container xs={12}>
                    <Grid xs={12} md={3}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
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
                            <Box sx={{ borderRadius: 2, width: '100%', bgcolor: 'primary.dark', padding: '6px' }}>
                                Created: {ticket.date_created.toDateString()}
                            </Box>
                        </Grid>
                        <Grid sx={{ width: '100%' }}>
                            <Box sx={{ borderRadius: 2, width: '100%', bgcolor: 'primary.dark', padding: '6px' }}>
                                Modified: {ticket.date_modified.toDateString()}
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid sx={{ width: '100%' }}>
                    <List sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 2, backgroundColor: 'primary.dark' }}>
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
                                <ListItemAvatar>
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
                    <List sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 2, backgroundColor: 'primary.dark' }}>
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
                                <ListItemAvatar>
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
                    minHeight: '100%'
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
