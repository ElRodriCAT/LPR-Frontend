const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const helmet = require('helmet');
const cors = require('cors');
const config = require('./config');
const lprRoutes = require('./routes/lpr');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/lpr', lprRoutes);
app.get('/health', (req, res) => res.json({ ok: true }));

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: true }
});

// Initialize detection service with socket.io
require('./services/detectionService').init(io);

io.on('connection', (socket) => {
  console.log('[WS] client connected', socket.id);
  socket.on('disconnect', () => console.log('[WS] client disconnected', socket.id));
});

server.listen(config.PORT, () => {
  console.log(`[OK] Server listening on port ${config.PORT}`);
});
