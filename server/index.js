const express = require('express');
const cors = require('cors');
const helmet = require('helmet')
const dotenv =  require('dotenv')
const connectDB = require('./config/db')

dotenv.config()

const app = express()

//connect to MongoDB
connectDB()

//security middleware
app.use(helmet());

app.use(cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    credentials: true, //required for cookies (refresh token)
}))

// - Body Parsing -
app.use(express.json())
app.use(express.urlencoded({ extended: false}))

// -- Health Check --
app.get("/api/health", (req, res) => {
    res.json({status: "ok", env: process.env.NODE_ENV})
})

// -- Routes --
app.use('/api/auth', require('./routes/auth'));
// app.use('/api/users', require('.routes/user'));

// --Global Error handler (always last)--
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        message: err.message || 'Internal server error',
        // never expose stack traces outside dev
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack})
    })
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> {
    console.log(`server is running on port ${PORT} in ${process.env.NODE_ENV} mode`)
})