import { Server as IoServer } from "socket.io";
import { Server } from "https";
import { Service } from "Service";
import express from "express";
import { infoHandler } from "./handlers";

const port = process.env.PORT || "8000";
const ioPort = 8001;

const service = new Service();

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
//*********** Websocket
//*********************************************************************************

const io = new IoServer(ioPort);

io.sockets.on("connection", (socket) => {
    socket.on("login", (authToken?: string) => {
        let user = service.userManager.getUserByAutToken(authToken);

        if (user === undefined) {
            user = service.userManager.addUser(socket);
            socket.emit("authToken", user.authToken);
        } else {
            if (user.isConnected) {
                console.warn(`Tried to connect to already connected player ${user.id}.`);
                return;
            }
            user.isConnected = true;
            user.socket = socket;
        }

        service.registerEvents(user);
    });

    socket.on("logout", () => {
        service.userManager.removeUser(socket.id);
    });

    socket.on("disconnect", () => {
        const player = service.userManager.getUserBySocketId(socket.id);

        if (player) {
            player.isConnected = false;
        }
    });
});
