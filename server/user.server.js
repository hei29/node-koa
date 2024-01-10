const User = require('../model/user.model.js');

class UserServer{
    async create(params) {
        const res = await User.create(params);
        return res;
    }

    async selectAll({id, username, isAdmin}) {
        const whereOpt = {}
        id && Object.assign(whereOpt, { id })
        username && Object.assign(whereOpt, { username })
        isAdmin && Object.assign(whereOpt, { isAdmin })
        const res = await User.findAll({
            where: whereOpt
        });
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

    async update({ username, id }, needUpdate = {}) {
        const whereObj = {}
        username && Object.assign(whereObj, { username })
        id && Object.assign(whereObj, { id })
        const res = await User.update({ ...needUpdate }, {
            where: whereObj
        })
        return res
    }

    async dele(id) {
        const res = await User.destroy({
            where: { id }
        })
        return res
    }
}

module.exports = new UserServer();