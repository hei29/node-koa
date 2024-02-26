const { Op } = require('sequelize');
const Address = require('../model/address.model');
class adressService {
    async addAddress(params) {
        return await Address.create(params);
    }

    async findAllAddress(userId) {
        return await Address.findAll({
            where: {
                userId
            },
            attributes: {
                exclude: ['userId', 'createdAt', 'updatedAt']
            }
        })
    }

    async updateAddress(id, userId, params) {
        return await Address.update(params, {
            where: {
                [Op.and]: {
                    id,
                    userId
                }
            }
        })
    }

    async removeAddress(id, userId) {
        return await Address.destroy({
            where: {
                [Op.and]: {
                    id,
                    userId
                }
            }
        })
    }

    async setDefaultAddress(id, userId) {
        await Address.update({ isDefault: false }, {
            where: {
                userId
            }
        })
        return await Address.update({ isDefault: true },{
            where: {
                [Op.and]: {
                    id,
                    userId
                }
            }
        })
    }
}

module.exports = new adressService();