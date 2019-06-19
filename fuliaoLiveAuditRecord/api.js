const fuliaoLiveAuditRecord = require('../core/mongo/models/fuliaoLiveAuditRecoed')

module.exports = (router) => {
    router.get('/fuliaoLiveAuditRecord/search', async ctx => {
        try {
            const query = {
                $and: [
                    { time: { $gte: +ctx.query.start } },
                    { time: { $lte: +ctx.query.end } }
                ]
            }
            ctx.query.name !== '请选择' ? query.name = ctx.query.name : '';
            ctx.body = await fuliaoLiveAuditRecord.find(query)
        } catch {
            ctx.body = {
                code: 0
            }
            return
        }
    })
}