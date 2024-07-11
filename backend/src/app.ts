import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/user/user.routes'
import authRoutes from './routes/auth/auth.routes'
import blogRoutes from './routes/blog/blog.routes'

import * as dotenv from 'dotenv'
import errorHandler from './middleware/errorHandle';

dotenv.config({})

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json())

app.use('/auth',authRoutes);
app.use('/users', userRoutes);
app.use('/blog',blogRoutes)
app.use(errorHandler);

mongoose.connect("mongodb+srv://ofuzor:ofuzor2018@cluster0.qjl8f.mongodb.net/gurusystem?retryWrites=true&w=majority" || '').then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});

export default app;