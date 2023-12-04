const db = require("../models")

const getSetting = () => new Promise(async (resolve, reject) => {
    try {
        const setting = await db.Setting.findAll({
            attributes: ["price"]
        });

        resolve({
            errorCode: 1,
            mess: "Cài đặt",
            data: setting[0]
        })
    } catch (error) {
        reject(error)
    }
})

module.exports = {getSetting}