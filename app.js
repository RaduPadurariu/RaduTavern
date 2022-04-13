import express from "express";
import authRouter from './api/auth.js';
import usersRouter from './api/users.js';
import postsRouter from './api/posts.js';

import 'dotenv/config';
import mongoose from "mongoose";
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello Social3 Server!'));
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);

// connect to Mongo DB
// console.log(process.env.MONGO_URI);
// mongoose.connect(process.env.MONGO_URI, () => console.log('Connected to Mongo DB'))

const connectDB = async () => {
    try {
        await mongoose.connect (process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log ('MongoDB connected!');
    } catch (err) {
        console.log ('Failed to connect to MongoDB', err);
    }
}
connectDB();
app.listen(process.env.PORT || 5000);

