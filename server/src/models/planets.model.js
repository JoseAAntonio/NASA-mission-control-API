
const { parse } = require("csv-parse");
const fs = require("fs");
const path = require("path");

const habitablePlanets = [];

const isHabitable = (planet) => {
	return (
		planet["koi_disposition"] === "CONFIRMED" &&
		planet["koi_insol"] > 0.36 && //insolation flux
		planet["koi_insol"] < 1.11 && //insolation flux
		planet["koi_prad"] < 1.6 //planet size
	);
};

//NOTE - Our planets data is loaded and parsed as a STREAM heppening asynchronosly, so our module.exports doenst wait around for that to finish and sends the data without it been set yet, for that we need to encapsulate this process in a promisse, exporting it and only start listening on our server when the data is readyfor incoming requests.
/*
const promise = new Promise((resolve, reject) => {
    resolve(42)
})
promise.then((result) => {

})
const result = await promise;
console.log(result);
*/

// so the function loadPlanetsData return a promise which resolves when our habitablePlanets heve been found

function loadPlanetsData () {
    return new Promise((resolve, reject) => {
            fs.createReadStream(path.join(__dirname, "..", "..", "data", "kepler_data.csv"))
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
            reject(err)
        })
        .on("end", () => {
            console.log(`${habitablePlanets.length} habitable planets`);
            resolve()
        }); 
    });
}


    module.exports = {
        loadPlanetsData,
        planets: habitablePlanets,
    }