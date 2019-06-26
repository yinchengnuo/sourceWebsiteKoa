const Koa = require('koa');
const compress = require('koa-compress');
const bodyParser = require('koa-bodyparser');
const connectMongodb = require('./util/connectMongodb');

(async() => {
    try {
        await connectMongodb
    } catch {
        console.log('数据库连接失败！！')
        return
    }
    console.log('数据库连接成功！！！')

    const app = new Koa();

    app.use(bodyParser()); //获取post请求体中间件
    app.use(compress({ threshold: 2048 })); //gzip中间件

    require('./util/proxy')(app); //代理接口
    require('./resumeIndexJquery/app')(app); //主页简历
    require('./fuliaoLiveAuditRecord/app')(app); //富聊直播审核记录
    // app.use(router.routes()).use(router.allowedMethods())

    // routes.forEach((item) => {
    //     item.staticPath ? app.use(static(item.staticPath)) : ''
    // })
    app.listen(80);
    console.log('服务器创建成功！！！')
})()