const static = require('koa-static');
const router = require('koa-router')();
const email = require('../util/email');
const { readFilePromise } = require('../util/promisify');
const resumeLeavedMessage = require('./dbs/resumeLeavedMessage');

module.exports = (app) => {

    router.get('/', async(ctx) => {
        ctx.body = (await readFilePromise(__dirname + '/index.html')).toString()
    })

    router.get('/geLeavedMessage', async(ctx) => {
        ctx.body = (await resumeLeavedMessage.find())
    })

    router.post('/indexpost', async ctx => {
        email(`${ctx.request.body.name}在你的简历上留言了`, `<b>${ctx.request.body.message}<br><br><br>我的邮箱是：${ctx.request.body.email}</b>`)
        resumeLeavedMessage.create({...ctx.request.body, time: +new Date() })
        ctx.body = {
            code: 1
        }
    })

    app.use(router.routes()).use(router.allowedMethods());

    app.use(static('./resumeIndexJquery/', {
        maxage: 60 * 60 * 24 * 1000
    }))

}