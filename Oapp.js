const fs = require("fs");
const express = require('express');
const app = express();
const compression = require('compression')


app.use(compression());

app.listen(80, '0.0.0.0')


const READ = (url, content) => { //模拟数据库读取方法
    return JSON.parse(fs.readFileSync(url).toString());
}
const SELECT = (start, end, name) => {
    const STORE = READ('./STORE.json');
    const SELECTEDBYTIME = [];
    const SELECTEDBYNAME = [];
    STORE.forEach((e) => {
        if (+e.time >= +start && +e.time <= +end) {
            SELECTEDBYTIME.push(e);
        }
    });
    if (!name) {
        return SELECTEDBYTIME;
    } else {
        SELECTEDBYTIME.forEach((e) => {
            if (e.name == name) {
                SELECTEDBYNAME.push(e);
            }
        });
        return SELECTEDBYNAME;
    }
}

const accessed = (req) => {
    const mailOptions = {
        from: '851553114@qq.com',
        to: 'yinnuo96@163.com',
        subject: 'Website Accessed',
        html: '<p>IP : ' + req.ip + '<br><br><br>URL : ' + req.headers.host + req.url + '<br><br><br>User Agent : ' + req.headers['user-agent'] + '</p>'
    };
    transporter.sendMail(mailOptions, function(error, info) {
        if (error)
            console.log(error)
    })
}

app.get('/search', function(req, res) {
    if (req.query.name == '请选择') {
        res.end(JSON.stringify(SELECT(+req.query.start, +req.query.end)));
    } else {
        res.end(JSON.stringify(SELECT(+req.query.start, +req.query.end, req.query.name)));
    }
})