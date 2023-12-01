import fs from 'fs';
import Watcher from 'watcher';
import { simpleParser } from 'mailparser';

const logfile = process.argv[2]
const filepath = '/var/mail/tickflow'

// Attaching the "all" handler manually
const watcher = new Watcher(filepath);

const getCurrent = () => fs.readFileSync(filepath, {
    encoding: 'ascii'
})

fs.truncate(filepath, 0, function () { console.log('done') })

watcher.on('change', (event) => {
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
});

process.on('exit', function () {
    console.log('About to exit.');
    watcher.close();
});
