var sensor = require("node-dht-sensor");

sensor.read(22, 17, function (err, temperature, humidity) {
    console.log("ERRR: ", err)
    if (!err) {
        console.log(`temp: ${temperature}°C, humidity: ${humidity}%`);
    }
});