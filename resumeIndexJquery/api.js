const email = require('../core/email');
const resumeLeavedMessage = require('../core/mongo/models/resumeLeavedMessage')

module.exports = (router) => {
    router.post('/indexpost', async ctx => {
        email(`${ctx.request.body.name}在你的简历上留言了`, `<b>${ctx.request.body.message}<br><br><br>我的邮箱是：${ctx.request.body.email}</b>`)
        resumeLeavedMessage.create({...ctx.request.body, time: +new Date() })
        ctx.body = {
            code: 1
        }
    })
}