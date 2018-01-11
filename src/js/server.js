// arguments
const PORT = process.argv[2] || 8080;
const BASE_URL = "";
// load modules
var fs = require("fs");
var express = require("express");
var path = require("path");
var my = (()=>{
	return {
	};
})();
// initialize server
var server = express();
// different requests
server.get("/", (request, response) => {
	response.sendFile(path.join(__dirname + "/../../dist/index.html"));
});
server.use("/", express.static("dist"));
server.get("/routes", (request, response) => {
});
server.get("/routes/:id", (request, response) => {	
});

server.get("/XXX", (request, response) => {
	response.sendStatus(404);
});
server.listen(PORT, function () {
	console.log("Example app listening on port !" + PORT);
});
