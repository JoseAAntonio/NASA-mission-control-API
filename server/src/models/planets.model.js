
const { parse } = require("csv-parse");
const fs = require("fs");

const habitablePlanets = [];

const isHabitable = (planet) => {
	return (
		planet["koi_disposition"] === "CONFIRMED" &&
		planet["koi_insol"] > 0.36 && //insolation flux
		planet["koi_insol"] < 1.11 && //insolation flux
		planet["koi_prad"] < 1.6 //planet size
	);
};

fs.createReadStream("kepler_data.csv")
	.pipe(
		parse({
			comment: "#",
			columns: true,
		})
	)
	.on("data", (data) => {
		isHabitable(data) ? habitablePlanets.push(data) : null;
	})
	.on("error", (err) => {
		console.log(err);
	})
	.on("end", () => {
		console.log(
			habitablePlanets.map((planet) => {
				return planet["kepler_name"];
			})
		);
		console.log(`${habitablePlanets.length} habitable planets`);
	});

    module.exports = {
        planets: habitablePlanets,
    }