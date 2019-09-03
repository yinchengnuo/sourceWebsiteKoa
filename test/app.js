const router = require('koa-router')({
    prefix: '/test'
});
const { readFilePromise } = require('../util/promisify');

module.exports = (app) => {

    const custom = 'x-custom-header'

    let key = 'TOKENTOKENTOKEN'

    router.get('/', async(ctx) => {
        ctx.body = (await readFilePromise(__dirname + '/index.html')).toString()
    })

    router.post('/login', async(ctx) => {
        ctx.response.set(custom, key)
        ctx.body = {
            code: 200,
            message: '登陆成功'
        }
    })

    router.post('/other', async(ctx) => {
        console.log(ctx.request.headers[custom])
        if (ctx.request.headers[custom] === key) {
            ctx.body = {
                code: 200,
                message: '操作成功'
            }
        } else {
            ctx.body = {
                code: 501,
                message: '未登录'
            }
        }
    })

    router.post('/logout', async(ctx) => {
        ctx.body = {
            code: 200,
            message: '退出成功'
        }
    })

    app.use(router.routes()).use(router.allowedMethods());
}