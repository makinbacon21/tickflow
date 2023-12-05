import prisma from '../../../lib/db'
var nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: "smtp.sccs.swarthmore.edu",
  port: 587,
  auth: {
    // TODO: replace `user` and `pass` values
    user: "REPLACE-WITH-YOUR-ALIAS@YOURDOMAIN.COM",
    pass: "REPLACE-WITH-YOUR-GENERATED-PASSWORD",
  },
});

export async function POST(request: Request) {
    const json = await request.json()
    let id = -1
    let date_created = new Date()
    let date_modified = new Date()
    await prisma.ticket.create({
        data: {
          user_emails: json['user_emails'],
          agent_emails: json['agent_emails'] ? json['agent_emails'] : "",
          body: json['body'],
          date_created: date_created,
          date_modified: date_modified
        },
        select: {
            id: true
        },
      }).then(async (response) => {
        id = response.id
      }).catch(async (e) => {
        return Response.json({message: "Failure"})
      })

      var mailOptions = {
        from: 'staff@sccs.swarthmore.edu',
        // TODO Not sure if this is parsed in the manner we would want
        to: json['user_emails'],
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
      };
      
      transporter.sendMail(mailOptions, function(error: any, info: { response: string; }){
        if (error) {
          console.log(error);
          // TODO What should we do if mail send errors after successful alterations
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      
      return Response.json({message: "Success", id: id,
                    date_created: date_created, date_modified: date_modified})
}
