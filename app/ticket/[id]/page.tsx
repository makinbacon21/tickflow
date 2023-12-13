import { Box, List, ListItem, ListItemAvatar, ListItemText, Avatar, Typography } from '@mui/material'
import ImageIcon from '@mui/icons-material/Image';
import { notFound } from 'next/navigation'
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { v4 as uuidv4 } from 'uuid';

import prisma from '../../../lib/db'

import nodemailer from 'nodemailer';
import { ReplyStack } from '@/components/ReplyStack';

let ticket: any = undefined

const transporter = nodemailer.createTransport({
    host: "ibis.sccs.swarthmore.edu",
    port: 25,
    // auth: {
    //   // TODO: replace `user` and `pass` values
    //   user: "REPLACE-WITH-YOUR-ALIAS@YOURDOMAIN.COM",
    //   pass: "REPLACE-WITH-YOUR-GENERATED-PASSWORD",
    // },
});

async function getTicket(id: number) {
    return (await prisma.ticket.findUnique({
        where: {
            id: id
        }
    }))
}

async function reply(formData: FormData) {
    'use server'
    let newBody = formData.get('body')?.toString()

    if (!newBody || newBody == '') {
        return
    }

    if(!ticket) {
        console.log("Reply not sent: ticket was not found.")
        return
    }

    var mailOptions = {
        from: 'tickflow@sccs.swarthmore.edu',
        to: ticket.user_emails,
        subject: ticket.subject,
        text: newBody
    };

    await prisma.ticket.update({
        where: {
            id: ticket.id
        },
        data: {
            body:(newBody + "\n\n============================================\
                    \n\n" + ticket.body),
            date_modified: new Date()
        },
    }).catch(async (e: any) => {
        console.log("edit failed")
    })

    transporter.sendMail(mailOptions, function (error: any, info: { response: string; }) {
        if (error) {
            console.log(error);
            // TODO What should we do if mail send errors after successful alterations
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}

export default async function Ticket({ params }: { params: { id: string } }) {

    const id_num = Number(params.id)
    if (!id_num) {
        notFound()
    }

    ticket = await getTicket(id_num)

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
                                Users
                            </Typography>
                        </ListItem>
                        {ticket.user_emails.map((email: any) => (
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
                        {ticket.agent_emails.map((email: any) => (
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
            </Grid>

            <Grid xs={12} sm={8}>
                <Box sx={{
                    borderRadius: 1,
                    bgcolor: 'primary.dark',
                    padding: '6px',
                    height: '100%',
                    filter: elementShadow,
                }}>
                    <Typography variant="h6" sx={{
                        fontWeight: 700,
                        color: 'inherit',
                        textDecoration: 'none'
                    }}>
                        {ticket.subject}
                    </Typography>
                    <Typography sx={{
                        color: 'inherit',
                        textDecoration: 'none',
                        whiteSpace: 'pre-line',
                        overflowY: 'scroll',
                        height: 'calc(100% - 36px)',
                    }}>
                        {ticket.body}
                    </Typography>
                </Box>
            </Grid>
            <Grid sx={{ width: '100%' }}>
                <Box sx={{
                    borderRadius: 1,
                    bgcolor: 'primary.dark',
                    padding: '6px',
                    minHeight: '100%',
                    filter: elementShadow
                }}>
                    <form action={reply}>
                        <ReplyStack />
                    </form>
                </Box>
            </Grid>
        </Grid>
    )
}
