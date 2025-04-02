import transport from "../config/MailerConfig";
export default class MailerService
{
    private _email : string;
    private _subject : string;
    private _text: string;

    constructor()
    {
        this._email = "";
        this._subject = "";
        this._text = "";
    }


    protected async sendMailer()
    {
        if(this._email.length == 0 || this._subject.length == 0 || this._text.length == 0)
        {
            console.error("Set the email, text and subject properties to complete the sending!");
            return false;
        }

        let mailerOptions = {
            from: process.env.SMTP_MAIL,
            to: this._email,
            subject: this._subject,
            html: this._text
        };

        let return1 = await transport.sendMail(mailerOptions, (err: any, result: any) => {
            if(err)
            {
                console.error("Error sending mail: " + err);
                return false;
            }

            console.log("Sent mail: " + result.response);
            return true;
        });
        return return1;
    }

    protected setEmail(email: string)
    {
        this._email = email;
    }

    protected setSubject(subject: string)
    {
        this._subject = subject;
    }

    protected setText(text: string)
    {
        this._text = text;
    }


}