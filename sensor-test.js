var sensorLib = require("node-dht-sensor");
const ObjectsToCsv = require('objects-to-csv')

var app = {
    sensors: [
        {
            name: "Nádech",
            type: 11,
            pin: 17
        },
        {
            name: "Výdech",
            type: 11,
            pin: 4
        }
    ],
    data: [],
    read: function () {
        for (var sensor in this.sensors) {
            var readout = sensorLib.read(
                this.sensors[sensor].type,
                this.sensors[sensor].pin
            );
            console.log(
                `[${this.sensors[sensor].name}] ` +
                `templota: ${readout.temperature.toFixed(1)}°C, ` +
                `vlhkost: ${readout.humidity.toFixed(1)}%`
            );
            this.data.push({
                sensor: this.sensors[sensor].name,
                temperature: readout.temperature,
                humidity: readout.humidity,
                timestamp: Date.now()
            })
        }
        setTimeout(function () {
            app.read();
        }, 1000);
    }
};

app.read();

process.on('SIGINT', function () {
    console.log("Caught interrupt signal... Saving csv");
    const csv = new ObjectsToCsv(app.data)
    csv.toDisk(`./${Date.now()}.csv`).then(() => process.exit())
});