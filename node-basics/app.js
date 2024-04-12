const http = require('http');

const routes = require("./routes");

const routesHandler = routes.requestHandler;

const server = http.createServer(routesHandler);

server.listen(3000);