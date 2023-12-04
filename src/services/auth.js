const db = require("../models")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const admin = require("../firebase")

const saltRounds = 10;
const timeToken  = '30d'

const hashPassword = (password) => bcrypt.hashSync(password, saltRounds);

const comparePassword = (password, passwordHash) => bcrypt.compareSync(password, passwordHash)

const createToken = (data, isRegister) => {
    const token = jwt.sign(
        {
          id: data.id,
          name: data.name,
          role: isRegister ? "user": data.role
        },
        process.env.KEY_TOKEN,
        { expiresIn: timeToken }
    )

    return token
}

const register = ({name, userName, password, phoneNumber}) => new Promise(async (resolve, reject) => {
    try {
        const [user, created] = await db.User.findOrCreate({
            where: { userName },
            defaults: {
                userName,
                name,
                password: hashPassword(password),
                phoneNumber
            }
          });
        
          if(!created) {
            resolve({
                errorCode: 1,
                mess: "Tài khoản đã tồn tại"
            })
          } else {
            resolve({
                errorCode: 0,
                mess: "Đăng ký thành công",
                data: {
                    token: createToken(user, true)
                }
            })
          }
       
    } catch (error) {
        reject(error)
    }
})

const login = ({userName, password, deviceToken}) => new Promise(async (resolve, reject) => {
    try {
        const user = await db.User.findOne({
            where: { userName },
            raw: true
        });

        
        if(user === null) {
            resolve({
                errorCode: 1,
                mess: "Tài khoản không tồn tại"
            })
        } else {
            const checkPassword = comparePassword(password, user.password)
            // if(checkPassword) {
            //     const registrationToTopic = await admin.messaging().subscribeToTopic([deviceToken], process.env.TOPIC)
            //     console.log("Successfully subscribed to topic: ", registrationToTopic)
            // }
            resolve({
                errorCode: checkPassword ? 0 : 1,
                mess: checkPassword ? "Đăng nhập thành công" : "Sai mật khẩu",
                data: checkPassword ? {
                    token: createToken(user),
                    user: user
                } : undefined
            })
        }
    } catch (error) {
        console.log("error", error)
        reject(error)
    }
})

module.exports = {register, login}