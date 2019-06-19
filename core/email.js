const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    secureConnection: true,
    port: 465,
    auth: {
        user: '851553114@qq.com',
        pass: 'wfnleiqissufbdha'
    }
});

module.exports = (subject, html) => {
    transporter.sendMail({
        from: '851553114@qq.com',
        to: 'yinnuo96@163.com',
        subject,
        html
    }, function(error){
        if(error)
            console.log(error)
    })
}