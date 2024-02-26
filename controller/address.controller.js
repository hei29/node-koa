const { 
    addAddress,
    findAllAddress,
    updateAddress,
    removeAddress,
    setDefaultAddress
} = require('../service/address.service');

class adressController {
    async add(ctx) {
        // const { consignee, phone, adress, isDefault } = ctx.request.body;
        const { id } = ctx.state.auth;
        const res = await addAddress({ ...ctx.request.body, userId: id });
        ctx.body = {
            code: 0,
            message: '添加地址成功',
            data: res
        }
    }

    async findAll(ctx) {
        const { id } = ctx.state.auth;
        const res = await findAllAddress(id);
        ctx.body = {
            code: 0,
            message: '查询地址成功',
            data: res
        }
    }

    async update(ctx) {
        // ctx.params 等同于 ctx.request.params
        const { id } = ctx.params;
        const { id:userId }  = ctx.state.auth;
        const res = await updateAddress(id, userId, ctx.request.body);

        ctx.body = {
            code: 0,
            message: '修改地址成功',
            data: res
        }
    }

    async remove(ctx) {
        const { id } = ctx.params;
        const { id:userId }  = ctx.state.auth;
        const res = await removeAddress(id, userId);

        ctx.body = {
            code: 0,
            message: '删除地址成功',
            data: res
        }
    }

    async setDefault(ctx) {
        const { id } = ctx.params;
        const { id:userId }  = ctx.state.auth;
        const res = await setDefaultAddress(id, userId);

        ctx.body = {
            code: 0,
            message: '设置默认地址成功',
            data: res
        }
    }
}

module.exports = new adressController();