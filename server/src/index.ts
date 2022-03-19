import { Server as IoServer } from 'socket.io';
import { Server } from 'https';
import { Service } from './Service';
import express from 'express';
import { infoHandler } from './handlers';

const port = process.env.PORT || '8000';
const wsPort = 8001;

const service = new Service();

//*********************************************************************************
//*********** Server
//*********************************************************************************

const app = express();

// sends all frontend files
app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/client/index.html');
});
app.use('/client', express.static(process.cwd() + '/client'));

// send some basic info
app.get('/info', infoHandler);

// start rest server
const server = new Server(app);

server.on('error', (e) => {
    console.error(e);

    setTimeout(() => {
        console.log('Trying to restart server.');
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

const io = new IoServer(wsPort, {
    cors: {
        origin: 'http://localhost:3000',
    },
});
console.log(`Websocket is listening on ${wsPort}`);

io.sockets.on('connection', (socket) => {
    console.log('New connection ' + socket.id);

    socket.on('login', (name: string, authToken?: string) => {
        console.log('ws: login', socket.id, name);
        let user = service.userManager.getUserByAutToken(authToken);

        if (user === undefined) {
            user = service.userManager.addUser(socket, name);
        } else {
            if (user.isConnected) {
                console.warn(`Tried to connect to already connected player ${user.id}.`);
                return;
            }
            user.isConnected = true;
            user.socket = socket;
        }

        service.registerEvents(user);
        socket.emit('init', user.id, user.authToken);
        service.sendsRoomChange(user);
    });

    socket.on('logout', () => {
        console.log('ws: logout', socket.id);
        service.userManager.removeUser(socket.id);
    });

    socket.on('disconnect', () => {
        console.log('ws: disconnected ', socket.id);
        const player = service.userManager.getUserBySocketId(socket.id);

        if (player) {
            player.isConnected = false;
        }
    });
});
