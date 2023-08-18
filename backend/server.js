const express = require('express');
const db = require('./db/connection.js');
const User = require('./models/User.js');
const Category = require('./models/Category.js');
const Post = require('./models/Post.js');
const authRouter = require('./routes/auth.js');
const userRouter = require('./routes/users.js');
const postRouter = require('./routes/posts.js');
const app = express();

app.use(express.json());

app.use('/api', authRouter);
app.use('/api', userRouter);
app.use('/api', postRouter);

app.listen(5000, ()=>{
     console.log('server is running on localhost: 5000');
})