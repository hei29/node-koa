class Controller {
    async list(ctx, next) {
        ctx.body = {
            status: 200,
            data: [
                {
                    hero: '变体精灵',
                    attack: '33-42',
                    armor: 2.8,
                    moveSpeed: 285,
                    HP: 614,
                    MP: 303,
                    agile: 24,
                    power: 23,
                    intelligence: 19,
                    turningSpeed: 0.7,
                    attackSpeed: [32, 1.15],
                    attackPreShake: 0.5,
                    attackDistance: 350
                }
            ]
        }
        await next()
    }
}

module.exports = new Controller();