import { FormStack } from '@/components/FormStack'
import prisma from '@/lib/db'
import { Box, Button, Stack, TextField } from '@mui/material'
import { redirect } from 'next/navigation'

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: "ibis.sccs.swarthmore.edu",
  port: 25,
  // auth: {
  //   // TODO: replace `user` and `pass` values
  //   user: "REPLACE-WITH-YOUR-ALIAS@YOURDOMAIN.COM",
  //   pass: "REPLACE-WITH-YOUR-GENERATED-PASSWORD",
  // },
});

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

      var mailOptions = {
        from: 'staff@sccs.swarthmore.edu',
        // TODO Not sure if this is parsed in the manner we would want
        // to: json['user_emails'],
        to: "tmakin1@swarthmore.edu",
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
      };

      console.log("HERE\n");
      
      transporter.sendMail(mailOptions, function(error: any, info: { response: string; }){
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
                <FormStack/>
            </form>
        </Box>
    )
}
