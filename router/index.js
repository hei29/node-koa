const fs = require('fs');
const Router = require('@koa/router');
const router = new Router();

fs.readdirSync(__dirname).forEach(file => {
    if(file !== 'index.js') {
        const t = require(`./${file}`)
        router.use(t.routes());
    }
})

module.exports = router;