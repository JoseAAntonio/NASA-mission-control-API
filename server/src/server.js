const http = require('http')

const app = require('./app')

const { loadPlanetsData } = require('./models/planets.model')

const PORT = process.env.PORT || 8000;

//NOTE using express as a fancy listener function for our built-in node http server. now we can orginaze our code a little bit more by moving our express code to another file (app.js)
const server = http.createServer(app);


//NOTE - starting the server only when our asynchronous data is ready for incoming request from the cliente
async function startServer () {
    try {
        await loadPlanetsData()
        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}...`);
        })
    } catch (err) {
        console.log(err)
    }
}

startServer()





