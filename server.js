const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const postsRouter = require('./routes/posts');
const indexRouter = require('./routes/index');
const { PORT, DATABASE, DATABASE_PASSWORD } = process.env;

const DB = DATABASE.replace('<password>', DATABASE_PASSWORD);
mongoose
    .connect(DB)
    .then(() => console.log('DB connected'))
    .catch(() => console.log('DB connect failed'));

const app = express();
app.use(express.json());
app.use('/posts', postsRouter);
app.use('', indexRouter);
app.all('*', (req, res) => {
    res.status(404).send({ message: '404 route Not found' });
});
app.listen(PORT);
