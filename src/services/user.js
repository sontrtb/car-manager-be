const db = require("../models")

const getUser = (userId) => new Promise(async (resolve, reject) => {
    try {
        const user = await db.User.findByPk(userId);
        resolve({
            errorCode: user ? 0 : 1,
            mess: user ? "Thông tin người dùng" : "Người dùng không hợp lệ",
            data: user
        })
    } catch (error) {
        reject(error)
    }
})

const getListUser = () => new Promise(async (resolve, reject) => {
    try {
        const listUser = await db.User.findAll();

        resolve({
            errorCode: 1,
            mess: "Danh sách người dùng",
            data: listUser
        })
    } catch (error) {
        reject(error)
    }
})

const updateUser = (id, userUpdate) => new Promise(async (resolve, reject) => {
    try {
        const currentUser = await db.User.findByPk(id);

        await currentUser.update({...currentUser, ...userUpdate})
        await currentUser.save();

        resolve({
            errorCode: 0,
            mess: "Update thông tin người dùng...",
            data: currentUser
        })
       
    } catch (error) {
        reject(error)
    }
})

const recharge = (id, money) => new Promise(async (resolve, reject) => {
    try {
        const currentUser = await db.User.findByPk(id);

        await currentUser.update({...currentUser, amountOfMoney: Number(currentUser.amountOfMoney) + Number(money)})
        await currentUser.save();

        resolve({
            errorCode: 0,
            mess: "Nạp tiền thành công",
            data: currentUser
        })
       
    } catch (error) {
        reject(error)
    }
})

const pay = (id, money) => new Promise(async (resolve, reject) => {
    try {
        const currentUser = await db.User.findByPk(id);

        await currentUser.update({...currentUser, amountOfMoney: Number(currentUser.amountOfMoney) - Number(money)})
        await currentUser.save();

        resolve({
            errorCode: 0,
            mess: "Thanh toan thành công",
            data: currentUser
        })
       
    } catch (error) {
        reject(error)
    }
})

module.exports = {getUser, getListUser, updateUser, recharge, pay}