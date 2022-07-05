const router = require('./routers/routes')
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const socketServer = require('./server');
const { connectDB } = require('./routers/db');

app.set('view engine', 'ejs');
app.use(router);

connectDB();
socketServer(http);
http.listen(3000);