import { Server as IoServer } from "socket.io";
import { Server } from "https";
import express from "express";
import { infoHandler } from "./handlers";

const port = process.env.PORT || "8000";
const ioPort = 8001;

//*********************************************************************************
//*********** Server
//*********************************************************************************

const app = express();

// sends all frontend files
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/client/index.html");
});
app.use("/client", express.static(__dirname + "/client"));

// send some basic info
app.get("/info", infoHandler);

// start rest server
const server = new Server(app);

server.on("error", (e) => {
    console.error(e);

    setTimeout(() => {
        console.log("Trying to restart server.");
        server.close();
        server.listen(port);
    }, 1000);
});

server.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});

//*********************************************************************************
//*********** Connection
//*********************************************************************************

const io = new IoServer(ioPort);

io.sockets.on("connection", (socket) => {
    socket.on("disconnect", function () {
        delete SOCKET_LIST[socket.id];
        Player.onDisconnect(socket);
    });
    socket.on("evalServer", function (data) {
        if (!DEBUG) return;

        var res = eval(data);
        socket.emit("evalAnswer", res);
    });
});

setInterval(function () {
    var packs = Entity.getFrameUpdateData();
    for (var i in SOCKET_LIST) {
        var socket = SOCKET_LIST[i];
        socket.emit("init", packs.initPack);
        socket.emit("update", packs.updatePack);
        socket.emit("remove", packs.removePack);
    }
}, 40);
