const car = require("../services/car");

const createCar = async (req, res) => {
    try {
        const {idCar} = req.body;
        if(!idCar || idCar?.length ===0) {
            return res.status(400).json({
                errorCode: 1,
                mess: "Mã xe không được để trống"
            })    
        }
        const response = await car.createCar(idCar)
        return res.status(200).json(response)
    } catch (error) {
        console.log("error", error)
        return res.status(500).json({
            errorCode: 1,
            mess: "Server Error"
        })
    }
}

const updateCar = async (req, res) => {
    try {
        const idCar = req.params.id;
        const dataCarUpdate = req.body;
        if(!idCar || idCar?.length ===0) {
            return res.status(400).json({
                errorCode: 1,
                mess: "Mã xe không được để trống"
            })    
        }
        const response = await car.updateCar(idCar, dataCarUpdate)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            errorCode: 1,
            mess: "Server Error"
        })
    }
}

const getListCar = async (req, res) => {
    try {
        const response = await car.getListCar()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            errorCode: 1,
            mess: "Server Error"
        })
    }
}

const getCar = async (req, res) => {
    try {
        const {id} = req.params
        const response = await car.getCar(id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            errorCode: 1,
            mess: "Server Error"
        })
    }
}

module.exports = {
    createCar,
    updateCar,
    getListCar,
    getCar
}