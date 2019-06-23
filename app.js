const Koa = require('koa');
const mongo = require('./core/mongo/mongo')
const static = require('koa-static');
const compress = require('koa-compress');
const bodyParser = require('koa-bodyparser');

const router = require('./core/router');
const routes = require('./core/routes');

(async () => {
    try {
        await mongo
    } catch {
        console.log('数据库连接失败！！')
        return 
    }
    console.log('数据库连接成功！！！')

    const app = new Koa(); 
    app.use(bodyParser());
    app.use(router.routes()).use(router.allowedMethods())
    app.use(compress({ threshold: 2048 }));
    routes.forEach((item) => {
        item.staticPath ? app.use(static(item.staticPath)) : ''
    })
    app.listen(80);
    console.log('服务器创建成功！！！')
})()
