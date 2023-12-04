const user = require("./user");
const auth = require("./auth");
const car = require("./car");
const setting = require("./setting");

const routers = (app) => {

    app.use("/api/v1/user", user);
    app.use("/api/v1/auth", auth);
    app.use("/api/v1/car", car);
    app.use("/api/v1/setting", setting);

    app.use("/", (req, res) => {
        return res.send("<h1>Server on</h1>")
    })
}

module.exports = routers