// const { paramsValidateError } = require('../constant/err.type');

// class CartMiddleware {
//     validator(rules = {}) {
//         return async(ctx, next) => {
//             try {
//                 if (!(rules instanceof Object && Object.keys(rules).length !== 0)) {
//                     throw new Error('rules must be an object');
//                 }
//                 // goods_id: 'number' // 相当于 { type: 'number', required: true }
//                 ctx.verifyParams(rules)
//             } catch (error) {
//                 paramsValidateError.result = error;
//                 return ctx.app.emit('error', paramsValidateError, ctx, { errApi: 'cart.middleware-validator', error })
//             }
//             await next();
//         }
//     }
// }

// module.exports = new CartMiddleware();