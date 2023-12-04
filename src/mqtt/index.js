const mqtt = require("mqtt");
const client = mqtt.connect(process.env.MQTT_SERVER);

const connectMQTT = () => {
    client.on("connect", () => {
        client.subscribe(process.env.MQTT_LED1_TOPIC, (err) => {
            if(err) {
                console.log("Err MQTT")
            } else {
                console.log("Connected MQTT")
            }
        });
    });
    
    client.on("message", (topic, message) => {
        console.log("message", JSON.parse(message.toString()));
    });
}

const publishMQTT = (data) => {
    client.publish(process.env.MQTT_LED1_TOPIC, JSON.stringify(data));
}

module.exports = {
    connectMQTT,
    publishMQTT
}

