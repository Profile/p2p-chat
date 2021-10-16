const app = require('express')()
var bodyParser = require('body-parser')
const server = require('http').Server(app)
const io = require('socket.io')(server)
const next = require('next');
const { v4: uuidv4 } = require('uuid');

const PORT = process.env.PORT || 3000;

// parse application/json
app.use(bodyParser.json())

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler()

// fake DB
const rooms = {}

// socket.io server
io.on('connection', socket => {
    // socket.on('message', (data) => {
    //     messages.push(data)
    //     socket.broadcast.emit('message', data)
    // });
    socket.on('disconnect', (data) => {
        const roomId = socket.handshake.query.roomId;
        const userId = socket.handshake.query.userId;
        const leftUser = rooms[roomId]?.users[socket.id];
        delete rooms[roomId]?.users[userId];
        if(!Object.keys(rooms[roomId]?.users || {}).length) {
            delete rooms[roomId]
        }

        io.in(roomId).emit('left', {
            leftUser,
            room: rooms[roomId]
        });

    });
    socket.on('join', (data) => {

        if(!rooms[data.roomId] || !rooms[data.roomId].users[data.userId]) {
            return console.log("roomId or userId not found")
        }

        const userFromRoom = {
            ...rooms[data.roomId].users[data.userId],
            joined: new Date(),
            socketId: socket.id
        };

        rooms[data.roomId] = {
            ...rooms[data.roomId],
            users: {
                ...((rooms[data.roomId] || {}).users || {}),
                [userFromRoom.id]: userFromRoom
            }
        }

        socket.join(userFromRoom.roomId);
        io.in(userFromRoom.roomId).emit('joined', {
            user: userFromRoom,
            room: rooms[userFromRoom.roomId]
        });
    });
})

nextApp.prepare().then(() => {
    app.post('/api/rooms', (req, res) => {
        const roomId = uuidv4();
        const userId = uuidv4();
        rooms[roomId] = {
            name: req?.body?.roomName || roomId,
            id: roomId,
            creator: userId,
            created: new Date(),
            users: {
                [userId]: {
                    id: userId,
                    roomId: roomId,
                    username: req?.body?.username || `USER-${userId}`,
                    created: new Date(),
                    joined: null,
                }
            }
        }

        return res.status(200).json({
            roomId,
            userId
        });
    });

    app.post('/api/rooms/join', (req, res) => {

        if(!rooms[req?.body?.roomId]) return res.status(404).json({
            message: "NOT_FOUND"
        })

        const userId = uuidv4();
        rooms[req?.body?.roomId] = {
            ...rooms[req?.body?.roomId],
            users: {
                ...rooms[req?.body?.roomId].users,
                [userId]: {
                    id: userId,
                    created: new Date(),
                    joined: null,
                    roomId: req?.body?.roomId,
                    username: req?.body?.username || `USER-${userId}`
                }
            }
        }

        return res.status(200).json({
            roomId: req?.body?.roomId,
            userId
        })

    });

    app.post('/api/send', (req, res) => {


        if(!rooms[req.body?.user?.roomId]) {
            return res.status(404).json({ message: "NOT_FOUND" })
        }

        if(!rooms[req.body.user.roomId].users[req.body.user.id]) {
            return res.status(403).json({ message: "FORBIDDEN" })
        }

        io.in(req.body?.user?.roomId).emit('message', {
            ...req.body,
            sentDate: new Date()
        })

        return res.status(200).json({ message: "SUCCESS" })
    })

    app.get('*', (req, res) => {
        return nextHandler(req, res)
    })

    server.listen(PORT, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${PORT}`)
    })
})