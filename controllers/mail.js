import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const mailFunction = async (req, res) => {
    const { to, subject, text, html } = req.body;
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.MAIL_USERNAME,
            // pass: process.env.MAIL_PASSWORD,
            clientId: process.env.OAUTH_CLIENTID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            refreshToken: process.env.OAUTH_REFRESH_TOKEN
        }
    });

    let mailOptions = {
        from: process.env.MAIL_USERNAME,
        to: to,
        subject: subject,
        text: text,
        html: html
    };

    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log("Error " + err);
            res.status(500).json({ message: "Internal Server Error" });
        } else {
            console.log("Email sent successfully");
            res.status(200).json({ message: "Email sent successfully" });
        }
    });
}



// let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         type: 'OAuth2',
//         user: process.env.MAIL_USERNAME,
//         pass: process.env.MAIL_PASSWORD,
//         clientId: process.env.OAUTH_CLIENTID,
//         clientSecret: process.env.OAUTH_CLIENT_SECRET,
//         refreshToken: process.env.OAUTH_REFRESH_TOKEN
//     }
// });

// let mailOptions = {
//     // from: 'tech13330@gmail.com',
//     to: 'tech13330@gmail.com',
//     subject: 'Hotel Journals',
//     text: 'Hello from Hotel Journals!',
//     html: `
//     <div style="background-color:#f6f6f6;padding:20px;font-family: Arial, sans-serif;">
//         <div style="max-width:600px;margin:0 auto">
//             <div style="background:#ffffff;border:1px solid #e9e9e9;border-radius:3px;padding:20px;text-align:center">
//                 <h2 style="color:#242424;margin-top:0">Welcome to Hotel Journals!</h2>
//                 <img src="https://res.cloudinary.com/dwahql1jy/image/upload/v1708281667/qbjrnzjifyo5rufouo6i.png" alt="Hotel Journals Logo" style="width: 200px;"/>
//                 <p style="color:#242424">Hello,</p>
//                 <p style="color:#242424">We're excited to have you with us. Hotel Journals is dedicated to providing you with the best hotel experiences.</p>
//                 <div style="margin: 25px 0;">
//                     <a href="https://yourwebsite.com" style="background-color:#007BFF;text-decoration:none;color:white;padding:10px 20px;border-radius:5px;">Visit our website</a>
//                 </div>
//                 <p style="color:#242424">Stay tuned for more updates!</p>
//                 <p style="color:#242424">Best Regards,</p>
//                 <p style="color:#242424"><strong>The Hotel Journals Team</strong></p>
//             </div>
//         </div>
//     </div>
// `
// };

// export const mailFunction = () => {
//     transporter.sendMail(mailOptions, function (err, data) {
//         if (err) {
//             console.log("Error " + err);
//         } else {
//             console.log("Email sent successfully");
//         }
//     });
// }

