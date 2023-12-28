const User = require('../model/user.model.js');

class UserServer{
    async create(username, password) {
        const res = await User.create({username, password});
        return res;
    }

    async getUserInfo({ id, username }) {
        const whereOpt = {}
        id && Object.assign(whereOpt, { id })
        username && Object.assign(whereOpt, { username })
        const res = await User.findOne({
            // attributes: ['id', 'username'], // 查询字段
            where: whereOpt
        })
        return res ? res.dataValues : null
    }
}

module.exports = new UserServer();