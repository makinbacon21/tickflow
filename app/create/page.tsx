import { FormStack } from '@/components/FormStack'
import prisma from '@/lib/db'
import { Box } from '@mui/material'
import { redirect } from 'next/navigation'

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: "ibis.sccs.swarthmore.edu",
  port: 25,
  // Authentication is not necessary for our system
  // auth: {
  //   user: "REPLACE-WITH-YOUR-ALIAS@YOURDOMAIN.COM",
  //   pass: "REPLACE-WITH-YOUR-GENERATED-PASSWORD",
  // },
});

export default async function Create() {

  async function create(formData: FormData) {
    'use server'
    let user_emails = formData.get('user_emails')?.toString().split(",")
    let agent_emails = formData.get('agent_emails')?.toString().split(",")
    let subject = formData.get('subject')?.toString()
    let body = formData.get('body')?.toString()

    const ticket = await prisma.ticket.create({
      data: {
        user_emails: user_emails ? user_emails : [],
        agent_emails: agent_emails ? agent_emails : [],
        body: body ? body : "",
        date_created: new Date(),
        date_modified: new Date(),
        subject: subject ? subject : "SCCS Ticket",
      },
    })

    var mailOptions = {
      from: "tickflow@sccs.swarthmore.edu",
      to: ticket.user_emails.toString(),
      subject: ticket.subject,
      text: body? body : "",
    };

    transporter.sendMail(mailOptions, function (error: any, info: { response: string; }) {
      if (error) {
        console.log(error);
        // TODO What should we do if mail send errors after successful alterations
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

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
        <FormStack />
      </form>
    </Box>
  )
}
