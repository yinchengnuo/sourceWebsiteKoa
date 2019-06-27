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
        const { name, start, end, pagesize, pagenow, search } = ctx.request.body;
        const query = {
            $and: [
                { time: { $gte: +start } },
                { time: { $lte: +end } }
            ]
        }
        name ? query.name = name : '';
        let data = await fuliaoLiveAuditRecord.find(query).sort({ time: -1 }).skip((pagenow - 1) * pagesize).limit(pagesize);
        let refreshtime = await fuliaoLiveAuditRecord.find(query).countDocuments();
        if (search) {
            const temp = []
            let innerData = await fuliaoLiveAuditRecord.find(query).sort({ time: -1 })
            innerData.forEach((e, i) => {
                JSON.parse(JSON.stringify(e)).userinfo.forEach(e => {
                    if (e.userid == search) {
                        temp.push(innerData[i])
                    }
                })
            })
            data = temp.length ? temp.slice((pagenow - 1) * pagesize, (pagenow - 1) * pagesize + pagesize) : ''
            refreshtime = data.length
        }
        ctx.body = {
            data,
            refreshtime
        }
    })

    app.use(router.routes()).use(router.allowedMethods());
}