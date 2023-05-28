const io = require('socket.io-client');
const socket = io('http://localhost:5000/api/v1/stats');
socket.on('statsData', (data) => {
    console.log('Received stats data:', data);
});
socket.on('disconnect', () => {
    console.log('Disconnected from the Socket.IO server');
});
