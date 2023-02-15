const launches = new Map();

const launch = {
    flightNumber: 100,
    mission: 'Kepler exploration X',
    rocket: 'Explorer xvft',
    launchDate: new Date('December 27, 2030'),
    destiantion:'kepler 442-b',
    costumer: ['ZTM', "JAA Corp"],
    upcomming: true,
    success: true,
}

launches.set(launch.flightNumber, launch);

module.exports = {
    launches,
}
