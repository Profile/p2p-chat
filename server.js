const app = require('express')()
var bodyParser = require('body-parser')
const server = require('http').Server(app)
const io = require('socket.io')(server)
const next = require('next')

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
    console.log('SOCKET CONNECTED')
    socket.on('message', (data) => {
        console.log("YOU HAVE MESSAGE")
        messages.push(data)
        socket.broadcast.emit('message', data)
    });
    socket.on('disconnect', (data) => {
        const roomId = socket.handshake.query.roomId;
        const leftUser = rooms[roomId].users[socket.id];
        delete rooms[roomId].users[socket.id];
        if(!Object.keys(rooms[roomId].users).length) {
            delete rooms[roomId]
        }

        io.in(roomId).emit('left', {
            leftUser,
            room: rooms[roomId]
        });

    });
    socket.on('join', (data) => {

        const joinedUser = {
            ...data,
            socketId: socket.id
        }

        rooms[joinedUser.roomId] = {
            name: new Date().toString(),
            users: {
                ...((rooms[joinedUser.roomId] || {}).users || {}),
                [socket.id]: joinedUser
            }
        }

        socket.join(joinedUser.roomId);
        io.in(joinedUser.roomId).emit('joined', {
            joinedUser,
            room: rooms[joinedUser.roomId]
        });
    });
})

nextApp.prepare().then(() => {
    app.post('/api/send', (req, res) => {

        console.log(req.body)

        if(!rooms[req.body?.user?.roomId]) {
            return res.status(404).json({ message: "NOT_FOUND" })
        }

        if(!rooms[req.body.user.roomId].users[req.body.user.socketId]) {
            return res.status(403).json({ message: "FORBIDDEN" })
        }

        io.in(req.body?.user?.roomId).emit('message', {
            ...req.body,
            ...req.body.user,
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