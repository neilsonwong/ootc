'use strict'; 

class Email {
    constructor (from, to, subject, html, options) {
        this.from = from;
        this.to = to;
        this.subject = subject;
        this.html = html;

        // optional
        if (options) {
            this.text = options.text || undefined;
            this.cc = options.cc || undefined;
            this.bcc = options.bcc || undefined;
            this.replyTo = options.replyTo || undefined;
        }
    }
}

module.exports = Email;
