const router = require('koa-router')({
    prefix: '/fuliaoLiveAuditRecord'
});
const { readFilePromise } = require('../util/promisify');
const fuliaoLiveAuditRecord = require('./dbs/getFuliaoLiveAuditRecoed')

module.exports = (app) => {

    router.get('/', async(ctx) => {
        ctx.body = (await readFilePromise(__dirname + '/index.html')).toString()
    })

    router.post('/search', async ctx => {
        console.log(ctx.request.body)
        const query = {
            $and: [
                { time: { $gte: +ctx.request.body.start } },
                { time: { $lte: +ctx.request.body.end } }
            ]
        }
        ctx.request.body.name !== '请选择' ? query.name = ctx.request.body.name : '';
        ctx.body = await fuliaoLiveAuditRecord.find(query)
    })

    app.use(router.routes()).use(router.allowedMethods());
}