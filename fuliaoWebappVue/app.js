const static = require('koa-static');
const router = require('koa-router')({
    prefix: "/fuliaoWebappVue"
});
const { readFilePromise } = require('../util/promisify');

module.exports = (app) => {

    router.get('/', async(ctx) => {
        ctx.body = (await readFilePromise(__dirname + '/index.html')).toString()
    })

    app.use(router.routes()).use(router.allowedMethods());

    app.use(static('./fuliaoWebappVue/'))
}