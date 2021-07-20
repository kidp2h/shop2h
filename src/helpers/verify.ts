import nodemailer, {
    Transporter,
    SendMailOptions
} from "nodemailer";
import dotenv from "dotenv";
dotenv.config();


const transporter: Transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "thjnhsoajca@gmail.com",
        pass: "Sliverdz2604"
    }
})

function templateMail(id, tokenVerify) {
    return `
    <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0" style="width: 100%;margin: 0;padding: 0;background-color: #F5F7F9;font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;-webkit-box-sizing: border-box;box-sizing: border-box;"><tr><td align="center" style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;-webkit-box-sizing: border-box;box-sizing: border-box;"><table class="email-content" width="100%" cellpadding="0" cellspacing="0" style="width: 100%;margin: 0;padding: 0;font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;-webkit-box-sizing: border-box;box-sizing: border-box;"><tr><td class="email-masthead" style="padding: 25px 0;text-align: center;font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;-webkit-box-sizing: border-box;box-sizing: border-box;"> <a class="email-masthead_name" style="color: #839197;font-size: 16px;font-weight: bold;text-decoration: none;text-shadow: 0 1px 0 white;font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;-webkit-box-sizing: border-box;box-sizing: border-box;">Shop2h</a></td></tr><tr><td class="email-body" width="100%" style="width: 100%;margin: 0;padding: 0;border-top: 1px solid #E7EAEC;border-bottom: 1px solid #E7EAEC;background-color: #FFFFFF;font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;-webkit-box-sizing: border-box;box-sizing: border-box;"><table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0" style="width: 570px;margin: 0 auto;padding: 0;font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;-webkit-box-sizing: border-box;box-sizing: border-box;"><tr><td class="content-cell" style="padding: 35px;font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;-webkit-box-sizing: border-box;box-sizing: border-box;"><h1 style="margin-top: 0;color: #292E31;font-size: 19px;font-weight: bold;text-align: left;font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;-webkit-box-sizing: border-box;box-sizing: border-box;">Verify your email address</h1><p style="margin-top: 0;color: #839197;font-size: 16px;line-height: 1.5em;text-align: left;font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;-webkit-box-sizing: border-box;box-sizing: border-box;">Thanks for signing up for Shop2h! We're excited to have you as an early user.</p><table class="body-action" align="center" width="100%" cellpadding="0" cellspacing="0" style="width: 100%;margin: 30px auto;padding: 0;text-align: center;font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;-webkit-box-sizing: border-box;box-sizing: border-box;"><tr><td align="center" style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;-webkit-box-sizing: border-box;box-sizing: border-box;"><div style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;-webkit-box-sizing: border-box;box-sizing: border-box;"> <a href="${process.env.HOST_URL}/auth/verify?id=${id}&token=${tokenVerify}" class="button button--blue" style="color: #ffffff;display: inline-block;width: 200px;background-color: #414EF9;border-radius: 3px;font-size: 15px;line-height: 45px;text-align: center;text-decoration: none;-webkit-text-size-adjust: none;mso-hide: all;font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;-webkit-box-sizing: border-box;box-sizing: border-box;">Verify Email</a></div></td></tr></table><p style="margin-top: 0;color: #839197;font-size: 16px;line-height: 1.5em;text-align: left;font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;-webkit-box-sizing: border-box;box-sizing: border-box;">Thanks,<br>The Shop2h Team</p><table class="body-sub" style="margin-top: 25px;padding-top: 25px;border-top: 1px solid #E7EAEC;font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;-webkit-box-sizing: border-box;box-sizing: border-box;"><tr><td style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;-webkit-box-sizing: border-box;box-sizing: border-box;"><p class="sub" style="margin-top: 0;color: #839197;font-size: 12px;line-height: 1.5em;text-align: left;font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;-webkit-box-sizing: border-box;box-sizing: border-box;">If you’re having trouble clicking the button, copy and paste the URL below into your web browser.</p><p class="sub" style="margin-top: 0;color: #839197;font-size: 12px;line-height: 1.5em;text-align: left;font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;-webkit-box-sizing: border-box;box-sizing: border-box;"><a href="${process.env.HOST_URL}/auth/verify?id=${id}&token=${tokenVerify}" style="color: #414EF9;font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;-webkit-box-sizing: border-box;box-sizing: border-box;">Click here</a></p></td></tr></table></td></tr></table></td></tr><tr><td style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;-webkit-box-sizing: border-box;box-sizing: border-box;"><table class="email-footer" align="center" width="570" cellpadding="0" cellspacing="0" style="width: 570px;margin: 0 auto;padding: 0;text-align: center;font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;-webkit-box-sizing: border-box;box-sizing: border-box;"><tr><td class="content-cell" style="padding: 35px;font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;-webkit-box-sizing: border-box;box-sizing: border-box;"><p class="sub center" style="margin-top: 0;color: #839197;font-size: 12px;line-height: 1.5em;text-align: center;font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;-webkit-box-sizing: border-box;box-sizing: border-box;"> Shop2h Developer, Inc. <br>... NULLL ...</p></td></tr></table></td></tr></table></td></tr></table>
    `
}

export async function sendMailVerify(id, email, tokenVerify) {
    await transporter.sendMail({
        from: process.env.USER,
        to: email,
        subject: "Verify Your Account",
        html: `${templateMail(id,tokenVerify)}`
    }, (err, info) => {
        if(err){
            return err;
        }else{
            return info
        }
    })
}