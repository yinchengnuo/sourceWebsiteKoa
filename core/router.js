const router = require('koa-router')();
const routes = require('./routes');
const apiProxy = require('./api-proxy');
const apiResumeIndexJquery = require('../resumeIndexJquery/api');
const apiFuliaoLiveAuditRecord = require('../fuliaoLiveAuditRecord/api')
const { readFilePromise } = require('./util');

routes.forEach((item) => {
    router.get(item.name, async(ctx) => {
        ctx.body = (await readFilePromise(item.indexPath)).toString()
    })
})

apiProxy(router);
apiResumeIndexJquery(router);
apiFuliaoLiveAuditRecord(router);

module.exports = router