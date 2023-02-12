const http = require('http')

const app = require('./app')

const PORT = process.env.PORT || 8000;

//NOTE using express as a fancy listener function for our built-in node http server. now we can orginaze our code a little bit more by moving our express code to another file (app.js)
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
})




