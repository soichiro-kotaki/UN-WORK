import { NextApiRequest, NextApiResponse } from "next";

export default function applyEmailHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const sgMail = require("@sendgrid/mail");
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        const msg = {
            to: req.body.applicantData.user_email,
            from: process.env.SENDER_APPLY_EMAIL_ADDRESS,
            subject: `${req.body.subject}への応募メッセージ`,
            html: `<html>こんにちは！<br>
            UN-WORK運営の${process.env.SENDER_NAME_APPLY_EMAIL}です。<br>
            あなたが投稿した<strong>「${req.body.subject}」</strong>に、応募したいもしくは興味を持っている<h3>${req.body.applicantData.user_subject}学科${req.body.applicantData.user_grade}の${req.body.applicantData.user_name}</h3>さんから、以下のメッセージが届きました。<br>
            <br>
            <h4>メッセージ本文</h4>
            <blockquote>${req.body.message}</blockquote><br>
            <br>
            つきましては、メッセージに対する返信を以下の応募者メールアドレスにお願いします。<br>
            <br>
            応募者メールアドレス: ${req.body.applicantData.user_email}<br>
            <br>
            ご不明な点などありましたら、 unwork1201@gmail.com (運営)
            もしくは 19G083@u-nagano.ac.jp (応募メール担当者)までご連絡ください。</html>`,
        };

        (async () => {
            try {
                await sgMail.send(msg);
            } catch (error) {
                console.error(error);
                if (error.response) {
                    console.error(error.response.body);
                }
            }
        })();

        if (res.status(200)) {
            return res.send(res.statusCode);
        } else {
            return res.statusMessage;
        }
    }
}
