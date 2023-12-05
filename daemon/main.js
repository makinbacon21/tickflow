/* TickFlow Daemon
 * The evil mail client
 *
 * I MUST be run as root or I can't do stuff
 */
import fs from 'fs';
import Watcher from 'watcher';
import { simpleParser } from 'mailparser';

const logfile = process.argv[2]
const filepath = '/var/mail/tickflow'

// Attaching the "all" handler manually
const watcher = new Watcher(filepath, { persistent: true });

const getCurrent = () => fs.readFileSync(filepath, {
    encoding: 'ascii'
})

// clear inbox
fs.truncate(filepath, 0, function () { console.log('done') })

watcher.on('change', async (event) => {
    console.log("event: " + event);
    let curFile = getCurrent()

    // clear inbox
    fs.truncate(filepath, 0, function () { console.log('done') })
    let out = {}

    if (!curFile) {
        console.log("empty file!")
        return
    }

    const parsed = await simpleParser(curFile)
    if (!parsed || parsed == {}) {
        console.log("nothing parsed!")
        return
    }

    out = {
        subject: parsed.subject,
        body: parsed.text,
        date: parsed.date,
        agent_emails: parsed.to.text,
        user_emails: parsed.from.text
    }

    if (logfile && logfile != "stdout")
        fs.writeFileSync(logfile, out)
    else
        console.log(out)

    if (!out || out == {}) {
        console.log("empty!")
        return
    }

    // post ticket
    await fetch("http://localhost:3000/api/create_ticket", {
        method: "POST",
        body: JSON.stringify(out),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then((response) => response.json())
        .then((json) => console.log(json))

});

// exit handler to kill watcher
process.on('exit', function () {
    console.log('About to exit.');
    watcher.close();
});
