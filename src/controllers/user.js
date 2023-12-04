const user = require("../services/user");

const getUser = async (req, res) => {
    try {
        const {id} = req.user
        const response = await user.getUser(id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            errorCode: 1,
            mess: "Server Error"
        })
    }
}

const getListUser = async (req, res) => {
    try {
        const response = await user.getListUser()
        return res.status(200).json(response)
    } catch (error) {
        console.log("error", error)
        return res.status(500).json({
            errorCode: 1,
            mess: "Server Error"
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const {id} = req.user
        const dataUserUpdate = req.body;
        const response = await user.updateUser(id, dataUserUpdate)
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
    getUser,
    getListUser,
    updateUser
}