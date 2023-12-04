const setting = require("../services/setting");

const getSetting = async (req, res) => {
    try {
        const response = await setting.getSetting()
        return res.status(200).json(response)
    } catch (error) {
        console.log("error", error)
        return res.status(500).json({
            errorCode: 1,
            mess: "Server Error"
        })
    }
}

module.exports = {
    getSetting
}