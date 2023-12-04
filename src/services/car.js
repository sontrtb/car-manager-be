const db = require("../models")
const {publishMQTT} = require("../../src/mqtt/index")

const createCar = (idCar) => new Promise(async (resolve, reject) => {
    try {
        const [car, created] = await db.Car.findOrCreate({
            where: { idCar },
            defaults: { idCar }
          });
        
          if(!created) {
            resolve({
                errorCode: 1,
                mess: "Xe đã được đăng kí"
            })
          } else {
            resolve({
                errorCode: 0,
                mess: "Đăng ký xe thành công",
                data: car
            })
          }
       
    } catch (error) {
        reject(error)
    }
})

const updateCar = (id, carUpdate) => new Promise(async (resolve, reject) => {
    try {
        const currentCar = await db.Car.findByPk(id);

        console.log("carUpdate", carUpdate)

        await currentCar.update({...currentCar, ...carUpdate})
        await currentCar.save();

        publishMQTT(currentCar);

        resolve({
            errorCode: 0,
            mess: "Update thông tin xe...",
            data: currentCar
        })
       
    } catch (error) {
        reject(error)
    }
})

const getListCar = () => new Promise(async (resolve, reject) => {
    try {
        const listCar = await db.Car.findAll();

        resolve({
            errorCode: 0,
            mess: "Danh sách xe",
            data: listCar,
        })
    } catch (error) {
        reject(error)
    }
})

const getCar = (id) => new Promise(async (resolve, reject) => {
    try {
        const car = await db.Car.findByPk(id,  {
            include: [
                {
                    model: db.User,
                    as: "userData",
                    
                },
            ]
        });
        resolve({
            errorCode: car ? 0 : 1,
            mess: car ? "Thông tin xe" : "xe không hợp lệ",
            data: car
        })
    } catch (error) {
        reject(error)
    }
})

module.exports = {createCar, updateCar, getListCar, getCar}