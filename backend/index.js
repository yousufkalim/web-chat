// Init
const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
	cors: {
		origin: "*",
	},
});

// Socket events
io.on("connection", (socket) => {
	console.log(socket);
	socket.on("message", (payload) => {
		socket.emit("message", payload);
	});
});

// Starting Server
server.listen(5000, () => {
	console.log("server is running at port 5000");
});
