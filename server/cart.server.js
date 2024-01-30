const { OP } = require('sequelize');
const Cart = require('../models/cart.model');

class CartServer {
    async createOrUpdateCart(user_id, goods_id) {
        return {
            id: 1,
            user_id,
            goods_id,
            number: 3,
            selected: true
        }
    }
}

module.exports = new CartServer();