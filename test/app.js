const router = require('koa-router')({
    prefix: '/test'
});
const { readFilePromise } = require('../util/promisify');

module.exports = (app) => {

    router.get('/', async(ctx) => {
        ctx.body = (await readFilePromise(__dirname + '/index.html')).toString()
    })

    app.use(router.routes()).use(router.allowedMethods());
}