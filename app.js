const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:5173', // your client app origin
    credentials: true
}));

// const Blog = require('./blog');
const authRoutes = require('./routes/authRoutes');
const userProduct = require('./routes/authProductRoutes')
const adminRoutes = require('./routes/adminRoutes');
const {requireAuth, checkUser} =  require('./middleware/authMiddleware')
// mongodb+srv://ifeoluwajohz:<password>@cluster0.hekb65d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

//mongodb+srv://elizabethgloriacute:<password>@cluster0.pdpz8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
const DbUrRI = `mongodb+srv://elizabethgloriacute:<${process.env.PASSWORD}>@cluster0.pdpz8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.connect(DbUrRI)
//middleware
app.use(express.json());
app.use(cookieParser())


app.use(cors({
    origin: 'http://localhost:5173',
    origin: 'https://artprimes.vercel.app' // Adjust to match your React app's URL
}));


app.use((err, req, res, next) => {
    return res.status(500).json({ err: err.message})
    next()
})
// app.get('*', requireAuth, checkUser)
app.use('/', authRoutes)

app.use('/user', authRoutes)
app.use('/user', userProduct)

app.use('/admin', adminRoutes)


app.listen(process.env.PORT, ()=>{
    console.log(`port ${process.env.PORT} is now active`)
})