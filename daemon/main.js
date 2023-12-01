import fs from 'fs';
import Watcher from 'watcher';
import { simpleParser } from 'mailparser';
import prisma from '@/lib/db'

const logfile = process.argv[2]
const filepath = '/var/mail/tickflow'

// Attaching the "all" handler manually
const watcher = new Watcher(filepath);

const getCurrent = () => fs.readFileSync(filepath, {
    encoding: 'ascii'
})

fs.truncate(filepath, 0, function () { console.log('done') })

watcher.on('change', async (event) => {
    console.log("event: " + event);
    let curFile = getCurrent()
    fs.truncate(filepath, 0, function () { console.log('done') })
    let out = {}
    simpleParser(curFile)
        .then(parsed => {
            out = {
                subject: parsed.subject,
                text: parsed.text,
                date: parsed.date,
                to: parsed.to.text,
                from: parsed.from.text
            }
            if (logfile && logfile != "stdout")
                fs.writeFileSync(logfile, out)
            else
                console.log(out)
            
        })
        .catch(err => {
            errorString = "Failed to parse email! " + err
            if (logfile && logfile != "stdout")
                fs.writeFileSync(logfile, errorString)
            else
                console.log(errorString)
        });

    await fetch("localhost/api/create_ticket", {
        method: "POST",
        body: JSON.stringify({
            user_emails: out.from,
            agent_emails: "",
            body: out.text,
            date_created: new Date(),
            date_modified: new Date()
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })

});

process.on('exit', function () {
    console.log('About to exit.');
    watcher.close();
});
