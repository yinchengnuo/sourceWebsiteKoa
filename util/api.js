const fs = require('fs');
const util = require('util');
const axios = require('axios');
const router = require('koa-router')();
const unlinkPromise = util.promisify(fs.unlink);
const readdirPromise = util.promisify(fs.readdir);
const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);

const host = 'https://api.96friend.cn';
const query1 = 'apptype=6';
const query2 = 'userid=26307780';
const query3 = 'type=1'
const query4 = 'pagesize=14'
const query5 = 'cversion=29011505'

module.exports = app => {

    router.post('/keeppace', async ctx => {
        await writeFilePromise('../mockApiKoa/app.js', ctx.request.body.app)
        const { dir: { name, app, apis } } = ctx.request.body;
        await writeFilePromise(`../mockApiKoa/${name}/app.js`, app);
        const files = await readdirPromise(`../mockApiKoa/${name}/apis/`)
        for(let i = 0; i < files.length; i++) {
            await unlinkPromise(`../mockApiKoa/${name}/apis/${files[i]}`);
        }
        const apikeys = Object.keys(apis);
        for(let i = 0; i < apikeys.length; i ++) {
            await writeFilePromise(`../mockApiKoa/${name}/apis/${apikeys[i]}`, apis[apikeys[i]]);
        }
        ctx.body = {
            code: 200
        }
    })

    router.get('/tuijian', async ctx => {
        ctx.body = (await axios(`${host}/videoLive!getRecommendList.htm?${query1}&${query2}&${query3}&${query4}&${query5}&pageno=${ctx.query.page}&_timestamp=${Math.floor(+new Date() / 1000)}`)).data
    })
    router.get('/meili', async ctx => {
        ctx.body = (await axios(`${host}/videoLive!getCharmList.htm?${query1}&${query2}&${query3}&${query4}&${query5}&pageno=${ctx.query.page}&_timestamp=${Math.floor(+new Date() / 1000)}`)).data
    })
    router.get('/caiyi', async ctx => {
        ctx.body = (await axios(`${host}/videoLiveChannel!getChannelVideoLiveList.htm?${query1}&${query2}&${query3}&${query4}&${query5}&pageno=${ctx.query.page}&_timestamp=${Math.floor(+new Date() / 1000)}`)).data
    })
    router.get('/hangzhou', async ctx => {
        ctx.body = (await axios(`${host}/videoLive!getLiveSameCityList.htm?${query1}&${query2}&${query3}&${query4}&${query5}&pageno=${ctx.query.page}&_timestamp=${Math.floor(+new Date() / 1000)}`)).data
    })
    router.get('/moretuijian', async ctx => {
        ctx.body = (await axios(`${host}/videoLive!getRecommendList.htm?apptype=6&userid=26307780&pageno=1&type=1&pagesize=666&cversion=29011505`)).data
    })
    router.get('/morecaiyi', async ctx => {
        ctx.body = (await axios(`${host}/videoLiveChannel!getChannelVideoLiveList.htm?apptype=6&userid=26307780&type=1&pageno=1&cversion=29011505`)).data
    })
    router.get('/smallvideolist', async ctx => {
        ctx.body = (await axios(`https://baseapi.busi.inke.cn/live/HotFeed`)).data
    })
    router.get('/smallvideoinfo', async ctx => {
        ctx.body = (await axios(`https://service.inke.cn/api/v2/feed/show?feed_id=${ctx.query.id}&uid=9527`)).data
    })
    router.get('/videochatlist', async ctx => {
        ctx.body = (await axios(`${host}/videoPair!getSingleVideoPairListV2Soft.htm?${query1}&${query2}&${query3}&${query4}&${query5}&pageno=${ctx.query.page}&_timestamp=${Math.floor(+new Date() / 1000)}`)).data
    })

    app.use(router.routes()).use(router.allowedMethods());
}
