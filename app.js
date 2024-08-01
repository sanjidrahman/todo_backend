const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

mongoose.connect('mongodb+srv://sanjid:mongosanjid@cluster0.ylbg7lk.mongodb.net/todo')
.then(() => console.log('DB Connected'))
.catch((err) => console.log(err))

// mongodb+srv://sanjid:mongosanjid@cluster0.ylbg7lk.mongodb.net/

app.use(cors({
    origin: ['http://localhost:4200']
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', userRoutes);

app.listen(3030, () => console.log('Server running on port 3030'));